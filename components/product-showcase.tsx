"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"

export default function ProductShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const featuredProducts = [
    {
      name: "Traditional Sabudana Papad",
      description:
        "Authentic sun-dried sabudana papads made with traditional methods, perfect for fasting and daily consumption",
      price: "₹150/kg",
      originalPrice: "₹180/kg",
      rating: 4.8,
      reviews: 124,
      image:
        "/placeholder.svg?height=400&width=400&text=Traditional+Sabudana+Papad&bg=gradient-to-br+from-amber-100+to-orange-200&color=d97706",
      badge: "Best Seller",
      features: ["Sun-Dried", "Fasting-Friendly", "100% Natural", "Traditional Recipe"],
      benefits: ["Rich in Carbohydrates", "Easy to Digest", "Gluten-Free", "Energy Booster"],
    },
    {
      name: "Premium Sabudana Pearls",
      description:
        "High-quality sabudana pearls sourced from the finest tapioca, ideal for khichdi, vada, and other dishes",
      price: "₹120/kg",
      originalPrice: "₹140/kg",
      rating: 4.7,
      reviews: 89,
      image:
        "/placeholder.svg?height=400&width=400&text=Premium+Sabudana+Pearls&bg=gradient-to-br+from-emerald-100+to-teal-200&color=059669",
      badge: "Popular",
      features: ["Premium Quality", "Uniform Size", "Quick Cooking", "Fresh Stock"],
      benefits: ["High Energy", "Light on Stomach", "Versatile Use", "Natural"],
    },
    {
      name: "Fasting Special Papad",
      description:
        "Specially crafted for vrat/upvas using only permitted ingredients, maintaining purity and tradition",
      price: "₹180/kg",
      originalPrice: "₹200/kg",
      rating: 4.9,
      reviews: 156,
      image:
        "/placeholder.svg?height=400&width=400&text=Fasting+Special+Papad&bg=gradient-to-br+from-purple-100+to-pink-200&color=9333ea",
      badge: "Premium",
      features: ["Vrat Special", "Pure Ingredients", "Handcrafted", "Blessed Recipe"],
      benefits: ["Spiritually Pure", "Nutritious", "Satisfying", "Traditional"],
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular sabudana products, each crafted with care and traditional expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 shadow-2xl overflow-hidden">
                <img
                  src={featuredProducts[selectedProduct].image || "/placeholder.svg"}
                  alt={featuredProducts[selectedProduct].name}
                  className="w-full h-full object-cover rounded-2xl transition-all duration-500"
                />
                <div className="absolute top-8 left-8">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm px-3 py-1">
                    {featuredProducts[selectedProduct].badge}
                  </Badge>
                </div>
                <div className="absolute top-8 right-8 flex space-x-2">
                  <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Eye className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{featuredProducts[selectedProduct].name}</h3>
                <p className="text-gray-600 leading-relaxed">{featuredProducts[selectedProduct].description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(featuredProducts[selectedProduct].rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {featuredProducts[selectedProduct].rating} ({featuredProducts[selectedProduct].reviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-emerald-600">{featuredProducts[selectedProduct].price}</span>
                <span className="text-xl text-gray-400 line-through">
                  {featuredProducts[selectedProduct].originalPrice}
                </span>
                <Badge variant="secondary" className="bg-red-100 text-red-600">
                  Save ₹
                  {Number.parseInt(featuredProducts[selectedProduct].originalPrice.slice(1)) -
                    Number.parseInt(featuredProducts[selectedProduct].price.slice(1))}
                </Badge>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {featuredProducts[selectedProduct].features.map((feature, i) => (
                    <Badge key={i} variant="outline" className="border-emerald-200 text-emerald-700">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Health Benefits:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {featuredProducts[selectedProduct].benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl bg-transparent"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>

          {/* Product Selector */}
          <div className="mt-16 flex justify-center space-x-4">
            {featuredProducts.map((product, index) => (
              <button
                key={index}
                onClick={() => setSelectedProduct(index)}
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  selectedProduct === index
                    ? "bg-emerald-100 border-2 border-emerald-500 shadow-lg"
                    : "bg-white border-2 border-gray-200 hover:border-emerald-300"
                }`}
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl mb-2"
                />
                <div className="text-sm font-medium text-gray-800 text-center">{product.name.split(" ")[0]}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
