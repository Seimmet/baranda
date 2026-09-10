import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    platform: {
      type: String,
      enum: [
        "shopify",
        "woocommerce",
        "bigcommerce",
        "custom",
      ],
      required: true,
      index: true,
    },

    domain: {
      type: String,
      required: true,
      trim: true,
    },

    currency: {
      type: String,
      default: "USD",
      uppercase: true,
    },

    timezone: {
      type: String,
      default: "UTC",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "connected",
        "disconnected",
        "error",
      ],
      default: "pending",
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastSyncedAt: {
      type: Date,
      default: null,
    },

    widgetEnabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

storeSchema.index(
  { organizationId: 1, domain: 1 },
  { unique: true }
);

export const Store = mongoose.model("Store", storeSchema);

export default Store;