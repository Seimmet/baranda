import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    logoUrl: {
      type: String,
      default: null,
    },

    plan: {
      type: String,
      enum: ["free", "starter", "growth", "enterprise"],
      default: "free",
      index: true,
    },

    status: {
      type: String,
      enum: ["active", "suspended", "cancelled"],
      default: "active",
      index: true,
    },

    timezone: {
      type: String,
      default: "UTC",
    },

    currency: {
      type: String,
      default: "USD",
      uppercase: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Organization = mongoose.model(
  "Organization",
  organizationSchema
);

export default Organization;