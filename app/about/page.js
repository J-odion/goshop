import Image from "next/image"

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Grocery Logistics</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're on a mission to make grocery shopping easier, faster, and more convenient for everyone.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Grocery Logistics was founded in 2023 with a simple idea: make grocery shopping hassle-free. We noticed
                how busy modern life had become, and how difficult it was for many people to find time for grocery
                shopping.
              </p>
              <p className="text-gray-600 mb-4">
                Our founder, after experiencing the frustration of trying to shop for groceries after a long day at
                work, decided there had to be a better way. That's when the idea for Grocery Logistics was born.
              </p>
              <p className="text-gray-600">
                Today, we connect thousands of customers with their favorite local supermarkets, providing a seamless
                shopping experience and fast delivery right to their doorstep.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?text=Our+Story&height=400&width=600"
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At Grocery Logistics, our mission is to transform the way people shop for groceries by providing a
                platform that connects customers with local supermarkets for convenient, same-day delivery.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that everyone deserves access to fresh, quality groceries without the hassle of traditional
                shopping. By leveraging technology and our network of dedicated riders, we're making this vision a
                reality.
              </p>
              <p className="text-gray-600">
                We're committed to supporting local businesses, creating flexible earning opportunities for riders, and
                providing exceptional service to our customers.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?text=Our+Mission&height=400&width=600"
                  alt="Our Mission"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "Founder & CEO", image: "/placeholder.svg?text=John+Doe&height=300&width=300" },
              { name: "Jane Smith", role: "COO", image: "/placeholder.svg?text=Jane+Smith&height=300&width=300" },
              { name: "Mike Johnson", role: "CTO", image: "/placeholder.svg?text=Mike+Johnson&height=300&width=300" },
            ].map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Efficiency</h3>
              <p className="text-gray-600 text-center">
                We strive to provide the fastest, most reliable service possible, saving our customers valuable time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Community</h3>
              <p className="text-gray-600 text-center">
                We support local businesses and create opportunities for riders in the communities we serve.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Quality</h3>
              <p className="text-gray-600 text-center">
                We're committed to delivering the freshest groceries and maintaining the highest standards of service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
