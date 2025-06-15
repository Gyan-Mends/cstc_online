import type React from "react"
import "~/tailwind.css"
import Navigation from "~/components/navigation"
import Footer from "~/components/footer"
import { useEffect } from "react"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Corporate Secretarial - Professional Training & Services",
//   description:
//     "Strengthening the capacity of companies and entrepreneurs in core areas such as corporate governance, financial management, public and business administration.",
// }

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    useEffect(() => {
        // Global scroll animation initialization
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate')
                    
                    // For elements with animate-on-scroll class
                    if (entry.target.classList.contains('animate-on-scroll')) {
                        entry.target.classList.add('animate')
                    }
                    
                    // For elements with scroll-animate class
                    if (entry.target.classList.contains('scroll-animate')) {
                        entry.target.classList.add('visible')
                    }
                }
            })
        }, observerOptions)

        // Observe all elements with animation classes
        const animatedElements = document.querySelectorAll(
            '.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .fade-in, ' +
            '.slide-in-left, .slide-in-right, .zoom-in, .bounce-in, .animate-on-scroll, .scroll-animate'
        )
        
        animatedElements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 font-nunito transition-all">
            <Navigation />
            {children}
            <Footer />
        </div>
    )
}
