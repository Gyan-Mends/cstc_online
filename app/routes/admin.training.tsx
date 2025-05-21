import { Button, Divider, Input, TableCell, TableRow, Textarea, User } from "@heroui/react"
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { Form, useActionData, useLoaderData, useNavigate, useNavigation, useSubmit } from "@remix-run/react"
import { Plus, Upload } from "lucide-react"
import { useState, useEffect } from "react"
import { successToast, errorToast } from "~/components/toast"
import { TrainingInterface, TrainingResponse } from "~/components/interface"
import trainingController from "~/controllers/training"
import AdminLayout from "~/Layout/AttendantLayout"
import { Toaster } from "react-hot-toast"
import { getSession } from "~/session"
import NewCustomTable from "~/components/table/newTable"
import { TrainingColumns } from "~/components/table/columns"
import { DeleteIcon } from "~/icons/DeleteIcon"
import { EditIcon } from "~/icons/EditIcon"
import ConfirmModal from "~/components/ui/confirmModal"

const Training = () => {
    const [updateModalOpened, setUpdateModalOpened] = useState(false)
    const [createModalOpened, setCreateModalOpened] = useState(false)
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const actionData = useActionData<TrainingResponse>();
    const navigation = useNavigation();
    const navigate = useNavigate();
    const submit = useSubmit()
    const [confirmModalOpened, setConfirmModalOpened] = useState(false)
    const [dataValue, setDataValue] = useState<TrainingInterface | null>(null)
    const { trainings, totalPages } = useLoaderData<{ trainings: TrainingInterface[], totalPages: number | any }>()

    const handleConfirmModalClosed = () => {
        setConfirmModalOpened(false)
    }
    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                successToast(actionData.message)
            } else {
                errorToast(actionData.message)
            }
        }
    }, [actionData])

    return (
        <AdminLayout>
            <Toaster position="top-right" />
            <div className="flex justify-end">
                <Button className="border border-white/30 px-4 py-1 bg-pink-600 text-white" onPress={() => {
                    setCreateModalOpened(true)
                }}>
                    <Plus className="text-white h-4 w-4" />
                    Create Training
                </Button>
            </div>

            <div className="">
                <NewCustomTable
                    columns={TrainingColumns}
                    loadingState={navigation.state === "loading" ? "loading" : "idle"}
                    totalPages={totalPages}
                    page={1}
                    setPage={(page) => (
                        navigate(`?page=${page}`)
                    )}>
                    {trainings.map((training: TrainingInterface, index: number) => (
                        <TableRow key={index}>
                            <TableCell>
                                <p className="!text-xs">
                                    <User
                                        avatarProps={{ radius: "full", src: training.image }}
                                        name={
                                            <p className="font-nunito text-xs">
                                                {training.title}
                                            </p>
                                        }
                                    />
                                </p>
                            </TableCell>
                            <TableCell>{training?.description}</TableCell>
                            <TableCell>{training?.date}</TableCell>
                            <TableCell>{training?.duration}</TableCell>
                            <TableCell>{training?.format}</TableCell>
                            <TableCell>{training?.client}</TableCell>
                            <TableCell className="relative flex items-center gap-4">

                                <div className="flex gap-4">
                                    <button onClick={() => {
                                        setDataValue(training)
                                        setUpdateModalOpened(true)
                                    }}>
                                        <EditIcon className="text-primary" />
                                    </button>
                                    <button onClick={() => {
                                        setDataValue(training)
                                        setConfirmModalOpened(true)
                                    }}>
                                        <DeleteIcon className="text-danger" />
                                    </button>
                                </div>

                            </TableCell>
                        </TableRow>
                    ))}
                </NewCustomTable>
            </div>


            {/* create modal */}
            {/* create modal */}
            <div
                className={`overflow-scroll fixed top-0 right-0 z-50 h-full bg-white shadow-lg transition-transform transform ${createModalOpened ? "translate-x-0" : "translate-x-full"
                    } lg:w-[25vw] w-[100vw]  border-l border-l-black/10 backdrop-blur-sm `}
            >
                {/* Close Button */}
                <div className="flex justify-between p-4">
                    <p className="font-montserrat text-lg font-semibold">Create Training</p>
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
                        label="Duration"
                        name="duration"
                        placeholder="e.g., 2 hours"
                        type="text"
                        labelPlacement="outside"
                        classNames={{
                            label: "font-nunito text-sm text-default-100",
                            inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                        }}
                    />

                    <Input
                        label="Format"
                        name="format"
                        placeholder="e.g., Online or In-person"
                        type="text"
                        labelPlacement="outside"
                        classNames={{
                            label: "font-nunito text-sm text-default-100",
                            inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                        }}
                    />

                    <Input
                        label="Client"
                        name="client"
                        placeholder="Client Name"
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

                    <input hidden name="intent" value="create" type="hidden" />

                    <button
                        type="submit"
                        className="mt-6 h-10 text-white bg-pink-600 rounded-xl font-nunito px-4"
                    >
                        Submit
                    </button>
                </Form>

            </div>


            {/* update modal */}
            {dataValue && (
                <div
                    className={`overflow-scroll fixed top-0 right-0 z-50 h-full bg-white shadow-lg transition-transform transform ${updateModalOpened ? "translate-x-0" : "translate-x-full"
                        } lg:w-[25vw] w-[100vw]  border-l border-l-black/10 backdrop-blur-sm `}
                >
                    {/* Close Button */}
                    <div className="flex justify-between p-4">
                        <p className="font-montserrat text-lg font-semibold">Update Training</p>
                        <button
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                            onClick={() => setUpdateModalOpened(false)}
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

                    <Form method="post" className="p-4 flex flex-col gap-4">
                        <Input
                            label="Title"
                            name="title"
                            defaultValue={dataValue?.title}
                            placeholder=" "
                            type="text"
                            labelPlacement="outside"
                            classNames={{
                                label: "font-nunito text-sm text-default-100",
                                inputWrapper: "bg-white !text-gray-500 shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                            }}
                        />

                        <Textarea
                            label="Description"
                            name="description"
                            defaultValue={dataValue?.description}
                            placeholder=" "
                            labelPlacement="outside"
                            className="font-nunito text-sm"
                            classNames={{
                                label: "font-nunito text-sm text-default-100",
                                inputWrapper: "bg-white text-gray-600 shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                            }}
                        />

                        <Input
                            label="Date"
                            name="date"
                            defaultValue={dataValue?.date}
                            placeholder="YYYY-MM-DD"
                            type="date"
                            labelPlacement="outside"
                            classNames={{
                                label: "font-nunito text-sm text-default-100",
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                            }}
                        />

                        <Input
                            label="Duration"
                            name="duration"
                            defaultValue={dataValue?.duration}
                            placeholder="e.g., 2 hours"
                            type="text"
                            labelPlacement="outside"
                            classNames={{
                                label: "font-nunito text-sm text-default-100",
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                            }}
                        />

                        <Input
                            label="Format"
                            defaultValue={dataValue?.format}
                            name="format"
                            placeholder="e.g., Online or In-person"
                            type="text"
                            labelPlacement="outside"
                            classNames={{
                                label: "font-nunito text-sm text-default-100",
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                            }}
                        />

                        <Input
                            label="Client"
                            name="client"
                            defaultValue={dataValue?.client}
                            placeholder="Client Name"
                            type="text"
                            labelPlacement="outside"
                            classNames={{
                                label: "font-nunito text-sm text-default-100",
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                            }}
                        />

                        <input hidden name="intent" value="update" type="hidden" />
                        <input hidden name="id" value={dataValue?.id} type="hidden" />

                        <button
                            type="submit"
                            className="mt-6 h-10 text-white bg-pink-600 rounded-xl font-nunito px-4"
                        >
                            Submit
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
        </AdminLayout>
    )
}
export default Training

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const intent = formData.get("intent") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const duration = formData.get("duration") as string;
    const format = formData.get("format") as string;
    const client = formData.get("client") as string;
    const base64Image = formData.get("base64Image") as string;
    const id = formData.get("id") as string;

    switch (intent) {
        case "create":
            const training = await trainingController.CreateTraining({
                title,
                description,
                date,
                duration,
                format,
                client,
                base64Image,
            });
            return training;
        case "update":
            const updateTraining = await trainingController.UpdateTraining({
                id,
                title,
                description,
                date,
                duration,
                format,
                client,
            });
            return updateTraining;
        case "delete":
            const deleteTraining = await trainingController.DeleteCat(intent, id);
            return deleteTraining;
        default:
            return json({ message: "Invalid intent", success: false });
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

    const { trainings, totalPages } = await trainingController.FetchUsers({ request, page, search_term })
    return { trainings, totalPages }
}
