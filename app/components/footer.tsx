import { Link } from "@remix-run/react"
import { Twitter, Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">About Us</h3>
                        <p className="mt-4 text-sm text-gray-600">
                            CSTS is an organization set up to strengthen the capacity of companies and entrepreneurs in core areas
                            such as corporate governance, financial management, public and business administration.
                        </p>
                        <div className="mt-4">
                            <Link to="/" className="flex items-center">
                                <div className="mr-2 h-8 w-8 rounded bg-pink-500 p-1.5">
                                    <div className="h-full w-full text-white">CS</div>
                                </div>
                                <div className="text-sm font-bold uppercase tracking-wider text-gray-900">
                                    <span className="text-pink-500">CORPORATE</span> SECRETARIAL
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            {[
                                { name: "Home", path: "/" },
                                { name: "Who We Are", path: "/who-we-are" },
                                { name: "Compliance Notices", path: "/compliance-notices" },
                                { name: "Events", path: "/events" },
                                { name: "Trainings", path: "/trainings" },
                                { name: "Corporate Services", path: "/corporate-services" },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-base text-gray-500 hover:text-gray-900">
                                        {item.name}
                                    </Link>
                                </li>
                          ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Contact Us</h3>
                        <ul className="mt-4 space-y-2">
                            <li className="flex items-start">
                                <MapPin className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                                <span className="text-base text-gray-500">15 Netflix Street UPS4 Road, Madina, Accra</span>
                            </li>
                            <li className="flex items-start">
                                <Phone className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                                <span className="text-base text-gray-500">(0201)58331 / 0270358880 / 0505326541</span>
                            </li>
                            <li className="flex items-start">
                                <Mail className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                                <span className="text-base text-gray-500">
                                    info@cstghana.com
                                    <br />
                                    ghanacsts@gmail.com
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-gray-400">Postal:</span>
                                <span className="text-base text-gray-500">P.O. Box 3478, Osu - Accra</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Connect With Us</h3>
                        <div className="mt-4 flex space-x-4">
                            <a
                                href="https://twitter.com/CSTSGHANA"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-pink-500 hover:text-white"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/cstsghana/"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-pink-500 hover:text-white"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.facebook.com/CorporateSecretarialandTrainingServices/"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-pink-500 hover:text-white"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/csts-ghana/"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-pink-500 hover:text-white"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                        <div className="mt-8">
                            <form>
                                <h4 className="text-sm font-medium text-gray-700">Subscribe to our newsletter</h4>
                                <div className="mt-2 flex">
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className="w-full rounded-l-md border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                                    />
                                    <button type="submit" className="rounded-r-md bg-pink-500 px-4 py-2 text-white hover:bg-pink-600">
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-center text-base text-gray-400">
                        &copy; {new Date().getFullYear()} Corporate Secretarial and Training Services Limited. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
