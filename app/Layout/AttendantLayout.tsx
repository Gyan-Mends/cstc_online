import {
    Button,
    Input,
    Spinner,
    Avatar,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/react"
import { Form, Link, useLocation, useNavigate, useNavigation, useSearchParams, useSubmit } from "@remix-run/react"
import { useEffect, useState, type ReactNode } from "react"
import {
    Book,
    Home,
    MenuIcon,
    Phone,
    Search,
    User,
    Users,
    X,
    ChevronDown,
    Calendar,
    FileText,
    Camera as ImageIcon,
    LayoutDashboard,
    Mail,
    Menu,
    ArrowLeft,
    Bell,
    LogOut,
    Settings,
} from "lucide-react";
import logo from "~/components/image/logo.jpg";
import ConfirmModal from "~/components/ui/confirmModal";
import logoutController from "~/controllers/logout";
import usersController from "~/controllers/registration";

const AdminLayout = ({ children, user }: { children: ReactNode, user?: any }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const submit = useSubmit()
    const navigation = useNavigation()
    const [searchTerm, setSearchTerm] = useState("")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [data, setData] = useState([])
    const [dataValue, setDataValue] = useState<any>()

    const handleConfirmModalClosed = () => {
        setIsConfirmModalOpened(false)
    }

    const handleConfirmModalConfirmed = async () => {
        setIsLoading(true)
        try {
            const result = await logoutController.logout()
            navigate("/login")
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            setIsLoading(false)
            setIsConfirmModalOpened(false)
        }
    }

    // Helper function to check if a path is active
    const isActivePath = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(path + '/')
    }

    // Helper function to get link classes
    const getLinkClasses = (path: string) => {
        const isActive = isActivePath(path)
        return `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            isActive 
                ? "bg-pink-50 text-pink-600 font-semibold" 
                : "text-gray-700 hover:bg-gray-50 hover:text-pink-500"
        }`
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0`}>
                <div className="flex items-center justify-between h-16 px-4 border-b">
                    <img className="w-[8vw] h-8" src="https://res.cloudinary.com/djlnjjzvt/image/upload/v1746824751/CSTS_Logo_eu8gmg.png" alt="Logo" />
                    <Button
                        variant="ghost"
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex flex-col flex-1 px-4 py-4 space-y-2">
                    <Link to="/admin" className={getLinkClasses("/admin")}>
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    
                    {/* Admin-only navigation items */}
                    {user?.role === 'admin' && (
                        <>
                            <Link to="/admin/users" className={getLinkClasses("/admin/users")}>
                                <Users className="h-5 w-5" />
                                Users
                            </Link>
                            <Link to="/admin/contact" className={getLinkClasses("/admin/contact")}>
                                <Mail className="h-5 w-5" />
                                Contact Us
                            </Link>
                        </>
                    )}
                    
                    {/* Navigation items available to both admin and staff */}
                    <Link to="/admin/blog" className={getLinkClasses("/admin/blog")}>
                        <Book className="h-5 w-5" />
                        Blog
                    </Link>
                    <Link to="/admin/training" className={getLinkClasses("/admin/training")}>
                        <Book className="h-5 w-5" />
                        Training
                    </Link>
                    <Link to="/admin/event" className={getLinkClasses("/admin/event")}>
                        <Calendar className="h-5 w-5" />
                        Events
                    </Link>
                    <Link to="/admin/compliance-notice" className={getLinkClasses("/admin/compliance-notice")}>
                        <FileText className="h-5 w-5" />
                        Compliance Notice
                    </Link>
                    <Link to="/admin/gallery" className={getLinkClasses("/admin/gallery")}>
                        <ImageIcon className="h-5 w-5" />
                        Gallery
                    </Link>
                    <Link to="/admin/directors-bank" className={getLinkClasses("/admin/directors-bank")}>
                        <Users className="h-5 w-5" />
                        Directors Bank
                    </Link>
                    
                    {/* Settings - Available to all authenticated users */}
                    <Link to="/admin/settings" className={getLinkClasses("/admin/settings")}>
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                </div>

                {/* Profile Section
                <div className="p-4 border-t mt-auto">
                    <div className="flex items-center space-x-3">
                        <Avatar>
                            <img src="/placeholder.svg?height=40&width=40" />
                            <p>JD</p>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-muted-foreground">Administrator</p>
                        </div>
                        <Dropdown>
                            <DropdownTrigger asChild>
                                <Button variant="ghost">
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem key="account">My Account</DropdownItem>
                                <Divider />
                                <DropdownItem key="profile">Profile</DropdownItem>
                                <DropdownItem key="settings">Settings</DropdownItem>
                                <Divider />
                                <DropdownItem key="logout">Logout</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div> */}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className={`h-16 bg-white dark:bg-[#111111] border-b border-b-black/20   flex items-center justify-between px-4 sm:px-6`}>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            onClick={() => setIsSidebarOpen(true)}
                            className={isSidebarOpen ? "md:hidden" : ""}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <Button
                            onClick={() => navigate(-1)}
                            variant="bordered"
                            size="sm"
                            className=" md:flex rounded-md text-md h-[35px] border bg-pink-100 text-pink-500 border-white/20"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </div>

                    <div className="flex-1 max-w-md mx-4 rounded">
                        <Input
                            startContent={
                                <Search className="h-4 w-4 text-pink-400" />
                            }
                            onValueChange={(value) => {
                                const timeoutId = setTimeout(() => {
                                    navigate(`?search_term=${value}`);
                                }, 100);
                                return () => clearTimeout(timeoutId);
                            }}
                            type="search"
                            placeholder="Search user..."
                            className="w-full"
                            classNames={{
                                inputWrapper:
                                    "border rounded-md border-black/20 bg-white shadow-md  ",
                            }}
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="relative h-10 w-10 rounded-full flex items-center justify-center border border-white/20">
                            <div>
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-pink-600"></span>
                            </div>
                        </div>

                       <div 
                       className="md:flex rounded-full flex items-center justify-center text-md !h-10 !w-10 border bg-pink-100 text-pink-500 border-white/20"
                       >
                       <button
                            className="flex items-center justify-center"
                            onClick={() => {
                                setIsConfirmModalOpened(true)
                            }}
                        >
                            <LogOut className=" h-4 w-4" />
                        </button>
                       </div>
                       <div 
                       className="md:flex rounded-full flex items-center justify-center text-md !h-10 !w-10 border  border-white/20"
                       >
                       <img className="rounded-full h-10 w-10" src={user?.image || "https://i.pravatar.cc/150?u=a04258114e29026702d"} alt="User Avatar" />
                       </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
                    {children}
                </main>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Confirm Modal */}
            <ConfirmModal
                isOpen={isConfirmModalOpened}
                onOpenChange={handleConfirmModalClosed}
                header="Confirm Logout"
                content="Are you sure you want to logout?"
                className="dark:bg-slate-950 border border-white/5"
            >
                <div className="flex gap-4">
                    <Button 
                        color="primary" 
                        variant="flat" 
                        className="font-montserrat font-semibold" 
                        size="sm" 
                        onPress={handleConfirmModalClosed}
                    >
                        Cancel
                    </Button>
                    <Button 
                        color="danger" 
                        variant="flat" 
                        className="font-montserrat font-semibold" 
                        size="sm" 
                        onPress={handleConfirmModalConfirmed}
                        isLoading={isLoading}
                    >
                        Logout
                    </Button>
                </div>
            </ConfirmModal>
        </div>
    )
}

export default AdminLayout





