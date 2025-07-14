import mongoose from "mongoose"

const atsStageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  color: {
    type: String,
    default: "#3B82F6",
  },
  order: {
    type: Number,
    required: true,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Indexes
atsStageSchema.index({ employer: 1, order: 1 })

export const ATSStage = mongoose.models.ATSStage || mongoose.model("ATSStage", atsStageSchema)
