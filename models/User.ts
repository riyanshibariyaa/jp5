import mongoose, { Schema, type Document } from "mongoose"

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  phone?: string
  password?: string // Password can be optional for social logins
  userType: "jobseeker" | "employer" | "company_owner" | "hr" | "admin"
  isVerified: boolean
  otp?: string
  otpExpires?: Date
  company?: mongoose.Types.ObjectId // For employer/HR users
  hrProfile?: {
    permissions: {
      canPostJobs: boolean
      canManageApplications: boolean
      canScheduleInterviews: boolean
      canAccessReports: boolean
      canManageHRUsers: boolean
      canManageCompanySettings: boolean
    }
  }
  // Job Seeker specific fields
  resume?: string // URL to resume file
  profileHeadline?: string
  experience?: {
    title: string
    company: string
    startDate: Date
    endDate?: Date
    description?: string
  }[]
  education?: {
    degree: string
    institution: string
    startDate: Date
    endDate?: Date
  }[]
  skills?: string[]
  // Employer specific fields (deprecated, now handled by Company model)
  // companyName?: string
  // companyDescription?: string
  // industry?: string
  // companySize?: string
  // website?: string
  // address?: {
  //   street: string
  //   city: string
  //   state: string
  //   zipCode: string
  //   country: string
  // }
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, select: false }, // Do not return password by default
    userType: {
      type: String,
      enum: ["jobseeker", "employer", "company_owner", "hr", "admin"],
      required: true,
    },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
    company: { type: Schema.Types.ObjectId, ref: "Company" }, // Link to Company model
    hrProfile: {
      permissions: {
        canPostJobs: { type: Boolean, default: false },
        canManageApplications: { type: Boolean, default: false },
        canScheduleInterviews: { type: Boolean, default: false },
        canAccessReports: { type: Boolean, default: false },
        canManageHRUsers: { type: Boolean, default: false },
        canManageCompanySettings: { type: Boolean, default: false },
      },
    },
    // Job Seeker specific fields
    resume: { type: String },
    profileHeadline: { type: String },
    experience: [
      {
        title: { type: String },
        company: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    education: [
      {
        degree: { type: String },
        institution: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    skills: [{ type: String }],
  },
  { timestamps: true },
)

if (!mongoose.models) {
  mongoose.models = {}
}


export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
