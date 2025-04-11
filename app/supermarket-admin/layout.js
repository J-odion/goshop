"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function SupermarketAdminLayout({ children }) {
  const { user, isAuthenticated, role } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [supermarketInfo, setSupermarketInfo] = useState(null)

  useEffect(() => {
    //Check if user is authenticated and has the correct role
    // if (!isAuthenticated) {
    //   router.push("/login?redirect=/supermarket-admin")
    //   return
    // }

    // if (role !== "supermarket_admin") {
    //   router.push("/")
    //   return
    // }

    // In a real app, we would fetch the supermarket info from the API
    // For demo purposes, we'll use mock data
    setSupermarketInfo({
      id: user.supermarketId || 1,
      name: user.supermarketName || "Fresh Mart",
    })
  // }, [isAuthenticated, role, router, user])
   }, [ user])

  if (!supermarketInfo) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const navItems = [
    { name: "Dashboard", path: "/supermarket-admin/dashboard" },
    { name: "Products", path: "/supermarket-admin/products" },
    { name: "Categories", path: "/supermarket-admin/categories" },
    { name: "Orders", path: "/supermarket-admin/orders" },
    { name: "Settings", path: "/supermarket-admin/settings" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">{supermarketInfo.name}</h1>
          <p className="text-sm text-gray-500">Supermarket Admin</p>
        </div>

        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                    pathname === item.path ? "bg-green-50 text-green-600 border-r-4 border-green-500" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Back to Main Site
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  )
}
