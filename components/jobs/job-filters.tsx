"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function JobFilters() {
  const [salaryRange, setSalaryRange] = useState([0])

  const jobTypes = ["Full Time", "Part Time", "Freelance", "Internship", "Temporary"]

  const categories = ["Technology", "Healthcare", "Finance", "Marketing", "Education", "Sales", "Design", "Engineering"]

  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Executive"]

  return (
    <div className="space-y-6">
      {/* Keywords */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            placeholder="Search keywords..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
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

      {/* Salary Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Salary Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Up to ${salaryRange[0] * 100}/month</label>
              <Slider value={salaryRange} onValueChange={setSalaryRange} max={100} step={5} className="mt-2" />
            </div>
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
