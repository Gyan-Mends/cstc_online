import { json, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { ArrowRight, BookOpen, Folder, MessageSquare, Tag, Users } from "lucide-react"
import MetricCard from "~/components/ui/customCard"
import dashboard from "~/controllers/dashboard"
import usersController from "~/controllers/registration"
import AdminLayout from "~/Layout/AttendantLayout"

const Admin = () => {
    const data = useLoaderData<typeof loader>()
    
    if ('error' in data) {
        return (
            <AdminLayout>
                <div className="text-red-500">
                    Error loading dashboard data: {data.error}
                </div>
            </AdminLayout>
        )
    }

    const { totalUsers, totalCategories, totalBlogs, totalTrainings, totalMessages } = data
    
    return (
        <AdminLayout>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Total Trainings"
                    value={totalTrainings}
                    description="+2 from last month"
                    icon={<Folder className="h-4 w-4"/>}
                    trend="up"
                />
                <MetricCard
                    title="Total Users"
                    value={totalUsers}
                    description="+15% from last month"
                    icon={<Users className="h-4 w-4"/>}
                    trend="up"
                />
                <MetricCard
                    title="Blog Categories"
                    value={totalCategories}
                    description="Same as last month"
                    icon={<Tag className="h-4 w-4"/>}
                    trend="neutral"
                />
                <MetricCard
                    title="Blogs"
                    value={totalBlogs}
                    description="+12 from last week"
                    icon={<BookOpen className="h-4 w-4"/>}
                    trend="up"
                />
                <MetricCard
                    title="Total Messages"
                    value={totalMessages}
                    description="+12 from last week"
                    icon={<MessageSquare className="h-4 w-4"/>}
                    trend="up"
                />
            </div>
        </AdminLayout>
    )
}
export default Admin


export const loader: LoaderFunction = async () => {
    const dashboardData = await dashboard.getDashboardData()
    
    if ('error' in dashboardData) {
        return json({ error: dashboardData.error }, { status: 500 })

    }
    
    return dashboardData
}