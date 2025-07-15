"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Check, Filter, Search, ArrowLeft } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function ProductsPage() {
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterBy, setFilterBy] = useState("all")
  const { addToCart } = useCart()

  const allProducts = [
    {
      id: "traditional-sabudana-papad",
      name: "Traditional Sabudana Papad",
      description: "Authentic sun-dried sabudana papads perfect for fasting",
      price: "₹150/kg",
      numericPrice: 150,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300&h=300&fit=crop&crop=center",
      badge: "Best Seller",
      category: "papad",
      features: ["Fasting-Friendly", "100% Natural", "Traditional Recipe", "Hygienic Production"],
    },
    {
      id: "premium-sabudana-pearls",
      name: "Premium Sabudana Pearls",
      description: "High-quality sabudana for traditional Indian dishes",
      price: "₹120/kg",
      numericPrice: 120,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=300&fit=crop&crop=center",
      badge: "Popular",
      category: "pearls",
      features: ["Premium Quality", "Uniform Size", "Quick Cooking", "Fresh Stock"],
    },
    {
      id: "fasting-special-papad",
      name: "Fasting Special Papad",
      description: "Specially prepared for vrat/upvas using only permitted ingredients",
      price: "₹180/kg",
      numericPrice: 180,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=300&fit=crop&crop=center",
      badge: "Premium",
      category: "papad",
      features: ["Vrat Special", "Pure Ingredients", "Handcrafted", "Blessed Recipe"],
    },
    {
      id: "ready-to-fry-papad",
      name: "Ready-to-Fry Papad",
      description: "Crisp, light, and delicious papads ready for deep frying",
      price: "₹160/kg",
      numericPrice: 160,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=300&fit=crop&crop=center",
      badge: "New",
      category: "papad",
      features: ["Ready to Cook", "Crispy Texture", "Quick Fry", "Family Pack"],
    },
    {
      id: "mini-sabudana-papad",
      name: "Mini Sabudana Papad",
      description: "Small-sized papads perfect for kids and portion control",
      price: "₹140/kg",
      numericPrice: 140,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300&h=300&fit=crop&crop=center",
      badge: "Family Pack",
      category: "papad",
      features: ["Kid-Friendly", "Portion Control", "Easy to Fry", "Bulk Pack"],
    },
    {
      id: "organic-sabudana",
      name: "Organic Sabudana",
      description: "100% organic sabudana pearls from certified farms",
      price: "₹200/kg",
      numericPrice: 200,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=300&fit=crop&crop=center",
      badge: "Organic",
      category: "pearls",
      features: ["Certified Organic", "Chemical-Free", "Premium Grade", "Health Conscious"],
    },
  ]

  const filteredProducts = allProducts
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterBy === "all" || product.category === filterBy
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.numericPrice - b.numericPrice
        case "price-high":
          return b.numericPrice - a.numericPrice
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const handleAddToCart = (product: (typeof allProducts)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      features: product.features,
    })

    setAddedItems((prev) => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-emerald-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Our Products</h1>
                <p className="text-gray-600 mt-1">Discover our complete range of premium sabudana products</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-emerald-500">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="papad">Papads</SelectItem>
                  <SelectItem value="pearls">Sabudana Pearls</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-emerald-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                  <SelectItem value="rating">Rating (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {allProducts.length} products
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.name)}&bg=f0f9ff&color=0369a1`
                  }}
                />
                <Badge className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg text-xs sm:text-sm">
                  {product.badge}
                </Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm leading-relaxed">{product.description}</p>

                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 ml-2">({product.rating})</span>
                </div>

                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {product.features.slice(0, 2).map((feature, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-bold text-emerald-600">{product.price}</span>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className={`rounded-full text-xs sm:text-sm transition-all duration-300 ${
                      addedItems.has(product.id)
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                    }`}
                  >
                    {addedItems.has(product.id) ? (
                      <>
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
