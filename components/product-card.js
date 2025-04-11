"use client"

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  // Ensure product has all required properties with defaults
  const {
    id = 0,
    name = "Product",
    category = "Uncategorized",
    price = 0,
    discount = 0,
    rating = 0,
    image = "/placeholder.svg?height=192&width=384",
    supermarketId = 0,
    supermarketName = "",
  } = product || {}

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity)

      // Show added animation
      setIsAdding(true)
      setTimeout(() => setIsAdding(false), 1000)

      // Reset quantity
      setQuantity(1)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={name} fill style={{ objectFit: "cover" }} />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-500">{category}</p>
          {supermarketName && (
            <Link href={`/supermarket/${supermarketId}`} className="text-xs text-orange-600 hover:underline">
              {supermarketName}
            </Link>
          )}
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            {discount > 0 ? (
              <>
                <span className="text-lg font-bold text-orange-600">
                  ${((price || 0) * (1 - discount / 100)).toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through ml-2">${(price || 0).toFixed(2)}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-800">${(price || 0).toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center text-sm">
            <span className="text-orange-500 mr-1">★</span>
            <span>{rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <button
              onClick={handleDecrement}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 py-1">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className={`${
              isAdding ? "bg-orange-600" : "bg-orange-500 hover:bg-orange-600"
            } text-white px-3 py-1 rounded-md transition-colors duration-200`}
          >
            {isAdding ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  )
}
