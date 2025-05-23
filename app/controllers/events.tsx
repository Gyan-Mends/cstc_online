import { json } from "@remix-run/node";
import Event from "~/model/events";
import Training from "~/model/training";
import { getSession } from "~/session";

class EventController {
    async CreateEvent({
        title,
        description,
        date,
        duration,
        location,
        base64Image,
    }: {
        title: string;
        description: string;
        date: string;
        duration: string;
        location: string;
        base64Image: string;
    }) {
        const newEvent = new Event({
            title,
            description,
            date,
            duration,
            location,
            image: base64Image,
        });
    
        try {
            const response = await newEvent.save();
            if (response) {
                return json({ message: "Event created successfully", success: true });
            } else {
                return json({ message: "Event creation failed", success: false });
            }
        } catch (error) {
            return json({ message: "An error occurred while creating the event", success: false, error });
        }
    }

    async FetchEvents({
        request,
        page = 1,
        search_term,
        limit = 7,
    }: {
        request?: Request;
            page?: number;
        search_term?: string;
        limit?: number;
        }) {
        const skipCount = (page - 1) * (limit); 

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
                    {
                        description: {
                            $regex: new RegExp(
                                search_term
                                    .split(" ")
                                    .map((term) => `(?=.*${term})`)
                                    .join(""),
                                "i"
                            ),
                        },
                    },
                    {
                        location: {
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
            
            // Get total employee count and calculate total pages       
            const totalEmployeeCount = await Training.countDocuments(searchFilter).exec();
            const totalPages = Math.ceil(totalEmployeeCount / (limit || 9));

            // Find users with pagination and search filter
            const trainings = await Training.find(searchFilter)
                .skip(skipCount)
                .limit(limit || 9)
                .exec()
                ;

            return { trainings, totalPages };
        } catch (error: any) {
            return {
                message: error.message,
                success: false,
                status: 500
            };
        }
    }

    async DeleteCat(intent: string, id: string) {
        // Delete Logic
        if (intent === "delete") {
            const deleteCategory = await Training.findByIdAndDelete(id);
            if (deleteCategory) {
                return json({ message: "Training deleted successfully", success: true }, { status: 200 });
            } else {
                return json({ message: "Training not found", success: false }, { status: 404 });
            }
        }
    }

    async UpdateTraining({
        id,
        title,
        description,
        date,
        duration,
        location,
    }: {
        id: string;
        title: string;
        description: string;
        date: string;
        duration: string;
        location: string;
    }) {
        try {
            const updatedTraining = await Training.findByIdAndUpdate(
                id,
                { title, description, date, duration, location },
                { new: true } // Returns the updated document
            );
    
            if (updatedTraining) {
                return json(
                    { message: "Training updated successfully", success: true },
                    { status: 200 }
                );
            } else {
                return json(
                    { message: "Training not found", success: false },
                    { status: 404 }
                );
            }
        } catch (error) {
            console.error(error);
            return json(
                { message: "Error updating training", success: false, error },
                { status: 500 }
            );
        }
    }
    
    
}



const eventController = new EventController
export default eventController