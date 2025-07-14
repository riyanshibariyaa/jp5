"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

export default function HeroSection() {
  const [jobTitle, setJobTitle] = useState("")
  const [location, setLocation] = useState("")

  const handleSearch = () => {
    // Implement search functionality
    console.log("Searching for:", { jobTitle, location })
  }

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Find Jobs, Employment &<br />
          Career Opportunities
        </h1>
        <p className="text-xl text-blue-100 mb-8">
          Search Between More Than <span className="font-semibold">50,000</span> Open Jobs.
        </p>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Job Title, Keywords, or Phrase"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="City, State or ZIP"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg font-semibold">
              Find Job
            </Button>
          </div>
        </div>

        {/* Popular Categories Quick Links */}
        <div className="mt-8 text-blue-100">
          <span className="text-sm">Popular Categories: </span>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {["Healthcare", "Technology", "Finance", "Marketing", "Education"].map((category) => (
              <button
                key={category}
                className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
