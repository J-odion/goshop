"use client"

import { useState } from "react"
import { riders } from "@/data/riders"
import Image from "next/image"

export default function AdminRiders() {
  const [riderList, setRiderList] = useState(riders)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentRider, setCurrentRider] = useState(null)
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

  const handleAddRider = () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields")
      return
    }

    // Create new rider
    const newRider = {
      id: Math.max(...riderList.map((r) => r.id)) + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      image: `/placeholder.svg?text=${formData.name.replace(/\s+/g, "+")}&height=200&width=200`,
      status: "active",
      rating: 0,
      totalDeliveries: 0,
      joinedDate: new Date().toISOString().split("T")[0],
      vehicle: formData.vehicle || "Not specified",
      bankDetails: {
        accountName: formData.bankDetails.accountName,
        accountNumber: formData.bankDetails.accountNumber ? `****${formData.bankDetails.accountNumber.slice(-4)}` : "",
        bankName: formData.bankDetails.bankName,
      },
    }

    // Add to list
    setRiderList([...riderList, newRider])

    // Reset form and close modal
    setFormData({
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
    setIsAddModalOpen(false)
  }

  const handleEditClick = (rider) => {
    setCurrentRider(rider)
    setFormData({
      name: rider.name,
      email: rider.email,
      phone: rider.phone,
      vehicle: rider.vehicle,
      bankDetails: {
        accountName: rider.bankDetails.accountName,
        accountNumber: "",
        bankName: rider.bankDetails.bankName,
      },
    })
    setIsEditModalOpen(true)
  }

  const handleUpdateRider = () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields")
      return
    }

    // Update rider
    const updatedRiders = riderList.map((rider) => {
      if (rider.id === currentRider.id) {
        return {
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
        }
      }
      return rider
    })

    // Update list
    setRiderList(updatedRiders)

    // Reset form and close modal
    setCurrentRider(null)
    setFormData({
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
    setIsEditModalOpen(false)
  }

  const handleStatusChange = (riderId, newStatus) => {
    const updatedRiders = riderList.map((rider) => {
      if (rider.id === riderId) {
        return {
          ...rider,
          status: newStatus,
        }
      }
      return rider
    })

    setRiderList(updatedRiders)
  }

  const handleDeleteRider = (riderId) => {
    if (window.confirm("Are you sure you want to delete this rider?")) {
      const updatedRiders = riderList.filter((rider) => rider.id !== riderId)
      setRiderList(updatedRiders)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Riders</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Add New Rider
        </button>
      </div>

      {/* Riders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {riderList.map((rider) => (
                <tr key={rider.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 relative rounded-full overflow-hidden">
                        <Image src={rider.image || "/placeholder.svg"} alt={rider.name} fill className="object-cover" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{rider.name}</div>
                        <div className="text-sm text-gray-500">Joined: {rider.joinedDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{rider.email}</div>
                    <div className="text-sm text-gray-500">{rider.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rider.vehicle}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Rating: {rider.rating} ⭐</div>
                    <div className="text-sm text-gray-500">Deliveries: {rider.totalDeliveries}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        rider.status === "active"
                          ? "bg-green-100 text-green-800"
                          : rider.status === "suspended"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {rider.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEditClick(rider)} className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </button>

                      {rider.status === "active" ? (
                        <button
                          onClick={() => handleStatusChange(rider.id, "suspended")}
                          className="text-red-600 hover:text-red-900"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(rider.id, "active")}
                          className="text-green-600 hover:text-green-900"
                        >
                          Activate
                        </button>
                      )}

                      <button onClick={() => handleDeleteRider(rider.id)} className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Rider Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-90vh overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Add New Rider</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
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

              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium mb-2">Bank Details</h3>

                <div className="space-y-4">
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
                    />
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
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRider}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add Rider
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Rider Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-90vh overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Rider</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
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

              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium mb-2">Bank Details</h3>

                <div className="space-y-4">
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
                      Current: {currentRider?.bankDetails.accountNumber || "Not set"}
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
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRider}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Update Rider
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
