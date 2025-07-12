"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Check } from "lucide-react"
import { useCart } from "./cart-context"

export default function Products() {
  const [isVisible, setIsVisible] = useState(false)
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)
  const { addToCart } = useCart()

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

  const products = [
    {
      id: "traditional-sabudana-papad",
      name: "Traditional Sabudana Papad",
      description: "Authentic sun-dried sabudana papads perfect for fasting",
      price: "₹150/kg",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300&h=300&fit=crop&crop=center",
      badge: "Best Seller",
      features: ["Fasting-Friendly", "100% Natural", "Traditional Recipe", "Hygienic Production"],
    },
    {
      id: "premium-sabudana-pearls",
      name: "Premium Sabudana Pearls",
      description: "High-quality sabudana for traditional Indian dishes",
      price: "₹120/kg",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=300&fit=crop&crop=center",
      badge: "Popular",
      features: ["Premium Quality", "Uniform Size", "Quick Cooking", "Fresh Stock"],
    },
    {
      id: "fasting-special-papad",
      name: "Fasting Special Papad",
      description: "Specially prepared for vrat/upvas using only permitted ingredients",
      price: "₹180/kg",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=300&fit=crop&crop=center",
      badge: "Premium",
      features: ["Vrat Special", "Pure Ingredients", "Handcrafted", "Blessed Recipe"],
    },
    {
      id: "ready-to-fry-papad",
      name: "Ready-to-Fry Papad",
      description: "Crisp, light, and delicious papads ready for deep frying",
      price: "₹160/kg",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=300&fit=crop&crop=center",
      badge: "New",
      features: ["Ready to Cook", "Crispy Texture", "Quick Fry", "Family Pack"],
    },
  ]

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      features: product.features,
    })

    // Show success feedback
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
    <section id="products" ref={sectionRef} className="py-12 sm:py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Our Products
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Discover our range of premium sago products, each crafted with care and attention to quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product, index) => (
              <div
                key={index}
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

          <div className="text-center mt-8 sm:mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 bg-transparent"
            >
              View All Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
