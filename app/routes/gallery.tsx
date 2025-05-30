import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import RootLayout from "~/Layout/PublicLayout";
import { json, LoaderFunction } from "@remix-run/node";
import Gallery from "~/model/gallery";
import { useLoaderData } from "@remix-run/react";
import { GalleryInterface } from "~/components/interface";

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const { galleryImages } = useLoaderData<{ galleryImages: GalleryInterface[] }>();

    // const galleryImages = [
    //     {
    //         title: "Corporate Governance Summit",
    //         category: "Events",
    //         image: "https://res.cloudinary.com/djlnjjzvt/image/upload/v1746900373/b2_yzywg9.avif",
    //     },
    //     {
    //         title: "Financial Management Workshop",
    //         category: "Training",
    //         image: "https://res.cloudinary.com/djlnjjzvt/image/upload/v1746890121/WHO-WE-ARE_cnkjpy.avif",
    //     },
    //     {
    //         title: "Leadership Development Program",
    //         category: "Training",
    //         image: "https://via.placeholder.com/600x400?text=Leadership+Development+Program",
    //     },
    //     {
    //         title: "Annual Corporate Conference",
    //         category: "Events",
    //         image: "https://via.placeholder.com/600x400?text=Annual+Corporate+Conference",
    //     },
    //     {
    //         title: "Business Strategy Workshop",
    //         category: "Training",
    //         image: "https://via.placeholder.com/600x400?text=Business+Strategy+Workshop",
    //     },
    //     {
    //         title: "Compliance Roundtable",
    //         category: "Events",
    //         image: "https://via.placeholder.com/600x400?text=Compliance+Roundtable",
    //     },
    //     {
    //         title: "Team Building Retreat",
    //         category: "Corporate",
    //         image: "https://via.placeholder.com/600x400?text=Team+Building+Retreat",
    //     },
    //     {
    //         title: "Board Meeting",
    //         category: "Corporate",
    //         image: "https://via.placeholder.com/600x400?text=Board+Meeting",
    //     },
    //     {
    //         title: "Executive Training Session",
    //         category: "Training",
    //         image: "https://via.placeholder.com/600x400?text=Executive+Training+Session",
    //     },
    //     {
    //         title: "Networking Event",
    //         category: "Events",
    //         image: "https://via.placeholder.com/600x400?text=Networking+Event",
    //     },
    //     {
    //         title: "Office Headquarters",
    //         category: "Corporate",
    //         image: "https://via.placeholder.com/600x400?text=Office+Headquarters",
    //     },
    //     {
    //         title: "Client Consultation",
    //         category: "Services",
    //         image: "https://via.placeholder.com/600x400?text=Client+Consultation",
    //     },
    // ];

    // Filter images based on the selected category
    const filteredImages =
        selectedCategory === "All"
            ? galleryImages
            : galleryImages.filter((image) => image.category === selectedCategory);

    return (
        <RootLayout>
            <main className="flex-1">
                <div className="bg-gray-50 py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                                Gallery
                            </h1>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                Browse photos from our events, training programs, and corporate
                                activities
                            </p>
                        </motion.div>
                    </div>
                </div>

                <section className="py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="mb-8 flex flex-wrap items-center justify-center gap-4"
                        >
                            {["All", "Events", "Training", "Corporate", "Services"].map(
                                (category, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`rounded-full px-6 py-2 text-sm font-medium ${selectedCategory === category
                                            ? "bg-pink-500 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                )
                            )}
                        </motion.div>

                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                            {filteredImages.map((image, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.05 * index }}
                                    className="group cursor-pointer overflow-hidden rounded-lg border"
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <div className="relative h-64 w-full">
                                        <img
                                            src={image.image}
                                            alt={image.title}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4 bg-white">
                                        <p className="text-sm font-medium text-pink-500">
                                            {image.type}
                                        </p>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {image.title}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Lightbox */}
                {selectedImage !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm p-4">
                        <button
                            className="absolute right-4 top-4 rounded-full bg-white p-2 text-gray-900"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <div className="relative">
                            <img
                                src={galleryImages[selectedImage].image}
                                alt={galleryImages[selectedImage].title}
                                className="max-h-[90vh] rounded-xl"
                            />
                        </div>
                    </div>
                )}
            </main>
        </RootLayout>
    );
}

export const loader: LoaderFunction = async () => {
    const galleryImages = await Gallery.find()
    return json({ galleryImages })
}
