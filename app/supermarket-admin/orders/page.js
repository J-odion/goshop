"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function SupermarketAdminOrders() {
  const searchParams = useSearchParams()
  const statusFilter = searchParams.get("status")

  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [selectedStatus, setSelectedStatus] = useState(statusFilter || "all")

  useEffect(() => {
    // In a real app, we would fetch orders from an API
    // For demo purposes, we'll generate mock data
    const mockOrders = []
    const statuses = ["pending", "preparing", "ready_for_pickup", "in_transit", "delivered"]

    for (let i = 0; i < 20; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const orderDate = new Date(Date.now() - Math.random() * 86400000 * 7)

      mockOrders.push({
        id: 100000 + i,
        customer: `Customer ${i + 1}`,
        items: Math.floor(Math.random() * 10) + 1,
        total: (Math.random() * 100 + 20).toFixed(2),
        status,
        date: orderDate.toISOString().split("T")[0],
        time: orderDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        address: `${Math.floor(Math.random() * 1000) + 1} Main St, City`,
        rider: status === "in_transit" || status === "delivered" ? `Rider ${Math.floor(Math.random() * 5) + 1}` : null,
      })
    }

    setOrders(mockOrders)
  }, [])

  useEffect(() => {
    if (selectedStatus === "all") {
      setFilteredOrders(orders)
    } else {
      setFilteredOrders(orders.filter((order) => order.status === selectedStatus))
    }
  }, [selectedStatus, orders])

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value)
  }

  const handleStatusUpdate = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus }
      }
      return order
    })

    setOrders(updatedOrders)
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "preparing":
        return "bg-blue-100 text-blue-800"
      case "ready_for_pickup":
        return "bg-purple-100 text-purple-800"
      case "in_transit":
        return "bg-indigo-100 text-indigo-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "pending":
        return "preparing"
      case "preparing":
        return "ready_for_pickup"
      case "ready_for_pickup":
        return "in_transit"
      default:
        return null
    }
  }

  const getStatusActionButton = (order) => {
    const nextStatus = getNextStatus(order.status)

    if (!nextStatus) return null

    let buttonText = ""
    switch (nextStatus) {
      case "preparing":
        buttonText = "Start Preparing"
        break
      case "ready_for_pickup":
        buttonText = "Mark Ready"
        break
      case "in_transit":
        buttonText = "Hand to Rider"
        break
    }

    return (
      <button
        onClick={() => handleStatusUpdate(order.id, nextStatus)}
        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
      >
        {buttonText}
      </button>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <div className="flex items-center">
          <label htmlFor="status-filter" className="mr-2 text-gray-700">
            Filter by Status:
          </label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready_for_pickup">Ready for Pickup</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}
                    >
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date} at {order.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                    <Link href={`/supermarket-admin/orders/${order.id}`} className="text-blue-500 hover:text-blue-700">
                      View
                    </Link>
                    {getStatusActionButton(order)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
