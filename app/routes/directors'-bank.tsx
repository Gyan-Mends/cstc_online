"use client"

import { useState, useEffect } from "react"
import { Users, Search, Filter, CheckCircle } from "lucide-react"
import ScrollAnimation from "~/components/animation"
import { Link } from "@remix-run/react"
import RootLayout from "~/Layout/PublicLayout"

export default function DirectorsBankPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredDirectors, setFilteredDirectors] = useState<Director[]>([])
    const [filterActive, setFilterActive] = useState(false)
    const [expertiseFilter, setExpertiseFilter] = useState<string[]>([])
    const [showFilters, setShowFilters] = useState(false)

    // Define director data with types
    interface Director {
        name: string
        position: string
        expertise: string[]
        experience: string
        availability: string
        image?: string
    }

    const directors: Director[] = [
        {
            name: "Dr. Elizabeth Mensah",
            position: "Corporate Governance Expert",
            expertise: ["Financial Governance", "Compliance", "Risk Management"],
            experience: "15+ years in corporate governance and financial management",
            availability: "Available for 2 board positions",
            image: "https://res.cloudinary.com/djlnjjzvt/image/upload/v1746966223/bd3_tf4pxr.avif",
        },
        {
            name: "Samuel Osei",
            position: "Legal Consultant",
            expertise: ["Business Law", "Corporate Strategy", "Regulatory Affairs"],
            experience: "20+ years in corporate legal practice",
            availability: "Available for 1 board position",
            image: "https://res.cloudinary.com/djlnjjzvt/image/upload/v1746966224/bd4_iigv3b.avif",
        },
        {
            name: "Grace Afolabi",
            position: "Corporate Secretary",
            expertise: ["Regulatory Affairs", "Board Management", "Governance"],
            experience: "18+ years in corporate secretarial roles",
            availability: "Available for 2 board positions",
            image: "https://res.cloudinary.com/djlnjjzvt/image/upload/v1746966224/bd5_dfyknh.avif",
        },
    ]

    // Get all unique expertise areas for filtering
    const allExpertiseAreas = Array.from(new Set(directors.flatMap((director) => director.expertise))).sort()

    // Handle search and filtering
    const handleSearch = () => {
        let results = [...directors]

        // Filter by search query
        if (searchQuery) {
            results = results.filter(
                (director) =>
                    director.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    director.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    director.expertise.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
            )
        }

        // Filter by expertise if any are selected
        if (expertiseFilter.length > 0) {
            results = results.filter((director) => director.expertise.some((skill) => expertiseFilter.includes(skill)))
        }

        setFilteredDirectors(results)
        setFilterActive(true)
    }

    // Reset filters
    const resetFilters = () => {
        setSearchQuery("")
        setExpertiseFilter([])
        setFilterActive(false)
        setShowFilters(false)
    }

    // Toggle expertise filter
    const toggleExpertiseFilter = (expertise: string) => {
        setExpertiseFilter((prev) =>
            prev.includes(expertise) ? prev.filter((item) => item !== expertise) : [...prev, expertise],
        )
    }

    // Update results when filters change
    useEffect(() => {
        if (searchQuery || expertiseFilter.length > 0) {
            handleSearch()
        }
    }, [searchQuery, expertiseFilter])

    // Directors to display based on filter state
    const directorsToDisplay = filterActive ? filteredDirectors : directors

    return (
        <RootLayout>
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-gray-50 py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ScrollAnimation>
                            <div className="text-center">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                                    Directors' Bank
                                </h1>
                                <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
                                    Expert directors available to strengthen your organization's governance and strategic direction.
                                </p>
                            </div>
                        </ScrollAnimation>
                    </div>
                </section>

                {/* Search Section */}
                <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ScrollAnimation>
                            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Find the Right Director</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Numerous clients seek the services of persons with the requisite expertise to serve as Directors of their organization especially foreign individuals and entities that intend to incorporate their companies in Ghana.
                        </p>
                        </ScrollAnimation>

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
                                        onClick={() => setShowFilters(!showFilters)}
                                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 md:w-auto"
                                >
                                    <Filter className="mr-2 h-4 w-4" />
                                        {showFilters ? "Hide Filters" : "Show Filters"}
                                </button>
                            </div>
                            <div>
                                    {filterActive ? (
                                        <button
                                            onClick={resetFilters}
                                            className="flex w-full items-center justify-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-300 md:w-auto"
                                        >
                                            Reset
                                        </button>
                                    ) : (
                                            <button
                                                onClick={handleSearch}
                                                className="flex w-full items-center justify-center rounded-md bg-pink-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-600 md:w-auto"
                                            >
                                                Search
                                            </button>
                                    )}
                                </div>
                            </div>

                            {/* Expertise filters */}
                            {showFilters && (
                                <div className="mt-6 border-t border-gray-200 pt-6">
                                    <h3 className="mb-4 text-sm font-medium text-gray-700">Filter by expertise:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {allExpertiseAreas.map((expertise) => (
                                            <button
                                                key={expertise}
                                                onClick={() => toggleExpertiseFilter(expertise)}
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${expertiseFilter.includes(expertise)
                                                    ? "bg-pink-100 text-pink-800"
                                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {expertise}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                    </div>

                        {/* Search results info */}
                        {filterActive && (
                            <div className="mt-4 text-sm text-gray-600">
                                Found {filteredDirectors.length} director{filteredDirectors.length !== 1 ? "s" : ""} matching your
                                criteria
                            </div>
                        )}

                        {/* Director Profiles */}
                        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {directorsToDisplay.map((director, index) => (
                            <ScrollAnimation key={index} delay={0.1 * index}>
                                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
                                    <div className="relative w-full">
                                        {director.image ? (
                                            <img
                                                src={director.image || "/placeholder.svg"}
                                                alt={director.name}

                                                className="object-cover h-[50vh] w-full"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-gray-200">
                                                <Users className="h-16 w-16 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
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
                                    </div>
                                </div>
                            </ScrollAnimation>
                        ))}
                        </div>

                        {filterActive && filteredDirectors.length === 0 && (
                            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-8 text-center">
                                <h3 className="text-lg font-medium text-gray-900">No directors found</h3>
                                <p className="mt-2 text-gray-600">Try adjusting your search criteria or filters</p>
                                <button
                                    onClick={resetFilters}
                                    className="mt-4 inline-flex items-center rounded-md bg-pink-500 px-4 py-2 text-sm font-medium text-white hover:bg-pink-600"
                                >
                                    Reset filters
                                </button>
                            </div>
                        )}

                        <ScrollAnimation direction="up" delay={0.3} className="mt-12">
                            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                                <p className="text-gray-600">
                                    To easily assist promoters of companies as well as shareholders of these companies, CSTS is conducting a
                                    project which intends to put out persons who may be interested in serving as Directors of organizations.
                                </p>
                                <p className="mt-4 text-gray-600">
                                    All information received would only be shared with interested clients and treated in the strictest of
                                    confidence. The nature of engagement will strictly be between the Company and the would-be Director.
                                </p>
                            </div>
                        </ScrollAnimation>
                    </div>
                </section>

                {/* Director Registration Form Section */}
                <section className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 md:grid-cols-2 md:items-center">
                            <ScrollAnimation direction="right">
                                <div className="relative h-[300px] overflow-hidden rounded-lg sm:h-[400px]">
                                    <img
                                        src="https://res.cloudinary.com/djlnjjzvt/image/upload/v1746965892/db_m5irsq.avif"
                                        alt="Director registration"

                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            </ScrollAnimation>

                            <ScrollAnimation direction="left" delay={0.2}>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Director Registration Form</h2>
                                    <p className="mt-4 text-lg text-gray-600">
                                        Please complete the form below if you are interested in being registered in our Directors' Bank.
                                    </p>
                                    <div className="mt-8">
                                        <Link
                                            to="#registration-form"
                                            className="inline-flex items-center rounded-md bg-pink-500 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-pink-600"
                                        >
                                            Complete Registration Form
                                        </Link>
                                    </div>
                                </div>
                            </ScrollAnimation>
                        </div>
                </div>
                </section>

                {/* Benefits Section */}
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ScrollAnimation>
                            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Benefits of Using Our Directors' Bank</h2>
                        </ScrollAnimation>

                        <div className="mt-12 grid gap-6 md:grid-cols-2">
                            {[
                                "Access to qualified professionals with expertise in various industries",
                                "Simplified process for foreign companies seeking local directors",
                                "Confidential matching of companies with suitable director candidates",
                                "Support throughout the engagement process",
                            ].map((benefit, index) => (
                                <ScrollAnimation key={index} direction="up" delay={0.1 * index}>
                                    <div className="flex items-start">
                                        <CheckCircle className="mr-3 mt-1 h-5 w-5 text-pink-500" />
                                        <p className="text-lg text-gray-700">{benefit}</p>
                                    </div>
                                </ScrollAnimation>
                            ))}
                        </div>
                    </div>
            </section>

                {/* Board Meeting Image Section */}
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ScrollAnimation>
                            <div className="relative h-[600px] overflow-hidden rounded-lg">
                                <img
                                    src="https://res.cloudinary.com/djlnjjzvt/image/upload/v1746966023/bd2_rbhln4.avif"
                                    alt="Board meeting with laptops"

                                    className="object-cover w-full rounded-lg"
                                />
                            </div>
                        </ScrollAnimation>
                    </div>
                </section>

                {/* Need Directors Section */}
                <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ScrollAnimation>
                            <div className="rounded-lg bg-white p-8 shadow-sm md:p-12">
                                <div className="md:flex md:items-center md:justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Need Directors for Your Company?</h2>
                                        <p className="mt-4 max-w-3xl text-lg text-gray-600">
                                            If you are a company looking for qualified directors, please contact us to discuss your
                                            requirements.
                                        </p>
                                    </div>
                                    <div className="mt-8 md:mt-0">
                                        <Link
                                            to="/contact"
                                            className="inline-flex items-center rounded-md bg-pink-500 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-pink-600"
                                        >
                                            Contact Us
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>
                </section>

                {/* Why Choose Our Directors' Bank Section */}
                <section className="bg-white py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ScrollAnimation>
                            <div className="text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Why Choose Our Directors' Bank?</h2>
                                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                    Our rigorous selection process ensures you find the right fit for your board
                                </p>
                            </div>
                        </ScrollAnimation>

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
                            <ScrollAnimation key={index} delay={0.1 * index}>
                                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-50">
                                        <CheckCircle className="h-6 w-6 text-pink-500" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </ScrollAnimation>
                        ))}
                    </div>
                </div>
            </section>
        </main>
        </RootLayout>
    )
}
