"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Eye, Trash2, Users, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"

interface Job {
  _id: string
  title: string
  department: string
  location: string
  type: string
  salary: {
    min: number
    max: number
    currency: string
  }
  status: string
  applicationsCount: number
  postedDate: string
  deadline: string
  description: string
}

export default function JobManagement() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock data for demonstration
  const mockJobs: Job[] = [
    {
      _id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: { min: 80000, max: 120000, currency: "USD" },
      status: "active",
      applicationsCount: 24,
      postedDate: "2024-01-15",
      deadline: "2024-02-15",
      description: "We are looking for a senior frontend developer...",
    },
    {
      _id: "2",
      title: "UX Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      salary: { min: 70000, max: 100000, currency: "USD" },
      status: "active",
      applicationsCount: 18,
      postedDate: "2024-01-12",
      deadline: "2024-02-12",
      description: "Join our design team as a UX designer...",
    },
    {
      _id: "3",
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: { min: 90000, max: 130000, currency: "USD" },
      status: "draft",
      applicationsCount: 0,
      postedDate: "2024-01-20",
      deadline: "2024-02-20",
      description: "Lead our product development initiatives...",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs)
      setLoading(false)
    }, 1000)
  }, [])

  const handleCreateJob = () => {
    router.push("/post-job")
  }

  const handleEditJob = (jobId: string) => {
    router.push(`/dashboard/company/jobs/${jobId}/edit`)
  }

  const handleViewJob = (jobId: string) => {
    router.push(`/dashboard/company/jobs/${jobId}`)
  }

  const handleViewApplications = (jobId: string) => {
    router.push(`/dashboard/company/jobs/${jobId}/applications`)
  }

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      return
    }

    try {
      // API call to delete job
      setJobs(jobs.filter((job) => job._id !== jobId))
      alert("Job deleted successfully!")
    } catch (error) {
      console.error("Delete error:", error)
      alert("Failed to delete job")
    }
  }

  const handleToggleStatus = async (jobId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "paused" : "active"

    try {
      // API call to update job status
      setJobs(jobs.map((job) => (job._id === jobId ? { ...job, status: newStatus } : job)))
      alert(`Job ${newStatus === "active" ? "activated" : "paused"} successfully!`)
    } catch (error) {
      console.error("Status update error:", error)
      alert("Failed to update job status")
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || job.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Loading jobs...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Job Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateJob}>
          <Plus className="w-4 h-4 mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search jobs by title or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-10 px-3 border border-gray-300 rounded-md"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <DollarSign className="w-4 h-4" />
                    <span>
                      {job.salary.currency} {job.salary.min} - {job.salary.max}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEditJob(job._id)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleViewJob(job._id)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteJob(job._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 border-t pt-4 mt-4">
                <div>
                  <p className="font-medium">Applications</p>
                  <p className="text-lg font-bold text-blue-600">{job.applicationsCount}</p>
                </div>
                <div>
                  <p className="font-medium">Posted On</p>
                  <p>{job.postedDate}</p>
                </div>
                <div>
                  <p className="font-medium">Deadline</p>
                  <p>{job.deadline}</p>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewApplications(job._id)}>
                    <Users className="w-4 h-4 mr-2" />
                    View Applications
                  </Button>
                  <Button
                    variant={job.status === "active" ? "secondary" : "default"}
                    size="sm"
                    onClick={() => handleToggleStatus(job._id, job.status)}
                  >
                    {job.status === "active" ? "Pause Job" : "Activate Job"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">No jobs found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
