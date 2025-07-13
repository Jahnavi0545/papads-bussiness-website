"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, Shield, Clock, Star, Phone, Mail } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      icon: <Truck className="w-8 h-8 text-emerald-600" />,
      title: "Free Delivery",
      description: "Free shipping on orders above ₹500 across India",
      badge: "Popular",
      features: ["Pan-India delivery", "Express shipping available", "Order tracking"],
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: "Quality Assurance",
      description: "100% authentic products with quality guarantee",
      badge: "Guaranteed",
      features: ["Quality tested", "Fresh products", "Money-back guarantee"],
    },
    {
      icon: <Clock className="w-8 h-8 text-emerald-600" />,
      title: "Quick Processing",
      description: "Orders processed within 24 hours",
      badge: "Fast",
      features: ["Same day processing", "Quick dispatch", "Real-time updates"],
    },
    {
      icon: <Star className="w-8 h-8 text-emerald-600" />,
      title: "Customer Support",
      description: "24/7 customer service for all your queries",
      badge: "24/7",
      features: ["Phone support", "Email assistance", "Live chat"],
    },
  ]

  return (
    <section id="services" className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Our Services</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              AVM Traders
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive services to ensure you get the best sabudana products with exceptional customer
            experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-full flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs">
                    {service.badge}
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>

                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>

                <ul className="space-y-1 text-sm text-gray-500">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 sm:p-12 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Need Help or Have Questions?</h3>
          <p className="text-emerald-100 mb-6 text-lg">
            Our customer service team is here to assist you with any queries about our products or services.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us: +91 98421 99246
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-emerald-600 flex items-center gap-2 bg-transparent"
            >
              <Mail className="w-5 h-5" />
              Email Support
            </Button>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
            <div className="w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-amber-800 text-sm font-medium">
              More services coming soon - Stay tuned for updates!
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
