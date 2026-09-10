import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    visitorId: {
      type: String,
      required: true,
      index: true,
    },

    customerExternalId: {
      type: String,
      default: null,
      index: true,
    },

    email: {
      type: String,
      default: null,
      lowercase: true,
      trim: true,
    },

    name: {
      type: String,
      default: null,
      trim: true,
    },

    firstSeenAt: {
      type: Date,
      default: Date.now,
    },

    lastSeenAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    currentPage: {
      type: String,
      default: null,
    },

    currentProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    intentScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
      index: true,
    },

    intentLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
      index: true,
    },

    cartValue: {
      type: Number,
      default: 0,
    },

    isCurrentlyOnline: {
      type: Boolean,
      default: false,
      index: true,
    },

    totalSessions: {
      type: Number,
      default: 0,
    },

    totalConversations: {
      type: Number,
      default: 0,
    },

    hasPurchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

visitorSchema.index(
  { storeId: 1, visitorId: 1 },
  { unique: true }
);

export const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;