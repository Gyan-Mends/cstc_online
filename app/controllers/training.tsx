import { json } from "@remix-run/node";
import Training from "~/model/training";
import TrainingType from "~/model/trainingType";
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
        trainingTypeId,
    }: {
        title: string;
        description: string;
        date: string;
        duration: string;
        format: string;
        client: string;
        base64Image: string;
        trainingTypeId?: string;
    }) {
        const trainingData: any = {
            title,
            description,
            date,
            duration,
            format,
            client,
            image: base64Image,
        };

        if (trainingTypeId) {
            trainingData.trainingTypeId = trainingTypeId;
        }

        const newTraining = new Training(trainingData);
    
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
        trainingTypeId,
    }: {
        request?: Request;
        page?: number;
        search_term?: string;
        limit?: number;
        trainingTypeId?: string;
    }) {
        const skipCount = (page - 1) * (limit); 

        let searchFilter: any = {};

        if (trainingTypeId) {
            searchFilter.trainingTypeId = trainingTypeId;
        }

        if (search_term) {
            const searchConditions = {
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
            };

            if (Object.keys(searchFilter).length > 0) {
                searchFilter = { ...searchFilter, ...searchConditions };
            } else {
                searchFilter = searchConditions;
            }
        }

        try {
            const totalEmployeeCount = await Training.countDocuments(searchFilter).exec();
            const totalPages = Math.ceil(totalEmployeeCount / (limit || 9));

            const trainings = await Training.find(searchFilter)
                .populate({
                    path: 'trainingTypeId',
                    select: 'name description category',
                    options: { strictPopulate: false }
                })
                .skip(skipCount)
                .limit(limit || 9)
                .exec();

            return { trainings, totalPages };
        } catch (error: any) {
            console.error("Error fetching trainings:", error);
            return {
                message: error.message,
                success: false,
                status: 500,
                trainings: [],
                totalPages: 1
            };
        }
    }

    async GetTrainingsByType(trainingTypeId: string) {
        try {
            console.log("GetTrainingsByType called with typeId:", trainingTypeId);
            
            const trainings = await Training.find({ trainingTypeId })
                .populate({
                    path: 'trainingTypeId',
                    select: 'name description category',
                    options: { strictPopulate: false } // Don't fail if reference is missing
                })
                .exec();
            
            console.log("Found trainings for type:", trainings.length);
            
            return { trainings, success: true };
        } catch (error: any) {
            console.error("Error in GetTrainingsByType:", error);
            return {
                message: error.message,
                success: false,
                status: 500,
                trainings: [] // Add trainings array to error response
            };
        }
    }

    async GetTrainingById(id: string) {
        try {
            const training = await Training.findById(id)
                .populate('trainingTypeId', 'name description category')
                .exec();
            
            if (!training) {
                return {
                    message: "Training not found",
                    success: false,
                    status: 404
                };
            }

            return { training, success: true };
        } catch (error: any) {
            return {
                message: error.message,
                success: false,
                status: 500
            };
        }
    }

    async DeleteCat(intent: string, id: string) {
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
        trainingTypeId,
    }: {
        id: string;
        title: string;
        description: string;
        date: string;
        duration: string;
        format: string;
        client: string;
        trainingTypeId?: string;
    }) {
        try {
            const updateData: any = {
                title,
                description,
                date,
                duration,
                format,
                client,
            };

            if (trainingTypeId) {
                updateData.trainingTypeId = trainingTypeId;
            }

            const updatedTraining = await Training.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
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

const trainingController = new TrainingController();
export default trainingController;