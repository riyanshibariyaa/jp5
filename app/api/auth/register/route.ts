import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
// import { sendOTP } from "@/lib/email" // Removed for testing

export async function POST(request: Request) {
  try {
    await connectDB()
    const { firstName, lastName, email, password, userType } = await request.json()

    if (!firstName || !lastName || !email || !password || !userType) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType,
      isVerified: true, // Auto-verify for testing
      // otp: null, // No OTP for testing
      // otpExpires: null, // No OTP for testing
    })

    await newUser.save()

    // Generate JWT token for immediate login
    const token = jwt.sign({ userId: newUser._id, userType: newUser.userType }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    })

    const response = NextResponse.json(
      {
        message: "Registration successful and auto-verified!",
        user: {
          id: newUser._id,
          email: newUser.email,
          userType: newUser.userType,
        },
      },
      { status: 201 },
    )

    response.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
