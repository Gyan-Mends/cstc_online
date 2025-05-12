"use client"

import { Link } from "@remix-run/react"
import { motion } from "framer-motion"
import { FileText, AlertTriangle, Info, Calendar } from "lucide-react"
import RootLayout from "~/Layout/PublicLayout"

export default function ComplianceNoticesPage() {
    return (
        <RootLayout>
            <main className="flex-1">
                <section className="bg-white py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-center"
                        >
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Compliance Notices</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                Stay updated with the latest regulatory requirements and compliance notices affecting businesses in Ghana.
                            </p>
                        </motion.div>

                        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                            {[
                                {
                                    title: "Annual Returns Filing Deadline Extension",
                                    description: "The Registrar of Companies has extended the deadline for filing Annual Returns by companies to July 31, 2025.",
                                    date: "May 1, 2025",
                                },
                                {
                                    title: "New Tax Compliance Requirements",
                                    description: "The Ghana Revenue Authority has announced new tax compliance requirements for all businesses operating in Ghana.",
                                    date: "April 15, 2025",
                                },
                                {
                                    title: "Updated Companies Act Regulations",
                                    description: "Important updates to the Companies Act regulations have been released, affecting corporate governance requirements.",
                                    date: "March 20, 2025",
                                },
                                {
                                    title: "Foreign Exchange Control Updates",
                                    description: "Bank of Ghana has issued new guidelines on foreign exchange controls that affect international businesses.",
                                    date: "February 10, 2025",
                                },
                            ].map((resource, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:transform-3d"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="mb-2 text-xl font-semibold text-gray-900">{resource.title}</h3>
                                        <p className="text-gray-500">{resource.date}</p>
                                    </div>
                                    <p className="text-gray-600">{resource.description}</p>
                                    <div className="mt-4">
                                        <Link
                                            to={`/resources/${resource.title.toLowerCase().replace(/\s+/g, "-")}`}
                                            className="text-sm font-medium text-pink-500 hover:text-pink-600 border border-black/20 py-2 px-4 rounded-lg hover:transform-3d"
                                        >
                                            Read Full Notice
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>


            </main>
        </RootLayout>
    )
}
