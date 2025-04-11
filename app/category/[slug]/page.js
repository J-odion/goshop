"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const { slug } = params

  useEffect(() => {
    // Redirect to the shop page with the category as a query parameter
    router.replace(`/shop?category=${slug}`)
  }, [router, slug])

  return (
    <div className="container mx-auto p-4 flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Redirecting to {slug} products...</div>
    </div>
  )
}
