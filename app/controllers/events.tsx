import { json } from "@remix-run/node";
import Event from "~/model/events";
import Training from "~/model/training";
import { getSession } from "~/session";

class EventController {
    async CreateEvent({
        title,
        description,
        date,
        location,
        base64Image
    }: {
        title: string;
        description: string;
        date: string;
        location: string;
        base64Image: string | null;
    }) {
        try {
            // Validate required fields
            if (!title || !description || !date || !location) {
                return json({
                    message: "Please fill in all required fields",
                    success: false
                }, { status: 400 });
            }

            // Validate image if it's required
            if (!base64Image) {
                return json({
                    message: "Please upload an image for the event",
                    success: false
                }, { status: 400 });
            }

            const newEvent = new Event({
                title,
                description,
                date,
                location,
                image: base64Image,
            });

            const response = await newEvent.save();
            return json({
                message: "Event created successfully",
                success: true
            }, { status: 201 });

        } catch (error: any) {
            console.error("Error creating event:", error);
            return json({
                message: error.message || "An error occurred while creating the event",
                success: false
            }, { status: 500 });
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
            const totalEmployeeCount = await Event.countDocuments(searchFilter).exec();
            const totalPages = Math.ceil(totalEmployeeCount / (limit || 9));

            // Find users with pagination and search filter
            const events = await Event.find(searchFilter)
                .skip(skipCount)
                .limit(limit || 9)
                .exec()
                ;

            return { events, totalPages };
        } catch (error: any) {
            return {
                message: error.message,
                success: false,
                status: 500
            };
        }
    }

    async DeleteCat(id: string) {
        // Delete Logic
        const deleteCategory = await Event.findByIdAndDelete(id);
        if (deleteCategory) {
            return json({ message: "Event deleted successfully", success: true }, { status: 200 });
        } else {
            return json({ message: "Event not found", success: false }, { status: 404 });
        }

    }

    async UpdateTraining({
        id,
        title,
        description,
        date,
        location,
        base64Image
    }: {
        id: string;
        title: string;
        description: string;
        date: string;
        location: string;
        base64Image?: string; // Optional

    }) {
        try {

            const existingUser = await Event.findById(id);
            if (!existingUser) {
                return json({
                    message: "User not found",
                    success: false,
                    status: 404,
                });
            }

              // Handle image update logic
              let updatedImage = existingUser.image; // Retain current image
              if (base64Image) {
                  updatedImage = base64Image; // Replace with new image if provided
              }
      

            const updatedTraining = await Event.findByIdAndUpdate(
                id,
                { title, description, date, location, base64Image:updatedImage },
                { new: true } // Returns the updated document
            );

            if (updatedTraining) {
                return json(
                    { message: "Event updated successfully", success: true },
                    { status: 200 }
                );
            } else {
                return json(
                    { message: "Event not found", success: false },
                    { status: 404 }
                );
            }
        } catch (error) {
            console.error(error);
            return json(
                { message: "Error updating event", success: false, error },
                { status: 500 }
            );
        }
    }


}



const eventController = new EventController
export default eventController