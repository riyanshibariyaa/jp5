import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import { Company } from "@/models/Company"
import bcrypt from "bcryptjs"
// import { sendHRInvitationEmail } from "@/lib/email" // Removed for testing

export async function POST(request: Request) {
  try {
    await connectDB()
    const { firstName, lastName, email, phone, companyId, permissions, password } = await request.json()

    if (!firstName || !lastName || !email || !companyId || !permissions || !password) {
      return NextResponse.json({ error: "All required fields are missing" }, { status: 400 })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    const company = await Company.findById(companyId)
    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 })
    }

    // Check HR user limit for the company's subscription plan
    const hrUsersCount = await User.countDocuments({ company: companyId, userType: "hr" })
    if (hrUsersCount >= company.subscription.maxHRUsers) {
      return NextResponse.json(
        { error: "Company has reached its HR user limit for the current subscription plan." },
        { status: 403 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newHRUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      userType: "hr",
      company: companyId,
      hrProfile: {
        permissions,
      },
      isVerified: true, // Auto-verify for testing
    })

    await newHRUser.save()

    // No email sending for testing
    // await sendHRInvitationEmail(newHRUser.email, newHRUser.firstName, password, company.name)

    return NextResponse.json(
      {
        message: "HR user invited successfully and auto-verified!",
        hrUser: {
          id: newHRUser._id,
          email: newHRUser.email,
          firstName: newHRUser.firstName,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("HR user registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
