import { Button, Divider, Input, TableCell, TableRow, Textarea, User, Select, SelectItem } from "@heroui/react"
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { Form, useActionData, useLoaderData, useNavigate, useNavigation, useSearchParams, useSubmit } from "@remix-run/react"
import { Plus, Upload } from "lucide-react"
import { useState, useEffect } from "react"
import { successToast, errorToast } from "~/components/toast"
import { TrainingInterface, TrainingResponse, TrainingTypeInterface } from "~/components/interface"
import trainingController from "~/controllers/training"
import trainingTypeController from "~/controllers/trainingType"
import AdminLayout from "~/Layout/AttendantLayout"
import { Toaster } from "react-hot-toast"
import { getSession } from "~/session"
import NewCustomTable from "~/components/table/newTable"
import UserModel from "~/model/users"
import { TrainingColumns } from "~/components/table/columns"
import { DeleteIcon } from "~/icons/DeleteIcon"
import { EditIcon } from "~/icons/EditIcon"
import ConfirmModal from "~/components/ui/confirmModal"

const Training = () => {
    const [updateModalOpened, setUpdateModalOpened] = useState(false)
    const [createModalOpened, setCreateModalOpened] = useState(false)
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [selectedTrainingType, setSelectedTrainingType] = useState<string>("");
    const [selectedUpdateTrainingType, setSelectedUpdateTrainingType] = useState<string>("");
    const actionData = useActionData<TrainingResponse>();
    const navigation = useNavigation();
    const navigate = useNavigate();
    const submit = useSubmit()
    const [confirmModalOpened, setConfirmModalOpened] = useState(false)
    const [dataValue, setDataValue] = useState<TrainingInterface | null>(null)
    const loaderData = useLoaderData<{ 
        trainings: TrainingInterface[], 
        totalPages: number, 
        trainingTypes: TrainingTypeInterface[],
        user: any
    }>()
    
    // Add safety checks for the data
    const trainings = loaderData?.trainings || []
    const totalPages = loaderData?.totalPages || 1
    const trainingTypes = loaderData?.trainingTypes || []
    const user = loaderData?.user
    
    // Debug logging
    console.log("Received loader data:", loaderData);
    console.log("Trainings array:", trainings);
    console.log("Training types array:", trainingTypes);
    
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

    // Initialize selected training type when dataValue changes
    useEffect(() => {
        if (dataValue?.trainingTypeId) {
            setSelectedUpdateTrainingType(dataValue.trainingTypeId);
        }
    }, [dataValue])

    // Clear selected training type when create modal is closed
    useEffect(() => {
        if (!createModalOpened) {
            setSelectedTrainingType("");
        }
    }, [createModalOpened])

    return (
        <AdminLayout user={user}>
            <Toaster />
            <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Trainings</h1>
                   <div className="flex gap-4">
                   <Button
                        onPress={() => navigate("/admin/trainingType")}
                        className="bg-pink-600 text-white"
                        startContent={<Plus className="h-4 w-4" />}
                    >
                        Training Types
                    </Button>
                    <Button
                        onPress={() => setCreateModalOpened(true)}
                        className="bg-pink-600 text-white"
                        startContent={<Plus className="h-4 w-4" />}
                    >
                        Add Training
                    </Button>
                   </div>
                </div>

                <NewCustomTable
                    columns={TrainingColumns}
                    page={currentPage}
                    totalPages={totalPages}
                    setPage={handlePageChange}
                    loadingState={navigation.state === "loading" ? "loading" : "idle"}
                >
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
            <div
                className={`overflow-scroll fixed top-0 right-0 z-50 h-full bg-white shadow-lg transition-transform transform ${createModalOpened ? "translate-x-0" : "translate-x-full"
                    } lg:w-[25vw] w-[100vw]  border-l border-l-black/10 backdrop-blur-sm `}
            >
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
                    <Select
                        label="Training Type"
                        placeholder="Select training type"
                        labelPlacement="outside"
                        selectedKeys={selectedTrainingType ? [selectedTrainingType] : []}
                        onSelectionChange={(keys) => {
                            const key = Array.from(keys)[0] as string;
                            setSelectedTrainingType(key);
                        }}
                        classNames={{
                            label: "font-nunito text-sm text-default-100",
                            trigger: "bg-white shadow-sm dark:bg-[#333] border border-black/30"
                        }}
                    >
                        {trainingTypes.map((type) => (
                            <SelectItem key={type._id}>
                                {type.name}
                            </SelectItem>
                        ))}
                    </Select>
                    <input type="hidden" name="trainingTypeId" value={selectedTrainingType} />

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
                    <div className="">
                        <input name="base64Image" value={base64Image || ''} type="hidden" />
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
                        } lg:w-[25vw] w-[100vw]  border-l border-l-black/10 backdrop-blur-sm`}
                >
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
                        <Select
                            label="Training Type"
                            placeholder="Select training type"
                            labelPlacement="outside"
                            selectedKeys={selectedUpdateTrainingType ? [selectedUpdateTrainingType] : []}
                            onSelectionChange={(keys) => {
                                const key = Array.from(keys)[0] as string;
                                setSelectedUpdateTrainingType(key);
                            }}
                            classNames={{
                                label: "font-nunito text-sm text-default-100",
                                trigger: "bg-white shadow-sm dark:bg-[#333] border border-black/30"
                            }}
                        >
                            {trainingTypes.map((type) => (
                                <SelectItem key={type._id}>
                                    {type.name}
                                </SelectItem>
                            ))}
                        </Select>
                        <input type="hidden" name="trainingTypeId" value={selectedUpdateTrainingType} />

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
                        <input hidden name="id" value={dataValue?._id} type="hidden" />

                        <button
                            type="submit"
                            className="mt-6 h-10 text-white bg-pink-600 rounded-xl font-nunito px-4"
                        >
                            Submit
                        </button>
                    </Form>

                </div>
            )}

            <ConfirmModal
                isOpen={confirmModalOpened}
                onClose={handleConfirmModalClosed}
                onConfirm={() => {
                    submit(
                        { intent: "delete", id: dataValue?._id || "" },
                        { method: "post" }
                    )
                }}
                title="Delete Training"
                message="Are you sure you want to delete this training?"
            />
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
    const trainingTypeId = formData.get("trainingTypeId") as string;

    // Debug logging
    console.log("Form data received:");
    console.log("intent:", intent);
    console.log("trainingTypeId:", trainingTypeId);
    console.log("title:", title);
    
    // Log all form data for debugging
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    switch (intent) {
        case "create":
            console.log("Creating training with trainingTypeId:", trainingTypeId);
            const training = await trainingController.CreateTraining({
                title,
                description,
                date,
                duration,
                format,
                client,
                base64Image,
                trainingTypeId,
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
                trainingTypeId,
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
    const search_term = url.searchParams.get('search') || '';

    try {
        console.log("Fetching trainings with page:", page, "search:", search_term);
        
        const { trainings, totalPages } = await trainingController.FetchUsers({ 
            request, 
            page, 
            search_term 
        });
        
        console.log("Fetched trainings:", trainings?.length || 0, "Total pages:", totalPages);
        
        const trainingTypesResult = await trainingTypeController.GetActiveTrainingTypes();
        const trainingTypes = trainingTypesResult?.trainingTypes || [];
        
        console.log("Fetched training types:", trainingTypes?.length || 0);

        return { 
            trainings: trainings || [], 
            totalPages: totalPages || 1, 
            trainingTypes,
            user: userData
        };
    } catch (error) {
        console.error("Error loading training data:", error);
        return { 
            trainings: [], 
            totalPages: 1, 
            trainingTypes: [],
            user: userData
        };
    }
}
