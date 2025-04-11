"use client"

import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function AccountPage() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    // Load orders from localStorage
    const loadOrders = () => {
      const allOrders = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.startsWith("order_")) {
          const order = JSON.parse(localStorage.getItem(key))
          allOrders.push({
            ...order,
            id: key.replace("order_", ""),
          })
        }
      }

      // Sort by date (newest first)
      allOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      setOrders(allOrders)
    }

    loadOrders()
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={user.image || "/placeholder.svg"}
                    alt={user.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <ul className="space-y-2">
                <li>
                  <Link href="/account" className="text-green-600 font-medium">
                    Order History
                  </Link>
                </li>
                <li>
                  <Link href="/account/profile" className="text-gray-600 hover:text-green-600">
                    Profile Settings
                  </Link>
                </li>
                <li>
                  <Link href="/account/addresses" className="text-gray-600 hover:text-green-600">
                    Saved Addresses
                  </Link>
                </li>
                <li>
                  <button onClick={logout} className="text-red-600 hover:text-red-800">
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Order History</h2>
            </div>

            {orders.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <div key={order.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Order #{order.id}</h3>
                        <p className="text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()} at{" "}
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                        <p className="text-gray-600">From: {order.supermarket.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "delivering"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Link href={`/order-tracking/${order.id}`} className="text-green-600 hover:text-green-800">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p className="mb-4">You haven't placed any orders yet.</p>
                <Link href="/" className="text-green-600 hover:text-green-800">
                  Browse Supermarkets
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
