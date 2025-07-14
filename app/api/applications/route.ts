import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Application } from "@/models/Application"
import { Job } from "@/models/Job"
import { User } from "@/models/User"
import { verifyToken } from "@/lib/auth"
import { sendApplicationEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("accessToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const user = await verifyToken(token)
    if (!user || user.userType !== "jobseeker") {
      return NextResponse.json({ error: "Job seeker access required" }, { status: 403 })
    }

    const body = await request.json()
    const { jobId, coverLetter } = body

    // Check if job exists
    const job = await Job.findById(jobId).populate("employer")
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: user.userId,
    })

    if (existingApplication) {
      return NextResponse.json({ error: "You have already applied for this job" }, { status: 400 })
    }

    // Get applicant details
    const applicant = await User.findById(user.userId)

    // Create application
    const application = new Application({
      job: jobId,
      applicant: user.userId,
      employer: job.employer._id,
      coverLetter,
      status: "applied",
      appliedAt: new Date(),
      atsStage: "application_received",
      score: 0, // Will be calculated by resume parser
    })

    await application.save()

    // Update job applications count
    await Job.findByIdAndUpdate(jobId, {
      $inc: { applicationsCount: 1 },
      $push: { applications: application._id },
    })

    // Send confirmation email to applicant
    await sendApplicationEmail(applicant.email, applicant.firstName, job.title, job.employer.company.name)

    return NextResponse.json({ message: "Application submitted successfully", application }, { status: 201 })
  } catch (error) {
    console.error("Application error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("accessToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const user = await verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const query: any = {}

    if (user.userType === "jobseeker") {
      query.applicant = user.userId
    } else if (user.userType === "employer") {
      query.employer = user.userId
    }

    const skip = (page - 1) * limit

    const applications = await Application.find(query)
      .populate("job", "title company location jobType salary")
      .populate("applicant", "firstName lastName email profile")
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Application.countDocuments(query)

    return NextResponse.json({
      applications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Applications fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
