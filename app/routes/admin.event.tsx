import { Button, Input, TableCell, TableRow, Textarea, User } from "@heroui/react"
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { Form, useActionData, useLoaderData, useLocation, useNavigate, useNavigation, useSearchParams, useSubmit } from "@remix-run/react"
import { PlusIcon, Upload } from "lucide-react"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import { EventInterface } from "~/components/interface"
import { EventColumns } from "~/components/table/columns"
import NewCustomTable from "~/components/table/newTable"
import { errorToast, successToast } from "~/components/toast"
import ConfirmModal from "~/components/ui/confirmModal"
import Drawer from "~/components/ui/drawer"
import eventController from "~/controllers/events"
import usersController from "~/controllers/registration"
import { DeleteIcon } from "~/icons/DeleteIcon"
import { EditIcon } from "~/icons/EditIcon"
import AdminLayout from "~/Layout/AttendantLayout"
import { getSession } from "~/session"

const Event = () => {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const [searchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const [dataValue, setDataValue] = useState<any>(null)
    const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);
    const [isUpdateModalOpened, setIsUpdateModalOpened] = useState(false);
    const submit = useSubmit();

    // Update the URL when the page changes
    const handlePageChange = (page: number) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', page.toString());
        navigate(`?${newSearchParams.toString()}`);
    };
    const handleConfirmModalClosed = () => {
        setIsConfirmModalOpened(false)
        setDataValue(null)
    }
    const { events, totalPages } = useLoaderData<{ events: EventInterface[], totalPages: number }>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const actionData = useActionData<{
        message: string;
        success: boolean;
        status: number;
    }>();

    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                successToast(actionData.message);
            } else {
                errorToast(actionData.message);
            }
        }
    }, [actionData]);
    useEffect(() => {
        if (dataValue?.image) {
            setBase64Image(dataValue.image); // Set the image from the database as the initial value
        } else {
            setBase64Image(null);
        }
    }, [dataValue]);

    return (
        <AdminLayout>
            <Toaster position="top-right" />
            <div className="relative">
                {/* Create User Button */}
                <div className="flex justify-end">
                    <Button
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        onPress={() => setIsDrawerOpen(true)}
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Create Event
                    </Button>
                </div>

                {/* Users Table */}
                <NewCustomTable
                    columns={EventColumns}
                    loadingState={navigation.state === "loading" ? "loading" : "idle"}
                    totalPages={totalPages}
                    page={currentPage}
                    setPage={handlePageChange}
                >
                    {events.map((event: any) => (
                        <TableRow key={event.id}>
                            <TableCell>
                                <p className="!text-xs">
                                    <User
                                        avatarProps={{ radius: "full", src: event.image }}
                                        name={
                                            <p className="font-nunito text-xs">
                                                {event.title}
                                            </p>
                                        }
                                    />
                                </p>
                            </TableCell>
                            <TableCell className="text-xs">{event.description}</TableCell>
                            <TableCell>{event.location}</TableCell>
                            <TableCell>{event.date}</TableCell>
                            <TableCell className="relative flex items-center gap-4">
                                <button
                                    className="text-primary"
                                    onClick={() => {
                                        setDataValue(event);
                                        setIsUpdateModalOpened(true);
                                    }}
                                >
                                    <EditIcon className="h-4 w-4 text-blue-500" />
                                </button>
                                <button
                                    className="text-danger"
                                    onClick={() => {
                                        setDataValue(event);
                                        setIsConfirmModalOpened(true);
                                    }}
                                >
                                    <DeleteIcon className="h-4 w-4 text-red-500" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </NewCustomTable>

                <Drawer
                    isDrawerOpened={isDrawerOpen}
                    handleDrawerClosed={() => setIsDrawerOpen(false)}
                    title="Create User"
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
                            <Textarea
                                label="Description"
                                name="description"
                                placeholder=" "
                                labelPlacement="outside"
                                className="font-nunito text-sm"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                                }}
                            />

                            <Input
                                label="Date"
                                name="date"
                                placeholder="YYYY-MM-DD"
                                type="date"
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                                }}
                            />

                            <Input
                                label="Location"
                                name="location"
                                placeholder="Enter Location"
                                type="text"
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                                }}
                            />

                            {/* Image */}
                            <div className="">
                                <input name="base64Image" value={base64Image || ''} type="hidden" />
                                <label className="font-nunito block text-sm !text-black" htmlFor="event-image">
                                    Image (Required)
                                </label>
                                <div className="relative inline-block w-40 h-40 border-2 border-dashed border-gray-400 rounded-xl dark:border-white/30 mt-2">
                                    <input
                                        id="event-image"
                                        name="image"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={(event) => {
                                            const file = event.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setBase64Image(reader.result as string);
                                                };
                                                reader.onerror = (error) => {
                                                    console.error('Error reading file:', error);
                                                    setBase64Image(null);
                                                };
                                                reader.readAsDataURL(file);
                                            } else {
                                                setBase64Image(null);
                                            }
                                        }}
                                    />
                                    {base64Image ? (
                                        <img
                                            src={base64Image}
                                            alt="Event preview"
                                            className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                        />
                                    ) : (
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center p-2">
                                            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                                            <span className="text-xs text-gray-500">Click to upload image</span>
                                        </span>
                                    )}
                                </div>
                                {!base64Image && (
                                    <p className="mt-1 text-xs text-red-500">
                                        An image is required
                                    </p>
                                )}
                            </div>

                            <input hidden name="intent" value="create" type="hidden" />

                            <div>
                                <button
                                    className="bg-pink-700 hover:bg-pink-800 text-white  text-sm font-semibold py-2 px-4 rounded font-montserrat"
                                >
                                    Add Event
                                </button>
                            </div>
                        </Form>
                    }
                />
                
                {
                    dataValue && (
                        <Drawer
                    isDrawerOpened={isUpdateModalOpened}
                    handleDrawerClosed={() => setIsUpdateModalOpened(false)}
                    title="Update Event"
                    children={
                        <Form method="post" className="p-4 flex flex-col gap-4">
                            <Input
                                label="Title"
                                name="title"
                                placeholder=" "
                                defaultValue={dataValue?.title}
                                type="text"
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                                }}
                            />
                            <Textarea
                                label="Description"
                                name="description"
                                placeholder=" "
                                defaultValue={dataValue?.description}
                                labelPlacement="outside"
                                className="font-nunito text-sm"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                                }}
                            />

                            <Input
                                label="Date"
                                name="date"
                                placeholder="YYYY-MM-DD"
                                defaultValue={dataValue?.date}
                                type="date"
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                                }}
                            />

                            <Input
                                label="Location"
                                name="location"
                                placeholder="Enter Location"
                                defaultValue={dataValue?.location}
                                type="text"
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                                }}
                            />

                            {/* Image */}
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

                            <input hidden name="intent" value="update" type="hidden" />
                            <input hidden name="id" value={dataValue?._id} type="hidden" />

                            <div>
                                <button
                                    className="bg-pink-700 hover:bg-pink-800 text-white  text-sm font-semibold py-2 px-4 rounded font-montserrat"
                                >
                                    Add Event
                                </button>
                            </div>
                        </Form>
                    }
                />
                )
                }

                <ConfirmModal className=" h-40 bg-white shadow-lg" header="Confirm Delete" content="Are you sure to delete user?" isOpen={isConfirmModalOpened} onOpenChange={handleConfirmModalClosed}>
                    <div className="flex gap-4">
                        <Button color="success" variant="flat" className="font-montserrat font-semibold" size="sm" onPress={handleConfirmModalClosed}>
                            No
                        </Button>
                        <Button color="danger" variant="flat" className="font-montserrat font-semibold " size="sm" onClick={() => {
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

            </div>
        </AdminLayout>
    )
}

export default Event

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const intent = formData.get("intent") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const location = formData.get("location") as string;
    const base64Image = formData.get("base64Image") as string;
    const id = formData.get("id") as string;

    switch (intent) {
        case "create":
            const response = await eventController.CreateEvent({
                title,
                description,
                date,
                location,
                base64Image
            });
            return response;

        case "delete":
            const result3 = await eventController.DeleteCat(id);
            return result3;

        case "update":
            const result4 = await eventController.UpdateTraining({
                base64Image,
                title,
                description,
                date,
                location,
                id
            });
            return result4;
        default:
            break;
    }
}

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

    const { events, totalPages } = await eventController.FetchEvents({
        request,
        page,
        search_term
    });




    return json({ user, users, totalPages, events });

}