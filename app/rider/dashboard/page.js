"use client"

import { useState, useEffect } from "react"
import { riders, riderReviews, riderPayments } from "@/data/riders"

export default function RiderDashboard() {
  const [rider, setRider] = useState(null)
  const [reviews, setReviews] = useState([])
  const [payments, setPayments] = useState([])
  const [activeDeliveries, setActiveDeliveries] = useState([])

  useEffect(() => {
    // In a real app, we would fetch the rider data based on the logged-in user
    // For demo purposes, we'll use the first rider from our mock data
    const mockRider = riders[0]
    setRider(mockRider)

    // Get reviews for this rider
    const riderReviewsData = riderReviews.filter((review) => review.riderId === mockRider.id)
    setReviews(riderReviewsData)

    // Get payments for this rider
    const riderPaymentsData = riderPayments.filter((payment) => payment.riderId === mockRider.id)
    setPayments(riderPaymentsData)

    // Generate mock active deliveries
    const mockDeliveries = []
    for (let i = 0; i < 2; i++) {
      mockDeliveries.push({
        id: 1000 + i,
        customer: `Customer ${i + 1}`,
        address: `${123 + i} Main St, Anytown`,
        items: Math.floor(Math.random() * 5) + 1,
        total: (Math.random() * 50 + 20).toFixed(2),
        status: i === 0 ? "picking_up" : "delivering",
        estimatedDelivery: new Date(Date.now() + (i + 1) * 20 * 60000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      })
    }
    setActiveDeliveries(mockDeliveries)
  }, [])

  if (!rider) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Rider Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Rating</h2>
          <p className="text-3xl font-bold">{rider.rating} ⭐</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Total Deliveries</h2>
          <p className="text-3xl font-bold">{rider.totalDeliveries}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Today's Earnings</h2>
          <p className="text-3xl font-bold">
            $
            {payments
              .filter((p) => p.date === new Date().toISOString().split("T")[0])
              .reduce((sum, p) => sum + p.amount, 0)
              .toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">Status</h2>
          <p className="text-3xl font-bold capitalize">{rider.status}</p>
        </div>
      </div>

      {/* Active Deliveries */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Active Deliveries</h2>
        </div>

        {activeDeliveries.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {activeDeliveries.map((delivery) => (
              <div key={delivery.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Order #{delivery.id}</h3>
                    <p className="text-gray-600">{delivery.customer}</p>
                    <p className="text-gray-600">{delivery.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${delivery.total}</p>
                    <p className="text-sm text-gray-500">{delivery.items} items</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${delivery.status === "picking_up" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}
                    >
                      {delivery.status === "picking_up" ? "Picking Up" : "Delivering"}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">Est. delivery by {delivery.estimatedDelivery}</span>
                  </div>

                  <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                    {delivery.status === "picking_up" ? "Start Delivery" : "Complete Delivery"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">No active deliveries at the moment.</div>
        )}
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Reviews</h2>
        </div>

        {reviews.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{review.customerName}</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">{review.rating}</span>
                    <span className="text-yellow-500">⭐</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-1">{review.comment}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">No reviews yet.</div>
        )}

        {reviews.length > 3 && (
          <div className="p-4 border-t text-center">
            <a href="/rider/reviews" className="text-green-600 hover:text-green-800">
              View all reviews
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
