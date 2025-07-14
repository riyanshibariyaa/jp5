import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Job } from "@/models/Job"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const job = await Job.findById(params.id)
      .populate("employer", "firstName lastName company")
      .populate("applications")

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    return NextResponse.json({ job })
  } catch (error) {
    console.error("Job fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
