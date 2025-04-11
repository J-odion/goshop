"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "@/components/product-card"
import { products } from "@/data/products"
import { supermarkets } from "@/data/supermarkets"
import { useCart } from "@/context/cart-context"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")

  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "All")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const cart = useCart()
  const { addToCart } = cart || { addToCart: () => {} }

  useEffect(() => {
    try {
      // Extract unique categories from all products
      const uniqueCategories = [...new Set(products.map((p) => p.category).filter(Boolean))]
      setCategories(["All", ...uniqueCategories])

      // Filter products based on selected category
      if (selectedCategory === "All") {
        setFilteredProducts(products)
      } else {
        setFilteredProducts(products.filter((p) => p.category === selectedCategory))
      }
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setIsLoading(false)
    }
  }, [selectedCategory])

  const handleAddToCart = (product) => {
    // Find the supermarket for this product
    const supermarket = supermarkets.find((s) => s.id === product.supermarketId) || {}

    const itemToAdd = {
      ...product,
      quantity: 1,
      supermarketName: supermarket.name || "Unknown Store",
      supermarketImage: supermarket.image || "/placeholder.svg",
      supermarketAddress: supermarket.address || "Address not available",
    }

    addToCart(itemToAdd)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shop Groceries</h1>

      {/* Category Navigation */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {selectedCategory === "All" ? "All Products" : selectedCategory}
          <span className="text-gray-500 text-lg ml-2">({filteredProducts.length} items)</span>
        </h2>

        {filteredProducts.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  discount: product.discount || 0,
                  rating: product.rating || 0,
                }}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
