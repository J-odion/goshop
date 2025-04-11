"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showRiderModal, setShowRiderModal] = useState(false)
  const [availableRiders, setAvailableRiders] = useState([])
  const [selectedRider, setSelectedRider] = useState("")

  useEffect(() => {
    // In a real app, we would fetch the order from an API
    // For demo purposes, we'll generate mock data
    setTimeout(() => {
      const mockOrder = {
        id: Number.parseInt(id),
        customer: {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "(555) 123-4567",
        },
        items: [
          {
            id: 1,
            name: "Organic Bananas",
            price: 2.99,
            quantity: 2,
            total: 5.98,
          },
          {
            id: 2,
            name: "Whole Milk",
            price: 3.49,
            quantity: 1,
            total: 3.49,
          },
          {
            id: 3,
            name: "Sourdough Bread",
            price: 4.99,
            quantity: 1,
            total: 4.99,
          },
        ],
        subtotal: 14.46,
        tax: 1.45,
        deliveryFee: 3.99,
        total: 19.9,
        status: ["pending", "preparing", "ready_for_pickup", "in_transit", "delivered"][Math.floor(Math.random() * 3)],
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        address: "123 Main St, Apt 4B, City, State 12345",
        paymentMethod: "Credit Card",
        notes: Math.random() > 0.5 ? "Please leave at the door" : "",
      }

      setOrder(mockOrder)
      setLoading(false)

      // Generate mock available riders
      const riders = []
      for (let i = 1; i <= 5; i++) {
        riders.push({
          id: i,
          name: `Rider ${i}`,
          rating: (3 + Math.random() * 2).toFixed(1),
          available: Math.random() > 0.3,
        })
      }

      setAvailableRiders(riders.filter((r) => r.available))
    }, 1000)
  }, [id])

  const handleStatusUpdate = (newStatus) => {
    setOrder({
      ...order,
      status: newStatus,
    })

    if (newStatus === "ready_for_pickup") {
      setShowRiderModal(true)
    }
  }

  const handleAssignRider = () => {
    if (!selectedRider) {
      alert("Please select a rider")
      return
    }

    const rider = availableRiders.find((r) => r.id === Number.parseInt(selectedRider))

    setOrder({
      ...order,
      status: "in_transit",
      rider: {
        id: rider.id,
        name: rider.name,
      },
    })

    setShowRiderModal(false)
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

  const getStatusActionButtonText = (currentStatus) => {
    const nextStatus = getNextStatus(currentStatus)

    if (!nextStatus) return null

    switch (nextStatus) {
      case "preparing":
        return "Start Preparing"
      case "ready_for_pickup":
        return "Mark Ready for Pickup"
      case "in_transit":
        return "Hand to Rider"
      default:
        return null
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading order details...</div>
  }

  if (!order) {
    return <div className="text-center py-12">Order not found</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-gray-600">
            Placed on {order.date} at {order.time}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(order.status)}`}>
            {order.status.replace(/_/g, " ")}
          </span>
          {getStatusActionButtonText(order.status) && (
            <button
              onClick={() => handleStatusUpdate(getNextStatus(order.status))}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              {getStatusActionButtonText(order.status)}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {order.customer.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order.customer.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {order.customer.phone}
            </p>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Address:</span> {order.address}
            </p>
            <p>
              <span className="font-medium">Payment Method:</span> {order.paymentMethod}
            </p>
            {order.notes && (
              <p>
                <span className="font-medium">Notes:</span> {order.notes}
              </p>
            )}
          </div>
        </div>

        {/* Rider Information (if assigned) */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Rider Information</h2>
          {order.rider ? (
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span> {order.rider.name}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {order.status === "in_transit" ? "Delivering" : "Delivered"}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No rider assigned yet</p>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Order Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  Subtotal
                </td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">${order.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  Tax
                </td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">${order.tax.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  Delivery Fee
                </td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">${order.deliveryFee.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                  Total
                </td>
                <td className="px-6 py-3 text-sm font-bold text-gray-900">${order.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="flex justify-between">
        <Link
          href="/supermarket-admin/orders"
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
        >
          Back to Orders
        </Link>

        {order.status === "pending" && (
          <button
            onClick={() => handleStatusUpdate("preparing")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Start Preparing
          </button>
        )}
      </div>

      {/* Rider Assignment Modal */}
      {showRiderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Assign Rider</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Available Rider</label>
              <select
                value={selectedRider}
                onChange={(e) => setSelectedRider(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">-- Select a Rider --</option>
                {availableRiders.map((rider) => (
                  <option key={rider.id} value={rider.id}>
                    {rider.name} (Rating: {rider.rating})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowRiderModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignRider}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Assign Rider
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
