"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { riders } from "@/data/riders"

export default function OrderConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const [order, setOrder] = useState(null)
  const [assignedRider, setAssignedRider] = useState(null)

  useEffect(() => {
    const storedOrder = localStorage.getItem(`order_${id}`)

    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder)
      setOrder(parsedOrder)

      // Assign a random rider for demo purposes
      const randomRider = riders[Math.floor(Math.random() * riders.length)]
      setAssignedRider(randomRider)

      // Update the order with the assigned rider
      const updatedOrder = {
        ...parsedOrder,
        rider: {
          id: randomRider.id,
          name: randomRider.name,
          phone: randomRider.phone,
          image: randomRider.image,
        },
      }

      localStorage.setItem(`order_${id}`, JSON.stringify(updatedOrder))
      setOrder(updatedOrder)
    }
  }, [id])

  if (!order) {
    return <div className="text-center py-12">Loading order details...</div>
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-green-50 p-8 rounded-lg mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-xl mb-4">Your order #{id} has been placed successfully.</p>
        <p className="text-gray-600">We've sent a confirmation email with your order details.</p>
      </div>

      {assignedRider && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Rider</h2>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
              <img
                src={assignedRider.image || "/placeholder.svg"}
                alt={assignedRider.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <p className="font-semibold">{assignedRider.name}</p>
              <p className="text-gray-600">{assignedRider.phone}</p>
              <p className="text-sm text-gray-500">Rating: {assignedRider.rating} ⭐</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Your rider will contact you when they pick up your order.</p>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
        <p className="mb-2">
          <strong>Address:</strong> {order.deliveryInfo.address}
        </p>
        <p className="mb-2">
          <strong>Estimated Delivery:</strong> {order.deliveryInfo.estimatedTime}
        </p>
        <p>
          <strong>Distance:</strong> {order.deliveryInfo.distance.toFixed(1)} km
        </p>
      </div>

      <div className="space-x-4">
        <Link href={`/order-tracking/${id}`} className="bg-green-500 text-white px-6 py-3 rounded-lg inline-block">
          Track Your Order
        </Link>
        <Link href="/" className="border border-gray-300 px-6 py-3 rounded-lg inline-block">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
