"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard, Edit } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CompanyProfile {
  name: string
  description: string
  industry: string
  companySize: string
  website: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  contactEmail: string
  contactPhone: string
  subscription: {
    plan: string
    maxJobs: number
    maxHRUsers: number
    expiresAt?: string
  }
  ownerName: string
  ownerEmail: string
}

export default function CompanySettings() {
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // Mock data for demonstration
  const mockCompanyProfile: CompanyProfile = {
    name: "TechCorp Solutions",
    description: "Leading software development company specializing in AI and cloud solutions.",
    industry: "Technology",
    companySize: "201-500",
    website: "https://www.techcorp.com",
    address: {
      street: "123 Tech Drive",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States",
    },
    contactEmail: "info@techcorp.com",
    contactPhone: "1-800-TECHCORP",
    subscription: {
      plan: "premium",
      maxJobs: 50,
      maxHRUsers: 10,
      expiresAt: "2025-12-31",
    },
    ownerName: "Jane Doe",
    ownerEmail: "jane.doe@techcorp.com",
  }

  useEffect(() => {
    // Simulate API call to fetch company profile
    setTimeout(() => {
      setCompanyProfile(mockCompanyProfile)
      setLoading(false)
    }, 1000)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (companyProfile) {
      if (name.startsWith("address.")) {
        const addressField = name.split(".")[1]
        setCompanyProfile({
          ...companyProfile,
          address: {
            ...companyProfile.address,
            [addressField]: value,
          },
        })
      } else {
        setCompanyProfile({ ...companyProfile, [name]: value })
      }
    }
  }

  const handleSave = async () => {
    if (!companyProfile) return

    try {
      // Simulate API call to update company profile
      console.log("Saving company profile:", companyProfile)
      alert("Company profile updated successfully!")
      setIsEditing(false)
    } catch (error) {
      console.error("Save error:", error)
      alert("Failed to update company profile")
    }
  }

  const handleCancel = () => {
    setCompanyProfile(mockCompanyProfile) // Revert to original data
    setIsEditing(false)
  }

  const handleUpgradePlan = () => {
    // Navigate to billing page
    alert("Navigating to billing page for upgrade!")
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Loading company settings...</p>
        </CardContent>
      </Card>
    )
  }

  if (!companyProfile) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-red-600">Failed to load company profile.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Company Settings</h2>
        {!isEditing ? (
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsEditing(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Company Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <Input
              name="name"
              value={companyProfile.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Textarea
              name="description"
              value={companyProfile.description}
              onChange={handleChange}
              disabled={!isEditing}
              className="min-h-[100px] bg-gray-50"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <Input
                name="industry"
                value={companyProfile.industry}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
              <Input
                name="companySize"
                value={companyProfile.companySize}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-gray-50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <Input
              name="website"
              value={companyProfile.website}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-gray-50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            <Input
              name="contactEmail"
              type="email"
              value={companyProfile.contactEmail}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
            <Input
              name="contactPhone"
              type="tel"
              value={companyProfile.contactPhone}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <div className="space-y-2">
              <Input
                name="address.street"
                placeholder="Street"
                value={companyProfile.address.street}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-gray-50"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Input
                  name="address.city"
                  placeholder="City"
                  value={companyProfile.address.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-gray-50"
                />
                <Input
                  name="address.state"
                  placeholder="State"
                  value={companyProfile.address.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-gray-50"
                />
                <Input
                  name="address.zipCode"
                  placeholder="ZIP Code"
                  value={companyProfile.address.zipCode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-gray-50"
                />
              </div>
              <Input
                name="address.country"
                placeholder="Country"
                value={companyProfile.address.country}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-gray-50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription & Billing */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription & Billing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Current Plan:</span>
            <Badge variant="outline" className="text-base py-1 px-3">
              {companyProfile.subscription.plan.toUpperCase()}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Max Job Posts:</span>
            <span className="text-gray-900">{companyProfile.subscription.maxJobs}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Max HR Users:</span>
            <span className="text-gray-900">{companyProfile.subscription.maxHRUsers}</span>
          </div>
          {companyProfile.subscription.expiresAt && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Expires On:</span>
              <span className="text-gray-900">{companyProfile.subscription.expiresAt}</span>
            </div>
          )}
          <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleUpgradePlan}>
            <CreditCard className="w-4 h-4 mr-2" />
            Upgrade Plan
          </Button>
        </CardContent>
      </Card>

      {/* Owner Information (Read-only) */}
      <Card>
        <CardHeader>
          <CardTitle>Account Owner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
            <Input value={companyProfile.ownerName} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner Email</label>
            <Input value={companyProfile.ownerEmail} disabled className="bg-gray-50" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
