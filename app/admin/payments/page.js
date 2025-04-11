"use client"

import { useState, useEffect } from "react"
import { riderPayments } from "@/data/riders"
import { riders } from "@/data/riders"

export default function AdminPayments() {
  const [payments, setPayments] = useState([])
  const [selectedStatus, setSelectedStatus] = useState("all")

  useEffect(() => {
    // Combine rider data with payments
    const enhancedPayments = riderPayments.map((payment) => {
      const rider = riders.find((r) => r.id === payment.riderId)
      return {
        ...payment,
        riderName: rider ? rider.name : "Unknown Rider",
        riderImage: rider ? rider.image : "/placeholder.svg",
      }
    })

    setPayments(enhancedPayments)
  }, [])

  const filteredPayments =
    selectedStatus === "all" ? payments : payments.filter((payment) => payment.status === selectedStatus)

  const handleApprovePayment = (paymentId) => {
    const updatedPayments = payments.map((payment) => {
      if (payment.id === paymentId) {
        return {
          ...payment,
          status: "approved",
        }
      }
      return payment
    })

    setPayments(updatedPayments)
  }

  const handleApproveAll = () => {
    if (window.confirm("Are you sure you want to approve all pending payments?")) {
      const updatedPayments = payments.map((payment) => {
        if (payment.status === "pending") {
          return {
            ...payment,
            status: "approved",
          }
        }
        return payment
      })

      setPayments(updatedPayments)
    }
  }

  const totalPending = payments
    .filter((payment) => payment.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Rider Payments</h1>

        <div className="flex items-center space-x-4">
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Payments</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>

          <button
            onClick={handleApproveAll}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            disabled={!payments.some((payment) => payment.status === "pending")}
          >
            Approve All Pending
          </button>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 mb-1">Total Pending</p>
            <p className="text-2xl font-bold">${totalPending.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Pending Payments</p>
            <p className="text-2xl font-bold">{payments.filter((p) => p.status === "pending").length}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Today's Date</p>
            <p className="text-2xl font-bold">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          src={payment.riderImage || "/placeholder.svg"}
                          alt={payment.riderName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{payment.riderName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{payment.orderId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${payment.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {payment.status === "pending" ? (
                      <button
                        onClick={() => handleApprovePayment(payment.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-gray-400">Approved</span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No payments found
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
