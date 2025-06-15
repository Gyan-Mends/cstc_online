import { Button, Input, TableCell, TableRow, User } from "@heroui/react"
import { ActionFunction, json, LinksFunction, LoaderFunction, redirect } from "@remix-run/node"
import { PlusIcon } from "lucide-react"
import usersController from "~/controllers/registration"
import AdminLayout from "~/Layout/AttendantLayout"
import { getSession } from "~/session"
import { useEffect, useState } from "react"
import Drawer from "~/components/ui/drawer"
import { Form, useActionData, useLoaderData, useNavigate, useNavigation, useSearchParams, useSubmit } from "@remix-run/react"
import notice from "~/controllers/notice"
import { errorToast, successToast } from "~/components/toast"
import { Toaster } from "react-hot-toast"
import { ComplianceNoticeInterface } from "~/components/interface"
import NewCustomTable from "~/components/table/newTable"
import { ComplianceNoticeColumns } from "~/components/table/columns"
import { DeleteIcon } from "~/icons/DeleteIcon"
import { EditIcon } from "~/icons/EditIcon"
import ConfirmModal from "~/components/ui/confirmModal"
import CustomInput from "~/components/ui/CustomInput"
export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" }];
};

const ComplianceNotice = () => {
    const { notices, user, totalPages } = useLoaderData<{ notices: ComplianceNoticeInterface[], user: { user: string }, totalPages: number | any }>()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const navigation = useNavigation()
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const handlePageChange = (page: number) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', page.toString());
        navigate(`?${newSearchParams.toString()}`);
    };
    const submit = useSubmit()
    const [isEditModalOpened, setIsEditModalOpened] = useState(false);
    const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);
    const [dataValue, setDataValue] = useState(" ");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const actionData = useActionData<{ message: string; success: boolean; status: number }>();
    const ReactQuill = typeof window === "object" ? require("react-quill") : () => false
    const [content, setContent] = useState("");
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };
    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    const handleConfirmModalClosed = () => {
        setIsConfirmModalOpened(false)
    }

    const handleEditModalClosed = () => {
        setIsEditModalOpened(false)
    }

    useEffect(() => {
        if (actionData?.success) {
            successToast(actionData?.message)
            setIsDrawerOpen(false)
            setContent("")
        } else {
            errorToast(actionData?.message)
        }
    }, [actionData])

    useEffect(() => {
        if (dataValue?.description) {
            setContent(dataValue.description);
        } else {
            setContent("");
        }
    }, [dataValue]);

    return (
        <AdminLayout user={user}>
            <Toaster position="top-right" />
            <div className="flex justify-end">
                <Button
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    onPress={() => setIsDrawerOpen(true)}
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Create Notice
                </Button>
            </div>

            {/* table  */}
            {/* table  */}
            <NewCustomTable
                columns={ComplianceNoticeColumns}
                loadingState={navigation.state === "loading" ? "loading" : "idle"}
                totalPages={totalPages}
                page={currentPage}
                setPage={(page) => (
                    navigate(`?page=${page}`)
                )}>
                {notices?.map((notice: ComplianceNoticeInterface, index: number) => (
                    <TableRow key={index}>
                        <TableCell className="text-xs">
                            {notice.title}
                        </TableCell>
                        <TableCell>
                            <div dangerouslySetInnerHTML={{ __html: truncateText(notice.description, 15) }} />
                        </TableCell>
                        <TableCell className="relative flex items-center gap-4 text-primary">
                            <button onClick={() => {
                                setIsEditModalOpened(true)
                                setDataValue(notice)
                            }}>
                                <EditIcon className="text-primary" />
                            </button>
                            <button onClick={() => {
                                setIsConfirmModalOpened(true)
                                setDataValue(notice)
                            }}>
                                <DeleteIcon className="text-danger" />
                            </button>

                        </TableCell>
                    </TableRow>
                ))}
            </NewCustomTable>


            <Drawer
                isDrawerOpened={isDrawerOpen}
                handleDrawerClosed={() => setIsDrawerOpen(false)}
                title="Create Compliance Notice"
                children={
                    <Form method="post" className="p-4 flex flex-col gap-4">
                        <Input
                            label="Title"
                            name="title"
                            placeholder=" "
                            type="text"
                            labelPlacement="outside"
                            classNames={{
                                label: "font-nunito text-sm text-default-100",
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                            }}
                        />

                        <div>
                            <label htmlFor="" className="font-nunito">Description</label>
                            <input type="hidden" name="description" value={content} />
                            <ReactQuill
                                value={content} // Bind editor content to state
                                onChange={setContent} // Update state on change
                                modules={modules}
                                className="md:!h-[30vh] mt-2 font-nunito rounded w-full mb-12 !font-nunito"
                            />
                        </div>
                        <input hidden name="intent" value="create" type="hidden" />
                        <div className="mt-4 mt-8">
                            <button
                                className="bg-pink-700 hover:bg-pink-800 text-white  text-sm font-semibold py-2 px-4 rounded font-montserrat"
                                type="submit"
                            >
                                Add Event
                            </button>
                        </div>
                    </Form>
                }
            />

            {dataValue && (
                <Drawer isDrawerOpened={isEditModalOpened} handleDrawerClosed={handleEditModalClosed} title="Edit Blog">
                    <Form method="post" className="flex flex-col gap-4 p-4">
                        <Input
                            label="Title"
                            name="title"
                            defaultValue={dataValue?.title || ""}
                            placeholder=" "
                            type="text"
                            labelPlacement="outside"
                            classNames={{
                                label: "font-nunito text-sm",
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                            }}
                        />




                        <div>
                            <label htmlFor="" className="font-nunito">Description</label>
                            <input type="hidden" name="description" value={content} />
                            <ReactQuill
                                value={content} // Bind editor content to state
                                onChange={setContent} // Update state on change
                                modules={modules}
                                className="md:!h-[30vh] mt-2 font-nunito rounded w-full mb-12 !font-nunito"
                            />
                        </div>




                        {/* <input hidden name="admin" value={user?._id} type="" /> */}
                        <input name="intent" value="update" type="hidden" />
                        <input name="id" value={dataValue?._id} type="hidden" />


                        <div className="flex gap-6 mt-6">
                            <button className="font-montserrat w-40 bg-pink-500 text-white h-10 rounded-lg">Update Notice</button>
                        </div>
                    </Form>
                </Drawer>
            )}


            <ConfirmModal className="dark:bg-[#333] border border-white/5"
                content="Are you sure you want to delete this compliance notice?" header="Confirm Delete" isOpen={isConfirmModalOpened} onOpenChange={handleConfirmModalClosed}>
                <div className="flex gap-4">
                    <Button size="sm" color="danger" className="font-montserrat font-semibold" onPress={() => setIsConfirmModalOpened(false)}>
                        No
                    </Button>
                    <Button size="sm" color="primary" className="font-montserrat font-semibold" onClick={() => {
                        setIsConfirmModalOpened(false)
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
    )
}

export default ComplianceNotice


export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") as string) || 1;
    const search_term = url.searchParams.get("search_term") as string;

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email");
    if (!token) {
        return redirect("/login")
    }
    const { user, users } = await usersController.FetchUsers({
        request,
        page,
        search_term
    });

    const { notices, totalPages } = await notice.getNotices({
        request,
        page,
        search_term
    });


    return json({ user, users, notices, totalPages });

}

export const action: ActionFunction = async ({ request }) => {
    try {
        const formData = await request.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const id = formData.get("id") as string;
        const intent = formData.get("intent") as string;

        switch (intent) {
            case 'create':
                const categories = await notice.NoticeAdd({
                    title,
                    description,
                });
                return categories;
                
            case "delete":
                const deleteCat = await notice.NoticeDelete(intent, id)
                return deleteCat
                
            case "update":
                // Add the update case for compliance notice
                const updateNotice = await notice.UpdateCat({
                    id,
                    name: title, // Using title instead of name to match the notice schema
                    description
                });
                return updateNotice;
                
            default:
                break;
        }

    } catch (error: any) {
        return json({ message: error.message, success: false }, { status: 500 });
    }
};
