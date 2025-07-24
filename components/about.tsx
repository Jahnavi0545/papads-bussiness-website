"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Users, Leaf, Heart } from "lucide-react"
import Image from "next/image" // Import Image component

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section id="about" ref={sectionRef} className="py-12 sm:py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Our Heritage
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              For over five decades, we've been dedicated to crafting exceptional sabudana papads, rooted in our rich
              agricultural heritage and commitment to quality.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
            <div className="space-y-4 sm:space-y-6 px-4 lg:px-0">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Tradition Meets Innovation</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Founded in 1971 by Thiru Kuppusamy Kuppayi and Sundaram, AVM Traders has evolved from its agricultural
                roots to become a leading manufacturer of sabudana papads. Our dedication to quality and customer
                satisfaction has been the cornerstone of our journey.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                In 1985, Shri K. Murugesan took over the reins, scaling production to an impressive 150 metric tonnes
                per day. With Smt. M. Vasanthi as Co-Founder and Head of Production & Quality Control, we maintain the
                highest standards. Miss Preethi Murugesan, Joint Managing Director, now spearheads our E-Commerce
                Business, bringing our products to a wider audience.
              </p>
            </div>

            <div className="relative px-4 lg:px-0">
              {/* Modified div for the entire card background */}
              <div className="aspect-square relative rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
                <Image
                  src="/images/natural-card-background.png" // Using the provided image
                  alt="Abstract green and white background representing natural ingredients"
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 z-0" // Image fills the entire card
                />
                {/* Content overlay with padding */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-6 sm:p-8">
                  <div className="text-center bg-white/80 p-6 rounded-lg">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Leaf className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">100% Natural</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Pure & Authentic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4 lg:px-0">
            {[
              {
                icon: Award,
                title: "Quality Assured",
                description: "ISO certified manufacturing processes",
              },
              {
                icon: Users,
                title: "Customer First",
                description: "Dedicated to customer satisfaction",
              },
              {
                icon: Leaf,
                title: "Eco-Friendly",
                description: "Sustainable and environmentally conscious",
              },
              {
                icon: Heart,
                title: "Family Values",
                description: "Built on trust and family traditions",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
