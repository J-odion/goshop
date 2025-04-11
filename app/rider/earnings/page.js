"use client"

import { useState, useEffect } from "react"
import { riders, riderPayments } from "@/data/riders"

export default function RiderEarnings() {
  const [rider, setRider] = useState(null)
  const [payments, setPayments] = useState([])
  const [filter, setFilter] = useState("all")
  const [dateRange, setDateRange] = useState("week")

  useEffect(() => {
    // In a real app, we would fetch the rider data based on the logged-in user
    // For demo purposes, we'll use the first rider from our mock data
    const mockRider = riders[0]
    setRider(mockRider)

    // Get payments for this rider
    const riderPaymentsData = riderPayments.filter((payment) => payment.riderId === mockRider.id)

    // Add more mock payments for demo purposes
    const today = new Date()
    const additionalPayments = []

    for (let i = 1; i <= 10; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)

      additionalPayments.push({
        id: 100 + i,
        riderId: mockRider.id,
        amount: Math.floor(Math.random() * 20) + 10,
        status: Math.random() > 0.3 ? "approved" : "pending",
        orderId: 12300 + i,
        date: date.toISOString().split("T")[0],
      })
    }

    setPayments([...riderPaymentsData, ...additionalPayments])
  }, [])

  // Filter payments based on status and date range
  const filteredPayments = payments.filter((payment) => {
    // Filter by status
    if (filter !== "all" && payment.status !== filter) {
      return false
    }

    // Filter by date range
    const paymentDate = new Date(payment.date)
    const today = new Date()

    if (dateRange === "today") {
      const todayStr = today.toISOString().split("T")[0]
      return payment.date === todayStr
    } else if (dateRange === "week") {
      const weekAgo = new Date(today)
      weekAgo.setDate(today.getDate() - 7)
      return paymentDate >= weekAgo
    } else if (dateRange === "month") {
      const monthAgo = new Date(today)
      monthAgo.setMonth(today.getMonth() - 1)
      return paymentDate >= monthAgo
    }

    return true
  })

  // Calculate totals
  const totalEarnings = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const pendingEarnings = filteredPayments
    .filter((payment) => payment.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const approvedEarnings = filteredPayments
    .filter((payment) => payment.status === "approved")
    .reduce((sum, payment) => sum + payment.amount, 0)

  if (!rider) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Earnings</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Payments</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Total Earnings</h2>
          <p className="text-3xl font-bold">${totalEarnings.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Pending</h2>
          <p className="text-3xl font-bold">${pendingEarnings.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Approved</h2>
          <p className="text-3xl font-bold">${approvedEarnings.toFixed(2)}</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Payment History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{payment.orderId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${payment.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                    No payments found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
