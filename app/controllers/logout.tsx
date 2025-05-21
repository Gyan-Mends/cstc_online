import { redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/session";

class LogoutController {
    async logout() {
            const session = await getSession();

            return redirect("/login", {
                headers: {
                    "Set-Cookie": await commitSession(session),
                },
            });
    }
}

const logoutController = new LogoutController()

export default logoutController
