"use client"

import { useState } from "react"
import { products } from "@/data/products"
import { supermarkets } from "@/data/supermarkets"
import { riders } from "@/data/riders"

export default function AdminReports() {
  const [reportType, setReportType] = useState("sales")
  const [dateRange, setDateRange] = useState("week")
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportData, setReportData] = useState(null)

  const handleGenerateReport = () => {
    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      // Generate mock report data based on type
      let data

      if (reportType === "sales") {
        data = generateSalesReport()
      } else if (reportType === "stores") {
        data = generateStoresReport()
      } else if (reportType === "riders") {
        data = generateRidersReport()
      }

      setReportData(data)
      setIsGenerating(false)
    }, 1000)
  }

  const generateSalesReport = () => {
    // Mock sales data
    const categories = [...new Set(products.map((p) => p.category))]
    const salesData = categories.map((category) => {
      const categoryProducts = products.filter((p) => p.category === category)
      const totalSales = categoryProducts.reduce((sum, product) => {
        // Random sales between 5 and 50 units
        const unitsSold = Math.floor(Math.random() * 45) + 5
        return sum + unitsSold * product.price
      }, 0)

      return {
        category,
        totalSales: Number.parseFloat(totalSales.toFixed(2)),
        itemCount: categoryProducts.length,
      }
    })

    // Sort by total sales
    salesData.sort((a, b) => b.totalSales - a.totalSales)

    return {
      title: "Sales Report",
      dateRange: getDateRangeText(),
      totalSales: salesData.reduce((sum, item) => sum + item.totalSales, 0).toFixed(2),
      items: salesData,
    }
  }

  const generateStoresReport = () => {
    // Mock store performance data
    const storeData = supermarkets.map((store) => {
      const storeProducts = products.filter((p) => p.supermarketId === store.id)

      // Random orders between 10 and 100
      const totalOrders = Math.floor(Math.random() * 90) + 10

      // Random sales based on products and orders
      const totalSales = storeProducts.reduce((sum, product) => {
        const unitsSold = Math.floor(Math.random() * 10) + 1
        return sum + unitsSold * product.price * (totalOrders / 20)
      }, 0)

      return {
        id: store.id,
        name: store.name,
        totalOrders,
        totalSales: Number.parseFloat(totalSales.toFixed(2)),
        productCount: storeProducts.length,
      }
    })

    // Sort by total sales
    storeData.sort((a, b) => b.totalSales - a.totalSales)

    return {
      title: "Store Performance Report",
      dateRange: getDateRangeText(),
      totalStores: storeData.length,
      totalSales: storeData.reduce((sum, store) => sum + store.totalSales, 0).toFixed(2),
      items: storeData,
    }
  }

  const generateRidersReport = () => {
    // Mock rider performance data
    const riderData = riders.map((rider) => {
      // Random deliveries based on total deliveries and status
      const multiplier = rider.status === "active" ? 1 : 0.2
      const deliveries = Math.floor(Math.random() * 20 + 5) * multiplier

      // Random earnings based on deliveries
      const earnings = (deliveries * (Math.random() * 5 + 5)).toFixed(2)

      // Random ratings between 3 and 5, weighted by existing rating
      const ratings = []
      for (let i = 0; i < deliveries; i++) {
        const baseRating = rider.rating >= 4.5 ? 4.5 : rider.rating >= 4 ? 4 : 3.5
        const variation = Math.random() * 1 - 0.5 // -0.5 to +0.5
        const rating = Math.min(5, Math.max(1, baseRating + variation))
        ratings.push(rating)
      }

      const avgRating =
        ratings.length > 0 ? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1) : "N/A"

      return {
        id: rider.id,
        name: rider.name,
        deliveries,
        earnings: Number.parseFloat(earnings),
        rating: avgRating,
        status: rider.status,
      }
    })

    // Sort by deliveries
    riderData.sort((a, b) => b.deliveries - a.deliveries)

    return {
      title: "Rider Performance Report",
      dateRange: getDateRangeText(),
      totalRiders: riderData.length,
      totalDeliveries: riderData.reduce((sum, rider) => sum + rider.deliveries, 0),
      totalEarnings: riderData.reduce((sum, rider) => sum + rider.earnings, 0).toFixed(2),
      items: riderData,
    }
  }

  const getDateRangeText = () => {
    const today = new Date()
    const endDate = today.toLocaleDateString()

    let startDate
    if (dateRange === "week") {
      const lastWeek = new Date(today)
      lastWeek.setDate(today.getDate() - 7)
      startDate = lastWeek.toLocaleDateString()
    } else if (dateRange === "month") {
      const lastMonth = new Date(today)
      lastMonth.setMonth(today.getMonth() - 1)
      startDate = lastMonth.toLocaleDateString()
    } else if (dateRange === "year") {
      const lastYear = new Date(today)
      lastYear.setFullYear(today.getFullYear() - 1)
      startDate = lastYear.toLocaleDateString()
    }

    return `${startDate} - ${endDate}`
  }

  const handleExportCSV = () => {
    alert("CSV export functionality would be implemented here")
  }

  const handlePrintReport = () => {
    window.print()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Reports</h1>

      {/* Report Generator */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Generate Report</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="sales">Sales Report</option>
              <option value="stores">Store Performance</option>
              <option value="riders">Rider Performance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last Year</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:opacity-50"
            >
              {isGenerating ? "Generating..." : "Generate Report"}
            </button>
          </div>
        </div>
      </div>

      {/* Report Results */}
      {reportData && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{reportData.title}</h2>
              <p className="text-sm text-gray-500">Period: {reportData.dateRange}</p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleExportCSV}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                Export CSV
              </button>
              <button
                onClick={handlePrintReport}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                Print
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {reportType === "sales" && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Total Sales</p>
                  <p className="text-2xl font-bold">${reportData.totalSales}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Categories</p>
                  <p className="text-2xl font-bold">{reportData.items.length}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Top Category</p>
                  <p className="text-2xl font-bold">{reportData.items[0]?.category || "N/A"}</p>
                </div>
              </>
            )}

            {reportType === "stores" && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Total Sales</p>
                  <p className="text-2xl font-bold">${reportData.totalSales}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Total Stores</p>
                  <p className="text-2xl font-bold">{reportData.totalStores}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Top Store</p>
                  <p className="text-2xl font-bold">{reportData.items[0]?.name || "N/A"}</p>
                </div>
              </>
            )}

            {reportType === "riders" && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Total Earnings</p>
                  <p className="text-2xl font-bold">${reportData.totalEarnings}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Total Deliveries</p>
                  <p className="text-2xl font-bold">{reportData.totalDeliveries}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Active Riders</p>
                  <p className="text-2xl font-bold">{reportData.items.filter((r) => r.status === "active").length}</p>
                </div>
              </>
            )}
          </div>

          {/* Report Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {reportType === "sales" && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Sales
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                    </>
                  )}

                  {reportType === "stores" && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Store
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Orders
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Sales
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Products
                      </th>
                    </>
                  )}

                  {reportType === "riders" && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rider
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deliveries
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Earnings
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reportType === "sales" &&
                  reportData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.totalSales.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.itemCount}</td>
                    </tr>
                  ))}

                {reportType === "stores" &&
                  reportData.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.totalOrders}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.totalSales.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.productCount}</td>
                    </tr>
                  ))}

                {reportType === "riders" &&
                  reportData.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.deliveries}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.earnings.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.rating} {item.rating !== "N/A" && "⭐"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${item.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
