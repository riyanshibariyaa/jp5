"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  User,
  FileText,
  Briefcase,
  Bell,
  Search,
  BookmarkCheck,
  TrendingUp,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  Eye,
} from "lucide-react"
import Link from "next/link"

export default function JobSeekerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    appliedJobs: 12,
    savedJobs: 8,
    profileViews: 45,
    interviewsScheduled: 3,
  })

  const [recentApplications] = useState([
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp",
      appliedDate: "2024-01-15",
      status: "Under Review",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 2,
      jobTitle: "UX Designer",
      company: "Design Studio",
      appliedDate: "2024-01-14",
      status: "Interview Scheduled",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 3,
      jobTitle: "Product Manager",
      company: "StartupXYZ",
      appliedDate: "2024-01-12",
      status: "Rejected",
      statusColor: "bg-red-100 text-red-800",
    },
  ])

  const [recommendedJobs] = useState([
    {
      id: 1,
      title: "Full Stack Developer",
      company: "Innovation Labs",
      location: "Remote",
      salary: "$80k - $120k",
      matchScore: 95,
    },
    {
      id: 2,
      title: "React Developer",
      company: "WebTech Solutions",
      location: "New York, NY",
      salary: "$70k - $100k",
      matchScore: 88,
    },
  ])

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const handleFindJobs = () => {
    router.push("/jobs")
  }

  const handleUpdateResume = () => {
    router.push("/profile/resume")
  }

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  const handleMessages = () => {
    router.push("/messages")
  }

  const handleViewApplications = () => {
    router.push("/applications")
  }

  const handleApplyToJob = (jobId: number) => {
    router.push(`/jobs/${jobId}/apply`)
  }

  const handleViewMoreJobs = () => {
    router.push("/jobs?recommended=true")
  }

  const handleCompleteProfile = () => {
    router.push("/profile/complete")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <span className="text-xl font-bold text-gray-900">JobPortal</span>
              </Link>
              <div className="ml-8">
                <h1 className="text-xl font-semibold text-gray-900">
                  Welcome back, {user?.firstName || "Job Seeker"}!
                </h1>
                <p className="text-sm text-gray-600">Let's find your next opportunity</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={handleMessages}>
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => router.push("/profile/settings")}>
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleViewApplications}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applied Jobs</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.appliedJobs}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/saved-jobs")}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Saved Jobs</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.savedJobs}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookmarkCheck className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/profile")}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profile Views</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.profileViews}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/interviews")}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Interviews</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.interviewsScheduled}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center bg-transparent hover:bg-blue-50"
                    onClick={handleFindJobs}
                  >
                    <Search className="w-6 h-6 mb-2" />
                    <span className="text-sm">Find Jobs</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center bg-transparent hover:bg-green-50"
                    onClick={handleUpdateResume}
                  >
                    <FileText className="w-6 h-6 mb-2" />
                    <span className="text-sm">Update Resume</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center bg-transparent hover:bg-purple-50"
                    onClick={handleEditProfile}
                  >
                    <User className="w-6 h-6 mb-2" />
                    <span className="text-sm">Edit Profile</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center bg-transparent hover:bg-orange-50"
                    onClick={handleMessages}
                  >
                    <MessageSquare className="w-6 h-6 mb-2" />
                    <span className="text-sm">Messages</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div
                      key={application.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/applications/${application.id}`)}
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{application.jobTitle}</h3>
                        <p className="text-gray-600">{application.company}</p>
                        <p className="text-sm text-gray-500">Applied on {application.appliedDate}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={application.statusColor}>{application.status}</Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleViewApplications}>
                    View All Applications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Profile Strength</span>
                    <span className="text-sm font-semibold text-blue-600">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Basic info completed</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Resume uploaded</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Add work experience</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                      <span className="text-gray-600">Add skills</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleCompleteProfile}>
                    Complete Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedJobs.map((job) => (
                    <div key={job.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm">{job.title}</h3>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          {job.matchScore}% match
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{job.company}</p>
                      <p className="text-gray-500 text-xs">{job.location}</p>
                      <p className="text-green-600 font-semibold text-sm mt-1">{job.salary}</p>
                      <Button
                        size="sm"
                        className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleApplyToJob(job.id)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={handleViewMoreJobs}>
                  View More Jobs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
