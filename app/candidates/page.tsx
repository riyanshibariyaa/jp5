"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CandidateFilters from "@/components/candidates/candidate-filters"
import CandidateCard from "@/components/candidates/candidate-card"
import SearchBar from "@/components/candidates/search-bar"
import { Button } from "@/components/ui/button"

export default function CandidatesPage() {
  const [candidates] = useState([
    {
      id: 1,
      name: "John Smith",
      title: "Digital Marketing Executive",
      location: "New York",
      rate: "$45",
      skills: ["Javascript", "CSS", "HTML", "Bootstrap"],
      experience: "5+ years",
      availability: "Full Time",
      avatar: "JS",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Senior UX Designer",
      location: "California",
      rate: "$65",
      skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
      experience: "7+ years",
      availability: "Freelance",
      avatar: "SJ",
    },
    {
      id: 3,
      name: "Mike Chen",
      title: "Full Stack Developer",
      location: "Texas",
      rate: "$55",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      experience: "4+ years",
      availability: "Full Time",
      avatar: "MC",
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Candidates</h1>
          <p className="text-gray-600">Find talented professionals for your team</p>
        </div>

        {/* Search Bar */}
        <SearchBar />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <CandidateFilters />
          </div>

          {/* Candidate Listings */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">Showing {candidates.length} candidates</p>
              <select className="border border-gray-300 rounded-md px-3 py-2">
                <option>Sort by: Newest</option>
                <option>Sort by: Experience</option>
                <option>Sort by: Rate</option>
              </select>
            </div>

            <div className="space-y-6">
              {candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8 bg-transparent">
                Load More Candidates
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
