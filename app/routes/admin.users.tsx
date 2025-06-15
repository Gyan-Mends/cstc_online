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
import { ActionFunction, json, LinksFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigate, useNavigation, useSearchParams, useSubmit } from "@remix-run/react";
import axios from "axios";
import { Delete, Edit, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { UsersInterface } from "~/components/interface";
import { UserColumns } from "~/components/table/columns";
import NewCustomTable from "~/components/table/newTable";
import { errorToast, successToast } from "~/components/toast";
import ConfirmModal from "~/components/ui/confirmModal";
import Drawer from "~/components/ui/drawer";
import logoutController from "~/controllers/logout";
import usersController from "~/controllers/registration";
import { DeleteIcon } from "~/icons/DeleteIcon";
import { EditIcon } from "~/icons/EditIcon";
import AdminLayout from "~/Layout/AttendantLayout";
import { getSession } from "~/session";
import { requireAdminRole } from "~/utils/roleCheck";




export default function Users() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);
    const [editUser, setEditUser] = useState<any>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const navigation = useNavigation();
    const navigate = useNavigate();
    const submit = useSubmit();
    const [searchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    
    const actionData = useActionData<{
        message: string;
        success: boolean;
        status: number;
    }>();
    
    const { user, users, totalPages } = useLoaderData<{
        user: { _id: string },
        users: UsersInterface[],
        totalPages: number
    }>();

    // Update the URL when the page changes
    const handlePageChange = (page: number) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', page.toString());
        navigate(`?${newSearchParams.toString()}`);
    };

    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                successToast(actionData.message)
                setIsEditDrawerOpen(false)
                setEditUser(null)
                setIsConfirmModalOpened(false)
                setIsDrawerOpen(false)

            } else {
                errorToast(actionData.message)
            }
        }
    }, [actionData])

    const handleConfirmModalClosed = () => {
        setIsConfirmModalOpened(false)
        setEditUser(null)
    }

    useEffect(() => {
        if (editUser?.image) {
            setBase64Image(editUser.image); // Set the image from the database as the initial value
        } else {
            setBase64Image(null);
        }
    }, [editUser]);

    return (
        <AdminLayout user={user}>
            <div className="relative">
                <Toaster position="top-right" />
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
                    totalPages={totalPages}
                    page={currentPage}
                    setPage={handlePageChange}
                >
                    {users.map((user: any) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <p className="!text-xs">
                                    <User
                                        avatarProps={{ radius: "full", src: user.image }}
                                        name={
                                            <p className="font-nunito text-xs">
                                                {user.fullName}
                                            </p>
                                        }
                                    />
                                </p>
                            </TableCell>
                            <TableCell className="text-xs">{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.position}</TableCell>
                            <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    user.role === 'admin' 
                                        ? 'bg-pink-100 text-pink-800' 
                                        : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {user.role || 'admin'}
                                </span>
                            </TableCell>
                            <TableCell className="relative flex items-center gap-4">
                                <button
                                    className="text-primary"
                                    onClick={() => {
                                        setEditUser(user);
                                        setIsEditDrawerOpen(true);
                                    }}
                                >
                                    <EditIcon className="h-4 w-4 text-blue-500" />
                                </button>
                                <button
                                    className="text-danger"
                                    onClick={() => {
                                        setEditUser(user);
                                        setIsConfirmModalOpened(true);
                                    }}
                                >
                                    <DeleteIcon className="h-4 w-4 text-red-500" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </NewCustomTable>

            </div>
            {/* Create User Drawer */}
            <Drawer
                isDrawerOpened={isDrawerOpen}
                handleDrawerClosed={() => setIsDrawerOpen(false)}
                title="Create User"
                children={
                    <Form method="post" className="p-4 space-y-4">
                        <div>
                            <label htmlFor="fullName" className="font-nunito text-sm !text-black">Full Name</label>
                            <input
                                name="fullName"
                                placeholder=" "
                                className="dark:bg-default-50 pl-2 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="font-nunito text-sm !text-black">Email</label>
                            <input
                                name="email"
                                placeholder=" "
                                className="dark:bg-default-50 pl-2 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="font-nunito text-sm !text-black">Phone</label>
                            <input
                                name="phone"
                                placeholder=" "
                                className="dark:bg-default-50 pl-2 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="position" className="font-nunito text-sm !text-black">Position</label>
                            <input
                                name="position"
                                placeholder=" "
                                className="dark:bg-default-50 pl-2 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="font-nunito text-sm !text-black">Role</label>
                            <select
                                name="role"
                                className="dark:bg-default-50 pl-2 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                            >
                                <option value="admin">Admin</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="font-nunito text-sm !text-black">Password</label>
                            <input
                                name="password"
                                placeholder=" "
                                className="dark:bg-default-50 pl-2 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                            />
                        </div>
                        {/* Image */}
                        <div className=" ">
                            {base64Image && <input type="hidden" name="base64Image" value={base64Image} />}
                            <label className="font-nunito block text-sm !text-black" htmlFor="">
                                Image
                            </label>
                            <div className="relative inline-block w-40 h-40 border-2 border-dashed border-gray-400 rounded-xl dark:border-white/30 mt-2">
                                <input
                                    name="image"
                                    placeholder=" "
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    type="file"
                                    onChange={(event: any) => {
                                        const file = event.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = () => {
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

                        <input type="hidden" name="intent" value="create" />

                        {/* Submit Button */}
                        <div>
                            <button
                                className="bg-pink-700 hover:bg-pink-800 text-white  text-sm font-semibold py-2 px-4 rounded font-montserrat"
                            >
                                Add User
                            </button>
                        </div>
                    </Form>
                }
            />

            {/* Edit User Drawer */}
            <Drawer
                isDrawerOpened={isEditDrawerOpen}
                handleDrawerClosed={() => setIsEditDrawerOpen(false)}
                title="Edit User"
                children={
                    <Form method="post" className="p-4 space-y-4">
                    <div>
                        <label htmlFor="fullName" className="font-nunito text-sm !text-black">Full Name</label>
                        <input
                            onChange={(e) => setEditUser(prev => prev ? { ...prev, fullName: e.target.value } : null)}
                            value={editUser?.fullName}
                            name="fullName"
                            placeholder=" "
                            className="dark:bg-default-50 text-gray-600 font-nunito text-sm pl-2 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="font-nunito text-sm !text-black">Email</label>
                        <input
                            onChange={(e) => setEditUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                            value={editUser?.email}
                            name="email"
                            placeholder=" "
                            className="dark:bg-default-50 text-gray-600 font-nunito text-sm pl-2 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="font-nunito text-sm !text-black">Phone</label>
                        <input
                            onChange={(e) => setEditUser(prev => prev ? { ...prev, phone: e.target.value } : null)}
                            value={editUser?.phone}
                            name="phone"
                            placeholder=" "
                            className="dark:bg-default-50 text-gray-600 font-nunito text-sm pl-2 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="position" className="font-nunito text-sm !text-black">Position</label>
                        <input
                            onChange={(e) => setEditUser(prev => prev ? { ...prev, position: e.target.value } : null)}
                            value={editUser?.position}
                            name="position"
                            placeholder=" "
                            className="dark:bg-default-50 text-gray-600 font-nunito text-sm pl-2 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="font-nunito text-sm !text-black">Role</label>
                        <select
                            onChange={(e) => setEditUser(prev => prev ? { ...prev, role: e.target.value as 'admin' | 'staff' } : null)}
                            value={editUser?.role || 'admin'}
                            name="role"
                            className="dark:bg-default-50 text-gray-600 font-nunito text-sm pl-2 shadow-sm rounded-md w-full h-10  border border-black/20 hover:border-black/20 focus:border-black/20    hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                        >
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                        </select>
                    </div>

                    <div className=" ">
                        <input name="base64Image" value={base64Image} type="hidden" />
                        <label className="font-nunito block text-sm !text-black" htmlFor="image">
                            Image
                        </label>
                        <div className="relative inline-block w-40 h-40 border-2 border-dashed border-gray-400 rounded-xl dark:border-white/30 mt-2">
                            {/* The file input */}
                            <input
                                name="image"
                                id="image"
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setBase64Image(reader.result as string); // Update state with new image data
                                        };
                                        reader.readAsDataURL(file); // Convert file to base64
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



                    <input type="hidden" name="intent" value="update" />
                    <input type="hidden" name="id" value={editUser?._id} />

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="bg-pink-700 hover:bg-pink-800 text-white  text-sm font-semibold py-2 px-4 rounded font-montserrat"
                        >
                            Add User
                        </button>
                    </div>
                </Form>
                }
            />  
                
            <ConfirmModal className=" h-40 bg-white shadow-lg" header="Confirm Delete" content="Are you sure to delete user?" isOpen={isConfirmModalOpened} onOpenChange={handleConfirmModalClosed}>
                <div className="flex gap-4">
                    <Button color="success" variant="flat" className="font-montserrat font-semibold" size="sm" onPress={handleConfirmModalClosed}>
                        No
                    </Button>
                    <Button color="danger" variant="flat" className="font-montserrat font-semibold " size="sm" onClick={() => {
                        setIsConfirmModalOpened(false)
                        if (editUser) {
                            submit({
                                intent: "delete",
                                id: editUser?._id
                            }, {
                                method: "post"
                            })

                        }
                    }} >
                        Yes
                    </Button>
                </div>
            </ConfirmModal>
        </AdminLayout>

    );
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const position = formData.get("position") as string;
    const role = formData.get("role") as string;
    const password = formData.get("password") as string;
    const base64Image = formData.get("base64Image") as string;
    const intent = formData.get("intent") as string;
    const id = formData.get("id") as string;

    switch (intent) {
        case "create":
            const result = await usersController.CreateUser({
                fullName,
                email,
                phone,
                position,
                role,
                password,
                base64Image,
            });
            return result;

        case "update":
            const result2 = await usersController.UpdateUser({
                fullName,
                email,
                phone,
                position,
                role,
                id,
                base64Image, // Include this parameter if image updates are possible
            });
            return result2;


        case "delete":
            const result3 = await usersController.DeleteUser({
                id,
            });
            return result3;

        case "logout":
            const result4 = await logoutController.logout()
            return result4

        default:
            break;
    }

};

export const loader: LoaderFunction = async ({ request }) => {
    // Require admin role to access this page
    await requireAdminRole(request);
    
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") as string) || 1;
    const search_term = url.searchParams.get("search_term") as string;

    const { user, users, totalPages } = await usersController.FetchUsers({
        request,
        page,
        search_term
    });

    return json({ user, users, totalPages });
}


// export const loader: LoaderFunction = async ({ request }) => {
//     const base_url = process.env.CSTS_API_URL;
//     const searchParams = request.url.split("?")[1];
//     const limit = parseInt(searchParams?.split("=")[2] || '7');
//     const page = parseInt(searchParams?.split("=")[1] || "1") || 1;

//     if (!base_url) {
//         throw new Error("CSTS_API_URL is not defined");
//     }
//     return json({ base_url, page });
// };

// const fixedUsers = [
//     {
//         id: 1,
//         firstName: "John",
//         middleName: "A.",
//         lastName: "Doe",
//         email: "john.doe@example.com",
//         phone: "123-456-7890",
//         role: "Admin",
//         image: "https://via.placeholder.com/150",
//     },
//     {
//         id: 2,
//         firstName: "Jane",
//         middleName: "",
//         lastName: "Smith",
//         email: "jane.smith@example.com",
//         phone: "987-654-3210",
//         role: "User",
//         image: "https://via.placeholder.com/150",
//     },
//     {
//         id: 3,
//         firstName: "Alice",
//         middleName: "B.",
//         lastName: "Johnson",
//         email: "alice.johnson@example.com",
//         phone: "456-123-7890",
//         role: "Manager",
//         image: "https://via.placeholder.com/150",
//     },
// ];

// const { base_url, page } = useLoaderData<typeof loader>();
// console.log(base_url);

// useEffect(() => {
//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get(`${base_url}/getUsers?page=${page}`);
//             setUsers(response.data);
//         } catch (err) {
//             console.error("Failed to fetch users", err);
//         }
//     };
//     fetchUsers();
// }, [base_url, page]);

// console.log(users);


// const handleSubmit = async (event: any) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const data = {
//         fullName: formData.get("fullName"),
//         email: formData.get("email"),
//         phone: formData.get("phone"),
//         position: formData.get("position"),
//         password: formData.get("password"),
//         image: base64Image,
//     };

//     try {
//         const res = await axios.post(`${base_url}/users`, data, {
//             headers: { "Content-Type": "application/json" },
//         });
//         navigate("/admin/users");
//     } catch (err: any) {
//         setError(err.response?.data?.message || "Login failed. Please try again.");
//     }
// };