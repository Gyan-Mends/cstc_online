import React, { useEffect, useState } from "react";
import { Button, TableRow, TableCell } from "@heroui/react";
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigate, useNavigation, useSearchParams, useSubmit } from "@remix-run/react";
import { ContactInterface } from "~/components/interface";
import AdminLayout from "~/Layout/AttendantLayout";
import NewCustomTable from "~/components/table/newTable";
import { ContactColumns } from "~/components/table/columns";
import { DeleteIcon } from "~/icons/DeleteIcon";
import { getSession } from "~/session";
import contactController from "~/controllers/contact";
import { requireAdminRole } from "~/utils/roleCheck";
import ConfirmModal from "~/components/ui/confirmModal";
import { successToast } from "~/components/toast";
import { errorToast } from "~/components/toast copy";
import { Toaster } from "react-hot-toast";





const Category = () => {
    const { contacts, totalPages, user } = useLoaderData<{ contacts: ContactInterface[], user: any, totalPages: number | any }>()
    const actionData = useActionData<any>()
    const submit = useSubmit()
    const [dataValue, setDataValue] = useState<ContactInterface>();
    const [confirmModalOpened, setConfirmModalOpened] = useState(false)
    const navigate = useNavigate()
    const navigation = useNavigation()
    const [searchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const handlePageChange = (page: number) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', page.toString());
        navigate(`?${newSearchParams.toString()}`);
    };

    const handleConfirmModalClosed = () => {
        setConfirmModalOpened(false)
    }
    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                successToast(actionData.message)
                setConfirmModalOpened(false)
            } else {
                errorToast(actionData.message)
            }
        }
    }, [actionData])



    return (
        <AdminLayout user={user}>
            <Toaster position="top-right" />
            <div className="">
                <NewCustomTable
                    columns={ContactColumns}
                    loadingState={navigation.state === "loading" ? "loading" : "idle"}
                    totalPages={totalPages}
                    page={currentPage}
                    setPage={(page) => (
                        navigate(`?page=${page}`)
                    )}>
                    {contacts.map((contact: ContactInterface, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{contact?.firstName + " "+contact?.middleName + " "+ contact?.lastName }</TableCell>
                            <TableCell>{contact?.number}</TableCell>
                            <TableCell>{contact?.company}</TableCell>
                            <TableCell>{contact?.description}</TableCell>
                            <TableCell className="relative flex items-center gap-4">

                                <button onClick={() => {
                                    setDataValue(contact)
                                    setConfirmModalOpened(true)
                                }}>
                                    <DeleteIcon className="text-danger" />
                                </button>

                            </TableCell>
                        </TableRow>
                    ))}
                </NewCustomTable>
            </div>


            <ConfirmModal className="border border-black/20"
                content="Are you sure to delete category" header="Comfirm Delete" isOpen={confirmModalOpened} onOpenChange={handleConfirmModalClosed}>
                <div className="flex gap-4">
                    <Button size="sm" color="danger" className="font-montserrat font-semibold" onPress={handleConfirmModalClosed}>
                        No
                    </Button>
                    <Button size="sm" color="primary" className="font-montserrat font-semibold" onClick={() => {
                        handleConfirmModalClosed()
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



        </AdminLayout>
    );
};

export default Category;

export const loader: LoaderFunction = async ({ request }) => {
    // Require admin role to access this page
    const user = await requireAdminRole(request);
    
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") as string) || 1;
    const search_term = url.searchParams.get("search_term") as string;

    const { contacts, totalPages } = await contactController.getContacts({ request, page, search_term })
    return { contacts, totalPages, user }
};

export const action: ActionFunction = async ({ request }) => {
    try {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const seller = formData.get("seller") as string;
        const description = formData.get("description") as string;
        const id = formData.get("id") as string;
        const intent = formData.get("intent") as string;



        switch (intent) {

            // case "logout":
            //     const logout = await usersController.logout(intent)
            //     return logout
            case "delete":
                const deleteCat = await contactController.DeleteCat(id)
                return deleteCat
            default:
                break;
        }

    } catch (error: any) {
        return json({ message: error.message, success: false }, { status: 500 });
    }
};
