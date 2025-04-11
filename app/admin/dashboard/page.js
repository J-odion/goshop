"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { products } from "@/data/products"
import { supermarkets } from "@/data/supermarkets"
import { riders } from "@/data/riders"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    activeRiders: 0,
    totalStores: 0,
    totalProducts: 0,
    pendingDisputes: 0,
  })

  const [recentOrders, setRecentOrders] = useState([])
  const [topStores, setTopStores] = useState([])
  const [pendingDisputes, setPendingDisputes] = useState([])

  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchDashboardData = () => {
      // Generate random stats
      const totalOrders = Math.floor(Math.random() * 1000) + 500
      const pendingOrders = Math.floor(Math.random() * 50) + 10
      const totalRevenue = Math.floor(Math.random() * 50000) + 10000
      const activeRiders = riders.filter((rider) => rider.status === "active").length
      const totalStores = supermarkets.length
      const totalProducts = products.length
      const pendingDisputes = Math.floor(Math.random() * 10) + 1

      setStats({
        totalOrders,
        pendingOrders,
        totalRevenue,
        activeRiders,
        totalStores,
        totalProducts,
        pendingDisputes,
      })

      // Generate random recent orders
      const orders = []
      for (let i = 0; i < 5; i++) {
        const randomSupermarket = supermarkets[Math.floor(Math.random() * supermarkets.length)]
        const randomRider = riders[Math.floor(Math.random() * riders.length)]

        orders.push({
          id: 100000 + Math.floor(Math.random() * 900000),
          customer: `Customer ${i + 1}`,
          store: randomSupermarket.name,
          total: (Math.random() * 100 + 20).toFixed(2),
          status: ["processing", "delivering", "delivered"][Math.floor(Math.random() * 3)],
          date: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString().split("T")[0],
          rider: randomRider.name,
        })
      }

      setRecentOrders(orders)

      // Generate top performing stores
      const stores = [...supermarkets]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5)
        .map((store) => ({
          ...store,
          orders: Math.floor(Math.random() * 100) + 50,
          revenue: Math.floor(Math.random() * 10000) + 1000,
        }))

      setTopStores(stores)

      // Generate random disputes
      const disputes = []
      for (let i = 0; i < pendingDisputes; i++) {
        const randomSupermarket = supermarkets[Math.floor(Math.random() * supermarkets.length)]
        const randomRider = riders[Math.floor(Math.random() * riders.length)]

        disputes.push({
          id: 1000 + i,
          orderId: 100000 + Math.floor(Math.random() * 900000),
          store: randomSupermarket.name,
          rider: randomRider.name,
          customer: `Customer ${i + 1}`,
          issue: ["Missing items", "Late delivery", "Wrong items", "Damaged items"][Math.floor(Math.random() * 4)],
          date: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString().split("T")[0],
        })
      }

      setPendingDisputes(disputes)
    }

    fetchDashboardData()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Platform Overview</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Total Orders</h2>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Active Stores</h2>
          <p className="text-3xl font-bold">{stats.totalStores}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Active Riders</h2>
          <p className="text-3xl font-bold">{stats.activeRiders}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Performing Stores */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">Top Performing Stores</h2>
            <Link href="/admin/stores" className="text-green-500 hover:text-green-600">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Store
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topStores.map((store) => (
                  <tr key={store.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{store.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${store.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Disputes */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">Pending Disputes</h2>
            <Link href="/admin/disputes" className="text-green-500 hover:text-green-600">
              View All
            </Link>
          </div>
          {pendingDisputes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingDisputes.map((dispute) => (
                    <tr key={dispute.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{dispute.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.issue}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link href={`/admin/disputes/${dispute.id}`} className="text-green-500 hover:text-green-600">
                          Resolve
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">No pending disputes</div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Link href="/admin/orders" className="text-green-500 hover:text-green-600">
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
                  Store
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rider
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.store}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        order.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "delivering"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.rider}</td>
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
            href="/admin/disputes"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 text-center"
          >
            Resolve Disputes ({stats.pendingDisputes})
          </Link>
          <Link
            href="/admin/payments"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-center"
          >
            Approve Payments
          </Link>
          <Link
            href="/admin/reports"
            className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 text-center"
          >
            Generate Reports
          </Link>
        </div>
      </div>
    </div>
  )
}
