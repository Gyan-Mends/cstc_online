import {
    PlusIcon,
} from "@heroicons/react/24/outline";
import {
    Button,
    Divider,
    TableCell,
    TableRow,
    Tooltip,
    User,

} from "@heroui/react";
import { LinksFunction } from "@remix-run/node";
import { useNavigate, useNavigation } from "@remix-run/react";
import axios from "axios";
import { Delete, Edit, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { UserColumns } from "~/components/table/columns";
import NewCustomTable from "~/components/table/newTable";
import AdminLayout from "~/Layout/AttendantLayout";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" },
    ];
};

const Users = () => {
    const navigation = useNavigation();
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fixedUsers = [
        {
            id: 1,
            firstName: "John",
            middleName: "A.",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            role: "Admin",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            firstName: "Jane",
            middleName: "",
            lastName: "Smith",
            email: "jane.smith@example.com",
            phone: "987-654-3210",
            role: "User",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            firstName: "Alice",
            middleName: "B.",
            lastName: "Johnson",
            email: "alice.johnson@example.com",
            phone: "456-123-7890",
            role: "Manager",
            image: "https://via.placeholder.com/150",
        },
    ];

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            fullName: formData.get("fullName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            position: formData.get("position"),
            password: formData.get("password"),
            image: formData.get("base64Image"),
        };

        console.log(data);
        try {
            const res = await axios.post("https://cstsapi.vercel.app/users", data, {
                headers: { "Content-Type": "application/json" },
            });
            navigate("/admin/users");
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <AdminLayout>
            <div className="relative">
                {/* Create User Button */}
                <div className="flex justify-end">
                    <Button
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        onPress={() => setIsDrawerOpen(true)}
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Create User
                    </Button>
                </div>

                {/* Users Table */}
                <NewCustomTable
                    columns={UserColumns}
                    loadingState={navigation.state === "loading" ? "loading" : "idle"}
                    totalPages={1}
                    page={1}
                    setPage={(page) => navigate(`?page=${page}`)}
                >
                    {fixedUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="text-xs">
                                <p className="!text-xs">
                                    <User
                                        avatarProps={{ radius: "sm", src: user.image }}
                                        name={
                                            <p className="font-nunito text-xs">
                                                {`${user.firstName} ${user.middleName || ""} ${user.lastName}`}
                                            </p>
                                        }
                                    />
                                </p>
                            </TableCell>
                            <TableCell className="text-xs">{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell className="relative flex items-center gap-4">
                                <Tooltip content="Edit User">
                                    <button
                                        className="text-primary"
                                        onClick={() => console.log("Edit clicked for", user)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </button>
                                </Tooltip>
                                <Tooltip content="Delete User">
                                    <button
                                        className="text-danger"
                                        onClick={() => console.log("Delete clicked for", user)}
                                    >
                                        <Delete className="h-4 w-4" />
                                    </button>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </NewCustomTable>
            </div>

            {/* Drawer */}
            <div
                className={`overflow-scroll fixed top-0 right-0 z-50 h-full bg-white shadow-lg transition-transform transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
                    } lg:w-[25vw] w-[100vw]  border-l border-l-black/10 `}
            >
                {/* Close Button */}
                <div className="flex justify-between p-4">
                    <p className="font-montserrat text-lg font-semibold">Add New User</p>
                    <button
                        className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        onClick={() => setIsDrawerOpen(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <Divider className="mt-0.5" />

                {/* Drawer Content */}
                <form onSubmit={handleSubmit} method="POST" className="p-4 space-y-4">
                    <div>
                        <label htmlFor="fullName" className="font-nunito text-sm text-default-100">Full Name</label>
                        <input
                            name="fullName"
                            placeholder=" "
                            className="dark:bg-default-50 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="font-nunito text-sm text-default-100">Email</label>
                        <input
                            name="email"
                            placeholder=" "
                            className="dark:bg-default-50 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="font-nunito text-sm text-default-100">Phone</label>
                        <input
                            name="phone"
                            placeholder=" "
                            className="dark:bg-default-50 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="position" className="font-nunito text-sm text-default-100">Position</label>
                        <input
                            name="position"
                            placeholder=" "
                            className="dark:bg-default-50 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                        />
                    </div>
                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="font-nunito text-sm text-default-100">Password</label>
                        <input
                            name="password"
                            placeholder=" "
                            className="dark:bg-default-50 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                        />
                    </div>
                    {/* Image */}
                    <div className=" ">
                        <input name="base64Image" value={base64Image} type="" />
                        <label className="font-nunito block text-sm text-default-100" htmlFor="">
                            Image
                        </label>
                        <div className="relative inline-block w-40 h-40 border-2 border-dashed border-gray-400 rounded-xl dark:border-white/30 mt-2">
                            <input
                                name="image"
                                placeholder=" "
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                type="file"
                                onChange={(event: any) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setBase64Image(reader.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            {/* Display the default image or the uploaded image */}
                            {base64Image ? (
                                <img
                                    src={base64Image}
                                    alt="Preview"
                                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                    <Upload className="h-14 w-14 text-gray-400" />
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="bg-pink-700 hover:bg-pink-800 text-white  text-sm font-semibold py-2 px-4 rounded font-montserrat"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>

        </AdminLayout>

    );
};

export default Users;
