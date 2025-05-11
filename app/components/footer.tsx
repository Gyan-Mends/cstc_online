import { Link } from "@remix-run/react";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">About Us</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link to="/who-we-are" className="text-base text-gray-500 hover:text-gray-900">
                                    Who We Are
                                </Link>
                            </li>
                            <li>
                                <Link to="/team" className="text-base text-gray-500 hover:text-gray-900">
                                    Our Team
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className="text-base text-gray-500 hover:text-gray-900">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Services</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link to="/trainings" className="text-base text-gray-500 hover:text-gray-900">
                                    Training
                                </Link>
                            </li>
                            <li>
                                <Link to="/corporate-services" className="text-base text-gray-500 hover:text-gray-900">
                                    Corporate Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/compliance-notices" className="text-base text-gray-500 hover:text-gray-900">
                                    Compliance
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Resources</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link to="/blog" className="text-base text-gray-500 hover:text-gray-900">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link to="/events" className="text-base text-gray-500 hover:text-gray-900">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link to="/gallery" className="text-base text-gray-500 hover:text-gray-900">
                                    Gallery
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Contact</h3>
                        <ul className="mt-4 space-y-2">
                            <li className="text-base text-gray-500">123 Business Avenue, Suite 100</li>
                            <li className="text-base text-gray-500">Corporate City, CO 12345</li>
                            <li className="text-base text-gray-500">info@corporatesecretarial.com</li>
                            <li className="text-base text-gray-500">+1 (555) 123-4567</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-center text-base text-gray-400">
                        &copy; {new Date().getFullYear()} Corporate Secretarial. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
