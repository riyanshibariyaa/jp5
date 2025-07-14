"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

export default function SearchBar() {
  const [keywords, setKeywords] = useState("")
  const [location, setLocation] = useState("")

  const handleSearch = () => {
    console.log("Searching for:", { keywords, location })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Job Title, Keywords, or Phrase"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="City, State or ZIP"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 h-12 px-8 font-semibold">
          Find Candidates
        </Button>
      </div>
    </div>
  )
}
