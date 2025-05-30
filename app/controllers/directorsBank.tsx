import { json } from "@remix-run/node";
import { DirectorsBankInterface, UsersInterface } from "~/components/interface";
import DirectorsBank from "~/model/directorsBank";
import User from "~/model/users";
import { getSession } from "~/session";

class DirectorsBankController {
    async directorDelete(intent: string, id: string) {
        if (intent === "delete") {
            const deleteDirector = await DirectorsBank.findByIdAndDelete(id);
            if (deleteDirector) {
                return json({ message: "Director deleted successfully", success: true }, { status: 200 });
            } else {
                return json({ message: "Director not found", success: false }, { status: 404 });
            }
        }
    }

    async updateDirector({
        id,
        name,
        position,
        image,
        areasOfExpertise,
    }: {
        id: string,
        name: string,
        position: string,
        image: string,
        areasOfExpertise: string[],
    }) {
        try {
            const updateDirector = await DirectorsBank.findByIdAndUpdate(id, { 
                name, 
                position, 
                image,
                areasOfExpertise 
            });
            
            if (updateDirector) {
                return json({ message: "Director updated successfully", success: true }, { status: 200 });
            } else {
                return json({ message: "Director not found", success: false }, { status: 404 });
            }
        } catch (error: any) {
            return json({ message: error.message, success: false }, { status: 400 });
        }
    }

    async directorAdd({
        name,
        position,
        image,
        areasOfExpertise,
    }: {
        name: string,
        position: string,
        image: string,
        areasOfExpertise: string[],
    }) {
        try {
            // Create a new director
            const director = new DirectorsBank({
                name,
                position,
                image,
                areasOfExpertise,
            });

            const response = await director.save();
            if (response) {
                return json({ message: "Director created successfully", success: true }, { status: 200 });
            }
        } catch (error: any) {
            return json({ message: error.message, success: false }, { status: 400 });
        }
    }

    async getDirectors({
        request,
        page = 1,
        search_term,
        limit = 9
    }: {
        request?: Request,
        page?: number;
        search_term?: string;
        limit?: number;
    }): Promise<{
        user: UsersInterface[],
        directors: DirectorsBankInterface[],
        totalPages: number
    } | any> {
        const skipCount = (page - 1) * limit;

        // Define the search filter
        let searchFilter: any = {};
        
        if (search_term) {
            searchFilter.$or = [
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
                    position: {
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

        try {
            // Get session and user information
            const session = await getSession(request?.headers.get("Cookie"));
            const token = session.get("email");
            const user = await User.findOne({ email: token });

            // Get total count and calculate total pages       
            const totalDirectorsCount = await DirectorsBank.countDocuments(searchFilter).exec();
            const totalPages = Math.ceil(totalDirectorsCount / limit);

            // Find directors with pagination and search filter
            const directors = await DirectorsBank.find(searchFilter)
                .skip(skipCount)
                .limit(limit)
                .exec();

            return { user, directors, totalPages, totalDirectorsCount };
        } catch (error: any) {
            return {
                message: error.message,
                success: false,
                status: 500
            };
        }
    }
}

const directorsBankController = new DirectorsBankController();
export default directorsBankController;
