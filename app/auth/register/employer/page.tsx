"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2, Globe } from "lucide-react"

export default function EmployerRegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Company Info
    companyName: "",
    companySize: "",
    industry: "",
    website: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    agreeToTerms: false,
    otpMethod: "email",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else {
      console.log("Employer registration data:", formData)
    }
  }

  const companySizes = ["1-10 employees", "11-50 employees", "51-200 employees", "201-500 employees", "500+ employees"]

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Consulting",
    "Other",
  ]

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
            <CardTitle className="text-2xl font-bold text-gray-900">
              {step === 1 && "Create Employer Account"}
              {step === 2 && "Company Information"}
              {step === 3 && "Verify Your Account"}
            </CardTitle>
            <p className="text-gray-600">
              {step === 1 && "Step 1 of 3: Personal Information"}
              {step === 2 && "Step 2 of 3: Tell us about your company"}
              {step === 3 && "Step 3 of 3: Verify your email/phone"}
            </p>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Enter your business email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold">
                  Continue to Company Info
                </Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                    <select
                      value={formData.companySize}
                      onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      className="w-full h-12 px-3 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select size</option>
                      {companySizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                  <Textarea
                    placeholder="Tell us about your company..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
                  <Input
                    type="text"
                    placeholder="Street address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="h-12 mb-3"
                    required
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <Input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="h-12"
                      required
                    />
                    <Input
                      type="text"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="h-12"
                      required
                    />
                    <Input
                      type="text"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="h-12"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-12 bg-transparent"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold">
                    Continue to Verification
                  </Button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600">
                    We've sent a 6-digit code to <span className="font-semibold">{formData.email}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="h-12 text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
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

                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    Didn't receive the code?{" "}
                    <button type="button" className="text-blue-600 hover:text-blue-700 font-semibold">
                      Resend OTP
                    </button>
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-12 bg-transparent"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
                    disabled={!formData.agreeToTerms}
                  >
                    Create Account
                  </Button>
                </div>
              </form>
            )}

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
