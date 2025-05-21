import React, { useState, useEffect } from "react";
import { Button, Input, Textarea, TableRow, TableCell, Tooltip, Skeleton, Divider } from "@heroui/react";
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigate, useNavigation, useSubmit } from "@remix-run/react";
import { Toaster } from "react-hot-toast";

import CustomInput from "~/components/ui/CustomInput";
import { Plus } from "lucide-react";
import { CategoryInterface } from "~/components/interface";
import AdminLayout from "~/Layout/AttendantLayout";
import category from "~/controllers/categoryController";
import { errorToast, successToast } from "~/components/toast";
import NewCustomTable from "~/components/table/newTable";
import { getSession } from "~/session";
import { CategoryColumns } from "~/components/table/columns";
import { DeleteIcon } from "~/icons/DeleteIcon";
import { EditIcon } from "~/icons/EditIcon";
import ConfirmModal from "~/components/ui/confirmModal";



const Category = () => {
    const { categories, user, totalPages } = useLoaderData<{ categories: CategoryInterface[], user: { user: string }, totalPages: number | any }>()
    const actionData = useActionData<any>()
    const [rowsPerPage, setRowsPerPage] = useState(13);
    const submit = useSubmit()
    const [editModalOpened, setEditModalOpened] = useState(false)
    const [dataValue, setDataValue] = useState<CategoryInterface>();
    const [createModalOpened, setCreateModalOpened] = useState(false)
    const [viewModalOpened, setViewModalOpened] = useState(false)
    const [confirmModalOpened, setConfirmModalOpened] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const navigation = useNavigation()

    useEffect(() => {
        if (actionData?.success) {
            successToast(actionData?.message)
            setDataValue(null)
            setConfirmModalOpened(false)
            setEditModalOpened(false)
            setCreateModalOpened(false)

        } else {
            errorToast(actionData?.message)
        }
    }, [actionData])


    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
    };
    const handleEditModalClose = () => {
        setEditModalOpened(false);
    };

    const handleViewModalClosed = () => {
        setViewModalOpened(false)
    }

    const handleConfirmModalClosed = () => {
        setConfirmModalOpened(false)
    }

    const handleCreateModalClosed = () => {
        setCreateModalOpened(false)
    }
    const handleClick = () => {
        setCreateModalOpened(true)
    }



    useEffect(() => {
        const timeOut = setTimeout(() => {
            setIsLoading(true)
        }, 1000)

        return () => clearTimeout(timeOut)
    }, [])

    return (
        <AdminLayout >
            <Toaster position="top-right" />
            <div className="flex justify-end">
                <Button className="border border-white/30 px-4 py-1 bg-pink-600 text-white" onPress={() => {
                    setCreateModalOpened(true)
                }}>
                    <Plus className="text-white h-4 w-4" />
                    Create Blog Category
                </Button>
            </div>
            <div className="">
                <NewCustomTable
                    columns={CategoryColumns}
                    loadingState={navigation.state === "loading" ? "loading" : "idle"}
                    totalPages={totalPages}
                    page={1}
                    setPage={(page) => (
                        navigate(`?page=${page}`)
                    )}>
                    {categories.map((categories: CategoryInterface, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{categories.name}</TableCell>
                            <TableCell>{categories.description}</TableCell>
                            <TableCell className="relative flex items-center gap-4">
                                <button onClick={() => {
                                    setEditModalOpened(true)
                                    setDataValue(categories)

                                }}>
                                    <EditIcon className="h-4 w-4 text-primary-600" />
                                </button>
                                <button onClick={() => {
                                    setDataValue(categories)
                                    setConfirmModalOpened(true)
                                }}>
                                    <DeleteIcon className="h-4 w-4 text-danger-600" />
                                </button>

                            </TableCell>
                        </TableRow>
                    ))}
                </NewCustomTable>
            </div>
            {dataValue && (

            <div
                className={`overflow-scroll fixed top-0 right-0 z-50 h-full bg-white shadow-lg transition-transform transform ${editModalOpened ? "translate-x-0" : "translate-x-full"
                    } lg:w-[25vw] w-[100vw]  border-l border-l-black/10 backdrop-blur-sm `}
            >
                <div className="flex justify-between p-4">
                    <p className="font-montserrat text-lg font-semibold">Edit Category</p>
                    <button
                        className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        onClick={() => setEditModalOpened(false)}
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

                <Form method="post" className="p-4">
                    <Input
                        label="Name"
                        name="name"
                        defaultValue={dataValue?.name}
                        placeholder=" "
                        type="text"
                        labelPlacement="outside"
                        classNames={{
                            label: "font-nunito text-sm text-default-100",
                            inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333] "
                        }}
                    />
                    {/* <input name="seller" value={user?._id} type="hidden" /> */}
                    <input name="intent" value="update" type="hidden" />
                    <input name="id" value={dataValue?._id} type="hidden" />
                    <Textarea
                        autoFocus
                        label="Product description"
                        labelPlacement="outside"
                        placeholder=" "
                        name="description"
                        className="mt-4 font-nunito text-sm"
                        defaultValue={dataValue?.description}
                        classNames={{
                            label: "font-nunito text-sm text-default-100",
                            inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333] "
                        }}
                    />



                    <button onClick={() => {
                    }} type="submit" className="mt-10 h-10 text-white bg-primary-400 rounded-xl font-nunito px-4">
                        Update
                    </button>
                </Form>
            </div>
            )}


            <ConfirmModal className="dark:bg-[#333] border border-white/5"
                content="Are you sure to delete category" header="Comfirm Delete" isOpen={confirmModalOpened} onOpenChange={handleConfirmModalClosed}>
                <div className="flex gap-4">
                    <Button size="sm" color="danger" className="font-montserrat font-semibold" onPress={handleConfirmModalClosed}>
                        No
                    </Button>
                    <Button size="sm" color="primary" className="font-montserrat font-semibold" onClick={() => {
                        setConfirmModalOpened(false)
                        if (dataValue) {
                            submit({
                                intent: "delete",
                                id: dataValue?._id

                            }, {
                                method: "post"
                            })
                        }
                    }} >
                        Yes
                    </Button>
                </div>
            </ConfirmModal>

            <div
                className={`overflow-scroll fixed top-0 right-0 z-50 h-full bg-white shadow-lg transition-transform transform ${createModalOpened ? "translate-x-0" : "translate-x-full"
                    } lg:w-[25vw] w-[100vw]  border-l border-l-black/10 backdrop-blur-sm `}
            >
                {/* Close Button */}
                <div className="flex justify-between p-4">
                    <p className="font-montserrat text-lg font-semibold">Edit User</p>
                    <button
                        className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        onClick={() => setCreateModalOpened(false)}
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

                <Form method="post" className="p-4">
                    <Input
                        label="Name"
                        name="name"
                        placeholder=" "
                        type="text"
                        labelPlacement="outside"
                        classNames={{
                            label: "font-nunito text-sm text-default-100",
                            inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333] "
                        }}
                    />
                    {/* <input hidden name="seller" value={user?._id} type="" /> */}
                    <input hidden name="intent" value="create" type="" />

                    <Textarea
                        autoFocus
                        label="Category description"
                        labelPlacement="outside"
                        placeholder=" "
                        name="description"
                        className="mt-4 font-nunito text-sm"
                        classNames={{
                            label: "font-nunito text-sm text-default-100",
                            inputWrapper: "dark:bg-default-50 shadow-sm   border border-black/30 focus:bg-[#333]  focus focus:bg-[#333] hover:border-b-pink-600 hover:transition-all hover:duration-300 hover:ease-in-out hover:bg-white max-w-full"
                        }}
                    />


                    <button onClick={() => {
                    }} type="submit" className="mt-10 h-10 text-white bg-pink-600 rounded-xl font-nunito px-4">
                        Submit
                    </button>
                </Form>
            </div>



        </AdminLayout>
    );
};

export default Category;

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") as string) || 1;
    const search_term = url.searchParams.get("search_term") as string;

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email");
    if (!token) {
        return redirect("/")
    }

    const { categories, user, totalPages } = await category.getCategories({ request, page, search_term })
    return { categories, user, totalPages }
};

export const action: ActionFunction = async ({ request }) => {
    try {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const admin = formData.get("admin") as string;
        const description = formData.get("description") as string;
        const id = formData.get("id") as string;
        const intent = formData.get("intent") as string;



        switch (intent) {
            case 'create':
                const categories = await category.CategoryAdd(request, name, description, admin, intent, id);
                return categories;
            // case "logout":
            //     const logout = await usersController.logout(intent)
            //     return logout
            case "delete":
                const deleteCat = await category.DeleteCat(intent, id)
                return deleteCat
            case "update":
                const updateCat = await category.UpdateCat({
                    id,
                    name,
                    description
                })
                
                return updateCat
            default:
                break;
        }

    } catch (error: any) {
        return json({ message: error.message, success: false }, { status: 500 });
    }
};
