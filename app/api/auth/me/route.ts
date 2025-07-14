import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Get token from cookies
    const token = request.cookies.get("accessToken")?.value

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // Find user
    const user = await User.findById(decoded.userId).populate("company").select("-password")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        isVerified: user.isVerified,
        company: user.company
          ? {
              id: user.company._id,
              name: user.company.name,
              slug: user.company.slug,
            }
          : null,
        hrProfile: user.hrProfile,
      },
    })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
