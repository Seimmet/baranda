import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    visitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
      required: true,
      index: true,
    },

    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      default: null,
      index: true,
    },

    externalOrderId: {
      type: String,
      required: true,
      index: true,
    },

    orderValue: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "USD",
    },

    attributionType: {
      type: String,
      enum: [
        "direct",
        "assisted",
      ],
      default: "direct",
    },

    attributionWindowHours: {
      type: Number,
      default: 24,
    },

    purchasedAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

conversionSchema.index(
  { storeId: 1, externalOrderId: 1 },
  { unique: true }
);

export const Conversion = mongoose.model(
  "Conversion",
  conversionSchema
);

export default Conversion;