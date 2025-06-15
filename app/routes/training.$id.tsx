"use client"

import { LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData, useNavigate } from "@remix-run/react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Users, User, CheckCircle, BookOpen, Award } from "lucide-react"
import { TrainingInterface } from "~/components/interface"
import trainingController from "~/controllers/training"
import RootLayout from "~/Layout/PublicLayout"

export default function TrainingDetailPage() {
    const { training } = useLoaderData<{ training: TrainingInterface }>()
    const navigate = useNavigate()
    const highlights = [
        "Expert instructors with industry experience",
        "Hands-on practical training approach", 
        "Industry-recognized certification",
        "Comprehensive training materials",
        "Post-training support and resources",
        "Flexible scheduling options"
    ]

    return (
        <RootLayout>
            <main className="flex-1">
                <div className="bg-gray-50 py-4">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-6">
                            <Link 
                                to={`/trainings/${training.trainingTypeId}`}
                                className="inline-flex items-center text-pink-500 hover:text-pink-600 font-medium"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Training Category
                            </Link>
                        </div>
                        
                      
                    </div>
                </div>

                <section className="py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Training Overview</h2>
                                    <div className="prose prose-lg max-w-none">
                                        <p className="text-gray-600 leading-relaxed mb-6">
                                            {training.description}
                                        </p>
                                        
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">What You'll Learn</h3>
                                        <ul className="space-y-3 mb-8">
                                            {highlights.map((highlight, index) => (
                                                <li key={index} className="flex items-start">
                                                    <CheckCircle className="mr-3 h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-600">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="lg:col-span-1">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-8"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Details</h3>
                                    
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center">
                                            <Calendar className="mr-3 h-5 w-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Date</p>
                                                <p className="text-sm text-gray-600">{training.date}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <Clock className="mr-3 h-5 w-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Duration</p>
                                                <p className="text-sm text-gray-600">{training.duration}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <Users className="mr-3 h-5 w-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Format</p>
                                                <p className="text-sm text-gray-600">{training.format}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <User className="mr-3 h-5 w-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Client</p>
                                                <p className="text-sm text-gray-600">{training.client}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t pt-6">
                                      
                                        <button onClick={() => navigate("/contact")} className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                                            Contact Us
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </RootLayout>
    )
}

export const loader: LoaderFunction = async ({ params }) => {
    const { id } = params;
    
    if (!id) {
        throw new Response("Training not found", { status: 404 });
    }

    const result = await trainingController.GetTrainingById(id);
    
    if (!result.success || !result.training) {
        throw new Response("Training not found", { status: 404 });
    }

    return {
        training: result.training,
    };
} 