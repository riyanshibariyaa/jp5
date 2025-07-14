import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import { Job } from "@/models/Job"
import { Application } from "@/models/Application"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("accessToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const user = await verifyToken(token)
    if (!user || user.userType !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    // Get dashboard statistics
    const totalUsers = await User.countDocuments()
    const totalJobSeekers = await User.countDocuments({ userType: "jobseeker" })
    const totalEmployers = await User.countDocuments({ userType: "employer" })
    const totalJobs = await Job.countDocuments()
    const activeJobs = await Job.countDocuments({ isActive: true })
    const totalApplications = await Application.countDocuments()

    // Get recent activities
    const recentUsers = await User.find()
      .select("firstName lastName email userType createdAt isVerified")
      .sort({ createdAt: -1 })
      .limit(10)

    const recentJobs = await Job.find()
      .populate("employer", "firstName lastName company")
      .sort({ createdAt: -1 })
      .limit(10)

    // Get monthly statistics
    const currentDate = new Date()
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)

    const monthlyStats = {
      newUsers: await User.countDocuments({ createdAt: { $gte: lastMonth } }),
      newJobs: await Job.countDocuments({ createdAt: { $gte: lastMonth } }),
      newApplications: await Application.countDocuments({ appliedAt: { $gte: lastMonth } }),
    }

    return NextResponse.json({
      stats: {
        totalUsers,
        totalJobSeekers,
        totalEmployers,
        totalJobs,
        activeJobs,
        totalApplications,
      },
      monthlyStats,
      recentUsers,
      recentJobs,
    })
  } catch (error) {
    console.error("Admin dashboard error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
