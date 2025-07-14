import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
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

    // Get company and all HR users
    const company = await Company.findById(authUser.user.company).populate({
      path: "hrUsers",
      select: "firstName lastName email phone hrProfile isVerified isActive lastLogin createdAt",
    })

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 })
    }

    return NextResponse.json({
      company: {
        id: company._id,
        name: company.name,
        subscription: company.subscription,
      },
      hrUsers: company.hrUsers,
    })
  } catch (error) {
    console.error("HR users fetch error:", error)
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
      (authUser.userType !== "company_owner" && !authUser.user.hrProfile?.permissions?.canManageHRUsers)
    ) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 })
    }

    const body = await request.json()
    const { hrUserId, permissions, position, department, isActive } = body

    // Find HR user and verify they belong to the same company
    const hrUser = await User.findById(hrUserId)
    if (!hrUser || hrUser.company.toString() !== authUser.user.company.toString()) {
      return NextResponse.json({ error: "HR user not found or access denied" }, { status: 404 })
    }

    // Update HR user
    const updateData: any = {
      updatedAt: new Date(),
    }

    if (permissions) {
      updateData["hrProfile.permissions"] = permissions
    }

    if (position) {
      updateData["hrProfile.position"] = position
    }

    if (department) {
      updateData["hrProfile.department"] = department
    }

    if (typeof isActive === "boolean") {
      updateData.isActive = isActive
    }

    const updatedHRUser = await User.findByIdAndUpdate(hrUserId, { $set: updateData }, { new: true }).select(
      "firstName lastName email hrProfile isActive",
    )

    return NextResponse.json({
      message: "HR user updated successfully",
      hrUser: updatedHRUser,
    })
  } catch (error) {
    console.error("HR user update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("accessToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const authUser = await verifyToken(token)
    if (!authUser || authUser.userType !== "company_owner") {
      return NextResponse.json({ error: "Only company owners can remove HR users" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const hrUserId = searchParams.get("hrUserId")

    if (!hrUserId) {
      return NextResponse.json({ error: "HR user ID is required" }, { status: 400 })
    }

    // Find HR user and verify they belong to the same company
    const hrUser = await User.findById(hrUserId)
    if (!hrUser || hrUser.company.toString() !== authUser.user.company.toString()) {
      return NextResponse.json({ error: "HR user not found or access denied" }, { status: 404 })
    }

    // Cannot remove company owner
    if (hrUser.userType === "company_owner") {
      return NextResponse.json({ error: "Cannot remove company owner" }, { status: 400 })
    }

    // Remove HR user from company
    await Company.findByIdAndUpdate(authUser.user.company, { $pull: { hrUsers: hrUserId } })

    // Deactivate user instead of deleting (to preserve data integrity)
    await User.findByIdAndUpdate(hrUserId, {
      isActive: false,
      company: null,
      updatedAt: new Date(),
    })

    return NextResponse.json({
      message: "HR user removed successfully",
    })
  } catch (error) {
    console.error("HR user removal error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
