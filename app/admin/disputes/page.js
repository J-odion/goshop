"use client"

import { useState, useEffect } from "react"

export default function AdminDisputes() {
  const [disputes, setDisputes] = useState([])
  const [selectedStatus, setSelectedStatus] = useState("pending")
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false)
  const [currentDispute, setCurrentDispute] = useState(null)
  const [resolution, setResolution] = useState("")

  useEffect(() => {
    // In a real app, we would fetch disputes from an API
    // For demo purposes, we'll generate mock data
    const statuses = ["pending", "resolved"]
    const issues = ["Missing items", "Late delivery", "Wrong items", "Damaged items"]
    const mockDisputes = []

    for (let i = 0; i < 20; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      mockDisputes.push({
        id: 1000 + i,
        orderId: 100000 + Math.floor(Math.random() * 900000),
        store: `Store ${Math.floor(Math.random() * 5) + 1}`,
        rider: `Rider ${Math.floor(Math.random() * 5) + 1}`,
        customer: `Customer ${Math.floor(Math.random() * 10) + 1}`,
        issue: issues[Math.floor(Math.random() * issues.length)],
        date: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString().split("T")[0],
        status,
        resolution: status === "resolved" ? "Issue resolved with refund/replacement" : null,
      })
    }

    setDisputes(mockDisputes)
  }, [])

  const filteredDisputes = disputes.filter((dispute) => dispute.status === selectedStatus)

  const handleResolveClick = (dispute) => {
    setCurrentDispute(dispute)
    setIsResolveModalOpen(true)
  }

  const handleResolveDispute = () => {
    if (!resolution) {
      alert("Please enter a resolution")
      return
    }

    const updatedDisputes = disputes.map((dispute) => {
      if (dispute.id === currentDispute.id) {
        return {
          ...dispute,
          status: "resolved",
          resolution,
        }
      }
      return dispute
    })

    setDisputes(updatedDisputes)
    setCurrentDispute(null)
    setResolution("")
    setIsResolveModalOpen(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Disputes</h1>
        <div className="flex items-center">
          <label htmlFor="status-filter" className="mr-2 text-gray-700">
            Filter:
          </label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Disputes Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Store
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                {selectedStatus === "resolved" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resolution
                  </th>
                )}
                {selectedStatus === "pending" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDisputes.map((dispute) => (
                <tr key={dispute.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{dispute.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{dispute.orderId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.store}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.rider}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.issue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.date}</td>
                  {selectedStatus === "resolved" && (
                    <td className="px-6 py-4 text-sm text-gray-500">{dispute.resolution}</td>
                  )}
                  {selectedStatus === "pending" && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleResolveClick(dispute)}
                        className="text-green-500 hover:text-green-700"
                      >
                        Resolve
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resolve Dispute Modal */}
      {isResolveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Resolve Dispute</h2>

            <div className="mb-6">
              <div className="mb-4">
                <p>
                  <span className="font-medium">Order ID:</span> #{currentDispute.orderId}
                </p>
                <p>
                  <span className="font-medium">Issue:</span> {currentDispute.issue}
                </p>
                <p>
                  <span className="font-medium">Store:</span> {currentDispute.store}
                </p>
                <p>
                  <span className="font-medium">Rider:</span> {currentDispute.rider}
                </p>
                <p>
                  <span className="font-medium">Customer:</span> {currentDispute.customer}
                </p>
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-2">Resolution</label>
              <textarea
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows="4"
                placeholder="Enter resolution details..."
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsResolveModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleResolveDispute}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Resolve Dispute
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
