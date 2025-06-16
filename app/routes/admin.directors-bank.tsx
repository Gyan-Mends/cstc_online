import { Button, Input, TableCell, TableRow } from "@heroui/react"
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node"
import { Form, useActionData, useLoaderData, useNavigate, useNavigation, useSearchParams, useSubmit } from "@remix-run/react"
import { PlusIcon, X } from "lucide-react"
import { useEffect, useState } from "react"
import AdminLayout from "~/Layout/AttendantLayout"
import ConfirmModal from "~/components/ui/confirmModal"
import Drawer from "~/components/ui/drawer"
import { errorToast, successToast } from "~/components/toast"
import { Toaster } from "react-hot-toast"
import { DirectorsBankInterface } from "~/components/interface"
import { DirectorsBankColumns } from "~/components/table/columns"
import NewCustomTable from "~/components/table/newTable"
import { DeleteIcon } from "~/icons/DeleteIcon"
import { EditIcon } from "~/icons/EditIcon"
import { getSession } from "~/session"
import directorsBankController from "~/controllers/directorsBank"
import User from "~/model/users"
import image1 from "~/components/image/lawyer.jpg"
import image2 from "~/components/image/hero3.jpg"

const DirectorsBank = () => {
    const { directors, user, totalPages } = useLoaderData<{ directors: DirectorsBankInterface[], user: { user: string }, totalPages: number | any }>()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const navigation = useNavigation()
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const submit = useSubmit()
    const [isEditModalOpened, setIsEditModalOpened] = useState(false);
    const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);
    const [dataValue, setDataValue] = useState<any>({});
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [expertise, setExpertise] = useState<string[]>([]);
    const [newExpertise, setNewExpertise] = useState("");
    const actionData = useActionData<{ message: string; success: boolean; status: number }>();

    const handleConfirmModalClosed = () => {
        setIsConfirmModalOpened(false)
    }

    const handleEditModalClosed = () => {
        setIsEditModalOpened(false)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addExpertise = () => {
        if (newExpertise.trim() !== "") {
            setExpertise([...expertise, newExpertise.trim()]);
            setNewExpertise("");
        }
    };

    const removeExpertise = (index: number) => {
        const updatedExpertise = [...expertise];
        updatedExpertise.splice(index, 1);
        setExpertise(updatedExpertise);
    };

    useEffect(() => {
        if (actionData?.success) {
            successToast(actionData?.message)
            setIsDrawerOpen(false)
            setIsEditModalOpened(false)
            setImagePreview("")
            setExpertise([])
        } else if (actionData?.message) {
            errorToast(actionData?.message)
        }
    }, [actionData])

    useEffect(() => {
        if (dataValue?.image) {
            setImagePreview(dataValue.image);
        } else {
            setImagePreview("");
        }
        
        if (dataValue?.areasOfExpertise) {
            setExpertise(dataValue.areasOfExpertise);
        } else {
            setExpertise([]);
        }
    }, [dataValue]);

    return (
        <AdminLayout user={user}>
            <Toaster position="top-right" />
            <div className="flex justify-end">
                <Button
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    onPress={() => {
                        setIsDrawerOpen(true)
                        setExpertise([])
                        setImagePreview("")
                    }}
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Director
                </Button>
            </div>

            {/* Table */}
            <NewCustomTable
                columns={DirectorsBankColumns}
                loadingState={navigation.state === "loading" ? "loading" : "idle"}
                totalPages={totalPages}
                page={currentPage}
                setPage={(page) => (
                    navigate(`?page=${page}`)
                )}>
                {directors?.map((director: DirectorsBankInterface, index: number) => (
                    <TableRow key={index}>
                        <TableCell>
                            <img 
                                src={director.image} 
                                alt={director.name} 
                                className="w-10 h-10 object-cover rounded-full"
                            />
                        </TableCell>
                        <TableCell className="text-xs">
                            {director.name}
                        </TableCell>
                        <TableCell className="text-xs">
                            {director.position}
                        </TableCell>
                        <TableCell className="text-xs">
                            <div className="flex flex-wrap gap-1">
                                {director.areasOfExpertise.map((area, idx) => (
                                    <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs">
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </TableCell>
                        <TableCell className="relative flex items-center mt-4 gap-4 text-primary">
                            <button onClick={() => {
                                setIsEditModalOpened(true)
                                setDataValue(director)
                            }}>
                                <EditIcon className="text-primary" />
                            </button>
                            <button onClick={() => {
                                setIsConfirmModalOpened(true)
                                setDataValue(director)
                            }}>
                                <DeleteIcon className="text-danger" />
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </NewCustomTable>

            {/* Add Drawer */}
            <Drawer
                isDrawerOpened={isDrawerOpen}
                handleDrawerClosed={() => setIsDrawerOpen(false)}
                title="Add Director"
                children={
                    <Form method="post" className="p-4 flex flex-col gap-4" encType="multipart/form-data">
                        <Input
                            label="Name"
                            name="name"
                            placeholder=" "
                            type="text"
                            required
                            labelPlacement="outside"
                            classNames={{
                                label: "font-nunito text-sm text-default-100",
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                            }}
                        />

                        <Input
                            label="Position"
                            name="position"
                            placeholder=" "
                            type="text"
                            required
                            labelPlacement="outside"
                            classNames={{
                                label: "font-nunito text-sm text-default-100",
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                            }}
                        />

                        <div className="flex flex-col gap-2">
                            <label htmlFor="areasOfExpertise" className="font-nunito text-sm ">
                                Areas of Expertise
                            </label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add area of expertise"
                                    value={newExpertise}
                                    onChange={(e) => setNewExpertise(e.target.value)}
                                    classNames={{
                                        inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                                    }}
                                />
                                <Button
                                    className="bg-pink-600 hover:bg-pink-700 text-white"
                                    onClick={addExpertise}
                                >
                                    Add
                                </Button>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {expertise.map((area, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1"
                                    >
                                        <span>{area}</span>
                                        <button 
                                            type="button" 
                                            onClick={() => removeExpertise(index)}
                                            className="text-gray-500 hover:text-red-500"
                                        >
                                            <X size={14} />
                                        </button>
                                        <input 
                                            type="hidden" 
                                            name={`areasOfExpertise[${index}]`} 
                                            value={area} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="image" className="font-nunito text-sm">Image</label>
                            <input 
                                type="file" 
                                name="image" 
                                onChange={handleImageChange}
                                accept="image/*"
                                required
                                className="bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333] rounded-md p-2"
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        className="w-32 h-32 object-cover rounded-full"
                                    />
                                </div>
                            )}
                        </div>

                        <input hidden name="intent" value="create" type="hidden" />
                        <div className="mt-4">
                            <button
                                className="bg-pink-700 hover:bg-pink-800 text-white text-sm font-semibold py-2 px-4 rounded font-montserrat"
                                type="submit"
                            >
                                Add Director
                            </button>
                        </div>
                    </Form>
                }
            />

            {/* Edit Drawer */}
            {dataValue && (
                <Drawer 
                    isDrawerOpened={isEditModalOpened} 
                    handleDrawerClosed={handleEditModalClosed} 
                    title="Edit Director"
                >
                    <Form method="post" className="flex flex-col gap-4 p-4" encType="multipart/form-data">
                        <Input
                            label="Name"
                            name="name"
                            value={dataValue?.name || ""}
                            onChange={(e) => setDataValue({...dataValue, name: e.target.value})}
                            placeholder=" "
                            type="text"
                            required
                            labelPlacement="outside"
                            classNames={{
                                label: "font-nunito text-sm",
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                            }}
                        />

                        <Input
                            label="Position"
                            name="position"
                            value={dataValue?.position || ""}
                            onChange={(e) => setDataValue({...dataValue, position: e.target.value})}
                            placeholder=" "
                            type="text"
                            required
                            labelPlacement="outside"
                            classNames={{
                                label: "font-nunito text-sm",
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                            }}
                        />

                        <div className="flex flex-col gap-2">
                            <label htmlFor="areasOfExpertise" className="font-nunito text-sm">
                                Areas of Expertise
                            </label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add area of expertise"
                                    value={newExpertise}
                                    onChange={(e) => setNewExpertise(e.target.value)}
                                    classNames={{
                                        inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                                    }}
                                />
                                <Button
                                    className="bg-pink-600 hover:bg-pink-700 text-white"
                                    onClick={addExpertise}
                                >
                                    Add
                                </Button>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {expertise.map((area, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1"
                                    >
                                        <span>{area}</span>
                                        <button 
                                            type="button" 
                                            onClick={() => removeExpertise(index)}
                                            className="text-gray-500 hover:text-red-500"
                                        >
                                            <X size={14} />
                                        </button>
                                        <input 
                                            type="hidden" 
                                            name={`areasOfExpertise[${index}]`} 
                                            value={area} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="image" className="font-nunito text-sm">Image</label>
                            <input 
                                type="file" 
                                name="image" 
                                onChange={handleImageChange}
                                accept="image/*"
                                className="bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333] rounded-md p-2"
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        className="w-32 h-32 object-cover rounded-full"
                                    />
                                </div>
                            )}
                        </div>

                        <input hidden name="intent" value="update" type="hidden" />
                        <input hidden name="id" value={dataValue?._id} type="hidden" />
                        <div className="mt-4">
                            <button
                                className="bg-pink-700 hover:bg-pink-800 text-white text-sm font-semibold py-2 px-4 rounded font-montserrat"
                                type="submit"
                            >
                                Update Director
                            </button>
                        </div>
                    </Form>
                </Drawer>
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={isConfirmModalOpened}
                onOpenChange={handleConfirmModalClosed}
                header="Delete Director"
                content="Are you sure you want to delete this director? This action cannot be undone."
                className=""
            >
                <div className="flex gap-2">
                    <Button color="danger" onPress={() => {
                        const formData = new FormData();
                        formData.append('intent', 'delete');
                        formData.append('id', dataValue?._id);
                        submit(formData, {
                            method: 'post',
                        });
                        setIsConfirmModalOpened(false);
                    }}>
                        Delete
                    </Button>
                    <Button color="default" onPress={handleConfirmModalClosed}>
                        Cancel
                    </Button>
                </div>
            </ConfirmModal>
        </AdminLayout>
    )
}

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const search_term = url.searchParams.get("search") || "";

    const session = await getSession(request.headers.get("Cookie"));
    const email = session.get("email");

    if (!email) {
        return redirect("/admin");
    }

    const user = await User.findOne({ email }).lean();
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

    const directorsData = await directorsBankController.getDirectors({
        request,
        page,
        search_term
    });

    return { ...directorsData, user: userData };
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const intent = formData.get("intent") as string;

    if (intent === "create" || intent === "update") {
        const name = formData.get("name") as string;
        const position = formData.get("position") as string;
        
        // Extract areas of expertise from form data
        const areas: string[] = [];
        for (const [key, value] of formData.entries()) {
            if (key.startsWith('areasOfExpertise[')) {
                areas.push(value as string);
            }
        }

        // Handle image
        let image = "";
        const imageFile = formData.get("image") as File;
        
        if (imageFile.size > 0) {
            // Convert new image to base64
            const imageBuffer = await imageFile.arrayBuffer();
            image = `data:${imageFile.type};base64,${Buffer.from(imageBuffer).toString('base64')}`;
        } else if (intent === "update") {
            // Get existing image
            const id = formData.get("id") as string;
            const directorData = await directorsBankController.getDirectors({ request });
            const director = directorData.directors.find((d: DirectorsBankInterface) => d._id === id);
            image = director.image;
        }

        if (intent === "create") {
            return directorsBankController.directorAdd({
                name,
                position,
                image,
                areasOfExpertise: areas
            });
        } else {
            const id = formData.get("id") as string;
            return directorsBankController.updateDirector({
                id,
                name,
                position,
                image,
                areasOfExpertise: areas
            });
        }
    } else if (intent === "delete") {
        const id = formData.get("id") as string;
        return directorsBankController.directorDelete(intent, id);
    }

    return json({ message: "Invalid intent", success: false }, { status: 400 });
};

export default DirectorsBank;
