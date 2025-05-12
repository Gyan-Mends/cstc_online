"use client"

import { Link } from "@remix-run/react"
import { motion } from "framer-motion"
import { BookOpen, Calendar, Clock, Users, Award, CheckCircle, User } from "lucide-react"
import RootLayout from "~/Layout/PublicLayout"

export default function TrainingsPage() {
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
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Training Programs</h1>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                Enhance your skills and knowledge with our specialized training programs
                            </p>
                        </motion.div>
                    </div>
                </div>

                <section className="py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Upcoming Training Programs</h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Register for our upcoming training programs to develop your skills and advance your career
                            </p>
                        </motion.div>

                        <div className="mt-8 space-y-8 lg:grid">
                            {[
                                {
                                    client: "Fan milk Limited",
                                    title: "Development Enhancement Exit Programme (DEEP)",
                                    date: "June 15-16, 2025",
                                    duration: "2 days (16 hours)",
                                    format: "In-person",
                                    description:
                                        "A comprehensive program designed to enhance employee development and prepare them for career transitions.",
                                    highlights: [
                                        "Board effectiveness and accountability",
                                        "Risk management and internal controls",
                                        "Stakeholder engagement",
                                        "Ethical leadership",
                                    ],
                                },
                                {
                                    client: "Various Corporate Client",
                                    title: "Managing Boardroom Dynamics under The New Companies Act of Ghana",
                                    date: "July 10-12, 2025",
                                    duration: "3 days (24 hours)",
                                    format: "In-person",
                                    description:
                                        "Training focused on effective boardroom management in compliance with the new Companies Act of Ghana.",
                                    highlights: [
                                        "Understanding financial statements",
                                        "Budgeting and forecasting",
                                        "Financial decision-making",
                                        "Performance measurement",
                                    ],
                                },
                                {
                                    title: "Company Secretary Training",
                                    client: " Various Corporate Clients",
                                    date: "August 5-7, 2025",
                                    duration: "3 days (24 hours)",
                                    format: "In-person",
                                    description:
                                        "Specialized training for company secretaries covering legal and regulatory requirements and best practices.",
                                    highlights: [
                                        "Strategic thinking and planning",
                                        "Team building and motivation",
                                        "Effective communication",
                                        "Change management",
                                    ],
                                },
                                {
                                    client: "Corporate Clients",
                                    title: "Tax Administration",
                                    date: "September 20-24, 2025",
                                    duration: "5 days (40 hours)",
                                    format: "Hybrid (In-person & Virtual)",
                                    description: "Training on tax compliance, administration, and optimization strategies for businesses.",
                                    highlights: [
                                        "Regulatory frameworks and requirements",
                                        "Compliance risk assessment",
                                        "Developing compliance programs",
                                        "Monitoring and reporting",
                                    ],
                                },

                            ].map((program, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        <div className="flex w-full items-center justify-center bg-pink-50 p-6 md:w-1/4">
                                            <div className="text-center">
                                                <BookOpen className="mx-auto h-10 w-10 text-pink-500" />
                                                <p className="mt-2 text-lg font-semibold text-gray-900">{program.title}</p>
                                            </div>
                                        </div>
                                        <div className="p-6 md:w-3/4">
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                                                <div>
                                                    <div className="flex items-center">
                                                        <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                                                        <span className="text-sm font-medium text-gray-700">Date</span>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-600">{program.date}</p>
                                                </div>
                                                <div>
                                                    <div className="flex items-center">
                                                        <Clock className="mr-2 h-4 w-4 text-gray-500" />
                                                        <span className="text-sm font-medium text-gray-700">Duration</span>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-600">{program.duration}</p>
                                                </div>
                                                <div>
                                                    <div className="flex items-center">
                                                        <Users className="mr-2 h-4 w-4 text-gray-500" />
                                                        <span className="text-sm font-medium text-gray-700">Format</span>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-600">{program.format}</p>
                                                </div>
                                                <div>
                                                    <div className="flex items-center">
                                                        <User className="mr-2 h-4 w-4 text-gray-500" />
                                                        <span className="text-sm font-medium text-gray-700">Client: </span>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-600">{program.client}</p>
                                                </div>
                                            </div>
                                            <p className="mt-4 text-gray-600">{program.description}</p>
                                            <div className="mt-4">
                                                <h4 className="text-sm font-medium text-gray-700">Program Highlights:</h4>
                                                <ul className="mt-2 space-y-1">
                                                    {program.highlights.map((highlight, i) => (
                                                        <li key={i} className="flex items-start">
                                                            <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-pink-500" />
                                                            <span className="text-sm text-gray-600">{highlight}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="mt-6 flex items-center justify-between">
                                                <Link
                                                    to={`/trainings/${index + 1}`}
                                                    className="text-sm font-medium text-pink-500 hover:text-pink-600"
                                                >
                                                    View details
                                                </Link>
                                                <Link
                                                    to={`/trainings/${index + 1}/register`}
                                                    className="rounded-md bg-pink-500 px-4 py-2 text-sm font-medium text-white hover:bg-pink-600"
                                                >
                                                    Register
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-center"
                        >
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Training Approach</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                Our training programs are designed to deliver practical knowledge and skills that can be immediately
                                applied in the workplace
                            </p>
                        </motion.div>

                        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    icon: <Users className="h-8 w-8 text-pink-500" />,
                                    title: "Expert Instructors",
                                    description: "Learn from industry experts with extensive practical experience.",
                                },
                                {
                                    icon: <CheckCircle className="h-8 w-8 text-pink-500" />,
                                    title: "Practical Focus",
                                    description: "Our programs emphasize practical skills that can be immediately applied.",
                                },
                                {
                                    icon: <Award className="h-8 w-8 text-pink-500" />,
                                    title: "Recognized Certifications",
                                    description: "Earn industry-recognized certifications to advance your career.",
                                },
                                {
                                    icon: <BookOpen className="h-8 w-8 text-pink-500" />,
                                    title: "Comprehensive Materials",
                                    description: "Receive detailed course materials and resources for continued learning.",
                                },
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm"
                                >
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
                                        {feature.icon}
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-4 items-center justify-center py-20">
                    <p className="font-bold">
                        Need Custom Training?
                    </p>
                    <div className="text-center">
                        <p>
                            We offer customized training programs tailored to the specific needs of your
                        </p>
                        <p>
                            organization or personal development goals.
                        </p>
                    </div>

                    <Link
                        to="contact"
                        className="rounded-md bg-pink-500 px-4 py-2 text-sm font-medium text-white hover:bg-pink-600"
                    >
                        Request Customed Training
                    </Link>
                </section>
            </main>
        </RootLayout>
    )
}
