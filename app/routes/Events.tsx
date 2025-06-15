"use client"

import { json, LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react"
import RootLayout from "~/Layout/PublicLayout"
import Event from "~/model/events"

export default function EventsPage() {
    const { events } = useLoaderData<{ events: Event[] }>();
    return (
        <RootLayout>
            <main className="flex-1">
                <section className="bg-gray-50 py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center fade-in-up">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Events & Workshops</h1>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                Join us for our upcoming events and workshops to enhance your knowledge and skills.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {events.map((article, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.1 * index,
                                    }}
                                    className="fade-in-up delay-200 event-card border-b border-gray-300 bg-white rounded-lg pb-10 shadow-md last:border-0 hover:transform-3d"
                                >
                                    <Link to="/404">
                                        <div className="group">
                                            <div className="mb-4 h-[33vh] w-full rounded-lg bg-gray-200">
                                                <img className="rounded-tr-lg rounded-tl-lg h-[33vh] w-full" src={article.image} alt="" /></div>
                                            <div className="flex flex-col gap-2 px-2">
                                                <div className="flex justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-2 w-10 bg-pink-200 rounded-md">
                                                            <Calendar className="text-pink-500  h-6 w-6" />
                                                        </div>
                                                        <p className="text-gray-400"> {article.date}</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <p className="text-gray-400">{article.location}</p>
                                                    </div>
                                                </div>

                                                <p className="font-bold">{article.title}</p>
                                                <p className="mt-2">{article.description}</p>
                                               
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center">
                            <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                                Load more articles
                            </button>
                        </div>
                    </div>
                </section>

                <section className="py-10">
                    <div className="mx-auto flex flex-col justify-center items-center max-w-7xl px-4 sm:px-6 lg:px-8 w-full h-60 rounded-xl bg-white shadow-md gap-4">
                        <p className="font-bold text-2xl font-montserrat">Have an idea for an event?</p>
                        <p>We're always looking for new ideas and collaborations for events and workshops. Reach out to us with your suggestions!

                        </p>

                        <Link className="py-2 px-6 rounded-lg text-white bg-pink-500" to="/contact">
                            Contact Us
                        </Link>
                    </div>
                </section>
            </main>
        </RootLayout>
    )
}

export const loader: LoaderFunction = async () => {
    const events = await Event.find()
    return json({ events })
}

// [
//     {
//         image: "https://res.cloudinary.com/djlnjjzvt/image/upload/v1747005405/e3_ypmjut.jpg",
//         title: "Corporate Governance Workshop",
//         description: "A comprehensive workshop on corporate governance best practices under the new Companies Act of Ghana, tailored for executives and board members",
//         location: "Kempinski Hotel, Accra",
//         date: "June 15, 2025"

//     },
//     {
//         image: "https://img.freepik.com/premium-photo/woman-giving-presentation-her-colleagues-conference-room_693425-35463.jpg?ga=GA1.1.902371846.1746942933&semt=ais_hybrid&w=740",
//         title: "Corporate Governance Workshop",
//         description: "A comprehensive workshop on corporate governance best practices under the new Companies Act of Ghana, tailored for executives and board members.",
//         location: "Kempinski Hotel, Accra",
//         date: "July 10, 2025"

//     },
//     {
//         image: "https://img.freepik.com/premium-photo/young-african-american-businessman-giving-presentation-colleagues_605022-14327.jpg?ga=GA1.1.902371846.1746942933&semt=ais_hybrid&w=740",
//         title: "Entrepreneurship Training Series",
//         description: "A week-long training series focused on equipping entrepreneurs with essential skills in various areas including product development, marketing, and financial management.",
//         location: "CSTS Training Center, Madina, Accra",
//         date: "August 5-12, 2025"

//     },
//     {
//         image: "https://img.freepik.com/premium-photo/middle-aged-african-american-businesswoman-work-desk-modern-office_100800-29031.jpg?ga=GA1.1.902371846.1746942933&semt=ais_hybrid&w=740",
//         title: "Company Secretary Masterclass",
//         description: "An advanced training program for company secretaries covering the latest regulatory changes and best practices in corporate governance.",
//         location: "Movenpick Ambassador Hotel, Accra",
//         date: "September 20, 2025"

//     },
// ]
