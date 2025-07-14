import mongoose, { Schema, type Document } from "mongoose"

export interface ICompany extends Document {
  name: string
  slug: string // For URL friendly names
  description?: string
  industry?: string
  companySize?: string
  website?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode?: string
    country: string
  }
  contactEmail: string // Main company contact email
  contactPhone?: string
  owner: mongoose.Types.ObjectId // Reference to the User who owns this company
  subscription: {
    plan: "free" | "basic" | "premium"
    maxJobs: number
    maxHRUsers: number
    expiresAt?: Date
  }
  atsSettings: {
    // Custom ATS stages, interview templates, etc.
    stages?: string[]
  }
  createdAt: Date
  updatedAt: Date
}

const CompanySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    industry: { type: String },
    companySize: { type: String },
    website: { type: String },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String },
      country: { type: String, default: "United States" },
    },
    contactEmail: { type: String, required: true, unique: true },
    contactPhone: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subscription: {
      plan: { type: String, enum: ["free", "basic", "premium"], default: "free" },
      maxJobs: { type: Number, default: 3 },
      maxHRUsers: { type: Number, default: 1 },
      expiresAt: { type: Date },
    },
    atsSettings: {
      stages: [{ type: String }],
    },
  },
  { timestamps: true },
)

export const Company = mongoose.models.Company || mongoose.model<ICompany>("Company", CompanySchema)
