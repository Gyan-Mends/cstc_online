import { json } from "@remix-run/node"
import Category from "~/model/category"
import User from "~/model/users"
import Blog from "~/model/blog"
import Training from "~/model/training"
import Contact from "~/model/contact"
type DashboardData = {
    totalUsers: number;
    totalCategories: number;
    totalBlogs: number;
    totalTrainings: number;
    totalMessages: number;
}

type DashboardError = {
    error: string;
}

class DashboardController {
    async getDashboardData(): Promise<DashboardData | DashboardError> {
        try {
            const totalUsers = await User.countDocuments()
            const totalCategories = await Category.countDocuments()
            const totalBlogs = await Blog.countDocuments()
            const totalTrainings = await Training.countDocuments()
            const totalMessages = await Contact.countDocuments()
            return { totalUsers, totalCategories, totalBlogs, totalTrainings, totalMessages }
        } catch (error) {
            return { error: "Failed to fetch dashboard data" }
        }
    }
}

const dashboard = new DashboardController
export default dashboard
