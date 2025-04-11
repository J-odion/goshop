"use client"

import { useState } from "react"

export default function PaymentForm({ total, onComplete }) {
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setFormData({ ...formData, [name]: formatted })
      return
    }

    // Format expiry date
    if (name === "expiry") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substring(0, 5)
      setFormData({ ...formData, [name]: formatted })
      return
    }

    setFormData({ ...formData, [name]: value })
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.cardName.trim()) {
      newErrors.cardName = "Name is required"
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required"
    } else if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits"
    }

    if (!formData.expiry.trim()) {
      newErrors.expiry = "Expiry date is required"
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "Invalid format (MM/YY)"
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required"
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onComplete()
    }, 2000)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
            Name on Card
          </label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.cardName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            maxLength="19" // 16 digits + 3 spaces
            placeholder="1234 5678 9012 3456"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.cardNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength="5"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.expiry ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.expiry && <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>}
          </div>

          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              maxLength="4"
              placeholder="123"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.cvv ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Total Payment</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-600">
            By clicking "Complete Payment", you agree to our terms and conditions.
          </p>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          {isProcessing ? "Processing..." : "Complete Payment"}
        </button>
      </form>
    </div>
  )
}
