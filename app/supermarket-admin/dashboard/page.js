"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"

export default function SupermarketAdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
  })

  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For demo purposes, we'll use mock data

    // Generate random stats
    setStats({
      pendingOrders: Math.floor(Math.random() * 20) + 5,
      completedOrders: Math.floor(Math.random() * 100) + 50,
      totalRevenue: Math.floor(Math.random() * 10000) + 5000,
      totalProducts: Math.floor(Math.random() * 200) + 100,
    })

    // Generate random recent orders
    const statuses = ["pending", "preparing", "ready_for_pickup", "in_transit", "delivered"]
    const orders = []

    for (let i = 0; i < 5; i++) {
      orders.push({
        id: 100000 + Math.floor(Math.random() * 900000),
        customer: `Customer ${i + 1}`,
        items: Math.floor(Math.random() * 10) + 1,
        total: (Math.random() * 100 + 20).toFixed(2),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString().split("T")[0],
      })
    }

    setRecentOrders(orders)
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Pending Orders</h2>
          <p className="text-3xl font-bold">{stats.pendingOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Completed Orders</h2>
          <p className="text-3xl font-bold">{stats.completedOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Total Products</h2>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Link href="/supermarket-admin/orders" className="text-green-500 hover:text-green-600">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "preparing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "ready_for_pickup"
                              ? "bg-purple-100 text-purple-800"
                              : order.status === "in_transit"
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      href={`/supermarket-admin/orders/${order.id}`}
                      className="text-green-500 hover:text-green-600"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/supermarket-admin/products/new"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 text-center"
          >
            Add New Product
          </Link>
          <Link
            href="/supermarket-admin/categories/new"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-center"
          >
            Add New Category
          </Link>
          <Link
            href="/supermarket-admin/orders?status=pending"
            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 text-center"
          >
            View Pending Orders
          </Link>
        </div>
      </div>
    </div>
  )
}
