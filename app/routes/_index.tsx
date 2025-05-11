
import { Button } from "@nextui-org/react"
import { Link } from "@remix-run/react"
import { style } from "framer-motion/client"
import { ArrowRight, Calendar, BookOpen, Briefcase, FileText, Users, Building, Phone } from "lucide-react"
import ScrollAnimation from "~/components/animation"
import RootLayout from "~/Layout/PublicLayout"


export default function Home() {
  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col ">
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 md:py-24 lg:h-[90vh]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <ScrollAnimation direction="right">
                  <div className="max-w-xl">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                      Corporate Excellence &<br />
                      <span className="text-pink-500">Professional</span> Training
                    </h1>
                    <p className="mt-6 text-lg leading-relaxed text-gray-600">
                      Strengthening the capacity of companies and entrepreneurs in core areas such as corporate
                      governance, financial management, public and business administration.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link
                        to="/services"
                        className="inline-flex items-center rounded-md bg-pink-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-600 hover:transform-3d"
                      >
                        Our Services
                      </Link>
                      <Link
                        to="/contact"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:transform-3d"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation direction="left" delay={0.2}>
                  <div className="relative h-[300px] overflow-hidden rounded-lg shadow-xl sm:h-[400px]">
                    <img src="https://res.cloudinary.com/djlnjjzvt/image/upload/v1746874760/hero1_yet84f.avif" alt="Programming code on screen" className="object-cover h-full transition-transform duration-300 hover:scale-105" />
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Who We Are Section */}
          <section className="py-16 md:py-24 bg-white lg:h-[90vh]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <ScrollAnimation direction="right" className="relative order-2 md:order-1">
                  <div className="h-[300px] overflow-hidden rounded-lg shadow-xl sm:h-[400px] hover:transform-3d">
                    <img
                      src="https://res.cloudinary.com/djlnjjzvt/image/upload/v1746875215/photo-1487058792275-0ad4aaf24ca7_qqlo0v.avif"
                      alt="Colorful programming code"
                      className="object-cover h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </ScrollAnimation>

                <ScrollAnimation direction="left" delay={0.2} className="order-1 md:order-2">
                  <div className="max-w-xl ">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                      Who We Are
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed text-gray-600">
                      CSTS is an organization set up to strengthen the capacity of companies and entrepreneurs in core areas such
                      as corporate governance, financial management, public and business administration to ensure that these
                      entities become competitive in their various industries.
                    </p>
                    <p className="mt-6 text-lg leading-relaxed text-gray-600">
                      Our long-established background in corporate learning enables us to design and deliver bespoke learning
                      programmes that blend next generation learning technologies and techniques in a way that drives performance
                      and inspires a culture of lifelong learning.
                    </p>
                    <div className="mt-8">
                      <Link
                        to="/about"
                        className="inline-flex items-center text-sm font-medium text-white transition-colors  bg-pink-500 h-10 px-4 rounded-md hover:transform-3d"
                      >
                        Learn more about us
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>


          {/* Services Section */}
          <section className="py-16 md:py-24 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollAnimation>
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Our Services</h2>
                  <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                    We provide a wide range of corporate services to help your business thrive in today's competitive environment.
                  </p>
                </div>
              </ScrollAnimation>

              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: "📝",
                    title: "Company Secretarial Services",
                    description:
                      "Help companies meet their statutory compliance needs, assist with managing risks of corporate non-compliance and support with administrative tasks.",
                  },
                  {
                    icon: "⚖️",
                    title: "Statutory Registrations",
                    description:
                      "Minimize the stress of business registration by rendering services of RGD, GIPC, and GRA on behalf of individuals, companies, and institutions.",
                  },
                  {
                    icon: "👩‍🏫",
                    title: "Corporate Training",
                    description:
                      "Bespoke learning programs that blend next-generation learning technologies and techniques to drive performance and inspire a culture of lifelong learning.",
                  },
                  {
                    icon: "💼",
                    title: "Entrepreneurship Training",
                    description:
                      "Exceptional training in entrepreneurship and skill development for individuals and companies, equipping them with requisite skills.",
                  },
                  {
                    icon: "🏢",
                    title: "Virtual Office",
                    description:
                      "Virtual office services allowing clients to work from anywhere using a variety of internet-based business operations.",
                  },
                  {
                    icon: "📊",
                    title: "Consultancy Services",
                    description: "Ensuring your business meets all regulatory requirements and industry standards.",
                  },
                ].map((service, index) => (
                  <ScrollAnimation className="" key={index} delay={0.1 * index}>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:shadow-lg hover:transform-3d lg:h-[35vh]">
                      <div className="mb-4 text-4xl">{service.icon}</div>
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                      <div className="mt-4">
                        <Link
                          to={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                          className="inline-flex items-center text-sm font-medium text-pink-500 transition-colors hover:text-pink-600"
                        >
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </ScrollAnimation>

                ))}
              </div>
            </div>
            <ScrollAnimation>
              <div className="flex justify-center items-center mt-20">
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-md h-10 px-6 py-3 text-sm font-medium text-white transition-colors  hover:transform-3d bg-pink-500"
                >
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4" />

                </Link>
              </div>
            </ScrollAnimation>
          </section>


          {/* Event Programs Section */}
          <section className="py-16 md:py-24 bg-gray-50">
            <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">
              <ScrollAnimation>
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Upcoming Event</h2>
                  <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                    Join us for our upcoming events and workshops to enhance your knowledge and skills.
                  </p>
                </div>
              </ScrollAnimation>

              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: <Calendar className="text-pink-500" />,
                    Status: "Upcoming",
                    title: "Business Support Center Launch",
                    date: "June 15, 2025",
                    description:
                      "Join us for the grand opening of our new Business Support Center, designed to provide resources and guidance to entrepreneurs and small business owners.",
                  },
                  {
                    icon: <Calendar className="text-pink-500" />,
                    Status: "Upcoming",
                    title: "Corporate Governance Workshop",
                    date: "July 10, 2025",
                    description:
                      "A comprehensive workshop on corporate governance best practices under the new Companies Act of Ghana, tailored for executives and board members.",
                  },
                  {
                    icon: <Calendar className="text-pink-500" />,
                    Status: "Upcoming",
                    title: "Entrepreneurship Training Series",
                    date: "August 5-12, 2025",
                    description:
                      "A week-long training series focused on equipping entrepreneurs with essential skills in various areas including product development, marketing, and financial management.",
                  },
                ].map((program, index) => (
                  <ScrollAnimation key={index} delay={0.1 * index}>
                    <div className="rounded-lg border hover:transform-3d border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                      <div className="flex justify-between mb-4">
                        <div className="bg-pink-200 p-1 rounded">{program.icon}</div>
                        <div className="py-1 px-4 bg-gray-50 rounded-full">{program.Status}</div>
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">{program.title}</h3>
                      <p className="mb-4 text-sm font-medium text-gray-500">{program.date}</p>
                      <p className="text-gray-600">{program.description}</p>
                      <div className="mt-4">
                        <Link
                          to={`/trainings/${program.title.toLowerCase().replace(/\s+/g, "-")}`}
                          className="inline-flex items-center rounded-md bg-pink-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-600 w-full justify-center"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-4" />
                        </Link>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>

              <ScrollAnimation delay={0.3} className="mt-12 text-center">
                <Link
                  to="/trainings"
                  className="inline-flex items-center text-sm font-medium text-pink-500 transition-colors hover:text-pink-600"
                >
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </ScrollAnimation>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollAnimation>
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">What Our Clients Say</h2>
                  <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                    Don't just take our word for it. Here's what our clients have to say about our services.
                  </p>
                </div>
              </ScrollAnimation>

              <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    quote:
                      "CSTS provided exceptional corporate secretarial services that helped us navigate complex regulatory requirements with ease.",
                    author: "Michael Asante",
                    position: "CEO, Global Ventures Ltd",
                  },
                  {
                    quote:
                      "The entrepreneurship training program was transformative for my business. I gained practical skills that I immediately applied to grow my operations.",
                    author: "Akosua Mensah",
                    position: "Founder, Eco Solutions Ghana",
                  },
                  {
                    quote:
                      "Their virtual office solution has been a game-changer for our international business operations in Ghana.",
                    author: "James Wilson",
                    position: "Director, UK-Ghana Trade Initiative",
                  },
                ].map((testimonial, index) => (
                  <ScrollAnimation key={index} delay={0.1 * index}>
                    <div className="rounded-lg hover:transform-3d border border-gray-200 h-[35vh] bg-white p-6 shadow-sm">
                      <div className="mb-2">
                        <p>Icon</p>
                      </div>
                      <p className="text-gray-600">"{testimonial.quote}"</p>
                      <div className="mt-6">
                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.position}</p>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-bl from-pink-500 via-pink-400 to-pink-500 animated-gradient  py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <ScrollAnimation direction="right">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                      Ready to Elevate Your Business?
                    </h2>
                    <p className="mt-4 text-lg text-white">
                      Whether you need corporate secretarial services, business registration, or professional training, our team of experts is ready to support your business needs.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link
                        to="/contact"
                        className="inline-flex items-center rounded-md shadow-sm bg-white px-6 py-3 text-sm font-medium text-pink-500 transition-colors hover:bg-pink-600"
                      >
                        Get in Touch
                        <ArrowRight className="h-4 w-4 ml-4" />
                      </Link>
                      <Link
                        to="/services"
                        className="inline-flex items-center rounded-md shadow-sm bg-white px-6 py-3 text-sm font-medium text-pink-500 transition-colors hover:bg-gray-800"
                      >
                        Explore Services
                        <ArrowRight className="h-4 w-4 ml-4" />
                      </Link>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation direction="left" delay={0.2}>
                  <div className="relative h-[300px] overflow-hidden rounded-lg sm:h-[400px] hover:transform-3d">
                    <div className="absolute inset-0 flex items-center justify-center  bg-white shadow-sm p-8">
                      <div className="text-center">
                        <Phone className="mx-auto h-12 w-12 text-pink-500" />
                        <p className="mt-4 text-xl font-bold ">Contact Us</p>
                        <p className="mt-2 ">+1 (555) 123-4567</p>
                        <p className="">info@corporatesecretarial.com</p>
                        <p className="mt-4 text-sm ">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Partners Section */}
          {/* <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollAnimation>
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Partners</h2>
                  <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                    We collaborate with leading organizations to deliver exceptional services.
                  </p>
                </div>
              </ScrollAnimation>

              <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
                {[1, 2, 3, 4, 5, 6].map((partner) => (
                  <ScrollAnimation key={partner} delay={0.05 * partner}>
                    <div className="flex items-center justify-center grayscale transition-all hover:grayscale-0">
                      <div className="h-12 w-32 rounded-md bg-gray-200"></div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </section> */}
        </main>
    </div>
    </RootLayout>
  )
}

