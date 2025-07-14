"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Briefcase,
  Building2,
  TrendingUp,
  AlertTriangle,
  Settings,
  Shield,
  BarChart3,
  DollarSign,
} from "lucide-react"
import UserManagement from "@/components/admin/user-management"
import JobModeration from "@/components/admin/job-moderation"
import Analytics from "@/components/admin/analytics"
import PaymentTracking from "@/components/admin/payment-tracking"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobSeekers: 0,
    totalEmployers: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
  })

  const [monthlyStats, setMonthlyStats] = useState({
    newUsers: 0,
    newJobs: 0,
    newApplications: 0,
  })

  const [recentUsers, setRecentUsers] = useState([])
  const [recentJobs, setRecentJobs] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard")
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        setMonthlyStats(data.monthlyStats)
        setRecentUsers(data.recentUsers)
        setRecentJobs(data.recentJobs)
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Platform management and analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <AlertTriangle className="w-5 h-5" />
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
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                  <p className="text-sm text-green-600">+{monthlyStats.newUsers} this month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Job Seekers</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalJobSeekers}</p>
                  <p className="text-sm text-gray-500">
                    {Math.round((stats.totalJobSeekers / stats.totalUsers) * 100)}% of users
                  </p>
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
                  <p className="text-sm font-medium text-gray-600">Employers</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalEmployers}</p>
                  <p className="text-sm text-gray-500">
                    {Math.round((stats.totalEmployers / stats.totalUsers) * 100)}% of users
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeJobs}</p>
                  <p className="text-sm text-green-600">+{monthlyStats.newJobs} this month</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Users */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.slice(0, 5).map((user: any) => (
                      <div key={user._id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {user.firstName} {user.lastName}
                          </h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            Joined {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user.userType === "employer" ? "default" : "secondary"}>
                            {user.userType}
                          </Badge>
                          <Badge variant={user.isVerified ? "default" : "destructive"}>
                            {user.isVerified ? "Verified" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentJobs.slice(0, 5).map((job: any) => (
                      <div key={job._id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <p className="text-sm text-gray-600">{job.employer?.company?.name || "Company"}</p>
                          <p className="text-xs text-gray-500">Posted {new Date(job.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{job.category}</Badge>
                          <Badge variant={job.isActive ? "default" : "destructive"}>
                            {job.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Growth Rate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">User Growth</span>
                      <span className="text-sm font-semibold text-green-600">+12.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Job Postings</span>
                      <span className="text-sm font-semibold text-green-600">+8.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Applications</span>
                      <span className="text-sm font-semibold text-green-600">+15.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Platform Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">System Uptime</span>
                      <span className="text-sm font-semibold text-green-600">99.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <span className="text-sm font-semibold text-green-600">120ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Error Rate</span>
                      <span className="text-sm font-semibold text-green-600">0.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    <span>Revenue</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="text-sm font-semibold text-purple-600">$12,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Month</span>
                      <span className="text-sm font-semibold text-gray-600">$10,230</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Growth</span>
                      <span className="text-sm font-semibold text-green-600">+21.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="jobs">
            <JobModeration />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentTracking />
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Platform configuration settings will be implemented here.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
