import { json, redirect } from "@remix-run/node";
import { CategoryInterface, UsersInterface } from "~/components/interface";
import Blog from "~/model/blog";
import User from "~/model/users";
import { getSession } from "~/session"


class BlogController {
    async DeleteBlog({
        intent,
        id
    }: {
        intent: string, id: string
    }) {
        // Delete Logic
        const deleteBlog = await Blog.findByIdAndDelete(id);
        if (deleteBlog) {
            return json({ message: "Blog deleted successfully", success: true }, { status: 200 });
        } else {
            return json({ message: "Blog not found", success: false }, { status: 404 });
        }
    }

    async UpdateCat({
        name,
        base64Image,
        category,
        description,
        admin,
        id
    }: {
            name: string,
            base64Image?: string,
            category: string,
            description: string,
            admin: string,
            id: string
        }) {    

        // Build update object, only include image if a new one is provided
        const updateData: any = {
            name,
            category,
            description,
            admin,
        };

        // Only update image if a new one is provided
        if (base64Image && base64Image.trim() !== '') {
            updateData.image = base64Image;
        }

        const updateBlog = await Blog.findByIdAndUpdate(id, updateData);
        if (updateBlog) {
            return json({ message: "Blog updated successfully", success: true }, { status: 200 });
            } else {
            return json({ message: "Blog not found", success: false }, { status: 404 });
            }


    }

    async BlogAdd({
        name,
        base64Image,
        category,
        description,
        admin
    }: {
        name: string
        base64Image: string
        category: string
        description: string
        admin: string
    }) {
        try {

            // Checking if blog already exists
            const blogExistCheck = await Blog.findOne({ name: name });
            if (blogExistCheck) {
                return json({ message: "Blog already exists", success: false }, { status: 400 });
            }

            // Saving data if category does not exist
            const blog = new Blog({
                name,
                image: base64Image,
                category,
                description,
                admin
            });

            const response = await blog.save();
            if (response) {
                return json({ message: "Blog created successfully", success: true }, { status: 200 });
            }


        } catch (error: any) {
            return json({ message: error.message, success: false }, { status: 400 });
        }
    }



    async getBlogs({
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
        categories: CategoryInterface[],
        totalPages: number
    } | any> {
        const skipCount = ((page || 1) - 1) * limit; // Calculate the number of documents to skip

        // Define the search filter only once
        const searchFilter = search_term
            ? {
                $or: [
                    {
                        name: {
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
            const session = request ? await getSession(request.headers.get("Cookie")) : null;
            const token = session?.get("email");
            const user = token ? await User.findOne({ email: token }) : null;

            // Get total employee count and calculate total pages       
            const totalEmployeeCount = await Blog.countDocuments(searchFilter).exec();
            const totalPages = Math.ceil(totalEmployeeCount / limit);

            // Find users with pagination and search filter
            const blogs = await Blog.find(searchFilter)
                .populate("admin")
                .populate("category")
                .skip(skipCount)
                .limit(limit)
                .exec();

            return { user, blogs, totalPages };
        } catch (error: any) {
            return {
                message: error.message,
                success: false,
                status: 500
            };
        }
    }

    async getBlogById(id: string) {
        try {
            const blog = await Blog.findById(id)
                .populate("admin", "fullName email")
                .populate("category", "name description")
                .exec();
            
            if (!blog) {
                return {
                    message: "Blog not found",
                    success: false,
                    status: 404
                };
            }

            return { blog, success: true };
        } catch (error: any) {
            return {
                message: error.message,
                success: false,
                status: 500
            };
        }
    }

    async UpdateBlogStatus({
        id,
        status
    }: {
        id: string,
        status: 'draft' | 'review' | 'published'
    }) {
        try {
            const updateBlog = await Blog.findByIdAndUpdate(id, {
                status
            }, { new: true });

            if (updateBlog) {
                const statusMessages = {
                    draft: "Blog moved to draft",
                    review: "Blog submitted for review",
                    published: "Blog published successfully"
                };
                
                return json({ 
                    message: statusMessages[status], 
                    success: true 
                }, { status: 200 });
            } else {
                return json({ 
                    message: "Blog not found", 
                    success: false 
                }, { status: 404 });
            }
        } catch (error: any) {
            return json({ 
                message: error.message, 
                success: false 
            }, { status: 500 });
        }
    }

    async getPublishedBlogs({
        limit = 9
    }: {
        limit?: number;
    } = {}) {
        try {
            // Only fetch published blogs for public viewing
            const blogs = await Blog.find({ status: 'published' })
                .populate("admin", "fullName email")
                .populate("category", "name description")
                .sort({ createdAt: -1 })
                .limit(limit)
                .exec();

            return { blogs, success: true };
        } catch (error: any) {
            return {
                message: error.message,
                success: false,
                status: 500
            };
        }
    }
}

const blog = new BlogController
export default blog