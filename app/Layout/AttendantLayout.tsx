
import {
    Button,
    Input,
    Spinner,
} from "@heroui/react";
import { Link, useNavigation } from "@remix-run/react";
import {
    ArrowLeft,
    Bell,
    LayoutDashboard,
    Menu,
    Search,
    Users,
    X,
} from "lucide-react";
import { ReactNode, useState } from "react";
import logo from "~/components/image/logo.jpg";

const AdminLayout = ({ children }: { children: ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigation = useNavigation();

    const isLoading = navigation.state === "loading";

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-[#000000]">

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

                <div className="flex flex-col flex-1 px-2 py-4 space-y-6">
                    <ul className="flex flex-col">
                        <Link to="/admin">
                            <li className=" flex items-center gap-2">
                                <LayoutDashboard className="h-5 w-5  " />
                                Dashboard
                            </li>
                        </Link>
                    </ul>
                    <ul className="flex flex-col">
                        <Link to="/admin/users">
                            <li className=" flex items-center gap-2">
                                <Users className="h-5 w-5  " />
                                Users
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
                            variant="bordered"
                            size="sm"
                            className=" md:flex rounded-md text-md h-[35px] border border-white/20"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </div>

                    <div className="flex-1 max-w-md mx-4 rounded">
                        <Input
                            startContent={
                                <Search className="h-4 w-4 text-default-400" />
                            }
                            type="search"
                            placeholder="Search user..."
                            className="w-full"
                            classNames={{
                                inputWrapper:
                                    "border rounded-md border-black/20 ",
                            }}
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="relative h-10 w-10 rounded-full flex items-center justify-center border border-white/20">
                            <div>
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary-400"></span>
                            </div>
                        </div>
                    </div>
                </header>

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
