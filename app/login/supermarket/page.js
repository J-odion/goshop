"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function SupermarketLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false)

      // For demo purposes, we'll just redirect to supermarket admin dashboard
      router.push("/supermarket-admin/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Image and Text */}
      <div className="hidden md:flex md:w-1/2 bg-green-600 text-white p-10 flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-6">Supermarket Partner Portal</h1>
          <p className="text-xl mb-8">Manage your products, orders, and deliveries all in one place.</p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-white rounded-full p-2 mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Easy Order Management</h3>
                <p className="text-green-100">Accept, prepare, and track orders in real-time.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-white rounded-full p-2 mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Inventory Management</h3>
                <p className="text-green-100">Update product availability and prices with ease.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-white rounded-full p-2 mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Analytics & Insights</h3>
                <p className="text-green-100">Track sales, popular products, and customer trends.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-64 w-full rounded-lg overflow-hidden mt-8">
          <Image
            src="/placeholder.svg?text=Supermarket+Dashboard&height=300&width=500"
            alt="Supermarket Dashboard"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Supermarket Login</h2>
            <p className="mt-2 text-sm text-gray-600">Sign in to access your supermarket dashboard</p>
          </div>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="#" className="font-medium text-green-600 hover:text-green-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account yet?{" "}
              <Link href="/partner#supermarket" className="font-medium text-green-600 hover:text-green-500">
                Apply to become a partner
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
              ← Back to customer login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
