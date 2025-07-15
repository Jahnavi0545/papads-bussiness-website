"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Star } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 120
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-20 sm:top-40 left-20 sm:left-40 w-40 h-40 sm:w-80 sm:h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-emerald-300 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20 sm:pt-0">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 bg-emerald-100 px-3 sm:px-4 py-2 rounded-full">
              <div className="flex items-center space-x-2">
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                <span className="text-emerald-700 font-medium text-sm sm:text-base">Premium Quality Since 1971</span>
              </div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
            AVM Traders
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Crafting authentic sabudana papads with traditional methods and modern innovation. Experience the pure taste
            of traditional Indian snacks in every bite.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <Link href="/products">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Explore Products
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("about")}
              className="w-full sm:w-auto border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 bg-transparent"
            >
              Our Story
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto px-4">
            {[
              { number: "50+", label: "Years of Excellence" },
              { number: "Pan-India", label: "Pan-India Reach" },
              { number: "100%", label: "Authentic Taste" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-emerald-600 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:w-1 sm:h-3 bg-emerald-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
