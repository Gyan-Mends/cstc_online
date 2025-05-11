"use client";

import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { Users, Search, Filter, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function DirectorsBankPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredDirectors, setFilteredDirectors] = useState([]);
    const [filterActive, setFilterActive] = useState(false);

    const directorsData = [
        {
            name: "Sarah Johnson",
            position: "Financial Expert",
            expertise: ["Financial Management", "Risk Assessment", "Corporate Governance"],
            experience: "15+ years in financial leadership roles",
            availability: "Available for 2 board positions",
            image: "https://res.cloudinary.com/djlnjjzvt/image/upload/v1746901244/b5_pv9wq0.avif",
        },
        {
            name: "Michael Chen",
            position: "Technology Executive",
            expertise: ["Digital Transformation", "IT Strategy", "Cybersecurity"],
            experience: "20+ years in technology leadership",
            availability: "Available for 1 board position",
            image: "https://res.cloudinary.com/djlnjjzvt/image/upload/v1746901244/b5_pv9wq0.avif",
        },
        {
            name: "Michael Chen",
            position: "Technology Executive",
            expertise: ["Digital Transformation", "IT Strategy", "Cybersecurity"],
            experience: "20+ years in technology leadership",
            availability: "Available for 1 board position",
            image: "https://res.cloudinary.com/djlnjjzvt/image/upload/v1746901244/b5_pv9wq0.avif",
        },
    ];

    const handleSearch = () => {
        const results = directorsData.filter((director) =>
            director.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            director.expertise.some((skill) =>
                skill.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setFilteredDirectors(results);
    };

    const toggleFilter = () => {
        setFilterActive(!filterActive);
    };

    const handleContact = (directorName) => {
        alert(`Contacting ${directorName}`);
    };

    const directorsToDisplay = searchQuery || filterActive ? filteredDirectors : directorsData;

    return (
        <main className="flex-1">
            <div className="bg-gray-50 py-12 md:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Directors' Bank</h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                            Access our network of qualified professionals ready to serve as directors for your organization
                        </p>
                    </motion.div>
                </div>
            </div>

            <section className="py-12 md:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Find the Right Director</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Numerous clients seek the services of persons with the requisite expertise to serve as Directors of their organization especially foreign individuals and entities that intend to incorporate their companies in Ghana.
                        </p>
                    </motion.div>

                    <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by name, expertise, or industry"
                                        className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-gray-900 placeholder:text-gray-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={toggleFilter}
                                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 md:w-auto"
                                >
                                    <Filter className="mr-2 h-4 w-4" />
                                    {filterActive ? "Reset Filters" : "Filters"}
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={handleSearch}
                                    className="flex w-full items-center justify-center rounded-md bg-pink-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-600 md:w-auto"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-6 lg:grid lg:grid-cols-3 gap-10">
                        {directorsToDisplay.map((director, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className="rounded-lg border border-gray-200 bg-white shadow-sm"
                            >
                                <img src={director.image} alt={director.name} className="rounded-tr-lg rounded-tl-lg w-full" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900">{director.name}</h3>
                                    <p className="text-sm font-medium text-pink-500">{director.position}</p>
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-700">Areas of Expertise:</h4>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {director.expertise.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="mt-4 text-gray-600">{director.experience}</p>
                                    <div className="mt-6 flex items-center justify-between">
                                        <Link
                                            to={`/directors-bank/${index + 1}`}
                                            className="text-sm font-medium text-pink-500 hover:text-pink-600"
                                        >
                                            View full profile
                                        </Link>
                                        <button
                                            onClick={() => handleContact(director.name)}
                                            className="rounded-md bg-pink-500 px-4 py-2 text-sm font-medium text-white hover:bg-pink-600"
                                        >
                                            Contact
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>


                    <p className="mt-10">
                        To easily assist promoters of companies as well as shareholders of these companies, CSTS is conducting a project which intends to put out persons who may be interested in serving as Directors of organizations.


                    </p>
                    <p className="mt-10">  All information received would only be shared with interested clients and treated in the strictest of confidence. The nature of engagement will strictly be between the Company and the would-be Director.</p>
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
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Why Choose Our Directors' Bank?</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                            Our rigorous selection process ensures you find the right fit for your board
                        </p>
                    </motion.div>

                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "Vetted Professionals",
                                description:
                                    "All directors in our bank undergo a thorough vetting process to ensure they meet our high standards.",
                            },
                            {
                                title: "Diverse Expertise",
                                description:
                                    "Our directors bring diverse skills and experiences across various industries and functional areas.",
                            },
                            {
                                title: "Board-Ready",
                                description:
                                    "Our directors are trained in corporate governance and ready to contribute effectively to your board.",
                            },
                            {
                                title: "Tailored Matching",
                                description: "We help match directors with organizations based on specific needs and requirements.",
                            },
                            {
                                title: "Ongoing Support",
                                description:
                                    "We provide ongoing support to both directors and organizations to ensure successful board relationships.",
                            },
                            {
                                title: "Confidentiality",
                                description: "We maintain strict confidentiality throughout the director search and selection process.",
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                            >
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-50">
                                    <CheckCircle className="h-6 w-6 text-pink-500" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
