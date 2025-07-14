import mongoose from "mongoose"

const interviewSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number, // in minutes
    default: 60,
  },
  type: {
    type: String,
    enum: ["phone", "video", "in-person", "technical"],
    required: true,
  },
  location: String, // For in-person or video link
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled", "no-show"],
    default: "scheduled",
  },
  interviewers: [
    {
      name: String,
      email: String,
      role: String,
    },
  ],
  notes: String,
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comments: String,
    recommendation: {
      type: String,
      enum: ["hire", "reject", "next_round"],
    },
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

// Indexes
interviewSchema.index({ applicant: 1 })
interviewSchema.index({ employer: 1 })
interviewSchema.index({ scheduledAt: 1 })
interviewSchema.index({ status: 1 })

export const Interview = mongoose.models.Interview || mongoose.model("Interview", interviewSchema)
