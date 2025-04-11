"use client"

import { useState } from "react"

export default function DeliveryCalculator({ supermarket, onCalculated }) {
  const [address, setAddress] = useState("")
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!address.trim()) {
      setError("Please enter a delivery address")
      return
    }

    setError("")
    setIsCalculating(true)

    // Simulate API call to calculate distance and delivery cost
    setTimeout(() => {
      // Generate a random distance between 1 and 10 km
      const distance = 1 + Math.random() * 9

      // Calculate delivery cost based on distance
      // Base fee of $2.99 plus $1 per km
      const cost = 2.99 + distance * 1

      // Calculate estimated delivery time
      const now = new Date()
      const deliveryMinutes = 30 + Math.floor(distance * 3) // 30 mins + 3 mins per km
      const estimatedTime = new Date(now.getTime() + deliveryMinutes * 60000)
      const timeString = estimatedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      onCalculated({
        address,
        distance,
        cost,
        estimatedTime: timeString,
      })

      setIsCalculating(false)
    }, 1500)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>

      <div className="mb-6">
        <p className="text-gray-600 mb-2">Delivering from:</p>
        <div className="flex items-start">
          <div
            className="w-16 h-16 bg-cover bg-center rounded-md mr-3"
            style={{ backgroundImage: `url(${supermarket.image})` }}
          />
          <div>
            <h3 className="font-medium">{supermarket.name}</h3>
            <p className="text-sm text-gray-500">{supermarket.address}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your full address"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={isCalculating}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          {isCalculating ? "Calculating..." : "Calculate Delivery"}
        </button>
      </form>
    </div>
  )
}
