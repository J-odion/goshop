"use client"

import { useState, useEffect } from "react"
import { products } from "@/data/products"

export default function SupermarketAdminCategories() {
  const [categories, setCategories] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  useEffect(() => {
    // Extract unique categories and count products in each
    const categoryCounts = {}
    products.forEach((product) => {
      if (product.category) {
        categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1
      }
    })

    // Convert to array of objects
    const categoryList = Object.keys(categoryCounts).map((name) => ({
      name,
      productCount: categoryCounts[name],
      description: `Category for ${name} products`,
    }))

    setCategories(categoryList)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddCategory = () => {
    // Validate form
    if (!formData.name) {
      alert("Please enter a category name")
      return
    }

    // Check if category already exists
    if (categories.some((cat) => cat.name.toLowerCase() === formData.name.toLowerCase())) {
      alert("This category already exists")
      return
    }

    // Create new category
    const newCategory = {
      name: formData.name,
      description: formData.description || "",
      productCount: 0,
    }

    // Add to list
    setCategories([...categories, newCategory])

    // Reset form and close modal
    setFormData({
      name: "",
      description: "",
    })
    setIsAddModalOpen(false)
  }

  const handleEditClick = (category) => {
    setCurrentCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
    })
    setIsEditModalOpen(true)
  }

  const handleUpdateCategory = () => {
    // Validate form
    if (!formData.name) {
      alert("Please enter a category name")
      return
    }

    // Check if category already exists (excluding current one)
    if (
      categories.some(
        (cat) => cat.name.toLowerCase() === formData.name.toLowerCase() && cat.name !== currentCategory.name,
      )
    ) {
      alert("This category already exists")
      return
    }

    // Update category
    const updatedCategories = categories.map((category) => {
      if (category.name === currentCategory.name) {
        return {
          ...category,
          name: formData.name,
          description: formData.description,
        }
      }
      return category
    })

    // Update list
    setCategories(updatedCategories)

    // Reset form and close modal
    setCurrentCategory(null)
    setFormData({
      name: "",
      description: "",
    })
    setIsEditModalOpen(false)
  }

  const handleDeleteCategory = (categoryName) => {
    // Check if category has products
    const category = categories.find((cat) => cat.name === categoryName)
    if (category.productCount > 0) {
      alert(
        `Cannot delete category with ${category.productCount} products. Please reassign or delete these products first.`,
      )
      return
    }

    if (window.confirm("Are you sure you want to delete this category?")) {
      const updatedCategories = categories.filter((category) => category.name !== categoryName)
      setCategories(updatedCategories)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Add New Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{category.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.productCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleEditClick(category)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.name)}
                      className={`text-red-500 hover:text-red-700 ${category.productCount > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={category.productCount > 0}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Add New Category</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
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
                onClick={handleAddCategory}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Edit Category</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
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
                onClick={handleUpdateCategory}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Update Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
