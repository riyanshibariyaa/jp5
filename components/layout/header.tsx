"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, Building2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">JobPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              HOME
            </Link>
            <Link href="/jobs" className="text-gray-700 hover:text-blue-600 font-medium">
              FIND JOBS
            </Link>
            <Link href="/post-job" className="text-gray-700 hover:text-blue-600 font-medium">
              POST A JOB
            </Link>
            <Link href="/candidates" className="text-gray-700 hover:text-blue-600 font-medium">
              BROWSE CANDIDATES
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
                  Sign Up
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/auth/register/jobseeker" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Job Seeker
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/register/company" className="flex items-center">
                    <Building2 className="w-4 h-4 mr-2" />
                    Company
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                HOME
              </Link>
              <Link href="/jobs" className="text-gray-700 hover:text-blue-600 font-medium">
                FIND JOBS
              </Link>
              <Link href="/post-job" className="text-gray-700 hover:text-blue-600 font-medium">
                POST A JOB
              </Link>
              <Link href="/candidates" className="text-gray-700 hover:text-blue-600 font-medium">
                BROWSE CANDIDATES
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="outline" className="text-blue-600 border-blue-600 bg-transparent">
                  Sign Up
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
