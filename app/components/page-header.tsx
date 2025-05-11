"use client"

import { motion } from "framer-motion"

interface PageHeaderProps {
    title: string
    description?: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <div className="bg-gray-50 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{title}</h1>
                    {description && <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{description}</p>}
                </motion.div>
            </div>
        </div>
    )
}
