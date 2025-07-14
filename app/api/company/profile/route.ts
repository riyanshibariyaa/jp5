import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Company } from "@/models/Company"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("accessToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const authUser = await verifyToken(token)
    if (!authUser || (authUser.userType !== "company_owner" && authUser.userType !== "hr")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    const company = await Company.findById(authUser.user.company)
      .populate("owner", "firstName lastName email")
      .populate("hrUsers", "firstName lastName email hrProfile.position isActive")

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 })
    }

    return NextResponse.json({ company })
  } catch (error) {
    console.error("Company profile fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("accessToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const authUser = await verifyToken(token)
    if (
      !authUser ||
      (authUser.userType !== "company_owner" && !authUser.user.hrProfile?.permissions?.canManageCompanySettings)
    ) {
      return NextResponse.json(
        { error: "Permission denied. Only company owners or authorized HR users can update company settings" },
        { status: 403 },
      )
    }

    const body = await request.json()
    const { name, description, industry, size, website, address, contactEmail, contactPhone, socialMedia, founded } =
      body

    const updateData: any = {
      updatedAt: new Date(),
    }

    if (name) updateData.name = name
    if (description) updateData.description = description
    if (industry) updateData.industry = industry
    if (size) updateData.size = size
    if (website) updateData.website = website
    if (address) updateData.address = address
    if (contactEmail) updateData.contactEmail = contactEmail
    if (contactPhone) updateData.contactPhone = contactPhone
    if (socialMedia) updateData.socialMedia = socialMedia
    if (founded) updateData.founded = new Date(founded)

    const updatedCompany = await Company.findByIdAndUpdate(authUser.user.company, { $set: updateData }, { new: true })

    return NextResponse.json({
      message: "Company profile updated successfully",
      company: updatedCompany,
    })
  } catch (error) {
    console.error("Company profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
