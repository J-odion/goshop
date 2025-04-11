"use client"

import { useState, useEffect } from "react"
import { riders } from "@/data/riders"
import Image from "next/image"

export default function RiderProfile() {
  const [rider, setRider] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    bankDetails: {
      accountName: "",
      accountNumber: "",
      bankName: "",
    },
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // In a real app, we would fetch the rider data based on the logged-in user
    // For demo purposes, we'll use the first rider from our mock data
    const mockRider = riders[0]
    setRider(mockRider)

    setFormData({
      name: mockRider.name,
      email: mockRider.email,
      phone: mockRider.phone,
      vehicle: mockRider.vehicle,
      bankDetails: {
        accountName: mockRider.bankDetails.accountName,
        accountNumber: "",
        bankName: mockRider.bankDetails.bankName,
      },
    })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name.startsWith("bank.")) {
      const bankField = name.split(".")[1]
      setFormData({
        ...formData,
        bankDetails: {
          ...formData.bankDetails,
          [bankField]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // In a real app, we would send this data to the server
    // For demo purposes, we'll just update the local state
    setRider({
      ...rider,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      vehicle: formData.vehicle,
      bankDetails: {
        accountName: formData.bankDetails.accountName,
        accountNumber: formData.bankDetails.accountNumber
          ? `****${formData.bankDetails.accountNumber.slice(-4)}`
          : rider.bankDetails.accountNumber,
        bankName: formData.bankDetails.bankName,
      },
    })

    setIsEditing(false)
  }

  if (!rider) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Profile Information</h2>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="w-40 h-40 relative rounded-full overflow-hidden mb-4">
                    <Image src={rider.image || "/placeholder.svg"} alt={rider.name} fill className="object-cover" />
                  </div>
                  <p className="text-sm text-gray-500">Profile picture can only be changed by admin</p>
                </div>

                <div className="md:w-2/3 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                      <select
                        name="vehicle"
                        value={formData.vehicle}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select vehicle type</option>
                        <option value="Bicycle">Bicycle</option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Car">Car</option>
                        <option value="Scooter">Scooter</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Bank Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                        <input
                          type="text"
                          name="bank.accountName"
                          value={formData.bankDetails.accountName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                        <input
                          type="text"
                          name="bank.accountNumber"
                          value={formData.bankDetails.accountNumber}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Leave blank to keep current number"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Current: {rider.bankDetails.accountNumber || "Not set"}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                        <input
                          type="text"
                          name="bank.bankName"
                          value={formData.bankDetails.bankName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="w-40 h-40 relative rounded-full overflow-hidden mb-4">
                  <Image src={rider.image || "/placeholder.svg"} alt={rider.name} fill className="object-cover" />
                </div>
                <p className="text-lg font-semibold">{rider.name}</p>
                <p className="text-gray-500">Joined: {rider.joinedDate}</p>
              </div>

              <div className="md:w-2/3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{rider.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{rider.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Vehicle Type</p>
                    <p className="font-medium">{rider.vehicle}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium capitalize">{rider.status}</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Bank Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Account Name</p>
                      <p className="font-medium">{rider.bankDetails.accountName}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Account Number</p>
                      <p className="font-medium">{rider.bankDetails.accountNumber}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Bank Name</p>
                      <p className="font-medium">{rider.bankDetails.bankName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
