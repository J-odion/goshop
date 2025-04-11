"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, ChevronDown } from "lucide-react"

export default function PartnerPage() {
  const [activeTab, setActiveTab] = useState("supermarket")
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setIsFormSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsFormSubmitting(false)
      setFormSubmitSuccess(true)

      // Reset form fields here

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Partner With Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Join our growing network of supermarkets and riders to expand your business and reach more customers.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Partner With Us?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Increased Revenue</h3>
              <p className="text-gray-600">
                Expand your customer base and boost your sales by reaching customers who prefer online shopping and
                delivery.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Easy Management</h3>
              <p className="text-gray-600">
                Our intuitive dashboard makes it simple to manage your products, orders, and deliveries all in one
                place.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Business Growth</h3>
              <p className="text-gray-600">
                Leverage our marketing and customer base to grow your business and increase your market presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-orange-200"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                      <h3 className="text-xl font-semibold mb-2">Apply to Partner</h3>
                      <p className="text-gray-600">
                        Fill out our simple application form with your business details and contact information.
                      </p>
                    </div>
                    <div className="md:mx-4 mb-4 md:mb-0 order-1 md:order-2">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold z-10 relative">
                        1
                      </div>
                    </div>
                    <div className="flex-1 md:pl-8 order-3">
                      <div className="h-32 w-full md:w-48 bg-gray-200 rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <span className="text-gray-600">Application Form</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                      <div className="h-32 w-full md:w-48 bg-gray-200 rounded-lg overflow-hidden ml-auto">
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <span className="text-gray-600">Onboarding Process</span>
                        </div>
                      </div>
                    </div>
                    <div className="md:mx-4 mb-4 md:mb-0 order-1 md:order-2">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold z-10 relative">
                        2
                      </div>
                    </div>
                    <div className="flex-1 md:pl-8 order-3">
                      <h3 className="text-xl font-semibold mb-2">Complete Onboarding</h3>
                      <p className="text-gray-600">
                        Our team will guide you through the onboarding process, including setting up your profile and
                        products.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                      <h3 className="text-xl font-semibold mb-2">Go Live</h3>
                      <p className="text-gray-600">
                        Once everything is set up, your store or rider profile will go live on our platform, ready to
                        serve customers.
                      </p>
                    </div>
                    <div className="md:mx-4 mb-4 md:mb-0 order-1 md:order-2">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold z-10 relative">
                        3
                      </div>
                    </div>
                    <div className="flex-1 md:pl-8 order-3">
                      <div className="h-32 w-full md:w-48 bg-gray-200 rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <span className="text-gray-600">Live Platform</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                      <div className="h-32 w-full md:w-48 bg-gray-200 rounded-lg overflow-hidden ml-auto">
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <span className="text-gray-600">Growth & Support</span>
                        </div>
                      </div>
                    </div>
                    <div className="md:mx-4 mb-4 md:mb-0 order-1 md:order-2">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold z-10 relative">
                        4
                      </div>
                    </div>
                    <div className="flex-1 md:pl-8 order-3">
                      <h3 className="text-xl font-semibold mb-2">Grow Your Business</h3>
                      <p className="text-gray-600">
                        Benefit from our marketing, customer base, and ongoing support to grow your business.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types Tabs */}
      <section className="py-16" id="apply">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Apply to Partner With Us</h2>

          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                className={`py-4 px-6 font-medium text-lg ${activeTab === "supermarket" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("supermarket")}
                id="supermarket"
              >
                Supermarket
              </button>
              <button
                className={`py-4 px-6 font-medium text-lg ${activeTab === "rider" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("rider")}
                id="rider"
              >
                Rider
              </button>
            </div>

            {/* Supermarket Tab Content */}
            {activeTab === "supermarket" && (
              <div>
                <div className="flex flex-col md:flex-row gap-12 mb-12">
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-semibold mb-4">List Your Supermarket</h3>
                    <p className="text-gray-600 mb-6">
                      Join our platform to reach more customers and increase your sales. We make it easy to manage your
                      products, orders, and deliveries.
                    </p>

                    <h4 className="text-xl font-medium mb-3">Requirements:</h4>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Valid business license and registration</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Physical store location(s)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Inventory management system</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Ability to fulfill orders in a timely manner</span>
                      </li>
                    </ul>

                    <h4 className="text-xl font-medium mb-3">Benefits:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Increased customer reach and visibility</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Additional revenue stream</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Marketing and promotional support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Detailed analytics and reporting</span>
                      </li>
                    </ul>
                  </div>

                  <div className="md:w-1/2">
                    <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6">
                      <Image
                        src="/placeholder.svg?text=Supermarket+Partner&height=300&width=500"
                        alt="Supermarket Partner"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-xl font-medium mb-3">Partner Success Story</h4>
                      <p className="text-gray-600 mb-4">
                        "Since joining Grocery Logistics, our sales have increased by 30% and we've been able to reach
                        customers we never could before. The platform is easy to use and the support team is always
                        helpful."
                      </p>
                      <p className="font-medium">- John Smith, Fresh Market Owner</p>
                    </div>
                  </div>
                </div>

                {/* Supermarket Application Form */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-6">Supermarket Application Form</h3>

                  {formSubmitSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                      Thank you for your application! Our team will review your information and contact you soon.
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="supermarketName" className="block text-gray-700 font-medium mb-2">
                          Supermarket Name *
                        </label>
                        <input
                          type="text"
                          id="supermarketName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="businessType" className="block text-gray-700 font-medium mb-2">
                          Business Type *
                        </label>
                        <select
                          id="businessType"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        >
                          <option value="">Select Business Type</option>
                          <option value="grocery">Grocery Store</option>
                          <option value="supermarket">Supermarket</option>
                          <option value="hypermarket">Hypermarket</option>
                          <option value="specialty">Specialty Food Store</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="contactName" className="block text-gray-700 font-medium mb-2">
                          Contact Person Name *
                        </label>
                        <input
                          type="text"
                          id="contactName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="contactEmail" className="block text-gray-700 font-medium mb-2">
                          Contact Email *
                        </label>
                        <input
                          type="email"
                          id="contactEmail"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="contactPhone" className="block text-gray-700 font-medium mb-2">
                          Contact Phone *
                        </label>
                        <input
                          type="tel"
                          id="contactPhone"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="storeLocations" className="block text-gray-700 font-medium mb-2">
                          Number of Locations *
                        </label>
                        <select
                          id="storeLocations"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        >
                          <option value="">Select Number of Locations</option>
                          <option value="1">1 Location</option>
                          <option value="2-5">2-5 Locations</option>
                          <option value="6-10">6-10 Locations</option>
                          <option value="11+">11+ Locations</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="primaryAddress" className="block text-gray-700 font-medium mb-2">
                        Primary Store Address *
                      </label>
                      <input
                        type="text"
                        id="primaryAddress"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="additionalInfo" className="block text-gray-700 font-medium mb-2">
                        Additional Information
                      </label>
                      <textarea
                        id="additionalInfo"
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Tell us more about your business, products, and any questions you have."
                      ></textarea>
                    </div>

                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="termsAgreement"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="termsAgreement" className="ml-2 block text-gray-700">
                        I agree to the{" "}
                        <Link href="#" className="text-green-600 hover:text-green-700">
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
                      disabled={isFormSubmitting}
                    >
                      {isFormSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Rider Tab Content */}
            {activeTab === "rider" && (
              <div>
                <div className="flex flex-col md:flex-row gap-12 mb-12">
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-semibold mb-4">Become a Delivery Rider</h3>
                    <p className="text-gray-600 mb-6">
                      Join our network of delivery riders and enjoy flexible hours, competitive pay, and the freedom to
                      be your own boss.
                    </p>

                    <h4 className="text-xl font-medium mb-3">Requirements:</h4>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Valid ID and proof of address</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Smartphone with data plan</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Vehicle (car, motorcycle, bicycle, or scooter)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Clean background check</span>
                      </li>
                    </ul>

                    <h4 className="text-xl font-medium mb-3">Benefits:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Flexible working hours</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Competitive pay and tips</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Weekly payments</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Support and training</span>
                      </li>
                    </ul>
                  </div>

                  <div className="md:w-1/2">
                    <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6">
                      <Image
                        src="/placeholder.svg?text=Rider+Partner&height=300&width=500"
                        alt="Rider Partner"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-xl font-medium mb-3">Rider Success Story</h4>
                      <p className="text-gray-600 mb-4">
                        "I love the flexibility of being a Grocery Logistics rider. I can work when I want, earn good
                        money, and the app makes it easy to manage my deliveries and earnings."
                      </p>
                      <p className="font-medium">- Sarah Johnson, Delivery Rider</p>
                    </div>
                  </div>
                </div>

                {/* Rider Application Form */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-6">Rider Application Form</h3>

                  {formSubmitSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                      Thank you for your application! Our team will review your information and contact you soon.
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="vehicleType" className="block text-gray-700 font-medium mb-2">
                          Vehicle Type *
                        </label>
                        <select
                          id="vehicleType"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        >
                          <option value="">Select Vehicle Type</option>
                          <option value="car">Car</option>
                          <option value="motorcycle">Motorcycle</option>
                          <option value="bicycle">Bicycle</option>
                          <option value="scooter">Scooter</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                        Full Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="experience" className="block text-gray-700 font-medium mb-2">
                        Previous Delivery Experience
                      </label>
                      <textarea
                        id="experience"
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Tell us about any previous delivery experience you have."
                      ></textarea>
                    </div>

                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="riderTermsAgreement"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="riderTermsAgreement" className="ml-2 block text-gray-700">
                        I agree to the{" "}
                        <Link href="#" className="text-green-600 hover:text-green-700">
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
                      disabled={isFormSubmitting}
                    >
                      {isFormSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <button className="flex justify-between items-center w-full text-left">
                <h3 className="text-xl font-semibold">How long does the application process take?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div className="mt-4 text-gray-600">
                <p>
                  The application process typically takes 1-2 weeks, depending on the completeness of your application
                  and the volume of applications we're processing.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <button className="flex justify-between items-center w-full text-left">
                <h3 className="text-xl font-semibold">What fees do you charge supermarkets?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div className="mt-4 text-gray-600">
                <p>
                  We charge a small commission on each order processed through our platform. The exact fee structure
                  will be discussed during the onboarding process.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <button className="flex justify-between items-center w-full text-left">
                <h3 className="text-xl font-semibold">How do riders get paid?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div className="mt-4 text-gray-600">
                <p>
                  Riders are paid weekly via direct deposit. Earnings include base pay for each delivery, plus any tips
                  received from customers.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <button className="flex justify-between items-center w-full text-left">
                <h3 className="text-xl font-semibold">Can I list multiple store locations?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div className="mt-4 text-gray-600">
                <p>
                  Yes, you can list multiple store locations under a single account. Each location can have its own
                  inventory and operating hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
