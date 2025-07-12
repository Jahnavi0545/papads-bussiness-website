"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, Users, ChefHat } from "lucide-react"

export default function RecipeSection() {
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
    <section id="recipe" ref={sectionRef} className="py-12 sm:py-20 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Traditional Sabudana Papad Recipe
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Learn how to make authentic homemade sabudana papads using our time-tested traditional method.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <ChefHat className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mr-3" />
                Ingredients
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
                  Sabudana (Sago/Tapioca Pearls) - 1 cup
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
                  Water - 3 to 4 cups
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
                  Rock Salt (Sendha Namak) - as per taste
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
                  Green Chilies (finely chopped) - 1 to 2
                </li>
              </ul>

              <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="bg-amber-50 rounded-xl p-3 sm:p-4">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-gray-800">Prep Time</div>
                  <div className="text-xs text-gray-600">6-8 hours</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-3 sm:p-4">
                  <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-gray-800">Cook Time</div>
                  <div className="text-xs text-gray-600">30 minutes</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-3 sm:p-4">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-gray-800">Serves</div>
                  <div className="text-xs text-gray-600">4-6 people</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Method</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 flex-shrink-0 text-sm sm:text-base">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Soaking</h4>
                    <p className="text-gray-600 text-sm">
                      Wash the sabudana thoroughly. Soak in enough water for 6 to 8 hours or overnight until soft and
                      swollen.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 flex-shrink-0 text-sm sm:text-base">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Boiling</h4>
                    <p className="text-gray-600 text-sm">
                      In a large pan, add 3-4 cups of water. Add the soaked sabudana, salt, green chili paste, and cumin
                      seeds. Boil while stirring continuously until it turns into a thick, transparent paste.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 flex-shrink-0 text-sm sm:text-base">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Spreading</h4>
                    <p className="text-gray-600 text-sm">
                      Allow the mixture to cool slightly. On a clean plastic sheet or cloth, drop spoonfuls of the
                      mixture and spread into round papads using the back of the spoon.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 flex-shrink-0 text-sm sm:text-base">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Drying & Serving</h4>
                    <p className="text-gray-600 text-sm">
                      Sun-dry the papads for 2 to 3 days, turning them once a day until completely dry and crisp. Deep
                      fry or roast until puffed and crispy. Enjoy with tea or as a crunchy side!
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-50 rounded-xl">
                <h4 className="font-semibold text-amber-800 mb-2">💡 Pro Tips:</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Add a pinch of black pepper or sesame seeds for extra flavor</li>
                  <li>• Make sure papads are completely dry before storing</li>
                  <li>• Can be stored for up to 6 months in a cool, dry place</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
