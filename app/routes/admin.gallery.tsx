import { Button, Input, TableCell, TableRow } from "@heroui/react"
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node"
import { Form, useActionData, useLoaderData, useNavigate, useNavigation, useSearchParams, useSubmit } from "@remix-run/react"
import { PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import AdminLayout from "~/Layout/AttendantLayout"
import ConfirmModal from "~/components/ui/confirmModal"
import Drawer from "~/components/ui/drawer"
import { errorToast, successToast } from "~/components/toast"
import { Toaster } from "react-hot-toast"
import { GalleryInterface } from "~/components/interface"
import { GalleryColumns } from "~/components/table/columns"
import NewCustomTable from "~/components/table/newTable"
import { DeleteIcon } from "~/icons/DeleteIcon"
import { EditIcon } from "~/icons/EditIcon"
import { getSession } from "~/session"
import galleryController from "~/controllers/gallery"

const Gallery = () => {
    const { galleryItems, user, totalPages } = useLoaderData<{ galleryItems: GalleryInterface[], user: { user: string }, totalPages: number | any }>()
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

    useEffect(() => {
        if (actionData?.success) {
            successToast(actionData?.message)
            setIsDrawerOpen(false)
            setIsEditModalOpened(false)
            setImagePreview("")
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
    }, [dataValue]);

    return (
        <AdminLayout>
            <Toaster position="top-right" />
            <div className="flex justify-end">
                <Button
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    onPress={() => setIsDrawerOpen(true)}
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Gallery Item
                </Button>
            </div>

            {/* Table */}
            <NewCustomTable
                columns={GalleryColumns}
                loadingState={navigation.state === "loading" ? "loading" : "idle"}
                totalPages={totalPages}
                page={currentPage}
                setPage={(page) => (
                    navigate(`?page=${page}`)
                )}>
                {galleryItems?.map((item: GalleryInterface, index: number) => (
                    <TableRow key={index}>
                        <TableCell>
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-10 h-10 object-cover rounded"
                            />
                        </TableCell>
                        <TableCell className="text-xs">
                            {item.title}
                        </TableCell>
                        <TableCell className="text-xs">
                            {item.type}
                        </TableCell>
                        <TableCell className="relative flex items-center gap-4 mt-4 text-primary">
                            <button onClick={() => {
                                setIsEditModalOpened(true)
                                setDataValue(item)
                            }}>
                                <EditIcon className="text-primary" />
                            </button>
                            <button onClick={() => {
                                setIsConfirmModalOpened(true)
                                setDataValue(item)
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
                title="Add Gallery Item"
                children={
                    <Form method="post" className="p-4 flex flex-col gap-4" encType="multipart/form-data">
                        <Input
                            label="Title"
                            name="title"
                            placeholder=" "
                            type="text"
                            required
                            labelPlacement="outside"
                            classNames={{
                                label: "font-nunito text-sm ",
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                            }}
                        />

                        <div className="flex flex-col gap-2">
                            <Input
                                label="Type"
                                name="type"
                                placeholder=" "
                                type="text"
                                required
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm ",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="image" className="font-nunito text-sm ">Image</label>
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
                                        className="w-32 h-32 object-cover rounded"
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
                                Create Gallery Item
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
                    title="Edit Gallery Item"
                >
                    <Form method="post" className="flex flex-col gap-4 p-4" encType="multipart/form-data">
                        <Input
                            label="Title"
                            name="title"
                            value={dataValue?.title || ""}
                            onChange={(e) => setDataValue({...dataValue, title: e.target.value})}
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
                            <Input
                                label="Type"
                                name="type"
                                value={dataValue?.type || ""}
                                onChange={(e) => setDataValue({...dataValue, type: e.target.value})}
                                placeholder=" "
                                type="text"
                                required
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-black/30 focus:bg-[#333]"
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="image" className="font-nunito text-sm ">Image</label>
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
                                        className="w-32 h-32 object-cover rounded"
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
                                Update Gallery Item
                            </button>
                        </div>
                    </Form>
                </Drawer>
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={isConfirmModalOpened}
                onOpenChange={handleConfirmModalClosed}
                header="Delete Gallery Item"
                content="Are you sure you want to delete this gallery item? This action cannot be undone."
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
    const type = url.searchParams.get("type") || "";

    const session = await getSession(request.headers.get("Cookie"));
    const email = session.get("email");

    if (!email) {
        return redirect("/admin");
    }

    return galleryController.getGalleryItems({
        request,
        page,
        search_term,
        type
    });
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const intent = formData.get("intent") as string;

    if (intent === "create") {
        const title = formData.get("title") as string;
        const type = formData.get("type") as string;
        const imageFile = formData.get("image") as File;
        
        // Convert image to base64
        const imageBuffer = await imageFile.arrayBuffer();
        const base64Image = `data:${imageFile.type};base64,${Buffer.from(imageBuffer).toString('base64')}`;

        return galleryController.galleryAdd({
            title,
            type,
            image: base64Image
        });
    } else if (intent === "update") {
        const id = formData.get("id") as string;
        const title = formData.get("title") as string;
        const type = formData.get("type") as string;
        
        let image = "";
        const imageFile = formData.get("image") as File;
        
        if (imageFile.size > 0) {
            // Convert new image to base64
            const imageBuffer = await imageFile.arrayBuffer();
            image = `data:${imageFile.type};base64,${Buffer.from(imageBuffer).toString('base64')}`;
        } else {
            // Get existing image
            const galleryItem = await galleryController.getGalleryItems({ request });
            const item = galleryItem.galleryItems.find((item: GalleryInterface) => item._id === id);
            image = item.image;
        }

        return galleryController.updateGallery({
            id,
            title,
            type,
            image
        });
    } else if (intent === "delete") {
        const id = formData.get("id") as string;
        return galleryController.galleryDelete(intent, id);
    }

    return json({ message: "Invalid intent", success: false }, { status: 400 });
};

export default Gallery;
