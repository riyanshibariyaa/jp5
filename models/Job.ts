import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [String],
  responsibilities: [String],
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "freelance", "internship", "temporary"],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ["entry", "mid", "senior", "executive"],
    required: true,
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: "USD",
    },
    period: {
      type: String,
      enum: ["hourly", "monthly", "yearly"],
      default: "yearly",
    },
  },
  benefits: [String],
  skills: [String],
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
  applicationsCount: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isUrgent: {
    type: Boolean,
    default: false,
  },
  applicationDeadline: Date,
  postedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Indexes for better performance
jobSchema.index({ title: "text", description: "text" })
jobSchema.index({ employer: 1 })
jobSchema.index({ category: 1 })
jobSchema.index({ location: 1 })
jobSchema.index({ jobType: 1 })
jobSchema.index({ isActive: 1 })
jobSchema.index({ createdAt: -1 })

export const Job = mongoose.models.Job || mongoose.model("Job", jobSchema)
