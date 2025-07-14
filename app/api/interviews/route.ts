import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Interview } from "@/models/Interview"
import { Application } from "@/models/Application"
import { verifyToken } from "@/lib/auth"
import { sendInterviewEmail } from "@/lib/email"
import { createCalendarEvent } from "@/lib/calendar"

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
    const { applicationId, scheduledAt, duration, type, location, notes, interviewers } = body

    // Verify application exists and belongs to employer
    const application = await Application.findById(applicationId)
      .populate("applicant", "firstName lastName email")
      .populate("job", "title")

    if (!application || application.employer.toString() !== user.userId) {
      return NextResponse.json({ error: "Application not found or access denied" }, { status: 404 })
    }

    const interview = new Interview({
      application: applicationId,
      job: application.job._id,
      applicant: application.applicant._id,
      employer: user.userId,
      scheduledAt: new Date(scheduledAt),
      duration,
      type,
      location,
      notes,
      interviewers: interviewers || [],
      status: "scheduled",
      createdAt: new Date(),
    })

    await interview.save()

    // Update application status
    await Application.findByIdAndUpdate(applicationId, {
      status: "interview_scheduled",
      atsStage: "interview",
      updatedAt: new Date(),
    })

    // Send interview email to candidate
    await sendInterviewEmail(
      application.applicant.email,
      application.applicant.firstName,
      application.job.title,
      new Date(scheduledAt),
      type,
      location,
    )

    // Create calendar event
    await createCalendarEvent({
      title: `Interview: ${application.job.title}`,
      description: `Interview with ${application.applicant.firstName} ${application.applicant.lastName}`,
      startTime: new Date(scheduledAt),
      duration,
      attendees: [application.applicant.email],
    })

    return NextResponse.json({ message: "Interview scheduled successfully", interview }, { status: 201 })
  } catch (error) {
    console.error("Interview scheduling error:", error)
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

    const query: any = {}

    if (user.userType === "jobseeker") {
      query.applicant = user.userId
    } else if (user.userType === "employer") {
      query.employer = user.userId
    }

    const interviews = await Interview.find(query)
      .populate("job", "title")
      .populate("applicant", "firstName lastName email")
      .populate("application")
      .sort({ scheduledAt: 1 })

    return NextResponse.json({ interviews })
  } catch (error) {
    console.error("Interviews fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
