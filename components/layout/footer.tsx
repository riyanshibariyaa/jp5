import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-2xl font-bold">JobPortal</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner in finding the perfect job opportunities and connecting talented professionals with
              leading companies.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="text-gray-400 hover:text-white">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link href="/post-job" className="text-gray-400 hover:text-white">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/candidates" className="text-gray-400 hover:text-white">
                  Browse Candidates
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-gray-400 hover:text-white">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/employer/dashboard" className="text-gray-400 hover:text-white">
                  Employer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/ats" className="text-gray-400 hover:text-white">
                  ATS Features
                </Link>
              </li>
              <li>
                <Link href="/resume-database" className="text-gray-400 hover:text-white">
                  Resume Database
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-400">support@JobPortal.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-400">
                  123 Business Ave, Suite 100
                  <br />
                  New York, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 JobPortal. All rights reserved. |
            <Link href="/privacy" className="hover:text-white ml-1">
              Privacy Policy
            </Link>{" "}
            |
            <Link href="/terms" className="hover:text-white ml-1">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
