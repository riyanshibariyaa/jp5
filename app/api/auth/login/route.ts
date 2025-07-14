import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
  try {
    await connectDB()
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // For testing, skip OTP verification and assume verified
    if (!user.isVerified) {
      user.isVerified = true // Auto-verify for testing
      await user.save()
    }

    // Generate JWT token
    const tokenPayload: { userId: string; userType: string; companyId?: string } = {
      userId: user._id.toString(),
      userType: user.userType,
    }

    if (user.userType === "company_owner" || user.userType === "hr") {
      tokenPayload.companyId = user.company?.toString()
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    })

    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        userType: user.userType,
      },
    })

    response.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
