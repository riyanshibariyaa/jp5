"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Plus, Mail, Phone, Edit, Trash2, Check, X, Eye, EyeOff } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface HRUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  isVerified: boolean
  permissions: {
    canPostJobs: boolean
    canManageApplications: boolean
    canScheduleInterviews: boolean
    canAccessReports: boolean
    canManageHRUsers: boolean
    canManageCompanySettings: boolean
  }
  status: "active" | "pending" | "inactive"
}

export default function HRManagement() {
  const [hrUsers, setHrUsers] = useState<HRUser[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentHR, setCurrentHR] = useState<Partial<HRUser> | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")

  // Mock data for demonstration
  const mockHRUsers: HRUser[] = [
    {
      _id: "hr1",
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.w@company.com",
      phone: "111-222-3333",
      isVerified: true,
      permissions: {
        canPostJobs: true,
        canManageApplications: true,
        canScheduleInterviews: true,
        canAccessReports: true,
        canManageHRUsers: false,
        canManageCompanySettings: false,
      },
      status: "active",
    },
    {
      _id: "hr2",
      firstName: "Mike",
      lastName: "Chen",
      email: "mike.c@company.com",
      phone: "444-555-6666",
      isVerified: true,
      permissions: {
        canPostJobs: false,
        canManageApplications: true,
        canScheduleInterviews: true,
        canAccessReports: true,
        canManageHRUsers: false,
        canManageCompanySettings: false,
      },
      status: "active",
    },
    {
      _id: "hr3",
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.d@company.com",
      phone: "777-888-9999",
      isVerified: false,
      permissions: {
        canPostJobs: true,
        canManageApplications: true,
        canScheduleInterviews: false,
        canAccessReports: false,
        canManageHRUsers: false,
        canManageCompanySettings: false,
      },
      status: "pending",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHrUsers(mockHRUsers)
      setLoading(false)
    }, 1000)
  }, [])

  const handleOpenDialog = (hrUser?: HRUser) => {
    setCurrentHR(
      hrUser || {
        permissions: {
          canPostJobs: false,
          canManageApplications: false,
          canScheduleInterviews: false,
          canAccessReports: false,
          canManageHRUsers: false,
          canManageCompanySettings: false,
        },
        isVerified: false,
        status: "pending",
      },
    )
    setPassword("")
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setCurrentHR(null)
    setPassword("")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCurrentHR((prev) => ({ ...prev, [name]: value }))
  }

  const handlePermissionChange = (permission: keyof HRUser["permissions"], checked: boolean) => {
    setCurrentHR((prev) => ({
      ...prev,
      permissions: {
        ...prev?.permissions,
        [permission]: checked,
      },
    }))
  }

  const handleSaveHR = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentHR) return

    const hrToSave = { ...currentHR } as HRUser
    if (!hrToSave._id && !password) {
      alert("Password is required for new HR users.")
      return
    }

    try {
      if (hrToSave._id) {
        // Update existing HR user
        setHrUsers(hrUsers.map((hr) => (hr._id === hrToSave._id ? hrToSave : hr)))
        alert("HR user updated successfully!")
      } else {
        // Create new HR user
        const newHR = { ...hrToSave, _id: `hr${Date.now()}`, password: password }
        setHrUsers([...hrUsers, newHR])
        alert("HR user invited successfully! An email with login details has been sent.")
      }
      handleCloseDialog()
    } catch (error) {
      console.error("Save HR error:", error)
      alert("Failed to save HR user")
    }
  }

  const handleDeleteHR = async (id: string) => {
    if (!confirm("Are you sure you want to remove this HR user?")) {
      return
    }
    try {
      setHrUsers(hrUsers.filter((hr) => hr._id !== id))
      alert("HR user removed successfully!")
    } catch (error) {
      console.error("Delete HR error:", error)
      alert("Failed to remove HR user")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Loading HR users...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">HR Team Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Invite New HR
        </Button>
      </div>

      {/* HR Users List */}
      <div className="grid grid-cols-1 gap-6">
        {hrUsers.map((hr) => (
          <Card key={hr._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {hr.firstName} {hr.lastName}
                    </h3>
                    <Badge className={getStatusColor(hr.status)}>
                      {hr.status.charAt(0).toUpperCase() + hr.status.slice(1)}
                    </Badge>
                    {hr.isVerified ? (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        Unverified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{hr.email}</span>
                    </div>
                    {hr.phone && (
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{hr.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleOpenDialog(hr)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteHR(hr._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <p className="font-medium text-gray-800 mb-2">Permissions:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    {hr.permissions.canPostJobs ? (
                      <Check className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <X className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span>Post Jobs</span>
                  </div>
                  <div className="flex items-center">
                    {hr.permissions.canManageApplications ? (
                      <Check className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <X className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span>Manage Applications</span>
                  </div>
                  <div className="flex items-center">
                    {hr.permissions.canScheduleInterviews ? (
                      <Check className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <X className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span>Schedule Interviews</span>
                  </div>
                  <div className="flex items-center">
                    {hr.permissions.canAccessReports ? (
                      <Check className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <X className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span>Access Reports</span>
                  </div>
                  <div className="flex items-center">
                    {hr.permissions.canManageHRUsers ? (
                      <Check className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <X className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span>Manage HR Users</span>
                  </div>
                  <div className="flex items-center">
                    {hr.permissions.canManageCompanySettings ? (
                      <Check className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <X className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span>Manage Company Settings</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {hrUsers.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">No HR users found. Invite your first HR!</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* HR User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentHR?._id ? "Edit HR User" : "Invite New HR User"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveHR} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="firstName" className="text-right">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                value={currentHR?.firstName || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="lastName" className="text-right">
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                value={currentHR?.lastName || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={currentHR?.email || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right">
                Phone (Optional)
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={currentHR?.phone || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            {!currentHR?._id && ( // Only show password for new HR users
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="password" className="text-right">
                  Password
                </label>
                <div className="relative col-span-3">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 items-start gap-4">
              <label className="text-right pt-2">Permissions</label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="canPostJobs"
                    checked={currentHR?.permissions?.canPostJobs}
                    onCheckedChange={(checked) => handlePermissionChange("canPostJobs", checked as boolean)}
                  />
                  <label
                    htmlFor="canPostJobs"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Post Jobs
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="canManageApplications"
                    checked={currentHR?.permissions?.canManageApplications}
                    onCheckedChange={(checked) => handlePermissionChange("canManageApplications", checked as boolean)}
                  />
                  <label
                    htmlFor="canManageApplications"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Manage Applications
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="canScheduleInterviews"
                    checked={currentHR?.permissions?.canScheduleInterviews}
                    onCheckedChange={(checked) => handlePermissionChange("canScheduleInterviews", checked as boolean)}
                  />
                  <label
                    htmlFor="canScheduleInterviews"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Schedule Interviews
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="canAccessReports"
                    checked={currentHR?.permissions?.canAccessReports}
                    onCheckedChange={(checked) => handlePermissionChange("canAccessReports", checked as boolean)}
                  />
                  <label
                    htmlFor="canAccessReports"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Access Reports
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="canManageHRUsers"
                    checked={currentHR?.permissions?.canManageHRUsers}
                    onCheckedChange={(checked) => handlePermissionChange("canManageHRUsers", checked as boolean)}
                  />
                  <label
                    htmlFor="canManageHRUsers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Manage HR Users
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="canManageCompanySettings"
                    checked={currentHR?.permissions?.canManageCompanySettings}
                    onCheckedChange={(checked) =>
                      handlePermissionChange("canManageCompanySettings", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="canManageCompanySettings"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Manage Company Settings
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {currentHR?._id ? "Save Changes" : "Invite HR User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
