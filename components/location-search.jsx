"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

export default function LocationSearch() {
  const [location, setLocation] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
    if (e.target.value.length > 2) {
      setIsDropdownOpen(true)
    } else {
      setIsDropdownOpen(false)
    }
  }

  const selectLocation = (loc) => {
    setLocation(loc)
    setIsDropdownOpen(false)
  }

  // Mock locations for demo
  const mockLocations = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ"]

  const filteredLocations = mockLocations.filter((loc) => loc.toLowerCase().includes(location.toLowerCase()))

  return (
    <div className="relative w-full md:w-64">
      <div className="flex items-center px-4 py-4 text-gray-700">
        <MapPin className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Enter your location"
          className="w-full focus:outline-none"
          value={location}
          onChange={handleLocationChange}
        />
      </div>

      {isDropdownOpen && filteredLocations.length > 0 && (
        <div className="absolute z-10 w-full bg-white shadow-lg rounded-b-lg max-h-60 overflow-y-auto">
          {filteredLocations.map((loc, index) => (
            <div key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => selectLocation(loc)}>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <span>{loc}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
