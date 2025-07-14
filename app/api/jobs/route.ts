import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Job } from "@/models/Job"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const location = searchParams.get("location") || ""
    const jobType = searchParams.get("jobType") || ""
    const category = searchParams.get("category") || ""
    const salaryMin = searchParams.get("salaryMin")
    const salaryMax = searchParams.get("salaryMax")

    // Build query
    const query: any = { isActive: true }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { requirements: { $regex: search, $options: "i" } },
      ]
    }

    if (location) {
      query.location = { $regex: location, $options: "i" }
    }

    if (jobType) {
      query.jobType = jobType
    }

    if (category) {
      query.category = category
    }

    if (salaryMin || salaryMax) {
      query["salary.min"] = {}
      if (salaryMin) query["salary.min"].$gte = Number.parseInt(salaryMin)
      if (salaryMax) query["salary.max"] = { $lte: Number.parseInt(salaryMax) }
    }

    const skip = (page - 1) * limit

    const jobs = await Job.find(query)
      .populate("employer", "firstName lastName company")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Job.countDocuments(query)

    return NextResponse.json({
      jobs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Jobs fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("accessToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const user = await verifyToken(token)
    if (!user || user.userType !== "employer") {
      return NextResponse.json({ error: "Employer access required" }, { status: 403 })
    }

    const body = await request.json()
    const {
      title,
      description,
      requirements,
      responsibilities,
      location,
      jobType,
      category,
      experienceLevel,
      salary,
      benefits,
      applicationDeadline,
      isUrgent,
    } = body

    const job = new Job({
      title,
      description,
      requirements: Array.isArray(requirements) ? requirements : requirements.split("\n"),
      responsibilities: Array.isArray(responsibilities) ? responsibilities : responsibilities.split("\n"),
      location,
      jobType,
      category,
      experienceLevel,
      salary,
      benefits: Array.isArray(benefits) ? benefits : benefits.split("\n"),
      applicationDeadline: new Date(applicationDeadline),
      isUrgent: isUrgent || false,
      employer: user.userId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await job.save()

    return NextResponse.json({ message: "Job posted successfully", job }, { status: 201 })
  } catch (error) {
    console.error("Job posting error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
