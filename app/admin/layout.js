"use client"

import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  //useEffect(() => {
  //   if (!loading && (!user || user.role !== "admin")) {
  //     router.push("/login")
  //   }
  // }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/products" className="block py-2 px-4 rounded hover:bg-gray-700">
                Products
              </Link>
            </li>
            <li>
              <Link href="/admin/stores" className="block py-2 px-4 rounded hover:bg-gray-700">
                Stores
              </Link>
            </li>
            <li>
              <Link href="/admin/orders" className="block py-2 px-4 rounded hover:bg-gray-700">
                Orders
              </Link>
            </li>
            <li>
              <Link href="/admin/riders" className="block py-2 px-4 rounded hover:bg-gray-700">
                Riders
              </Link>
            </li>
            <li>
              <Link href="/admin/payments" className="block py-2 px-4 rounded hover:bg-gray-700">
                Payments
              </Link>
            </li>
            <li>
              <Link href="/admin/reports" className="block py-2 px-4 rounded hover:bg-gray-700">
                Reports
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100">
        <div className="p-8">{children}</div>
      </div>
    </div>
  )
}
