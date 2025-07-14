"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Briefcase, DollarSign, GraduationCap, Star, Mail, Download } from "lucide-react"

interface Candidate {
  _id: string
  name: string
  title: string
  location: string
  experience: string
  education: string
  skills: string[]
  expectedSalary: {
    min: number
    max: number
    currency: string
  }
  contact: {
    email: string
    phone: string
  }
  resumeUrl: string
  matchScore?: number
}

export default function CandidateSearch() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLocation, setFilterLocation] = useState("")
  const [filterExperience, setFilterExperience] = useState("")
  const [filterSkills, setFilterSkills] = useState("")

  // Mock data for demonstration
  const mockCandidates: Candidate[] = [
    {
      _id: "c1",
      name: "Alice Johnson",
      title: "Senior Frontend Developer",
      location: "Remote",
      experience: "5+ years",
      education: "B.S. Computer Science",
      skills: ["React", "Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
      expectedSalary: { min: 90000, max: 130000, currency: "USD" },
      contact: { email: "alice.j@example.com", phone: "555-123-4567" },
      resumeUrl: "/placeholder.pdf",
      matchScore: 92,
    },
    {
      _id: "c2",
      name: "Bob Williams",
      title: "UX/UI Designer",
      location: "New York, NY",
      experience: "3-5 years",
      education: "M.A. Interaction Design",
      skills: ["Figma", "Sketch", "User Research", "Prototyping"],
      expectedSalary: { min: 70000, max: 100000, currency: "USD" },
      contact: { email: "bob.w@example.com", phone: "555-987-6543" },
      resumeUrl: "/placeholder.pdf",
      matchScore: 88,
    },
    {
      _id: "c3",
      name: "Charlie Brown",
      title: "Backend Engineer",
      location: "San Francisco, CA",
      experience: "5+ years",
      education: "Ph.D. Computer Engineering",
      skills: ["Node.js", "Python", "MongoDB", "AWS", "Docker"],
      expectedSalary: { min: 100000, max: 150000, currency: "USD" },
      contact: { email: "charlie.b@example.com", phone: "555-111-2222" },
      resumeUrl: "/placeholder.pdf",
      matchScore: 95,
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCandidates(mockCandidates)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesLocation =
      filterLocation === "" || candidate.location.toLowerCase().includes(filterLocation.toLowerCase())
    const matchesExperience = filterExperience === "" || candidate.experience === filterExperience
    const matchesSkills =
      filterSkills === "" || candidate.skills.some((skill) => skill.toLowerCase().includes(filterSkills.toLowerCase()))

    return matchesSearch && matchesLocation && matchesExperience && matchesSkills
  })

  const handleContactCandidate = (email: string) => {
    window.location.href = `mailto:${email}`
  }

  const handleDownloadResume = (url: string) => {
    window.open(url, "_blank")
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Loading candidates...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Candidate Search</h2>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by name, title, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Location"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterExperience}
              onChange={(e) => setFilterExperience(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md"
            >
              <option value="">Experience Level</option>
              <option value="0-1 year">0-1 year</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
            <Input
              type="text"
              placeholder="Skills (comma-separated)"
              value={filterSkills}
              onChange={(e) => setFilterSkills(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Candidates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                  <p className="text-gray-700">{candidate.title}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{candidate.location}</span>
                  </div>
                </div>
                {candidate.matchScore && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-sm">
                    <Star className="w-4 h-4 mr-1" /> {candidate.matchScore}% Match
                  </Badge>
                )}
              </div>

              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{candidate.experience} Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>{candidate.education}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>
                    {candidate.expectedSalary.currency} {candidate.expectedSalary.min} - {candidate.expectedSalary.max}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-medium text-gray-800 mb-2">Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleContactCandidate(candidate.contact.email)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleDownloadResume(candidate.resumeUrl)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredCandidates.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">No candidates found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
