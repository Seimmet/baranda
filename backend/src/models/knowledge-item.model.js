import mongoose from "mongoose";

const knowledgeItemSchema = new mongoose.Schema(
  {
    knowledgeBaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KnowledgeBase",
      required: true,
      index: true,
    },

    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: [
        "product",
        "faq",
        "shipping_policy",
        "return_policy",
        "refund_policy",
        "document",
        "custom",
      ],
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      enum: ["shopify", "merchant", "system"],
      default: "merchant",
    },

    externalId: {
      type: String,
      default: null,
    },

    fileUrl: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const KnowledgeItem = mongoose.model(
  "KnowledgeItem",
  knowledgeItemSchema
);

export default KnowledgeItem;