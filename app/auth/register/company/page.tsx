"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff, Mail, Lock, Phone, Building2, Globe, MapPin } from "lucide-react"

export default function CompanyRegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Company Info
    companyName: "",
    companyDescription: "",
    industry: "",
    companySize: "",
    website: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
    contactEmail: "",
    contactPhone: "",
    ownerPassword: "",
    agreeToTerms: false,
  })

  const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"]

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Consulting",
    "Marketing",
    "Real Estate",
    "Legal",
    "Non-profit",
    "Other",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/register/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Registration successful, redirect to company dashboard
        router.push("/dashboard/company")
      } else {
        alert(data.error || "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      alert("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">J</span>
            </div>
            <span className="text-3xl font-bold text-gray-900">JobPortal</span>
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Create Company Account</CardTitle>
            <p className="text-gray-600">Register your company and start hiring</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Description *</label>
                <Textarea
                  placeholder="Describe your company, what you do, and your mission..."
                  value={formData.companyDescription}
                  onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full h-12 px-3 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Size *</label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full h-12 px-3 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select size</option>
                    {companySizes.map((size) => (
                      <option key={size} value={size}>
                        {size} employees
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="url"
                    placeholder="https://www.company.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    placeholder="Enter company email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="tel"
                    placeholder="Enter company phone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Owner Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password for company owner"
                    value={formData.ownerPassword}
                    onChange={(e) => setFormData({ ...formData, ownerPassword: e.target.value })}
                    className="pl-10 pr-10 h-12"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Address *</label>
                <div className="space-y-3">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Street address"
                      value={formData.address.street}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: { ...formData.address, street: e.target.value },
                        })
                      }
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <Input
                      type="text"
                      placeholder="City"
                      value={formData.address.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: { ...formData.address, city: e.target.value },
                        })
                      }
                      className="h-12"
                      required
                    />
                    <Input
                      type="text"
                      placeholder="State"
                      value={formData.address.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: { ...formData.address, state: e.target.value },
                        })
                      }
                      className="h-12"
                      required
                    />
                    <Input
                      type="text"
                      placeholder="ZIP Code"
                      value={formData.address.zipCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: { ...formData.address, zipCode: e.target.value },
                        })
                      }
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
                disabled={loading || !formData.agreeToTerms}
              >
                {loading ? "Creating Company..." : "Create Company Account"}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
