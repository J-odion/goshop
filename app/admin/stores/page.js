"use client"

import { useState } from "react"
import { supermarkets } from "@/data/supermarkets"
import Image from "next/image"

export default function AdminStores() {
  const [storeList, setStoreList] = useState(supermarkets)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentStore, setCurrentStore] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    deliveryTime: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddStore = () => {
    // Validate form
    if (!formData.name || !formData.address) {
      alert("Please fill in all required fields")
      return
    }

    // Create new store
    const newStore = {
      id: Math.max(...storeList.map((s) => s.id)) + 1,
      name: formData.name,
      address: formData.address,
      image: `/placeholder.svg?text=${formData.name.replace(/\s+/g, "+")}&height=300&width=500`,
      deliveryTime: formData.deliveryTime || "30-45 min",
    }

    // Add to list
    setStoreList([...storeList, newStore])

    // Reset form and close modal
    setFormData({
      name: "",
      address: "",
      deliveryTime: "",
    })
    setIsAddModalOpen(false)
  }

  const handleEditClick = (store) => {
    setCurrentStore(store)
    setFormData({
      name: store.name,
      address: store.address,
      deliveryTime: store.deliveryTime,
    })
    setIsEditModalOpen(true)
  }

  const handleUpdateStore = () => {
    // Validate form
    if (!formData.name || !formData.address) {
      alert("Please fill in all required fields")
      return
    }

    // Update store
    const updatedStores = storeList.map((store) => {
      if (store.id === currentStore.id) {
        return {
          ...store,
          name: formData.name,
          address: formData.address,
          deliveryTime: formData.deliveryTime,
        }
      }
      return store
    })

    // Update list
    setStoreList(updatedStores)

    // Reset form and close modal
    setCurrentStore(null)
    setFormData({
      name: "",
      address: "",
      deliveryTime: "",
    })
    setIsEditModalOpen(false)
  }

  const handleDeleteStore = (storeId) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      const updatedStores = storeList.filter((store) => store.id !== storeId)
      setStoreList(updatedStores)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Stores</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Add New Store
        </button>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storeList.map((store) => (
          <div key={store.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-40 relative">
              <Image src={store.image || "/placeholder.svg"} alt={store.name} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{store.name}</h2>
              <p className="text-gray-600 mb-2">{store.address}</p>
              <p className="text-sm text-gray-500 mb-4">
                <span className="font-medium">Delivery Time:</span> {store.deliveryTime}
              </p>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEditClick(store)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStore(store.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Store Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Add New Store</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store Name *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
                <input
                  type="text"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. 20-30 min"
                />
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
                onClick={handleAddStore}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add Store
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Store Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Edit Store</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store Name *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
                <input
                  type="text"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. 20-30 min"
                />
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
                onClick={handleUpdateStore}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Update Store
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
