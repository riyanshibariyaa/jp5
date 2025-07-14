import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import { verifyToken } from "@/lib/auth"
import { parseResume, calculateCandidateScore } from "@/lib/resume-parser"

export async function POST(request: NextRequest) {
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

    const formData = await request.formData()
    const file = formData.get("resume") as File

    if (!file) {
      return NextResponse.json({ error: "Resume file is required" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Please upload PDF or Word document" }, { status: 400 })
    }

    // Parse resume
    const resumeData = await parseResume(file)

    // Calculate candidate score
    const score = calculateCandidateScore(resumeData)

    // Update user profile with parsed data
    const updatedUser = await User.findByIdAndUpdate(
      user.userId,
      {
        $set: {
          "profile.skills": resumeData.skills,
          "profile.experience": resumeData.experience,
          "profile.education": resumeData.education,
          "profile.resume": {
            filename: file.name,
            url: resumeData.fileUrl,
            uploadDate: new Date(),
          },
          "profile.parsedData": resumeData,
          "profile.candidateScore": score,
          updatedAt: new Date(),
        },
      },
      { new: true },
    )

    return NextResponse.json({
      message: "Resume parsed successfully",
      data: resumeData,
      score,
      user: updatedUser,
    })
  } catch (error) {
    console.error("Resume parsing error:", error)
    return NextResponse.json({ error: "Failed to parse resume" }, { status: 500 })
  }
}
