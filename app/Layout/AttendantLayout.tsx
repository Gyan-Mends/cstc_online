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
import { Form, Link, useLoaderData, useLocation, useNavigate, useNavigation, useSearchParams, useSubmit } from "@remix-run/react"
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
} from "lucide-react";
import logo from "~/components/image/logo.jpg";
import ConfirmModal from "~/components/ui/confirmModal";
import logoutController from "~/controllers/logout";
import usersController from "~/controllers/registration";
import { getSession } from "~/session";
import { json, LoaderFunction, redirect } from "@remix-run/node";

const AdminLayout = ({ children }: { children: ReactNode }) => {
    const {user}= useLoaderData<typeof loader>()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigation = useNavigation();
    const navigate = useNavigate();
    const isLoading = navigation.state === "loading";
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState([]);
    const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false)
    const [dataValue, setDataValue] = useState<any>()
    const submit = useSubmit()
    const handleConfirmModalClosed = () => {
        setIsConfirmModalOpened(false)
    }





    return (
        <div className="flex h-screen bg-gray-50 dark:bg-[#000000]">

            {/* Sidebar */}
            <div
                className={`
                  ${isSidebarOpen ? "w-64" : "w-0 -ml-64"}
                  bg-white dark:bg-[#111111] border-r dark:border-r-[#333333] border-r-black/20  shadow-r-md transition-all duration-300 ease-in-out flex flex-col z-30 fixed h-full md:relative
                `}
            >
                <div className="flex items-center justify-between p-4 border-b border-b-black/20">
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded  flex items-center justify-center text-white font-bold font-montserrat">
                            <img src={logo} alt="" />
                        </div>
                        <span className="ml-2 text-xl font-bold text-pink-400 font-montserrat">
                            CSTS
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex flex-col flex-1 px-4 py-4 space-y-6">
                    <ul className="flex flex-col">
                        <Link to="/admin">
                            <li className=" flex items-center gap-2">
                                <LayoutDashboard className="h-5 w-5 text-pink-500 " />
                                Dashboard
                            </li>
                        </Link>
                    </ul>
                    <ul className="flex flex-col">
                        <Link to="/admin/users">
                            <li className=" flex items-center gap-2">
                                <Users className="h-5 w-5 text-pink-500 " />
                                Users
                            </li>
                        </Link>
                    </ul>
                    <ul className="flex flex-col">
                        <Link to="/admin/contact">
                            <li className=" flex items-center gap-2">
                                <Mail className="h-5 w-5 text-pink-500 " />
                                Contact Us
                            </li>
                        </Link>
                    </ul>
                    <ul className="flex flex-col">
                        <Link to="/admin/blogCategory">
                            <li className=" flex items-center gap-2">
                                <Book className="h-5 w-5 text-pink-500 " />
                                Blog Category
                            </li>
                        </Link>
                    </ul>
                    <ul className="flex flex-col">
                        <Link to="/admin/blog">
                            <li className=" flex items-center gap-2">
                                <Book className="h-5 w-5 text-pink-500 " />
                                Blog
                            </li>
                        </Link>
                    </ul>
                    <ul className="flex flex-col">
                        <Link to="/admin/training">
                            <li className=" flex items-center gap-2">
                                <Book className="h-5 w-5 text-pink-500 " />
                                Training
                            </li>
                        </Link>
                    </ul>
                     <ul className="flex flex-col">
                        <Link to="/admin/event">
                            <li className=" flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-pink-500 " />
                                Events
                            </li>
                        </Link>
                    </ul> 
                     <ul className="flex flex-col">
                        <Link to="/admin/compliance-notice">
                            <li className=" flex items-center gap-2">
                                <FileText className="h-5 w-5 text-pink-500 " />
                                Compliance Notice
                            </li>
                        </Link>
                    </ul> 
                     <ul className="flex flex-col">
                        <Link to="/admin/gallery">
                            <li className=" flex items-center gap-2">
                                <ImageIcon className="h-5 w-5 text-pink-500 " />
                                Gallery
                            </li>
                        </Link>
                    </ul> 
                     <ul className="flex flex-col">
                        <Link to="/admin/directors-bank">
                            <li className=" flex items-center gap-2">
                                <Users className="h-5 w-5 text-pink-500 " />
                                Directors Bank
                            </li>
                        </Link>
                    </ul> 
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
                       <img className="rounded-full" src="https://i.pravatar.cc/150?u=a04258114e29026702d" alt="" />
                       </div>
                    </div>
                </header>
                {/* confirm modal */}
                {/* confirm modal */}
                <ConfirmModal className="dark:bg-slate-950 border border-white/5" header="Confirm Logout" content="Are you sure to logout?" isOpen={isConfirmModalOpened} onOpenChange={handleConfirmModalClosed}>
                <div className="flex gap-4">
                    <Button color="primary" variant="flat" className="font-montserrat font-semibold" size="sm" onPress={handleConfirmModalClosed}>
                        No
                    </Button>
                    <Button color="danger" variant="flat" className="font-montserrat font-semibold " size="sm" onClick={() => {
                        handleConfirmModalClosed()
                        submit({
                            intent: "logout",
                        }, {
                            method: "post"
                        })
                    }} >
                        Yes
                    </Button>
                </div>
            </ConfirmModal>

                <main className="flex-1 overflow-auto p-4 sm:p-6 bg-muted/30">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <Spinner size="lg" />
                        </div>
                    ) : (
                        children
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;



// search bar
export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") as string) || 1;
    const search_term = url.searchParams.get("search_term") as string;

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email");
    if (!token) {
        return redirect("/login")
    }
    
    const {user} = await usersController.FetchUsers({
        request,
        page,
        search_term
    });
    

    return json({ user })
}

