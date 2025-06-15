import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { useLoaderData, useSearchParams } from "@remix-run/react"
import { ArrowRight, BookOpen, Camera, CalendarCheck, FileText, Folder, MessageSquare, Tag, Users } from "lucide-react"
import MetricCard from "~/components/ui/customCard"
import dashboard from "~/controllers/dashboard"
import logoutController from "~/controllers/logout"
import usersController from "~/controllers/registration"
import AdminLayout from "~/Layout/AttendantLayout"
import { getSession } from "~/session"
import { Card, CardBody, CardHeader } from "@heroui/react"
import UserModel from "~/model/users"

const Admin = () => {
    const data = useLoaderData<typeof loader>()
    const [searchParams] = useSearchParams();
    const error = searchParams.get('error');
    
    if ('error' in data) {
        return (
            <AdminLayout user={data.user}>
                <div className="text-red-500">
                    Error loading dashboard data: {data.error}
                </div>
            </AdminLayout>
        )
    }

    const { 
        totalUsers, 
        totalCategories, 
        totalBlogs, 
        totalTrainings, 
        totalMessages,
        totalEvents,
        totalNotices,
        totalGalleryItems,
        totalDirectors,
        monthlyStats,
        contentDistribution,
        userActivity,
        user
    } = data
    
    // Import Chart.js dynamically for client-side only
    const renderCharts = () => {
        if (typeof window === 'undefined') return null;
        
        // Import modules dynamically for client-side only
        const {
            Chart,
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            BarElement,
            ArcElement,
            Title,
            Tooltip,
            Legend,
            Filler
        } = require('chart.js');
        
        const { Line, Bar, Doughnut } = require('react-chartjs-2');
        
        // Register ChartJS components
        Chart.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            BarElement,
            ArcElement,
            Title,
            Tooltip,
            Legend,
            Filler
        );
        
        // Chart configurations
        const monthlyChartConfig = {
            labels: monthlyStats.labels,
            datasets: [
                {
                    label: 'Trainings',
                    data: monthlyStats.trainings,
                    borderColor: 'rgb(219, 39, 119)',
                    backgroundColor: 'rgba(219, 39, 119, 0.1)',
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: 'Blogs',
                    data: monthlyStats.blogs,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: 'Events',
                    data: monthlyStats.events,
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4,
                },
            ],
        };
        
        const contentDistChartConfig = {
            labels: contentDistribution.labels,
            datasets: [
                {
                    data: contentDistribution.data,
                    backgroundColor: [
                        'rgb(59, 130, 246)',
                        'rgb(219, 39, 119)',
                        'rgb(16, 185, 129)',
                        'rgb(249, 115, 22)',
                        'rgb(139, 92, 246)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
        
        const userActivityChartConfig = {
            labels: userActivity.labels,
            datasets: [
                {
                    label: 'User Activity',
                    data: userActivity.data,
                    backgroundColor: 'rgb(219, 39, 119)',
                    borderColor: 'rgb(219, 39, 119)',
                    borderWidth: 1,
                },
            ],
        };
        
        return (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-3 lg:col-span-2 border border-black/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <h3 className="text-lg font-medium">Content Growth Over Time</h3>
                    </CardHeader>
                    <CardBody className="p-6">
                        <Line 
                            data={monthlyChartConfig} 
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            precision: 0
                                        }
                                    }
                                }
                            }} 
                        />
                    </CardBody>
                </Card>
                
                <Card className="border border-black/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <h3 className="text-lg font-medium">Content Distribution</h3>
                    </CardHeader>
                    <CardBody className="p-6">
                        <Doughnut 
                            data={contentDistChartConfig} 
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                },
                            }} 
                        />
                    </CardBody>
                </Card>
                
                <Card className="border border-black/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <h3 className="text-lg font-medium">User Activity (Last 7 Days)</h3>
                    </CardHeader>
                    <CardBody className="p-6">
                        <Bar 
                            data={userActivityChartConfig} 
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            precision: 0
                                        }
                                    }
                                }
                            }} 
                        />
                    </CardBody>
                </Card>
            </div>
        );
    };
    
    return (
        <AdminLayout user={user}>
            {error === 'access_denied' && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <strong>Access Denied:</strong> You don't have permission to access that page. Only administrators can access user management and contact messages.
                </div>
            )}
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
                <MetricCard
                    title="Events"
                    value={totalEvents}
                    description="+5 from last month"
                    icon={<CalendarCheck className="h-4 w-4"/>}
                    trend="up"
                />
                <MetricCard
                    title="Compliance Notices"
                    value={totalNotices}
                    description="+3 from last month"
                    icon={<FileText className="h-4 w-4"/>}
                    trend="up"
                />
                <MetricCard
                    title="Gallery Items"
                    value={totalGalleryItems}
                    description="New feature"
                    icon={<Camera className="h-4 w-4"/>}
                    trend="neutral"
                />
            </div>
            
            {typeof window !== 'undefined' && renderCharts()}
        </AdminLayout>
    )
}
export default Admin

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const intent = formData.get("intent");
    
    switch (intent) {
        case "logout":
            const result = await logoutController.logout()
            return result

        default:
            break;
    }
}


export const loader: LoaderFunction = async ({ request }) => {
    const dashboardData = await dashboard.getDashboardData()
    
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email");
    if (!token) {
        return redirect("/login")
    }
    
    // Get the current logged-in user by email
    const user = await UserModel.findOne({ email: token }).lean();
    if (!user) {
        return redirect("/login")
    }

    // Ensure the user object is properly serializable
    const userData = {
        _id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
        role: user.role || 'admin',
        position: user.position,
        phone: user.phone,
        image: user.image
    };
    
    if ('error' in dashboardData) {
        return json({ error: dashboardData.error }, { status: 500 })
    }
    
    return { ...dashboardData, user: userData }
}


