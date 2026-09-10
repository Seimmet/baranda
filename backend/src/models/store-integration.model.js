import mongoose from "mongoose";

const storeIntegrationSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      unique: true,
      index: true,
    },

    platform: {
      type: String,
      enum: ["shopify", "woocommerce", "bigcommerce", "custom"],
      required: true,
    },

    externalStoreId: {
      type: String,
      default: null,
      index: true,
    },

    shopDomain: {
      type: String,
      default: null,
    },

    accessToken: {
      type: String,
      default: null,
      select: false,
    },

    scopes: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["active", "expired", "revoked", "error"],
      default: "active",
    },

    connectedAt: {
      type: Date,
      default: Date.now,
    },

    lastSuccessfulSyncAt: {
      type: Date,
      default: null,
    },

    lastError: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const StoreIntegration = mongoose.model(
  "StoreIntegration",
  storeIntegrationSchema
);

export default StoreIntegration;