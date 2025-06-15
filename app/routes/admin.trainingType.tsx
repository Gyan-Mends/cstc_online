import { Button, Divider, Input, TableCell, TableRow, Textarea, User, Switch } from "@heroui/react"
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { Form, useActionData, useLoaderData, useNavigate, useSearchParams, useSubmit } from "@remix-run/react"
import { Plus, Upload } from "lucide-react"
import { useState, useEffect } from "react"
import { successToast, errorToast } from "~/components/toast"
import { TrainingTypeInterface, TrainingTypeResponse } from "~/components/interface"
import trainingTypeController from "~/controllers/trainingType"
import AdminLayout from "~/Layout/AttendantLayout"
import { Toaster } from "react-hot-toast"
import { getSession } from "~/session"
import NewCustomTable from "~/components/table/newTable"
import UserModel from "~/model/users"
import { DeleteIcon } from "~/icons/DeleteIcon"
import { EditIcon } from "~/icons/EditIcon"
import ConfirmModal from "~/components/ui/confirmModal"

const TrainingType = () => {
    const [updateModalOpened, setUpdateModalOpened] = useState(false)
    const [createModalOpened, setCreateModalOpened] = useState(false)
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const actionData = useActionData<TrainingTypeResponse>();
    const navigate = useNavigate();
    const submit = useSubmit()
    const [confirmModalOpened, setConfirmModalOpened] = useState(false)
    const [dataValue, setDataValue] = useState<TrainingTypeInterface | null>(null)
    const { trainingTypes, totalPages, user } = useLoaderData<{ trainingTypes: TrainingTypeInterface[], totalPages: number, user: any }>()
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
                setCreateModalOpened(false)
                setUpdateModalOpened(false)
                setConfirmModalOpened(false)
            } else {
                errorToast(actionData.message)
            }
        }
    }, [actionData])

    const TrainingTypeColumns = [
        { title: "Name", allowSort: true },
        { title: "Description", allowSort: true },
        { title: "Category", allowSort: true },
        { title: "Status", allowSort: true },
        { title: "Action", allowSort: true },
    ]

    return (
        <AdminLayout user={user}>
            <Toaster />
            <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Training Types</h1>
                    <Button
                        onPress={() => setCreateModalOpened(true)}
                        className="bg-pink-600 text-white"
                        startContent={<Plus className="h-4 w-4" />}
                    >
                        Add Training Type
                    </Button>
                </div>

                <NewCustomTable
                    columns={TrainingTypeColumns}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                >
                    {trainingTypes.map((trainingType: TrainingTypeInterface, index: number) => (
                        <TableRow key={index}>
                            <TableCell>
                                <User
                                    avatarProps={{ radius: "full", src: trainingType.image }}
                                    name={trainingType.name}
                                />
                            </TableCell>
                            <TableCell className="text-xs">{trainingType?.description}</TableCell>
                            <TableCell>{trainingType?.category}</TableCell>
                            <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                    trainingType.isActive 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {trainingType.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </TableCell>
                            <TableCell className="relative flex items-center gap-4">
                                <button onClick={() => {
                                    setDataValue(trainingType)
                                    setUpdateModalOpened(true)
                                }}>
                                    <EditIcon className="text-primary" />
                                </button>
                                <button onClick={() => {
                                    setDataValue(trainingType)
                                    setConfirmModalOpened(true)
                                }}>
                                    <DeleteIcon className="text-danger" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </NewCustomTable>
            </div>

            {/* Create Modal */}
            <div
                className={`overflow-scroll fixed top-0 right-0 z-50 h-full bg-white shadow-lg transition-transform transform ${
                    createModalOpened ? "translate-x-0" : "translate-x-full"
                } lg:w-[25vw] w-[100vw] border-l border-l-black/10 backdrop-blur-sm`}
            >
                <div className="flex justify-between p-4">
                    <p className="font-montserrat text-lg font-semibold">Create Training Type</p>
                    <button
                        className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        onClick={() => setCreateModalOpened(false)}
                    >
                        ×
                    </button>
                </div>
                <Divider className="mt-0.5" />

                <Form method="post" className="p-4 flex flex-col gap-4">
                    <Input
                        label="Name"
                        name="name"
                        placeholder="Training Type Name"
                        type="text"
                        labelPlacement="outside"
                    />
                    <Textarea
                        label="Description"
                        name="description"
                        placeholder="Training type description"
                        labelPlacement="outside"
                    />
                    <Input
                        label="Category"
                        name="category"
                        placeholder="e.g., Corporate, Technical, Leadership"
                        type="text"
                        labelPlacement="outside"
                    />

                    <div className="">
                        <input name="base64Image" value={base64Image || ''} type="hidden" />
                        <label className="font-nunito block text-sm !text-black">Image</label>
                        <div className="relative inline-block w-40 h-40 border-2 border-dashed border-gray-400 rounded-xl mt-2">
                            <input
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

            {/* Confirm Modal */}
            <ConfirmModal
                isOpen={confirmModalOpened}
                onClose={handleConfirmModalClosed}
                onConfirm={() => {
                    submit(
                        { intent: "delete", id: dataValue?._id || "" },
                        { method: "post" }
                    )
                }}
                title="Delete Training Type"
                message="Are you sure you want to delete this training type?"
            />
        </AdminLayout>
    )
}

export default TrainingType

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const intent = formData.get("intent") as string;

    switch (intent) {
        case "create":
            return await trainingTypeController.CreateTrainingType({
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                base64Image: formData.get("base64Image") as string,
            });
        case "delete":
            return await trainingTypeController.DeleteTrainingType(formData.get("id") as string);
        default:
            return json({ message: "Invalid intent", success: false });
    }
}

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    
    if (!session.has("email")) {
        return redirect("/admin/login");
    }

    const email = session.get("email");
    const user = await UserModel.findOne({ email }).lean();
    if (!user) {
        return redirect("/admin/login");
    }

    const userData = {
        _id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
        role: user.role || 'admin',
        position: user.position,
        phone: user.phone,
        image: user.image
    };

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);

    const { trainingTypes, totalPages } = await trainingTypeController.FetchTrainingTypes({
        request,
        page,
    });

    return { trainingTypes, totalPages, user: userData };
} 