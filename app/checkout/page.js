"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import DeliveryCalculator from "@/components/delivery-calculator"
import PaymentForm from "@/components/payment-form"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, clearCart, supermarket } = useCart()
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    distance: 0,
    cost: 0,
    estimatedTime: "",
  })
  const [step, setStep] = useState(1)

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const total = subtotal + deliveryInfo.cost

  const handleDeliveryCalculated = (info) => {
    setDeliveryInfo(info)
    setStep(2)
  }

  const handlePaymentComplete = () => {
    // Generate order ID
    const orderId = Math.floor(100000 + Math.random() * 900000)

    // In a real app, we would send this to a backend
    const order = {
      id: orderId,
      items: cartItems,
      supermarket,
      deliveryInfo,
      total,
      status: "processing",
      createdAt: new Date().toISOString(),
    }

    // Store in localStorage for demo purposes
    localStorage.setItem(`order_${orderId}`, JSON.stringify(order))

    // Clear cart and redirect to confirmation
    clearCart()
    router.push(`/order-confirmation/${orderId}`)
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-6">Add some items to your cart before proceeding to checkout.</p>
        <button onClick={() => router.push("/")} className="bg-green-500 text-white px-6 py-2 rounded-lg">
          Browse Supermarkets
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {step === 1 ? (
            <DeliveryCalculator supermarket={supermarket} onCalculated={handleDeliveryCalculated} />
          ) : (
            <PaymentForm total={total} onComplete={handlePaymentComplete} />
          )}
        </div>

        <div className="w-full md:w-80 bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.quantity} × {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery</span>
              <span>${deliveryInfo.cost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {deliveryInfo.estimatedTime && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm">
                Estimated delivery time: <strong>{deliveryInfo.estimatedTime}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
