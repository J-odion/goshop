"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Mock user data
const MOCK_USERS = {
  "user@example.com": {
    id: "user1",
    name: "John Doe",
    email: "user@example.com",
    role: "user",
    image: "/placeholder.svg?text=John+Doe&height=40&width=40",
  },
  "admin@example.com": {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    image: "/placeholder.svg?text=Admin&height=40&width=40",
  },
  "rider@example.com": {
    id: "rider1",
    name: "Rider One",
    email: "rider@example.com",
    role: "rider",
    image: "/placeholder.svg?text=Rider&height=40&width=40",
  },
}

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Mock Google login
  const loginWithGoogle = (role = "user") => {
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      let mockUser

      if (role === "admin") {
        mockUser = MOCK_USERS["admin@example.com"]
      } else if (role === "rider") {
        mockUser = MOCK_USERS["rider@example.com"]
      } else {
        mockUser = MOCK_USERS["user@example.com"]
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))

      // Redirect based on role
      if (mockUser.role === "admin") {
        router.push("/admin/dashboard")
      } else if (mockUser.role === "rider") {
        router.push("/rider/dashboard")
      } else {
        router.push("/")
      }

      setLoading(false)
    }, 1000)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
