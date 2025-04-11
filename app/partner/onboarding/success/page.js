"use client"

import Link from "next/link"
import { CheckCircle, ArrowLeft } from "lucide-react"

export default function OnboardingSuccessPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-orange-600 text-white p-8 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Application Submitted!</h1>
            <p className="text-xl">Thank you for applying to be a partner with Grocery Logistics.</p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">What Happens Next?</h2>
              <ol className="space-y-6">
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold text-orange-600">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Application Review</h3>
                    <p className="text-gray-600">Our team will review your application within 2-3 business days.</p>
                  </div>
                </li>

                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold text-orange-600">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Verification</h3>
                    <p className="text-gray-600">
                      We'll contact you to verify your information and discuss next steps.
                    </p>
                  </div>
                </li>

                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold text-orange-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Onboarding</h3>
                    <p className="text-gray-600">
                      Once approved, we'll guide you through the complete onboarding process.
                    </p>
                  </div>
                </li>

                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold text-orange-600">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Go Live</h3>
                    <p className="text-gray-600">
                      After completing onboarding, your account will be activated on our platform.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-8">
              <p className="text-orange-800 text-sm">
                <strong>Note:</strong> You'll receive an email confirmation shortly with a copy of your application
                details. If you don't receive this email, please check your spam folder or contact our support team.
              </p>
            </div>

            <div className="text-center">
              <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700">
                <ArrowLeft className="mr-2 h-4 w-4" /> Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
