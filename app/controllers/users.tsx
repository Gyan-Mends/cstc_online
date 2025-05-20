import { json, redirect } from "@remix-run/node";
import { getSession, setSession } from "~/session";
import bcrypt from 'bcryptjs';
import User from "~/model/users";

class LoginController {
    async Logins({
        request,
        email,
        password,
        rememberMe
    }: {
        request: Request,
        email: string,
        password: string,
        rememberMe?: boolean | any
    }) {
        try {
            const session = await getSession(request.headers.get("Cookie"));

            // Check if email exists in the database
            const userCheck = await User.findOne({ email });
            if (!userCheck) {
                return json({
                    emailError: { email },
                    emailErrorMessage:"Invalid email "
                });
            }

            // Check if the password matches the one in the database
            const isPasswordValid = await bcrypt.compare(password, userCheck.password);
            if (!isPasswordValid) {
                return json({
                    passwordError: { password },
                    passwordErrorMessage:"Invalid password"
                });
            }

            // If email and password are valid, handle the session and redirect
            const cookie = await setSession(session, email, rememberMe === 'on');

            return redirect("/admin", {
                headers: {
                    "Set-Cookie": cookie
                }
            });

        } catch (error) {
            return json({
                success: false,
                message: "Something went wrong, check your connection"
            }, { status: 500 });
        }
    }
}

const login = new LoginController();
export default login;

