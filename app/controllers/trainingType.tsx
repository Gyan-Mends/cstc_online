import { json } from "@remix-run/node";
import TrainingType from "~/model/trainingType";

class TrainingTypeController {
    async CreateTrainingType({
        name,
        description,
        category,
        base64Image,
    }: {
        name: string;
        description: string;
        category: string;
        base64Image: string;
    }) {
        const newTrainingType = new TrainingType({
            name,
            description,
            category,
            image: base64Image,
            isActive: true,
        });
    
        try {
            const response = await newTrainingType.save();
            if (response) {
                return json({ message: "Training type created successfully", success: true });
            } else {
                return json({ message: "Training type creation failed", success: false });
            }
        } catch (error) {
            return json({ message: "An error occurred while creating the training type", success: false, error });
        }
    }

    async FetchTrainingTypes({
        request,
        page = 1,
        search_term,
        limit = 10,
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
                        category: {
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
            const totalCount = await TrainingType.countDocuments(searchFilter).exec();
            const totalPages = Math.ceil(totalCount / (limit || 10));

            const trainingTypes = await TrainingType.find(searchFilter)
                .skip(skipCount)
                .limit(limit || 10)
                .exec();

            return { trainingTypes, totalPages };
        } catch (error: any) {
            return {
                message: error.message,
                success: false,
                status: 500
            };
        }
    }

    async GetActiveTrainingTypes() {
        try {
            const trainingTypes = await TrainingType.find({ isActive: true })
                .select('_id name description image category')
                .exec();
            return { trainingTypes, success: true };
        } catch (error: any) {
            return {
                message: error.message,
                success: false,
                status: 500
            };
        }
    }

    async DeleteTrainingType(id: string) {
        const deleteTrainingType = await TrainingType.findByIdAndDelete(id);
        if (deleteTrainingType) {
            return json({ message: "Training type deleted successfully", success: true }, { status: 200 });
        } else {
            return json({ message: "Training type not found", success: false }, { status: 404 });
        }
    }

    async UpdateTrainingType({
        id,
        name,
        description,
        category,
        base64Image,
        isActive,
    }: {
        id: string;
        name: string;
        description: string;
        category: string;
        base64Image?: string;
        isActive: boolean;
    }) {
        try {
            const updateData: any = {
                name,
                description,
                category,
                isActive,
            };

            if (base64Image) {
                updateData.image = base64Image;
            }

            const updatedTrainingType = await TrainingType.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );
    
            if (updatedTrainingType) {
                return json(
                    { message: "Training type updated successfully", success: true },
                    { status: 200 }
                );
            } else {
                return json(
                    { message: "Training type not found", success: false },
                    { status: 404 }
                );
            }
        } catch (error) {
            console.error(error);
            return json(
                { message: "Error updating training type", success: false, error },
                { status: 500 }
            );
        }
    }
}

const trainingTypeController = new TrainingTypeController();
export default trainingTypeController; 