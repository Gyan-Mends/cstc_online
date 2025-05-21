import { json, redirect } from "@remix-run/node"
import Registration from "~/modal/registration"
import { commitSession, getSession } from "~/session"
import bcrypt from 'bcryptjs'; // Import bcrypt
import User from "~/model/users";


class UsersController {
    async CreateUser({
        fullName,
        email,
        phone,
        position,
        password,
        base64Image,
    }: {
         fullName: string;
         email: string;
         phone: string;
         position: string;
         password: string;
         base64Image: string;

      }) {
        try {
              // Check if user exists by email or phone
              const UserCheck = await User.findOne({ email });
              const phoneNumberCheck = await User.findOne({ phone });

              if (UserCheck) {
                  return json({
                  message: "User with this email already exists",
                  success: false,
                  status: 409,
              });
            } else if (phoneNumberCheck) {
                return json({
                  message: "Phone number already exists",
                  success: false,
                  status: 409,
              });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10); // Hashing password

                const user = new User({
                    fullName,
                    email,
                    phone,
                    position,
                    password: hashedPassword,
                    image:base64Image,
              });

                // Save user details
                const saveUserDetails = await user.save();

                if (saveUserDetails) {
                    return json({
                        message: "User created successfully",
                        success: true,
                    status: 201,
                });
              } else {
                  return json({
                      message: "Unable to create user",
                      success: false,
                    status: 500,
                });
                }
            }
         
        } catch (error: any) {
            return json({
                message: error.message,
                success: false,
              status: 500,
          });
        }
    }


    async DeleteUser(
        {
            id,
        }: {
            id: string,
        }
    ) {

            const deleteUser = await User.findByIdAndDelete(id);
            if (deleteUser) {
                return json({
                    message: "User delete successfully",
                    success: true,
                    status: 500,
                })
            } else {
                return json({
                    message: "Unable to delete user",
                    success: false,
                    status: 500
                })
            }
    }

    async UpdateUser(
        {
         fullName,
         email,
         phone,
         position,
         id,
        }: {
            fullName?: string,
            email?: string,
            phone?: string,
            position?: string,
            id: string,
           
        }
    ) {
        try {
            const updateUser = await User.findByIdAndUpdate(id, {
               fullName,
               email,
               phone,
               position,
            });

            if (updateUser) {
                return json({
                    message: "User updated successfully",
                    success: true,
                    status: 200
                });
            } else {
                return json({
                    message: "Unable to update this record",
                    success: false,
                    status: 500
                });
            }
        } catch (error: any) {
            return json({
                message: error.message,
                success: false,
                status: 500
            });
        }
    }


    // async logout(intent: string) {
    //     if (intent === "logout") {
    //         const session = await getSession();

    //         return redirect("/", {
    //             headers: {
    //                 "Set-Cookie": await commitSession(session),
    //             },
    //         });
    //     }
    // }

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
                        fullName: {
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
                        email: {
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
                        phone: {
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
            // Get session and user information if request is provided
            const session = request ? await getSession(request.headers.get("Cookie")) : null;
            const token = session?.get("email");
            const user = token ? await User.findOne({ email: token }) : null;

            // Get total employee count and calculate total pages       
            const totalEmployeeCount = await User.countDocuments(searchFilter).exec();
            const totalPages = Math.ceil(totalEmployeeCount / (limit || 9));

            // Find users with pagination and search filter
            const users = await User.find(searchFilter)
                .skip(skipCount)
                .limit(limit || 9)
                .exec()
                ;

            return { user, users, totalPages };
        } catch (error: any) {
            return {
                message: error.message,
                success: false,
                status: 500
            };
        }
    }

}


const usersController = new UsersController
export default usersController