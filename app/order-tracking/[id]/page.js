"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

const DELIVERY_STAGES = [
  { id: "processing", label: "Order Processing" },
  { id: "preparing", label: "Preparing Your Items" },
  { id: "ready_for_pickup", label: "Ready for Pickup" },
  { id: "picked_up", label: "Picked Up by Rider" },
  { id: "in_transit", label: "Out for Delivery" },
  { id: "delivered", label: "Delivered" },
]

export default function OrderTrackingPage() {
  const params = useParams()
  const { id } = params
  const [order, setOrder] = useState(null)
  const [currentStage, setCurrentStage] = useState(0)
  const [estimatedArrival, setEstimatedArrival] = useState("")
  const [mapUrl, setMapUrl] = useState("")
  const [isDeliveryVerified, setIsDeliveryVerified] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)

  useEffect(() => {
    const storedOrder = localStorage.getItem(`order_${id}`)

    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder)
      setOrder(parsedOrder)

      // For demo purposes, we'll simulate order progress
      const startTracking = () => {
        let stage = 0
        setCurrentStage(stage)

        const interval = setInterval(() => {
          if (stage < DELIVERY_STAGES.length - 1) {
            stage += 1
            setCurrentStage(stage)

            // Update the order in localStorage
            const updatedOrder = {
              ...parsedOrder,
              status: DELIVERY_STAGES[stage].id,
            }
            localStorage.setItem(`order_${id}`, JSON.stringify(updatedOrder))
            setOrder(updatedOrder)

            // Show verification modal when delivered
            if (stage === DELIVERY_STAGES.length - 1) {
              setTimeout(() => {
                setShowVerificationModal(true)
              }, 2000)
            }
          } else {
            clearInterval(interval)
          }
        }, 10000) // Move to next stage every 10 seconds for demo

        return () => clearInterval(interval)
      }

      // Calculate estimated arrival time (30-45 minutes from now for demo)
      const now = new Date()
      const deliveryMinutes = 30 + Math.floor(Math.random() * 15)
      const estimatedTime = new Date(now.getTime() + deliveryMinutes * 60000)
      const timeString = estimatedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      setEstimatedArrival(timeString)

      // Set a placeholder map URL (in a real app, this would be a real map)
      setMapUrl("/placeholder.svg?text=Delivery+Map&height=300&width=600")

      // Start the tracking simulation
      const cleanup = startTracking()
      return cleanup
    }
  }, [id])

  const handleVerifyDelivery = () => {
    setIsDeliveryVerified(true)
    setShowVerificationModal(false)

    // Create a payment for the rider
    const payment = {
      id: Math.floor(Math.random() * 1000) + 1000,
      riderId: order.rider?.id || 1,
      amount: order.total * 0.1, // 10% of order total for demo
      status: "pending",
      orderId: Number.parseInt(id),
      date: new Date().toISOString().split("T")[0],
    }

    // In a real app, we would send this to the server
    // For demo purposes, we'll just log it
    console.log("Created rider payment:", payment)

    // Update the order in localStorage
    const updatedOrder = {
      ...order,
      deliveryVerified: true,
      riderPayment: payment,
    }
    localStorage.setItem(`order_${id}`, JSON.stringify(updatedOrder))
    setOrder(updatedOrder)
  }

  if (!order) {
    return <div className="text-center py-12">Loading tracking information...</div>
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
      <p className="text-gray-600 mb-8">
        Order #{id} from {order.supermarket?.name || "Supermarket"}
      </p>

      {/* Rider Info */}
      {order.rider && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Rider</h2>
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
              <img
                src={order.rider.image || "/placeholder.svg"}
                alt={order.rider.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold">{order.rider.name}</p>
              <p className="text-gray-600">{order.rider.phone}</p>
              <div className="mt-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    order.status === "picked_up"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "in_transit"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status === "picked_up"
                    ? "Confirmed Pickup"
                    : order.status === "in_transit"
                      ? "On the way"
                      : "Assigned"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Estimated Arrival</h2>
          <span className="text-xl font-bold">{estimatedArrival}</span>
        </div>

        <div className="relative pt-1 mb-8">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-200 text-green-600">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-green-600">
                {Math.round((currentStage / (DELIVERY_STAGES.length - 1)) * 100)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${(currentStage / (DELIVERY_STAGES.length - 1)) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"
            ></div>
          </div>
        </div>

        <div className="space-y-6">
          {DELIVERY_STAGES.map((stage, index) => (
            <div key={stage.id} className="flex items-start">
              <div
                className={`relative flex items-center justify-center w-8 h-8 rounded-full mr-4 ${
                  index <= currentStage ? "bg-green-500 text-white" : "bg-gray-200"
                }`}
              >
                {index < currentStage ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
                {index < DELIVERY_STAGES.length - 1 && (
                  <div
                    className={`absolute top-8 left-1/2 w-0.5 h-12 -translate-x-1/2 ${
                      index < currentStage ? "bg-green-500" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
              <div>
                <h3 className={`font-medium ${index <= currentStage ? "text-green-500" : "text-gray-500"}`}>
                  {stage.label}
                </h3>
                {index === currentStage && (
                  <p className="text-sm text-gray-600 mt-1">
                    {index === 0 && "We've received your order and are processing it."}
                    {index === 1 && "Your items are being prepared and packed."}
                    {index === 2 && "Your order is packed and ready for pickup."}
                    {index === 3 && "Your rider has picked up your order from the store."}
                    {index === 4 && "Your order is on its way to you!"}
                    {index === 5 && "Your order has been delivered. Enjoy!"}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {isDeliveryVerified && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
            <p className="text-green-600 font-medium">You have verified the delivery. Thank you!</p>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Delivery Location</h2>
        <div className="rounded-lg overflow-hidden mb-4">
          <img src={mapUrl || "/placeholder.svg"} alt="Delivery map" className="w-full h-64 object-cover" />
        </div>
        <p className="text-gray-600">{order.deliveryInfo?.address || "Your delivery address"}</p>
      </div>

      <div className="text-center">
        <Link href="/" className="bg-green-500 text-white px-6 py-3 rounded-lg inline-block">
          Back to Home
        </Link>
      </div>

      {/* Delivery Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Verify Delivery</h2>
            <p className="mb-6">
              Has your order been delivered successfully? Confirming delivery will release payment to your rider.
            </p>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowVerificationModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Not Yet
              </button>
              <button
                onClick={handleVerifyDelivery}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Confirm Delivery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
