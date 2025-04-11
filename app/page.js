import Link from "next/link"
import SupermarketCard from "@/components/supermarket-card"
import { supermarkets } from "@/data/supermarkets"
import LocationSearch from "@/components/location-search"

export default function Home() {
  return (
    <div>
      {/* Hero Section with Background Video */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/placeholder.svg?text=Grocery+Shopping+Video" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Fresh Groceries Delivered to Your Door</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            Order from your favorite local supermarkets and get everything delivered in minutes.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <LocationSearch />
              <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for any grocery item..."
                    className="w-full px-4 py-4 text-gray-700 focus:outline-none"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Supermarkets Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Top Supermarkets</h2>
            <Link href="/supermarkets" className="text-orange-600 hover:text-orange-700 font-medium">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supermarkets.map((supermarket) => (
              <SupermarketCard key={supermarket.id} supermarket={supermarket} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Fruits", "Vegetables", "Dairy", "Meat", "Bakery", "Beverages"].map((category) => (
              <Link
                key={category}
                href={`/shop?category=${category}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow text-center"
              >
                <div
                  className="h-32 bg-cover bg-center"
                  style={{ backgroundImage: `url(/placeholder.svg?text=${category}&height=150&width=150)` }}
                />
                <div className="p-4">
                  <h3 className="font-medium">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Store</h3>
              <p className="text-gray-600">Browse from our selection of local supermarkets near you.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Add Items to Cart</h3>
              <p className="text-gray-600">Select your favorite products and add them to your cart.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Your Delivery</h3>
              <p className="text-gray-600">Sit back and relax as we deliver your groceries to your doorstep.</p>
            </div>
          </div>

          <Link
            href="/shop"
            className="inline-block mt-12 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 font-medium"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  )
}
