import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingCart, Home } from "lucide-react"

export default function EmptyCartPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <ShoppingCart className="mx-auto h-24 w-24 text-gray-400" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Your Cart is Empty</h2>
        <p className="mt-2 text-sm text-gray-600">
          It looks like you haven't added any items to your cart yet. Start exploring our delicious products!
        </p>
        <div className="mt-6">
          <Link href="/products" passHref>
            <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 px-6 rounded-md text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
              Explore Products
            </Button>
          </Link>
        </div>
        <div className="mt-4">
          <Link href="/" passHref>
            <Button
              variant="outline"
              className="w-full text-gray-700 hover:text-emerald-600 border-gray-300 hover:border-emerald-600 py-3 px-6 rounded-md text-lg font-medium transition-all duration-200 bg-transparent"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
