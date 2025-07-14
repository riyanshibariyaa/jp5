import { Card, CardContent } from "@/components/ui/card"
import { Heart, Pill, Calculator, Users, Phone, UtensilsCrossed, HardHat, Stethoscope } from "lucide-react"

export default function PopularCategories() {
  const categories = [
    { name: "Healthcare", positions: 198, icon: Heart, color: "bg-red-100 text-red-600" },
    { name: "Pharmaceuticals", positions: 198, icon: Pill, color: "bg-green-100 text-green-600" },
    { name: "Accounting/Finance", positions: 198, icon: Calculator, color: "bg-blue-100 text-blue-600" },
    { name: "Human Resource", positions: 198, icon: Users, color: "bg-purple-100 text-purple-600" },
    { name: "Telecommunications", positions: 198, icon: Phone, color: "bg-orange-100 text-orange-600" },
    { name: "Restaurant/Food Service", positions: 198, icon: UtensilsCrossed, color: "bg-yellow-100 text-yellow-600" },
    { name: "Construction/Facilities", positions: 198, icon: HardHat, color: "bg-gray-100 text-gray-600" },
    { name: "Health", positions: 198, icon: Stethoscope, color: "bg-pink-100 text-pink-600" },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Categories</h2>
          <p className="text-lg text-gray-600">20+ Categories work waiting for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.positions} Open Positions</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <button className="text-blue-600 hover:text-blue-700 font-semibold">All Categories →</button>
        </div>
      </div>
    </section>
  )
}
