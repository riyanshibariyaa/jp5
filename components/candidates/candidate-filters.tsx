"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function CandidateFilters() {
  const jobTypes = ["Freelance", "Full Time", "Internship", "Part Time", "Temporary"]

  const categories = [
    "Any Category",
    "Technology",
    "Design",
    "Marketing",
    "Sales",
    "Finance",
    "Healthcare",
    "Education",
  ]

  const experienceLevels = [
    "Entry Level (0-2 years)",
    "Mid Level (2-5 years)",
    "Senior Level (5-10 years)",
    "Expert Level (10+ years)",
  ]

  return (
    <div className="space-y-6">
      {/* Keywords */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <input type="text" placeholder="Search" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Location</CardTitle>
        </CardHeader>
        <CardContent>
          <input type="text" placeholder="Location" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          <div className="mt-3">
            <label className="text-sm text-gray-600">Radius: 120 Km</label>
            <Slider value={[120]} max={500} step={10} className="mt-2" />
          </div>
        </CardContent>
      </Card>

      {/* Job Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Job Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {jobTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={type} />
                <label htmlFor={type} className="text-sm text-gray-700">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={category} />
                <label htmlFor={category} className="text-sm text-gray-700">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Level */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Experience Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {experienceLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox id={level} />
                <label htmlFor={level} className="text-sm text-gray-700">
                  {level}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full bg-transparent">
        Clear All Filters
      </Button>
    </div>
  )
}
