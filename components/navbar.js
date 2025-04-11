"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const { cartItems } = useCart()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  // Don't show cart link on checkout or order pages
  const showCartLink =
    !pathname.includes("/checkout") &&
    !pathname.includes("/order-confirmation") &&
    !pathname.includes("/order-tracking")

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600">
          Grocery Logistics
        </Link>

        <nav className="flex items-center">
          <ul className="flex items-center space-x-6">
            <li>
              <Link
                href="/"
                className={`${pathname === "/" ? "text-green-600" : "text-gray-600"} hover:text-green-600`}
              >
                Home
              </Link>
            </li>
            {showCartLink && cartItems.length > 0 && (
              <li>
                <Link href="/checkout" className="flex items-center text-gray-600 hover:text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-1"
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
                  Cart ({totalItems})
                </Link>
              </li>
            )}
          </ul>

          <div className="ml-6 relative">
            {user ? (
              <div className="relative">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={user.image || "/placeholder.svg"}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <span className="hidden md:inline-block text-sm">{user.name}</span>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    {user.role === "admin" && (
                      <Link
                        href="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    {user.role === "rider" && (
                      <Link
                        href="/rider/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Rider Dashboard
                      </Link>
                    )}

                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Account
                    </Link>

                    <button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="flex items-center text-gray-600 hover:text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="hidden md:inline-block">Sign In</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
