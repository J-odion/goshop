"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { supermarkets } from "@/data/supermarkets"
import { products } from "@/data/products"
import ProductCard from "@/components/product-card"
import CartSidebar from "@/components/cart-sidebar"
import { useCart } from "@/context/cart-context"
import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"

// Dynamically import the map components to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>,
})

export default function SupermarketPage() {
  const { id } = useParams()
  const [supermarket, setSupermarket] = useState(null)
  const [supermarketProducts, setSupermarketProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [categories, setCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const cart = useCart()
  const { addToCart } = cart || { addToCart: () => {} }

  useEffect(() => {
    try {
      // Find the supermarket by ID
      const parsedId = Number.parseInt(id)
      const foundSupermarket = supermarkets.find((s) => s.id === parsedId)

      if (foundSupermarket) {
        setSupermarket(foundSupermarket)

        // Get products for this supermarket
        const productsForSupermarket = products.filter((p) => p.supermarketId === parsedId)
        setSupermarketProducts(productsForSupermarket)

        // Extract unique categories
        const uniqueCategories = [...new Set(productsForSupermarket.map((p) => p.category))]
        setCategories(["All", ...uniqueCategories])

        // Set filtered products initially to all products
        setFilteredProducts(productsForSupermarket)
      }
    } catch (error) {
      console.error("Error loading supermarket data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(supermarketProducts)
    } else {
      setFilteredProducts(supermarketProducts.filter((p) => p.category === selectedCategory))
    }
  }, [selectedCategory, supermarketProducts])

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading supermarket information...</div>
      </div>
    )
  }

  if (!supermarket) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Supermarket not found</div>
      </div>
    )
  }

  // Ensure all properties have default values to prevent undefined errors
  const {
    name = "Supermarket",
    address = "Address not available",
    rating = 0,
    reviewCount = 0,
    isOpen = false,
    deliveryFee = 0,
    deliveryTime = "N/A",
    minimumOrder = 0,
    deliveryRadius = 0,
    hours = "Not available",
    phone = "Not available",
    location = [40.7128, -74.006], // Default to NYC coordinates
  } = supermarket

  return (
    <div className="container mx-auto p-4">
      {/* Supermarket Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
            <p className="text-gray-600 mt-2">{address}</p>
            <div className="flex items-center mt-2">
              <span className="text-orange-500 mr-1">★</span>
              <span className="font-medium">{rating}</span>
              <span className="text-gray-500 ml-1">({reviewCount} reviews)</span>
              <span className="mx-2">•</span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${isOpen ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-800"}`}
              >
                {isOpen ? "Open Now" : "Closed"}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-600">
              <span className="font-medium">Delivery Fee:</span> ${deliveryFee.toFixed(2)}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Delivery Time:</span> {deliveryTime}
            </p>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="mb-6 overflow-x-auto">
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

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Products Grid */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h2>

          {filteredProducts.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    discount: product.discount || 0,
                    rating: product.rating || 0,
                  }}
                  onAddToCart={() => {
                    const itemToAdd = {
                      ...product,
                      quantity: 1,
                      supermarketId: supermarket.id,
                      supermarketName: name,
                      supermarketImage: supermarket.image,
                      supermarketAddress: address,
                    }
                    addToCart(itemToAdd)
                  }}
                />
              ))}
            </div>
          )}

          {/* Supermarket Information */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">About {name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Store Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <span className="font-medium">Address:</span> {address}
                  </li>
                  <li>
                    <span className="font-medium">Hours:</span> {hours}
                  </li>
                  <li>
                    <span className="font-medium">Phone:</span> {phone}
                  </li>
                  <li>
                    <span className="font-medium">Website:</span>{" "}
                    <a href="#" className="text-orange-500 hover:underline">
                      www.{name.toLowerCase().replace(/\s+/g, "")}.com
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Delivery Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <span className="font-medium">Delivery Fee:</span> ${deliveryFee.toFixed(2)}
                  </li>
                  <li>
                    <span className="font-medium">Estimated Time:</span> {deliveryTime}
                  </li>
                  <li>
                    <span className="font-medium">Minimum Order:</span> ${minimumOrder.toFixed(2)}
                  </li>
                  <li>
                    <span className="font-medium">Delivery Area:</span> Within {deliveryRadius} miles
                  </li>
                </ul>
              </div>
            </div>

            {/* Map */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Location</h3>
              <div className="h-64 rounded-lg overflow-hidden border border-gray-200">
                <MapWithNoSSR location={location} name={name} address={address} />
              </div>
            </div>
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="w-full lg:w-80">
          <CartSidebar />
        </div>
      </div>
    </div>
  )
}
