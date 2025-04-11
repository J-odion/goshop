"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [supermarket, setSupermarket] = useState(null)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    const storedSupermarket = localStorage.getItem("supermarket")

    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }

    if (storedSupermarket) {
      setSupermarket(JSON.parse(storedSupermarket))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  // Save supermarket to localStorage whenever it changes
  useEffect(() => {
    if (supermarket) {
      localStorage.setItem("supermarket", JSON.stringify(supermarket))
    }
  }, [supermarket])

  const addToCart = (item) => {
    // Check if we're adding from a different supermarket
    if (cartItems.length > 0 && item.supermarketId !== cartItems[0].supermarketId) {
      if (!window.confirm("Adding items from a different supermarket will clear your current cart. Continue?")) {
        return
      }
      setCartItems([item])
      return
    }

    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id)

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      const updatedItems = [...cartItems]
      updatedItems[existingItemIndex].quantity += item.quantity
      setCartItems(updatedItems)
    } else {
      // Add new item
      setCartItems([...cartItems, item])
    }

    // Set supermarket if not already set
    if (!supermarket) {
      setSupermarket({
        id: item.supermarketId,
        name: item.supermarketName,
        image: item.supermarketImage,
        address: item.supermarketAddress,
      })
    }
  }

  const updateCartItemQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }

    const updatedItems = cartItems.map((item) => (item.id === itemId ? { ...item, quantity } : item))

    setCartItems(updatedItems)
  }

  const removeFromCart = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId)
    setCartItems(updatedItems)

    // Clear supermarket if cart is empty
    if (updatedItems.length === 0) {
      setSupermarket(null)
      localStorage.removeItem("supermarket")
    }
  }

  const clearCart = () => {
    setCartItems([])
    setSupermarket(null)
    localStorage.removeItem("cart")
    localStorage.removeItem("supermarket")
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        supermarket,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
