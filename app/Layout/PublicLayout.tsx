import type React from "react"
import "~/tailwind.css"
import Navigation from "~/components/navigation"
import Footer from "~/components/footer"

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
    return (
        <html lang="en">
            <body className="">
                <div className="flex min-h-screen flex-col bg-gray-50">
                    <Navigation />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    )
}
