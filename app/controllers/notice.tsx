import { json, redirect } from "@remix-run/node";
import { CategoryInterface, ComplianceNoticeInterface, UsersInterface } from "~/components/interface";
import Category from "~/model/category";
import Notice from "~/model/notice";
import User from "~/model/users";
import { getSession } from "~/session"


class CategoryController {
    async NoticeDelete(intent: string, id: string) {
        // Delete Logic
        if (intent === "delete") {
            const deleteCategory = await Notice.findByIdAndDelete(id);
            if (deleteCategory) {
                return json({ message: "Notice deleted successfully", success: true }, { status: 200 });
            } else {
                return json({ message: "Notice not found", success: false }, { status: 404 });
            }
        }
    }

    async UpdateCat({
        id,
        name,
        description,
    }: {
        id: string,
        name: string,
        description: string,
    }) {
        // Update Logic

            const updateCategory = await Category.findByIdAndUpdate(id, { name, description });
            if (updateCategory) {
                return json({ message: "Category updated successfully", success: true }, { status: 200 });
            } else {
                return json({ message: "Category not found", success: false }, { status: 404 });
            }

    }

    async NoticeAdd({
        title,
        description,
    }: {
        title: string,
        description: string,
    }) {
        try {

                // Checking if category already exists
                const categoryExistCheck = await Category.findOne({ title });
                if (categoryExistCheck) {
                    return json({ message: "Notice already exists", success: false }, { status: 400 });
                }

                // Saving data if category does not exist
                const notice = new Notice({
                    title,
                    description,
                    
                });

                const response = await notice.save();
                if (response) {
                    return json({ message: "Notice created successfully", success: true }, { status: 200 });
                }

            
        } catch (error: any) {
            return json({ message: error.message, success: false }, { status: 400 });
        }
    }



    async getNotices({
        request,
        page,
        search_term,
        limit = 9
    }: {
            request?: Request,
            page?: number;
            search_term?: string;
        limit?: number;
    }): Promise<{
        user: UsersInterface[],
        notices: ComplianceNoticeInterface[],
        totalPages: number
    } | any> {
        const skipCount = (page - 1) * limit; // Calculate the number of documents to skip

        // Define the search filter only once
        const searchFilter = search_term
            ? {
                $or: [
                    {
                        title: {
                            $regex: new RegExp(
                                search_term
                                    .split(" ")
                                    .map((term) => `(?=.*${term})`)
                                    .join(""),
                                "i"
                            ),
                        },
                    },

                ],
            }
            : {};

        try {
            // Get session and user information
            const session = await getSession(request?.headers.get("Cookie"));
            const token = session.get("email");
            const user = await User.findOne({ email: token });

            // Get total employee count and calculate total pages       
            const totalNoticeCount = await Notice.countDocuments(searchFilter).exec();
            const totalPages = Math.ceil(totalNoticeCount / limit);

            // Find users with pagination and search filter
            const notices = await Notice.find(searchFilter)
                .skip(skipCount)
                .limit(limit)
                .exec();

            return { user, notices, totalPages, totalNoticeCount };
        } catch (error: any) {
            return {
                message: error.message,
                success: false,
                status: 500
            };
        }
    }
}

const notice = new CategoryController
export default notice