"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  Users,
  Eye,
  Calendar,
  MessageSquare,
  Settings,
  Plus,
  Search,
  TrendingUp,
  UserPlus,
  Building2,
  Crown,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import ATSBoard from "@/components/employer/ats-board"
import JobManagement from "@/components/employer/job-management"
import CandidateSearch from "@/components/employer/candidate-search"
import InterviewScheduler from "@/components/employer/interview-scheduler"
import AIRecruiterChat from "@/components/employer/ai-recruiter-chat"
import HRManagement from "@/components/company/hr-management"
import CompanySettings from "@/components/company/company-settings"

export default function CompanyDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    activeJobs: 5,
    totalApplications: 48,
    interviewsScheduled: 12,
    candidatesHired: 3,
    hrUsers: 3,
  })

  const [company, setCompany] = useState({
    name: "TechCorp Solutions",
    subscription: {
      plan: "premium",
      maxJobs: 50,
      maxHRUsers: 10,
    },
  })

  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState("company_owner") // or "hr"
  const [permissions, setPermissions] = useState({
    canPostJobs: true,
    canManageApplications: true,
    canScheduleInterviews: true,
    canAccessReports: true,
    canManageHRUsers: true,
    canManageCompanySettings: true,
  })

  const [recentApplications, setRecentApplications] = useState([
    {
      id: 1,
      candidateName: "John Smith",
      jobTitle: "Senior Frontend Developer",
      appliedDate: "2024-01-15",
      status: "Under Review",
      score: 85,
      statusColor: "bg-yellow-100 text-yellow-800",
      hrHandler: "Sarah Wilson",
    },
    {
      id: 2,
      candidateName: "Sarah Johnson",
      jobTitle: "UX Designer",
      appliedDate: "2024-01-14",
      status: "Interview Scheduled",
      score: 92,
      statusColor: "bg-blue-100 text-blue-800",
      hrHandler: "Mike Chen",
    },
    {
      id: 3,
      candidateName: "Mike Chen",
      jobTitle: "Product Manager",
      appliedDate: "2024-01-12",
      status: "Offer Sent",
      score: 88,
      statusColor: "bg-green-100 text-green-800",
      hrHandler: "Sarah Wilson",
    },
  ])

  useEffect(() => {
    fetchCompanyData()
  }, [])

  const fetchCompanyData = async () => {
    try {
      // Fetch company profile and user permissions
      const response = await fetch("/api/company/profile")
      if (response.ok) {
        const data = await response.json()
        setCompany(data.company)
        setUser(data.user)
        // Set user permissions based on role
      }
    } catch (error) {
      console.error("Failed to fetch company data:", error)
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

  const handlePostJob = () => {
    router.push("/post-job")
  }

  const handleInviteHR = () => {
    // This will be handled by the HRManagement component
    console.log("Invite HR clicked")
  }

  const handleViewApplication = (applicationId: number) => {
    router.push(`/dashboard/company/applications/${applicationId}`)
  }

  const handleViewAllApplications = () => {
    router.push("/dashboard/company/applications")
  }

  const handleSearchCandidates = () => {
    router.push("/candidates")
  }

  const handleScheduleInterview = () => {
    router.push("/dashboard/company/interviews/schedule")
  }

  const handleViewAnalytics = () => {
    router.push("/dashboard/company/analytics")
  }

  const handleUpgradePlan = () => {
    router.push("/dashboard/company/billing")
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
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">JobPortal</span>
              </Link>
              <div className="ml-8">
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-semibold text-gray-900">{company.name}</h1>
                  {userRole === "company_owner" && <Crown className="w-5 h-5 text-yellow-500" title="Company Owner" />}
                  <Badge variant="outline" className="text-xs">
                    {company.subscription.plan}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {userRole === "company_owner" ? "Company Dashboard" : "HR Dashboard"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {permissions.canPostJobs && (
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handlePostJob}>
                  <Plus className="w-4 h-4 mr-2" />
                  Post Job
                </Button>
              )}
              {permissions.canManageHRUsers && (
                <Button variant="outline" className="bg-transparent" onClick={handleInviteHR}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite HR
                </Button>
              )}
              <Button variant="ghost" size="icon">
                <MessageSquare className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push("/dashboard/company/jobs")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeJobs}</p>
                  <p className="text-xs text-gray-500">{company.subscription.maxJobs - stats.activeJobs} remaining</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleViewAllApplications}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applications</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
                  <p className="text-xs text-green-600">+12 this week</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push("/dashboard/company/interviews")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Interviews</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.interviewsScheduled}</p>
                  <p className="text-xs text-blue-600">5 this week</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleViewAnalytics}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hired</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.candidatesHired}</p>
                  <p className="text-xs text-green-600">+2 this month</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push("/dashboard/company/hr-team")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">HR Team</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.hrUsers}</p>
                  <p className="text-xs text-gray-500">{company.subscription.maxHRUsers - stats.hrUsers} slots left</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ats">ATS Board</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="hr-team">HR Team</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="ai-chat">AI Assistant</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Applications */}
              <div className="lg:col-span-2">
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
                          onClick={() => handleViewApplication(application.id)}
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{application.candidateName}</h3>
                            <p className="text-gray-600">{application.jobTitle}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                              <span>Applied {application.appliedDate}</span>
                              <span>•</span>
                              <span>Handled by {application.hrHandler}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">{application.score}</div>
                              <div className="text-xs text-gray-500">Score</div>
                            </div>
                            <Badge className={application.statusColor}>{application.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full bg-transparent" onClick={handleViewAllApplications}>
                        View All Applications
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Company Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {permissions.canPostJobs && (
                        <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700" onClick={handlePostJob}>
                          <Plus className="w-4 h-4 mr-2" />
                          Post New Job
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={handleSearchCandidates}
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Search Candidates
                      </Button>
                      {permissions.canScheduleInterviews && (
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                          onClick={handleScheduleInterview}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Interview
                        </Button>
                      )}
                      {permissions.canManageHRUsers && (
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                          onClick={handleInviteHR}
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Invite HR User
                        </Button>
                      )}
                      {permissions.canAccessReports && (
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                          onClick={handleViewAnalytics}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Analytics
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hiring Pipeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div
                        className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                        onClick={handleViewAllApplications}
                      >
                        <span className="text-sm text-gray-600">Applications</span>
                        <span className="font-semibold">48</span>
                      </div>
                      <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-600">Screening</span>
                        <span className="font-semibold">24</span>
                      </div>
                      <div
                        className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                        onClick={() => router.push("/dashboard/company/interviews")}
                      >
                        <span className="text-sm text-gray-600">Interviews</span>
                        <span className="font-semibold">12</span>
                      </div>
                      <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-600">Offers</span>
                        <span className="font-semibold">5</span>
                      </div>
                      <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-600">Hired</span>
                        <span className="font-semibold text-green-600">3</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Plan</span>
                        <Badge variant="outline">{company.subscription.plan}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Job Posts</span>
                        <span className="text-sm font-semibold">
                          {stats.activeJobs}/{company.subscription.maxJobs}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">HR Users</span>
                        <span className="text-sm font-semibold">
                          {stats.hrUsers}/{company.subscription.maxHRUsers}
                        </span>
                      </div>
                      {company.subscription.plan === "free" && (
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-3" onClick={handleUpgradePlan}>
                          Upgrade Plan
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ats">
            <ATSBoard />
          </TabsContent>

          <TabsContent value="jobs">
            <JobManagement />
          </TabsContent>

          <TabsContent value="candidates">
            <CandidateSearch />
          </TabsContent>

          <TabsContent value="interviews">
            <InterviewScheduler />
          </TabsContent>

          <TabsContent value="hr-team">
            {permissions.canManageHRUsers ? (
              <HRManagement />
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-600">You don't have permission to manage HR users.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings">
            {permissions.canManageCompanySettings ? (
              <CompanySettings />
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-600">You don't have permission to manage company settings.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="ai-chat">
            <AIRecruiterChat />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
