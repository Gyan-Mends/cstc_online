
import { useState } from "react"
import { motion } from "framer-motion"
import { Code2, X, Menu } from "lucide-react"
import { Link, useParams } from "@remix-run/react"

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = useParams()

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Who We Are", path: "/who-we-are" },
        { name: "Compliance Notices", path: "/compliance-notices" },
        { name: "Events", path: "/events" },
        { name: "Trainings", path: "/trainings" },
        { name: "Corporate Services", path: "/corporate-services" },
        { name: "Gallery", path: "/gallery" },
        { name: "Directors' Bank", path: "/directors'-bank" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" },
    ]

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <Link to="/" className="flex items-center">
                        <div className="mr-2 h-8 w-8 rounded bg-pink-500 p-1.5">
                            <Code2 className="h-full w-full text-white" />
                        </div>
                        <div className="text-sm font-bold uppercase tracking-wider text-gray-900">
                            <span className="text-pink-500">CORPORATE</span> SECRETARIAL
                        </div>
                    </Link>
                </motion.div>

                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="hidden space-x-6 md:flex"
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`text-sm font-medium transition-colors hover:text-pink-500 ${pathname === item.path ? "text-pink-500" : "text-gray-700"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </motion.nav>

                <div className="md:hidden">
                    <button className="text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden"
                >
                    <div className="space-y-1 px-4 pb-4 pt-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === item.path
                                        ? "bg-pink-50 text-pink-500"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-pink-500"
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </header>
    )
}
