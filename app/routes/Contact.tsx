import type React from "react"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, Calendar, ArrowRight } from "lucide-react"
import { useState } from "react"
import RootLayout from "~/Layout/PublicLayout"
import { Link } from "@remix-run/react"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log(formData)
        alert("Thank you for your message. We will get back to you soon!")
        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        })
    }

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
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Contact Us</h1>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                Get in touch with our team for inquiries, consultations, or to learn more about our services.
                            </p>
                        </motion.div>
                    </div>
                </div>

                <section className="py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Send Us a Message</h2>
                                <p className="mt-4 text-lg text-gray-600">
                                    We'd love to hear from you. Please fill out the form below or contact us using the information provided.
                                </p>

                                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                                Subject
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="Corporate Governance">Corporate Governance</option>
                                                <option value="Financial Management">Financial Management</option>
                                                <option value="Business Administration">Business Administration</option>
                                                <option value="Training Programs">Training Programs</option>
                                                <option value="Directors' Bank">Directors' Bank</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            required
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center rounded-md bg-pink-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-600"
                                        >
                                            <Send className="mr-2 h-5 w-5" />
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="space-y-8"
                            >
                                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                                    <div className="mt-6 space-y-4">
                                        <div className="flex">
                                            <MapPin className="mr-4 h-6 w-6 flex-shrink-0 text-pink-500" />
                                            <div>
                                                <p className="text-gray-900 font-bold">Address</p>
                                                <p className="text-gray-600">15 Netflix Street UPSA Road, Madina, Accra</p>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <Mail className="mr-4 h-6 w-6 flex-shrink-0 text-pink-500" />
                                            <div>
                                                <p className="text-gray-900 font-bold">Email</p>
                                                <p className="text-gray-600">info@cstsghana.com</p>
                                                <p className="text-gray-600">ghanacsts@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <Phone className="mr-4 h-6 w-6 flex-shrink-0 text-pink-500" />
                                            <div>
                                                <p className="text-gray-900 font-bold">Phone</p>
                                                <p className="text-gray-600">0201108331 / 0270308880 / 0506326541</p>
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <Clock className="mr-4 h-6 w-6 flex-shrink-0 text-pink-500" />
                                            <div>
                                                <p className="text-gray-900 font-bold">Business Hours</p>
                                                <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                                                <p className="text-gray-600">Saturday & Sunday: Closed</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-white h-80  shadow-sm">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7940.728217336641!2d-0.165058!3d5.660366!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sgh!4v1746929755362!5m2!1sen!2sgh" width="600" height="450" className="border:0; h-80 w-full rounded-lg" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 flex gap-6"><Calendar className="text-pink-500" /> Schedule a Meeting</h3>
                                    <p className="mt-2 text-gray-600">
                                        You can schedule a meeting with our team directly using our calendar booking system.
                                    </p>
                                    <div className="mt-4 flex space-x-4">
                                        <Link
                                            to="https://calendly.com/cstsghana"
                                            className="inline-flex items-center rounded-md h-10 px-6 py-3 text-sm font-medium text-white transition-colors w-full justify-center  hover:transform-3d bg-pink-500"
                                        >
                                            Schedule metting via Calendly
                                            <ArrowRight className="ml-2 h-4 w-4" />

                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
        </RootLayout>
    )
}
