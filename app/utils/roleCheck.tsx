import { redirect } from "@remix-run/node";
import { getSession } from "~/session";
import User from "~/model/users";

export async function requireAdminRole(request: Request) {
    const session = await getSession(request.headers.get("Cookie"));
    const email = session.get("email");
    
    if (!email) {
        throw redirect("/admin/login");
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
        throw redirect("/admin/login");
    }
    
    if (user.role !== 'admin') {
        throw redirect("/admin?error=access_denied");
    }
    
    return user;
}

export async function requireAuthenticatedUser(request: Request) {
    const session = await getSession(request.headers.get("Cookie"));
    const email = session.get("email");
    
    if (!email) {
        throw redirect("/admin/login");
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
        throw redirect("/admin/login");
    }
    
    return user;
} 