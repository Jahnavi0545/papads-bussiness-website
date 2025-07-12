import { Leaf, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">AVM Traders</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Crafting premium quality sabudana papads with traditional methods and modern innovation since 1971.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300 cursor-pointer"
                >
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Traditional Sabudana Papad</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Premium Sabudana Pearls</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Fasting Special Papad</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Ready-to-Fry Papad</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Our Story</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Quality Assurance</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Careers</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Contact Us</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">FAQ</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Shipping Info</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Returns</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Varalakshmi Sago. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}
