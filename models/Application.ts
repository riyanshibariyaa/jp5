import mongoose from "mongoose"

const applicationSchema = new mongoose.Schema({
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
  coverLetter: String,
  status: {
    type: String,
    enum: [
      "applied",
      "screening",
      "interview_scheduled",
      "interviewed",
      "offer_sent",
      "hired",
      "rejected",
      "withdrawn",
    ],
    default: "applied",
  },
  atsStage: {
    type: String,
    enum: [
      "application_received",
      "screening",
      "phone_screen",
      "interview",
      "final_interview",
      "offer",
      "hired",
      "rejected",
    ],
    default: "application_received",
  },
  score: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  notes: [
    {
      content: String,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  interviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
    },
  ],
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Indexes
applicationSchema.index({ job: 1 })
applicationSchema.index({ applicant: 1 })
applicationSchema.index({ employer: 1 })
applicationSchema.index({ status: 1 })
applicationSchema.index({ appliedAt: -1 })

export const Application = mongoose.models.Application || mongoose.model("Application", applicationSchema)
