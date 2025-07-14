"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import JobFilters from "@/components/jobs/job-filters"
import JobCard from "@/components/jobs/job-card"
import SearchBar from "@/components/jobs/search-bar"
import { Button } from "@/components/ui/button"

export default function JobsPage() {
  const [jobs] = useState([
    {
      id: 1,
      title: "Digital Marketing Executive",
      company: "TechCorp Solutions",
      location: "Sacramento, California",
      type: "Full Time",
      salary: "$1200-$2500",
      posted: "11 months ago",
      description: "We are looking for a creative Digital Marketing Executive to join our team...",
      requirements: ["Bachelor's degree in Marketing", "2+ years experience", "Social media expertise"],
      logo: "G",
    },
    {
      id: 2,
      title: "Senior Software Developer",
      company: "Innovation Labs",
      location: "New York, NY",
      type: "Full Time",
      salary: "$3000-$5000",
      posted: "2 days ago",
      description: "Join our development team to build cutting-edge applications...",
      requirements: ["5+ years experience", "React/Node.js", "Team leadership"],
      logo: "I",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Creative Agency",
      location: "Los Angeles, CA",
      type: "Part Time",
      salary: "$2000-$3500",
      posted: "1 week ago",
      description: "Create amazing user experiences for our clients...",
      requirements: ["Portfolio required", "Figma/Sketch", "3+ years experience"],
      logo: "C",
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Jobs</h1>
          <p className="text-gray-600">Discover your next career opportunity</p>
        </div>

        {/* Search Bar */}
        <SearchBar />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <JobFilters />
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">Showing {jobs.length} jobs</p>
              <select className="border border-gray-300 rounded-md px-3 py-2">
                <option>Sort by: Newest</option>
                <option>Sort by: Salary</option>
                <option>Sort by: Relevance</option>
              </select>
            </div>

            <div className="space-y-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8 bg-transparent">
                Load More Jobs
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
