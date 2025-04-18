export const riders = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    image: "/placeholder.svg?text=John+Smith&height=200&width=200",
    status: "active",
    rating: 4.8,
    totalDeliveries: 156,
    joinedDate: "2023-01-15",
    vehicle: "Motorcycle",
    bankDetails: {
      accountName: "John Smith",
      accountNumber: "****6789",
      bankName: "First National Bank",
    },
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "555-987-6543",
    image: "/placeholder.svg?text=Sarah+Johnson&height=200&width=200",
    status: "active",
    rating: 4.9,
    totalDeliveries: 203,
    joinedDate: "2022-11-05",
    vehicle: "Car",
    bankDetails: {
      accountName: "Sarah Johnson",
      accountNumber: "****4321",
      bankName: "City Bank",
    },
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "555-456-7890",
    image: "/placeholder.svg?text=Michael+Brown&height=200&width=200",
    status: "suspended",
    rating: 3.2,
    totalDeliveries: 47,
    joinedDate: "2023-03-22",
    vehicle: "Bicycle",
    bankDetails: {
      accountName: "Michael Brown",
      accountNumber: "****5678",
      bankName: "Metro Credit Union",
    },
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "555-789-0123",
    image: "/placeholder.svg?text=Emily+Davis&height=200&width=200",
    status: "active",
    rating: 4.7,
    totalDeliveries: 89,
    joinedDate: "2023-02-10",
    vehicle: "Scooter",
    bankDetails: {
      accountName: "Emily Davis",
      accountNumber: "****9012",
      bankName: "First National Bank",
    },
  },
]

export const riderReviews = [
  {
    id: 1,
    riderId: 1,
    customerName: "Alice Williams",
    rating: 5,
    comment: "Very professional and delivered on time!",
    date: "2023-06-15",
  },
  {
    id: 2,
    riderId: 1,
    customerName: "Bob Miller",
    rating: 4,
    comment: "Good service, but arrived a bit late.",
    date: "2023-06-10",
  },
  {
    id: 3,
    riderId: 2,
    customerName: "Charlie Thompson",
    rating: 5,
    comment: "Excellent service! Very friendly.",
    date: "2023-06-12",
  },
  {
    id: 4,
    riderId: 2,
    customerName: "Diana Garcia",
    rating: 5,
    comment: "Perfect delivery, everything was in great condition.",
    date: "2023-06-08",
  },
  {
    id: 5,
    riderId: 3,
    customerName: "Edward Martinez",
    rating: 2,
    comment: "Items were damaged and delivery was late.",
    date: "2023-06-05",
  },
  {
    id: 6,
    riderId: 4,
    customerName: "Fiona Robinson",
    rating: 5,
    comment: "Very professional and friendly service!",
    date: "2023-06-14",
  },
]

export const riderPayments = [
  {
    id: 1,
    riderId: 1,
    amount: 25.5,
    status: "pending",
    orderId: 12345,
    date: "2023-06-15",
  },
  {
    id: 2,
    riderId: 1,
    amount: 18.75,
    status: "approved",
    orderId: 12340,
    date: "2023-06-14",
  },
  {
    id: 3,
    riderId: 2,
    amount: 30.25,
    status: "approved",
    orderId: 12335,
    date: "2023-06-14",
  },
  {
    id: 4,
    riderId: 3,
    amount: 15.0,
    status: "pending",
    orderId: 12330,
    date: "2023-06-15",
  },
  {
    id: 5,
    riderId: 4,
    amount: 22.5,
    status: "approved",
    orderId: 12325,
    date: "2023-06-13",
  },
]
