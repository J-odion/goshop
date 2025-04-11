"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, User } from "lucide-react"
import { useCart } from "@/context/cart-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cartContext = useCart()
  const cartItems = cartContext?.cartItems || []

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            Grocery Logistics
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-500 font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-orange-500 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-500 font-medium">
              Contact
            </Link>
            <Link href="/partner" className="text-gray-700 hover:text-orange-500 font-medium">
              Partner With Us
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="flex items-center text-gray-700 hover:text-orange-500">
              <User className="h-5 w-5 mr-1" />
              <span>Login</span>
            </Link>
            <Link
              href="/checkout"
              className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span>Cart {totalItems > 0 && `(${totalItems})`}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-orange-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-orange-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-orange-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/partner"
                className="text-gray-700 hover:text-orange-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Partner With Us
              </Link>
              <div className="flex items-center space-x-4 pt-2">
                <Link
                  href="/login"
                  className="flex items-center text-gray-700 hover:text-orange-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-1" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/checkout"
                  className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5 mr-1" />
                  <span>Cart {totalItems > 0 && `(${totalItems})`}</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
