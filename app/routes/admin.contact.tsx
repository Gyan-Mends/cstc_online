import React, { useState } from "react";
import { Button, TableRow, TableCell } from "@heroui/react";
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigate, useNavigation, useSubmit } from "@remix-run/react";
import { ContactInterface } from "~/components/interface";
import AdminLayout from "~/Layout/AttendantLayout";
import NewCustomTable from "~/components/table/newTable";
import { ContactColumns } from "~/components/table/columns";
import { DeleteIcon } from "~/icons/DeleteIcon";
import { getSession } from "~/session";
import contactController from "~/controllers/contact";
import ConfirmModal from "~/components/ui/confirmModal";





const Category = () => {
    const { contacts, totalPages } = useLoaderData<{ contacts: ContactInterface[], user: { user: string }, totalPages: number | any }>()
    const actionData = useActionData<any>()
    const submit = useSubmit()
    const [dataValue, setDataValue] = useState<ContactInterface>();
    const [confirmModalOpened, setConfirmModalOpened] = useState(false)
    const navigate = useNavigate()
    const navigation = useNavigation()


    const handleConfirmModalClosed = () => {
        setConfirmModalOpened(false)
    }

  




    return (
        <AdminLayout >

            <div className="">
                <NewCustomTable
                    columns={ContactColumns}
                    loadingState={navigation.state === "loading" ? "loading" : "idle"}
                    totalPages={totalPages}
                    page={1}
                    setPage={(page) => (
                        navigate(`?page=${page}`)
                    )}>
                    {contacts.map((contact: ContactInterface, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{contact?.name}</TableCell>
                            <TableCell>{contact?.email}</TableCell>
                            <TableCell>{contact?.phone}</TableCell>
                            <TableCell>{contact?.message}</TableCell>
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
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") as string) || 1;
    const search_term = url.searchParams.get("search_term") as string;

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email");
    if (!token) {
        return redirect("/login")
    }

    const { contacts, totalPages } = await contactController.getContacts({ request, page, search_term })
    return { contacts, totalPages }
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
