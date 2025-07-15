"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Shield, Clock, Headphones, Star, CheckCircle } from "lucide-react"

export default function ServicesSection() {
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

  const services = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Pan-India shipping with real-time order tracking",
      badge: "Popular",
      features: ["Orders above ₹500", "3-5 business days", "Real-time tracking", "Secure packaging"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "100% authentic products with quality guarantee",
      badge: "Guaranteed",
      features: ["Quality tested", "Authentic products", "Money-back guarantee", "Certified production"],
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Clock,
      title: "Quick Processing",
      description: "24-hour order processing with instant updates",
      badge: "Fast",
      features: ["Same-day processing", "Instant notifications", "Quick dispatch", "Priority handling"],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "24/7 assistance via phone, email, and chat",
      badge: "24/7",
      features: ["Round-the-clock support", "Multiple channels", "Expert assistance", "Quick resolution"],
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <section id="services" ref={sectionRef} className="py-12 sm:py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              We provide comprehensive services to ensure the best experience for our customers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 shadow-lg"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <CardHeader className="text-center pb-4">
                  <div className="relative">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge
                      className={`absolute -top-2 -right-2 bg-gradient-to-r ${service.color} text-white shadow-lg text-xs`}
                    >
                      {service.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Need Help or Have Questions?</h3>
              <p className="text-lg sm:text-xl mb-6 opacity-90">
                Our customer service team is here to assist you with any queries about our products or services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Contact Support
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 bg-transparent"
                >
                  View FAQ
                </Button>
              </div>
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="text-center mt-12 p-6 bg-gray-50 rounded-2xl">
            <div className="flex items-center justify-center mb-3">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-lg font-semibold text-gray-700">More Services Coming Soon</span>
              <Star className="w-5 h-5 text-yellow-500 ml-2" />
            </div>
            <p className="text-gray-600">
              We're constantly working to improve our services and add new features for our valued customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
