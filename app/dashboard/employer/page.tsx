"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Users, Eye, Calendar, MessageSquare, Settings, Plus, Search, TrendingUp } from "lucide-react"
import Link from "next/link"
import ATSBoard from "@/components/employer/ats-board"
import JobManagement from "@/components/employer/job-management"
import CandidateSearch from "@/components/employer/candidate-search"
import InterviewScheduler from "@/components/employer/interview-scheduler"
import AIRecruiterChat from "@/components/employer/ai-recruiter-chat"

export default function EmployerDashboard() {
  const [stats, setStats] = useState({
    activeJobs: 5,
    totalApplications: 48,
    interviewsScheduled: 12,
    candidatesHired: 3,
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
    },
    {
      id: 2,
      candidateName: "Sarah Johnson",
      jobTitle: "UX Designer",
      appliedDate: "2024-01-14",
      status: "Interview Scheduled",
      score: 92,
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 3,
      candidateName: "Mike Chen",
      jobTitle: "Product Manager",
      appliedDate: "2024-01-12",
      status: "Offer Sent",
      score: 88,
      statusColor: "bg-green-100 text-green-800",
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Employer Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your hiring process</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/post-job">
                  <Plus className="w-4 h-4 mr-2" />
                  Post Job
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <MessageSquare className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeJobs}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applications</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Interviews</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.interviewsScheduled}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hired</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.candidatesHired}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ats">ATS Board</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
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
                        <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{application.candidateName}</h3>
                            <p className="text-gray-600">{application.jobTitle}</p>
                            <p className="text-sm text-gray-500">Applied on {application.appliedDate}</p>
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
                      <Button variant="outline" className="w-full bg-transparent">
                        View All Applications
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button asChild className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                        <Link href="/post-job">
                          <Plus className="w-4 h-4 mr-2" />
                          Post New Job
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Search className="w-4 h-4 mr-2" />
                        Search Candidates
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Interview
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        View Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hiring Pipeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Applications</span>
                        <span className="font-semibold">48</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Screening</span>
                        <span className="font-semibold">24</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Interviews</span>
                        <span className="font-semibold">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Offers</span>
                        <span className="font-semibold">5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Hired</span>
                        <span className="font-semibold text-green-600">3</span>
                      </div>
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

          <TabsContent value="ai-chat">
            <AIRecruiterChat />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
