import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export default function TestimonialSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Testimonial */}
          <div>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8">
                <Quote className="w-12 h-12 text-blue-600 mb-4" />
                <blockquote className="text-lg text-gray-700 mb-6 italic">
                  "I just got a job that I applied for via JobPortal! I used the site all the time during my job hunt.
                  The platform made it so easy to find relevant opportunities and connect with employers."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    RA
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Richard Anderson</div>
                    <div className="text-gray-600">Nevada, USA</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resume Builder CTA */}
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Make a Difference with Your Online Resume!</h3>
            <p className="text-lg text-gray-600 mb-6">
              Your resume in minutes with JobPortal resume assistant is ready!
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
