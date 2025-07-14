import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import { Company } from "@/models/Company"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { generateSlug } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    await connectDB()
    const {
      companyName,
      companyDescription,
      industry,
      companySize,
      website,
      address,
      contactEmail,
      contactPhone,
      ownerPassword,
      agreeToTerms,
    } = await request.json()

    if (
      !companyName ||
      !contactEmail ||
      !ownerPassword ||
      !agreeToTerms ||
      !address.street ||
      !address.city ||
      !address.state
    ) {
      return NextResponse.json({ error: "Required company and owner fields are missing" }, { status: 400 })
    }

    // Check if company email or owner email already exists
    const existingCompany = await Company.findOne({ contactEmail })
    if (existingCompany) {
      return NextResponse.json({ error: "A company with this email already exists" }, { status: 409 })
    }

    const existingUser = await User.findOne({ email: contactEmail })
    if (existingUser) {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 })
    }

    // Generate company slug
    const companySlug = generateSlug(companyName)

    // Create owner user first
    const hashedPassword = await bcrypt.hash(ownerPassword, 10)
    const ownerFirstName = companyName.split(" ")[0] || "Company"
    const ownerLastName = companyName.split(" ").slice(1).join(" ") || "Owner"

    const newOwner = new User({
      firstName: ownerFirstName,
      lastName: ownerLastName,
      email: contactEmail,
      password: hashedPassword,
      userType: "company_owner",
      isVerified: true, // Auto-verify for testing
    })
    await newOwner.save()

    // Now create company and attach owner
    const newCompany = new Company({
      name: companyName,
      slug: companySlug,
      description: companyDescription,
      industry,
      companySize,
      website,
      address,
      contactEmail,
      contactPhone,
      owner: newOwner._id, // ✅ add owner during creation
      subscription: {
        plan: "free",
        maxJobs: 3,
        maxHRUsers: 1,
      },
      atsSettings: {},
    })
    await newCompany.save()

    // Optional: update user with company ID
    newOwner.company = newCompany._id
    await newOwner.save()


    // // Create company owner user
    // const hashedPassword = await bcrypt.hash(ownerPassword, 10)
    // const ownerFirstName = companyName.split(" ")[0] || "Company" // Derive a name or use default
    // const ownerLastName = companyName.split(" ").slice(1).join(" ") || "Owner"

    // const newOwner = new User({
    //   firstName: ownerFirstName,
    //   lastName: ownerLastName,
    //   email: contactEmail,
    //   password: hashedPassword,
    //   userType: "company_owner",
    //   company: newCompany._id,
    //   isVerified: true, // Auto-verify for testing
    // })
    // await newOwner.save()

    // Update company with owner ID
    newCompany.owner = newOwner._id
    await newCompany.save()

    // Generate JWT token for immediate login
    const token = jwt.sign(
      { userId: newOwner._id, userType: newOwner.userType, companyId: newCompany._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      },
    )

    const response = NextResponse.json(
      {
        message: "Company and owner registered successfully!",
        company: {
          id: newCompany._id,
          name: newCompany.name,
          slug: newCompany.slug,
        },
        user: {
          id: newOwner._id,
          email: newOwner.email,
          userType: newOwner.userType,
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
    console.error("Company registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
