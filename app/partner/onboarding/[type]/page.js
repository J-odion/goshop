"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle, ChevronRight } from "lucide-react"

export default function PartnerOnboardingPage() {
  const params = useParams()
  const router = useRouter()
  const { type } = params

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Common fields
    name: "",
    email: "",
    phone: "",
    address: "",

    // Supermarket specific fields
    businessType: "",
    storeLocations: "",

    // Rider specific fields
    vehicleType: "",
    experience: "",

    // Terms agreement
    termsAgreed: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    // Validate the type parameter
    if (type !== "supermarket" && type !== "rider") {
      router.push("/partner")
    }
  }, [type, router])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
    window.scrollTo(0, 0)
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push("/partner/onboarding/success")
      }, 2000)
    }, 1500)
  }

  const renderProgressBar = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="text-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 
                  ${currentStep >= step ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              <div className={`text-sm ${currentStep >= step ? "text-orange-500" : "text-gray-500"}`}>
                {step === 1 ? "Basic Info" : step === 2 ? "Details" : step === 3 ? "Requirements" : "Review"}
              </div>
            </div>
          ))}
        </div>
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${(currentStep / 4) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500 transition-all duration-500"
            ></div>
          </div>
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  {type === "supermarket" ? "Business Name" : "Full Name"} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                  {type === "supermarket" ? "Business Address" : "Home Address"} *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Additional Details</h3>

            {type === "supermarket" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="businessType" className="block text-gray-700 font-medium mb-2">
                    Business Type *
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  <label htmlFor="storeLocations" className="block text-gray-700 font-medium mb-2">
                    Number of Locations *
                  </label>
                  <select
                    id="storeLocations"
                    name="storeLocations"
                    value={formData.storeLocations}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="vehicleType" className="block text-gray-700 font-medium mb-2">
                    Vehicle Type *
                  </label>
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select Vehicle Type</option>
                    <option value="car">Car</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="bicycle">Bicycle</option>
                    <option value="scooter">Scooter</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-gray-700 font-medium mb-2">
                    Delivery Experience
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Experience Level</option>
                    <option value="none">No Experience</option>
                    <option value="less-than-1">Less than 1 year</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3+">3+ years</option>
                  </select>
                </div>
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="additionalInfo" className="block text-gray-700 font-medium mb-2">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows="4"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder={
                  type === "supermarket"
                    ? "Tell us more about your business, products, and any questions you have."
                    : "Tell us more about your availability, experience, and any questions you have."
                }
              ></textarea>
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Requirements</h3>

            {type === "supermarket" ? (
              <div className="space-y-4 mb-6">
                <p className="text-gray-700 mb-4">
                  To become a supermarket partner, you'll need to provide the following documents:
                </p>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-orange-800 mb-2">Required Documents:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Business license and registration certificate</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Tax identification number</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Proof of business address</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Bank account information for payments</span>
                    </li>
                  </ul>
                </div>

                <p className="text-gray-700 mt-4">
                  You'll be able to upload these documents in the next step of the onboarding process after your
                  application is approved.
                </p>
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                <p className="text-gray-700 mb-4">
                  To become a delivery rider, you'll need to provide the following documents:
                </p>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-orange-800 mb-2">Required Documents:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Valid government-issued ID</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Proof of address (utility bill, lease agreement, etc.)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Driver's license (for car or motorcycle)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Bank account information for payments</span>
                    </li>
                  </ul>
                </div>

                <p className="text-gray-700 mt-4">
                  You'll be able to upload these documents in the next step of the onboarding process after your
                  application is approved.
                </p>
              </div>
            )}

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="termsAgreed"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleInputChange}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="termsAgreed" className="ml-2 block text-gray-700">
                I confirm that I have all the required documents and agree to the{" "}
                <Link href="#" className="text-orange-600 hover:text-orange-700">
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>
        )

      case 4:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Review Your Information</h3>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h4 className="font-medium text-lg mb-4">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">{type === "supermarket" ? "Business Name" : "Full Name"}</p>
                  <p className="font-medium">{formData.name || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email Address</p>
                  <p className="font-medium">{formData.email || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Phone Number</p>
                  <p className="font-medium">{formData.phone || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">
                    {type === "supermarket" ? "Business Address" : "Home Address"}
                  </p>
                  <p className="font-medium">{formData.address || "Not provided"}</p>
                </div>
              </div>

              <h4 className="font-medium text-lg mt-6 mb-4">Additional Details</h4>
              {type === "supermarket" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Business Type</p>
                    <p className="font-medium">{formData.businessType || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Number of Locations</p>
                    <p className="font-medium">{formData.storeLocations || "Not provided"}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Vehicle Type</p>
                    <p className="font-medium">{formData.vehicleType || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Delivery Experience</p>
                    <p className="font-medium">{formData.experience || "Not provided"}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-6">
              <p className="text-orange-800">
                By submitting this application, you confirm that all information provided is accurate and complete. Our
                team will review your application and contact you within 2-3 business days.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (submitSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for applying to be a partner with Grocery Logistics. Our team will review your application and
            contact you soon.
          </p>
          <div className="animate-pulse">
            <p className="text-orange-600">Redirecting to success page...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
            {/* Left side - Image and info */}
            <div className="md:w-2/5 bg-orange-600 text-white p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-4">
                  {type === "supermarket" ? "Supermarket Partner" : "Rider Partner"} Application
                </h1>
                <p className="mb-6">
                  {type === "supermarket"
                    ? "Join our platform to reach more customers and increase your sales."
                    : "Join our network of riders and enjoy flexible hours and competitive pay."}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{type === "supermarket" ? "Expand your customer base" : "Flexible working hours"}</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{type === "supermarket" ? "Easy order management" : "Competitive pay and tips"}</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{type === "supermarket" ? "Marketing and promotional support" : "Weekly payments"}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm opacity-75">
                  Need help? Contact our partner support team at{" "}
                  <a href="mailto:partners@grocerylogistics.com" className="underline">
                    partners@grocerylogistics.com
                  </a>
                </p>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="md:w-3/5 p-8">
              {renderProgressBar()}

              <form onSubmit={currentStep === 4 ? handleSubmit : (e) => e.preventDefault()}>
                {renderStepContent()}

                <div className="flex justify-between mt-8">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Back
                    </button>
                  ) : (
                    <Link
                      href="/partner"
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </Link>
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center"
                    >
                      Next Step <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.termsAgreed}
                      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
