"use client"

import { useState, useEffect } from "react"
import { riders, riderReviews } from "@/data/riders"

export default function RiderReviews() {
  const [rider, setRider] = useState(null)
  const [reviews, setReviews] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // In a real app, we would fetch the rider data based on the logged-in user
    // For demo purposes, we'll use the first rider from our mock data
    const mockRider = riders[0]
    setRider(mockRider)

    // Get reviews for this rider
    const riderReviewsData = riderReviews.filter((review) => review.riderId === mockRider.id)
    setReviews(riderReviewsData)
  }, [])

  const filteredReviews =
    filter === "all" ? reviews : reviews.filter((review) => review.rating === Number.parseInt(filter))

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : 0

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => review.rating === rating).length
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
    return { rating, count, percentage }
  })

  if (!rider) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Reviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Rating Summary */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden md:col-span-1">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Rating Summary</h2>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="text-center">
                <p className="text-5xl font-bold text-yellow-500">{averageRating}</p>
                <div className="flex items-center justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${star <= Math.round(averageRating) ? "text-yellow-500" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">Based on {reviews.length} reviews</p>
              </div>
            </div>

            <div className="space-y-3">
              {ratingCounts.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center">
                  <div className="w-12 text-sm text-gray-600">{rating} stars</div>
                  <div className="flex-1 h-4 mx-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <div className="w-9 text-sm text-gray-600">{count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden md:col-span-2">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">Customer Reviews</h2>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          {filteredReviews.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredReviews.map((review) => (
                <div key={review.id} className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{review.customerName}</h3>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${star <= review.rating ? "text-yellow-500" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-1">{review.comment}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">No reviews found for the selected filter.</div>
          )}
        </div>
      </div>
    </div>
  )
}
