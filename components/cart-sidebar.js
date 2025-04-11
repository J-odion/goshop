"use client"

import { useCart } from "@/context/cart-context"
import Link from "next/link"
import Image from "next/image"

export default function CartSidebar({ onClose }) {
  // Get cart context with fallback values
  const cartContext = useCart() || {}
  const {
    cartItems = [],
    supermarket = null,
    updateCartItemQuantity = () => {},
    removeFromCart = () => {},
  } = cartContext

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = supermarket?.deliveryFee || 0
  const total = subtotal + deliveryFee

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          {onClose && (
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="text-center py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-gray-500">Your cart is empty</p>
          <Link href="/" className="mt-4 inline-block text-orange-500 hover:text-orange-600">
            Browse Supermarkets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Cart</h2>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {supermarket && (
        <div className="flex items-center mb-4 pb-4 border-b">
          <div className="w-12 h-12 relative rounded-full overflow-hidden mr-3">
            <Image
              src={supermarket.image || "/placeholder.svg?height=48&width=48"}
              alt={supermarket.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <h3 className="font-medium">{supermarket.name}</h3>
            <p className="text-sm text-gray-500">{supermarket.address}</p>
          </div>
        </div>
      )}

      <div className="max-h-80 overflow-y-auto mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center py-3 border-b">
            <div className="w-16 h-16 relative rounded overflow-hidden mr-3">
              <Image
                src={item.image || "/placeholder.svg?height=64&width=64"}
                alt={item.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{item.name}</h4>
              <div className="flex items-center mt-1">
                <div className="flex items-center border rounded-md mr-2">
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-0.5 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-2 py-0.5 text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-0.5 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Remove item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="text-right">
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="block w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white text-center rounded-md transition-colors"
      >
        Proceed to Checkout
      </Link>
    </div>
  )
}
