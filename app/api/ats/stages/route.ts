import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { ATSStage } from "@/models/ATSStage"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
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

    const stages = await ATSStage.find({ employer: user.userId }).sort({ order: 1 })

    return NextResponse.json({ stages })
  } catch (error) {
    console.error("ATS stages fetch error:", error)
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
    const { name, description, color, order } = body

    const stage = new ATSStage({
      name,
      description,
      color,
      order,
      employer: user.userId,
      isActive: true,
      createdAt: new Date(),
    })

    await stage.save()

    return NextResponse.json({ message: "ATS stage created successfully", stage }, { status: 201 })
  } catch (error) {
    console.error("ATS stage creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
