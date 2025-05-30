import { json } from "@remix-run/node";
import { GalleryInterface, UsersInterface } from "~/components/interface";
import Gallery from "~/model/gallery";
import User from "~/model/users";
import { getSession } from "~/session";

class GalleryController {
    async galleryDelete(intent: string, id: string) {
        if (intent === "delete") {
            const deleteGallery = await Gallery.findByIdAndDelete(id);
            if (deleteGallery) {
                return json({ message: "Gallery item deleted successfully", success: true }, { status: 200 });
            } else {
                return json({ message: "Gallery item not found", success: false }, { status: 404 });
            }
        }
    }

    async updateGallery({
        id,
        title,
        type,
        image,
    }: {
        id: string,
        title: string,
        type: string,
        image: string,
    }) {
        try {
            const updateGallery = await Gallery.findByIdAndUpdate(id, { title, type, image });
            if (updateGallery) {
                return json({ message: "Gallery item updated successfully", success: true }, { status: 200 });
            } else {
                return json({ message: "Gallery item not found", success: false }, { status: 404 });
            }
        } catch (error: any) {
            return json({ message: error.message, success: false }, { status: 400 });
        }
    }

    async galleryAdd({
        title,
        type,
        image,
    }: {
        title: string,
        type: string,
        image: string,
    }) {
        try {
            // Create a new gallery item
            const gallery = new Gallery({
                title,
                type,
                image,
            });

            const response = await gallery.save();
            if (response) {
                return json({ message: "Gallery item created successfully", success: true }, { status: 200 });
            }
        } catch (error: any) {
            return json({ message: error.message, success: false }, { status: 400 });
        }
    }

    async getGalleryItems({
        request,
        page = 1,
        search_term,
        limit = 9,
        type
    }: {
        request?: Request,
        page?: number;
        search_term?: string;
        limit?: number;
        type?: string;
    }): Promise<{
        user: UsersInterface[],
        galleryItems: GalleryInterface[],
        totalPages: number
    } | any> {
        const skipCount = (page - 1) * limit;

        // Define the search filter
        let searchFilter: any = {};
        
        if (search_term) {
            searchFilter.$or = [
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
            ];
        }
        
        // Add type filter if provided
        if (type) {
            searchFilter.type = type;
        }

        try {
            // Get session and user information
            const session = await getSession(request?.headers.get("Cookie"));
            const token = session.get("email");
            const user = await User.findOne({ email: token });

            // Get total count and calculate total pages       
            const totalGalleryCount = await Gallery.countDocuments(searchFilter).exec();
            const totalPages = Math.ceil(totalGalleryCount / limit);

            // Find gallery items with pagination and search filter
            const galleryItems = await Gallery.find(searchFilter)
                .skip(skipCount)
                .limit(limit)
                .exec();

            return { user, galleryItems, totalPages, totalGalleryCount };
        } catch (error: any) {
            return {
                message: error.message,
                success: false,
                status: 500
            };
        }
    }
}

const galleryController = new GalleryController();
export default galleryController;
