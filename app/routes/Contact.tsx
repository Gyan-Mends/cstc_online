import type React from "react"

import { MapPin, Phone, Mail, Clock, Send, Calendar, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import RootLayout from "~/Layout/PublicLayout"
import { Form, json, Link, useActionData } from "@remix-run/react"
import CustomInput from "~/components/CustomInput"
import { Input, Textarea } from "@heroui/react"
import { ActionFunction } from "@remix-run/node"
import Contact from "~/model/contact"
import { errorToast, successToast } from "~/components/toast"
import { Toaster } from "react-hot-toast"
import { ContactResponse } from "~/components/interface"

export default function ContactPage() {
    const actionData = useActionData<ContactResponse>()

    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                successToast(actionData.message)
            } else {
                errorToast(actionData.message)
            }
        }
    }, [actionData])

    return (
        <RootLayout>
            <main className="flex-1">
                <Toaster position="top-right"  />
                <div className="bg-gray-50 py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center fade-in-up delay-500">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Contact Us</h1>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                Get in touch with our team for inquiries, consultations, or to learn more about our services.
                            </p>
                        </div>
                    </div>
                </div>

                <section className="py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2">
                            <div className="fade-in-up delay-700">
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Send Us a Message</h2>
                                <p className="mt-4 text-lg text-gray-600">
                                    We'd love to hear from you. Please fill out the form below or contact us using the information provided.
                                </p>

                                <Form method="post" className="mt-8 flex flex-col gap-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div>
                                            <Input
                                                label="Full Name"
                                                name="fullname"
                                                placeholder=" "
                                                isClearable
                                                type="text"
                                                labelPlacement="outside"
                                                classNames={{
                                                    inputWrapper: "bg-white border border-gray-200 h-12"
                                                }}

                                            />
                                        </div>
                                        <div>
                                            <Input
                                                label="Email"
                                                name="email"
                                                placeholder=" "
                                                isClearable
                                                type="email"
                                                labelPlacement="outside"
                                                classNames={{
                                                    inputWrapper: "bg-white border border-gray-200 h-12"
                                                }}

                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Input
                                            label="Phone Number"
                                            name="phone"
                                            placeholder=" "
                                            isClearable
                                            type="tel"
                                            className="mt-6"
                                            labelPlacement="outside"
                                            classNames={{
                                                inputWrapper: "bg-white border border-gray-200 h-12"
                                            }}

                                        />
                                    </div>

                                    <div>
                                        <Textarea
                                            autoFocus
                                            label="Message"
                                            labelPlacement="outside"
                                            placeholder=" "
                                            name="message"
                                            className="mt-4 font-nunito text-sm"
                                            classNames={{
                                                label: "font-nunito text-sm text-default-100",
                                                inputWrapper: "bg-white border border-gray-200 !h-60"
                                            }}
                                        />
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
                                    <input type="text" name="intent" value="create" hidden />
                                </Form>
                            </div>

                            <div className="space-y-8 fade-in-up delay-900">
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
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7940.728217336641!2d-0.165058!3d5.660366!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sgh!4v1746929755362!5m2!1sen!2sgh" width="600" height="450" className="border:0; h-80 w-full rounded-lg" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </RootLayout>
    )
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData()
    const intent = formData.get("intent")

    if (intent === "create") {
        const fullname = formData.get("fullname") as string
        const email = formData.get("email") as string
        const phone = formData.get("phone") as string
        const message = formData.get("message") as string

        console.log("Form data received:", { fullname, email, phone, message });

        if (!fullname || !email || !phone || !message) {
            console.log("Validation failed - missing fields");
            return json({ success: false, message: "All fields are required" })
        }

        try {
            console.log("Attempting to create contact...");
            const newContact = await Contact.create({
                fullname,
                email,
                phone,
                message,
            });

            console.log("Contact created successfully:", newContact);
            return json({ success: true, message: "Your message has been sent successfully!" })
        } catch (error: any) {
            console.error("Error creating contact:", error)
            console.error("Error details:", {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
            return json({ success: false, message: `Failed to send message: ${error.message}` })
        }
    }

    return json({ success: false, message: "Invalid action" })
}

