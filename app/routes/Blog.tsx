"use client";

import { Link } from "@remix-run/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import RootLayout from "~/Layout/PublicLayout";

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const articles = [
        {
            title: "The Importance of Strong Corporate Governance in Today's Business Environment",
            excerpt:
                "Explore why effective corporate governance is essential for sustainable business growth and how it can help organizations navigate complex challenges.",
            date: "May 10, 2025",
            author: "John Smith",
            category: "Corporate Governance",
            readTime: "5 min read",
        },
        {
            title: "Financial Management Strategies for Small and Medium Enterprises",
            excerpt:
                "Learn practical financial management strategies that small and medium enterprises can implement to optimize their financial performance and drive growth.",
            date: "April 28, 2025",
            author: "Sarah Johnson",
            category: "Financial Management",
            readTime: "7 min read",
        },
        {
            title: "Navigating Regulatory Compliance: A Guide for Business Leaders",
            excerpt:
                "A comprehensive guide to help business leaders understand and navigate the complex landscape of regulatory compliance in various industries.",
            date: "April 15, 2025",
            author: "Michael Chen",
            category: "Compliance",
            readTime: "6 min read",
        },
        {
            title: "Building an Effective Board of Directors: Best Practices",
            excerpt:
                "Discover the best practices for building and maintaining an effective board of directors that can provide strategic guidance and oversight.",
            date: "March 30, 2025",
            author: "Emily Rodriguez",
            category: "Corporate Governance",
            readTime: "8 min read",
        },
        {
            title: "Digital Transformation in Business Administration",
            excerpt:
                "Explore how digital transformation is revolutionizing business administration and how organizations can leverage technology to improve efficiency.",
            date: "March 15, 2025",
            author: "David Thompson",
            category: "Business Administration",
            readTime: "6 min read",
        },
    ];

    const filteredArticles = articles.filter(
        (article) =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                                Blog
                            </h1>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                Insights, news, and resources on corporate governance,
                                financial management, and business administration
                            </p>
                        </motion.div>
                    </div>
                </div>

                <section className="py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7 }}
                                >
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                        Latest Articles
                                    </h2>
                                </motion.div>

                                <div className=" lg:grid lg:grid-cols-2 gap-10">
                                    {filteredArticles.map((article, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.1 * index,
                                            }}
                                            className="border-b border-gray-300 pb-10 last:border-0"
                                        >
                                            <Link to={`/blog/${index + 1}`}>
                                                <div className="group">
                                                    <div className="mb-4 h-60 w-full rounded-lg bg-gray-200"></div>
                                                    <div className="">
                                                        <span className="text-sm font-medium text-pink-500">
                                                            {article.category}
                                                        </span>
                                                        <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-pink-500">
                                                            {article.title}
                                                        </h3>
                                                        <p className="mt-3 text-gray-600">
                                                            {article.excerpt}
                                                        </p>
                                                        <div className="mt-4 flex items-center text-sm text-gray-500">
                                                            <div className="flex items-center">
                                                                <Calendar className="mr-1 h-4 w-4" />
                                                                <span>{article.date}</span>
                                                            </div>
                                                            <span className="mx-2">•</span>
                                                            <div className="flex items-center">
                                                                <User className="mr-1 h-4 w-4" />
                                                                <span>{article.author}</span>
                                                            </div>
                                                            <span className="mx-2">•</span>
                                                            <span>{article.readTime}</span>
                                                        </div>
                                                        <div className="mt-4">
                                                            <span className="inline-flex items-center text-sm font-medium text-pink-500 group-hover:text-pink-600">
                                                                Read more
                                                                <ArrowRight className="ml-1 h-4 w-4" />
                                                            </span>
                                                        </div>
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

                            <div className="mt-12 lg:mt-0">
                                <div className="sticky top-24 space-y-10">
                                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Search
                                        </h3>
                                        <div className="mt-4 relative">
                                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search articles..."
                                                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-gray-900 placeholder:text-gray-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Categories
                                        </h3>
                                        <ul className="mt-4 space-y-2">
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="text-gray-600 hover:text-pink-500"
                                                >
                                                    Corporate Governance
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="text-gray-600 hover:text-pink-500"
                                                >
                                                    Financial Management
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="text-gray-600 hover:text-pink-500"
                                                >
                                                    Compliance
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="text-gray-600 hover:text-pink-500"
                                                >
                                                    Business Administration
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Popular Articles
                                        </h3>
                                        <ul className="mt-4 space-y-2">
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="text-gray-600 hover:text-pink-500"
                                                >
                                                    The Role of Corporate Governance in Business Success
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="text-gray-600 hover:text-pink-500"
                                                >
                                                    Top Financial Tips for SMEs
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="text-gray-600 hover:text-pink-500"
                                                >
                                                    Compliance Challenges in 2025
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Newsletter
                                        </h3>
                                        <p className="mt-4 text-gray-600">
                                            Subscribe to our newsletter for the latest updates and
                                            insights.
                                        </p>
                                        <form className="mt-4">
                                            <input
                                                type="email"
                                                placeholder="Your email address"
                                                className="w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 placeholder:text-gray-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                                            />
                                            <button
                                                type="submit"
                                                className="mt-4 w-full rounded-md bg-pink-500 py-2 px-4 text-white hover:bg-pink-600"
                                            >
                                                Subscribe
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </RootLayout>
    );
}
