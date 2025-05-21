import { json } from "@remix-run/node";
import Training from "~/model/training";
import { getSession } from "~/session";

class TrainingController {
    async CreateTraining({
        title,
        description,
        date,
        duration,
        format,
        client,
        base64Image,
    }: {
        title: string;
        description: string;
        date: string;
        duration: string;
        format: string;
        client: string;
        base64Image: string;
    }) {
        const newTraining = new Training({
            title,
            description,
            date,
            duration,
            format,
            client,
            image: base64Image,
        });
    
        try {
            const response = await newTraining.save();
            if (response) {
                return json({ message: "Training created successfully", success: true });
            } else {
                return json({ message: "Training creation failed", success: false });
            }
        } catch (error) {
            return json({ message: "An error occurred while creating the training", success: false, error });
        }
    }

    async FetchUsers({
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
                        client: {
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
        format,
        client,
    }: {
        id: string;
        title: string;
        description: string;
        date: string;
        duration: string;
        format: string;
        client: string;
    }) {
        try {
            const updatedTraining = await Training.findByIdAndUpdate(
                id,
                { title, description, date, duration, format, client },
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



const trainingController = new TrainingController
export default trainingController