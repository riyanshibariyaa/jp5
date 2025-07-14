"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

export default function PostJobPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    responsibilities: "",
    location: "",
    jobType: "full-time",
    category: "",
    experienceLevel: "mid",
    salaryMin: "",
    salaryMax: "",
    salaryCurrency: "USD",
    salaryPeriod: "yearly",
    benefits: "",
    skills: [] as string[],
    applicationDeadline: "",
    isUrgent: false,
  })

  const [currentSkill, setCurrentSkill] = useState("")

  const jobTypes = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "freelance", label: "Freelance" },
    { value: "internship", label: "Internship" },
    { value: "temporary", label: "Temporary" },
  ]

  const categories = [
    "Technology",
    "Healthcare",
    "Finance",
    "Marketing",
    "Sales",
    "Education",
    "Design",
    "Engineering",
    "Human Resources",
    "Customer Service",
    "Operations",
    "Legal",
    "Consulting",
    "Manufacturing",
    "Retail",
    "Other",
  ]

  const experienceLevels = [
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "mid", label: "Mid Level (2-5 years)" },
    { value: "senior", label: "Senior Level (5-10 years)" },
    { value: "executive", label: "Executive Level (10+ years)" },
  ]

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, currentSkill.trim()],
      })
      setCurrentSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          salary: {
            min: Number.parseInt(formData.salaryMin),
            max: Number.parseInt(formData.salaryMax),
            currency: formData.salaryCurrency,
            period: formData.salaryPeriod,
          },
        }),
      })

      if (response.ok) {
        router.push("/dashboard/employer")
      } else {
        const error = await response.json()
        alert(error.message || "Failed to post job")
      }
    } catch (error) {
      console.error("Job posting error:", error)
      alert("Failed to post job")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Job</h1>
          <p className="text-gray-600">Find the perfect candidate for your team</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                  <Input
                    type="text"
                    placeholder="e.g. Senior Software Engineer"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
                    <select
                      value={formData.jobType}
                      onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    >
                      {jobTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                    <Input
                      type="text"
                      placeholder="e.g. New York, NY or Remote"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    >
                      {experienceLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
                  <Textarea
                    placeholder="Describe the role, company culture, and what makes this opportunity unique..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requirements *</label>
                  <Textarea
                    placeholder="List the required qualifications, skills, and experience..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
                  <Textarea
                    placeholder="Describe the key responsibilities and daily tasks..."
                    value={formData.responsibilities}
                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Add a skill"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="ml-1">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Compensation */}
            <Card>
              <CardHeader>
                <CardTitle>Compensation & Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Salary</label>
                    <Input
                      type="number"
                      placeholder="50000"
                      value={formData.salaryMin}
                      onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Salary</label>
                    <Input
                      type="number"
                      placeholder="80000"
                      value={formData.salaryMax}
                      onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      value={formData.salaryCurrency}
                      onChange={(e) => setFormData({ ...formData, salaryCurrency: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="INR">INR</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                    <select
                      value={formData.salaryPeriod}
                      onChange={(e) => setFormData({ ...formData, salaryPeriod: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="yearly">Yearly</option>
                      <option value="monthly">Monthly</option>
                      <option value="hourly">Hourly</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                  <Textarea
                    placeholder="List benefits like health insurance, remote work, flexible hours..."
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Application Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
                  <Input
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgent"
                    checked={formData.isUrgent}
                    onCheckedChange={(checked) => setFormData({ ...formData, isUrgent: checked as boolean })}
                  />
                  <label htmlFor="urgent" className="text-sm text-gray-700">
                    Mark as urgent hiring (additional cost applies)
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? "Posting..." : "Post Job"}
              </Button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
