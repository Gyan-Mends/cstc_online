
import { Users, Award, Target, Clock, Check, Eye, Users2Icon } from "lucide-react"
import ScrollAnimation from "~/components/animation"
import RootLayout from "~/Layout/PublicLayout"

export default function WhoWeArePage() {
    return (
        <RootLayout>
            <main className="flex-1">
                <div className="bg-gray-50 py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ScrollAnimation delay={0.7}>
                            <div className="text-center">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Who We Are</h1>
                                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                    Learn about our organization, mission, and values
                                </p>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>

                <section className="py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 md:grid-cols-2 md:items-center">
                            <ScrollAnimation delay={0.8}>
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Story</h2>
                                    <div className="mt-6 space-y-6 text-lg text-gray-600">
                                        <p>
                                            CSTS is an organization set up to strengthen the capacity of companies and entrepreneurs in core areas such as corporate governance, financial management, public and business administration to ensure that these entities become competitive in their various industries.
                                        </p>


                                    </div>
                                </div>
                                <div className="mt-10">
                                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Expertise</h2>
                                    <div className="mt-6 space-y-6 text-lg text-gray-600">
                                        <p>
                                            Our long-established background in corporate learning enables us to design and deliver bespoke learning programmes that blend next generation learning technologies and techniques in a way that drives performance and inspires a culture of lifelong learning.


                                        </p>
                                        <p>
                                            With expertise in corporate governance, financial management, public administration, and business development, CSTS has established itself as a trusted partner for businesses seeking to enhance their operational effectiveness and compliance.
                                        </p>


                                    </div>
                                </div>
                            </ScrollAnimation>

                            <ScrollAnimation delay={0.8}>
                                <div className="relative h-[300px] overflow-hidden rounded-lg shadow-xl sm:h-[400px]">
                                    <img src="https://res.cloudinary.com/djlnjjzvt/image/upload/v1746890121/WHO-WE-ARE_cnkjpy.avif" alt="Our team" className="object-cover h-full" />
                                </div>
                            </ScrollAnimation>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ScrollAnimation>
                            <div className="text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Values</h2>
                                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                    These core principles guide everything we do
                                </p>
                            </div>
                        </ScrollAnimation>

                        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    icon: <Award className="h-8 w-8 text-pink-500" />,
                                    title: "Excellence",
                                    description: "We strive for excellence in all our services and operations.",
                                },
                                {
                                    icon: <Users className="h-8 w-8 text-pink-500" />,
                                    title: "Integrity",
                                    description: " We uphold the highest ethical standards in all our dealings.",
                                },
                                {
                                    icon: <Target className="h-8 w-8 text-pink-500" />,
                                    title: "Innovation",
                                    description: "We constantly seek innovative solutions to meet client needs",
                                },
                                {
                                    icon: <Clock className="h-8 w-8 text-pink-500" />,
                                    title: "Client Focus",
                                    description: "We prioritize understanding and meeting the unique needs of each client.",
                                },
                                {
                                    icon: <Users2Icon className="h-8 w-8 text-pink-500" />,
                                    title: "Collaboration",
                                    description: "We believe in the power of teamwork and partnerships.",
                                },
                                // {
                                //     icon: <Clock className="h-8 w-8 text-pink-500" />,
                                //     title: "Mission",
                                //     description: "To provide exceptional corporate services and training programs that empower businesses and entrepreneurs to achieve their full potential and succeed in an increasingly competitive business environment.",
                                // },
                                // {
                                //     icon: <Eye className="h-8 w-8 text-pink-500" />,
                                //     title: "Our Vission",
                                //     description: "To be the leading provider of corporate secretarial services and business training in Ghana, recognized for excellence, innovation, and commitment to client success.",
                                // },
                            ].map((value, index) => (
                                <ScrollAnimation key={index} delay={0.1 * index}>
                                    <div className="rounded-lg hover:transform-3d transition-all border border-gray-200 bg-white px-6 h-60 pt-6 text-center shadow-sm">
                                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
                                            {value.icon}
                                        </div>
                                        <h3 className="mb-2 text-xl font-semibold text-gray-900">{value.title}</h3>
                                        <p className="text-gray-600">{value.description}</p>
                                    </div>
                                </ScrollAnimation>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="lg:grid lg:grid-cols-2 gap-20 py-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                       <ScrollAnimation>
                         <div className="border h-80 w-full bg-white rounded-lg shadow-md transition-all p-10 hover:transform-3d">
                            <div className="flex justify-between items-center">
                                <h4 className="text-2xl font-montserrat font-bold">
                                    Mission
                                </h4>
                                <p>
                                    <Clock className="h-8 w-8 text-pink-500" />
                                </p>
                            </div>
                            <p className="mt-16">
                                "To provide exceptional corporate services and training programs that empower businesses and entrepreneurs to achieve their full potential and succeed in an increasingly competitive business environment.
                            </p>
                        </div>
                       </ScrollAnimation>
                        <ScrollAnimation>
                            <div className="border h-80 w-full bg-white rounded-lg shadow-md transition-all p-10 hover:transform-3d">
                            <div className="flex justify-between items-center">
                                <h4 className="text-2xl font-montserrat font-bold">
                                    Vission
                                </h4>
                                <p>
                                    <Eye className="h-8 w-8 text-pink-500" />
                                </p>
                            </div>
                            <p className="mt-16">
                                "To provide exceptional corporate services and training programs that empower businesses and entrepreneurs to achieve their full potential and succeed in an increasingly competitive business environment.
                            </p>
                        </div>
                        </ScrollAnimation>
                    </div>
                </section>




                {/* <section className="py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ScrollAnimation>
                            <div className="text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Team</h2>
                                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">Meet the experts behind our success</p>
                            </div>
                        </ScrollAnimation>

                        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    image: "",
                                    name: "John Smith",
                                    position: "CEO & Founder",
                                    bio: "John has over 20 years of experience in corporate governance and financial management.",
                                },
                                {
                                    image: "",
                                    name: "Sarah Johnson",
                                    position: "Director of Training",
                                    bio: "Sarah leads our training programs with her extensive background in professional development.",
                                },
                                {
                                    image: "",
                                    name: "Michael Chen",
                                    position: "Head of Corporate Services",
                                    bio: "Michael specializes in corporate compliance and business administration.",
                                },
                                {
                                    image: "",
                                    name: "Emily Williams",
                                    position: "Financial Consultant",
                                    bio: "Emily brings her expertise in financial management to help our clients optimize their performance.",
                                },
                                {
                                    image: "",
                                    name: "David Rodriguez",
                                    position: "Compliance Specialist",
                                    bio: "David ensures our clients meet all regulatory requirements and industry standards.",
                                },
                                {
                                    image: "",
                                    name: "Lisa Thompson",
                                    position: "Business Development Manager",
                                    bio: "Lisa works with clients to identify their needs and develop tailored solutions.",
                                },
                            ].map((member, index) => (
                                <ScrollAnimation key={index} delay={0.1 * index}>
                                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                        <div className="mb-4 h-40 w-full rounded-md bg-gray-200"><img src={member.image} alt="" /></div>
                                        <h3 className="mb-1 text-xl font-semibold text-gray-900">{member.name}</h3>
                                        <p className="mb-4 text-sm font-medium text-pink-500">{member.position}</p>
                                        <p className="text-gray-600">{member.bio}</p>
                                    </div>
                                </ScrollAnimation>
                            ))}
                        </div>
                    </div>
                </section> */}
            </main>
        </RootLayout>
    )
}
