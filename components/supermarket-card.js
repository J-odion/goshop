import Link from "next/link"

export default function SupermarketCard({ supermarket }) {
  return (
    <Link
      href={`/supermarket/${supermarket.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${supermarket.image})` }} />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{supermarket.name}</h3>
        <p className="text-gray-600 mb-2">{supermarket.address}</p>
        <div className="flex items-center text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {supermarket.deliveryTime}
        </div>
      </div>
    </Link>
  )
}
