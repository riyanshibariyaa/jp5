import jwt from "jsonwebtoken"
import { User } from "@/models/User"
import { connectDB } from "@/lib/mongodb"

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    await connectDB()

    const user = await User.findById(decoded.userId).select("-password")
    if (!user || !user.isActive) {
      return null
    }

    return {
      userId: user._id.toString(),
      email: user.email,
      userType: user.userType,
      user,
    }
  } catch (error) {
    return null
  }
}

export function generateAccessToken(userId: string, email: string, userType: string) {
  return jwt.sign({ userId, email, userType }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  })
}
