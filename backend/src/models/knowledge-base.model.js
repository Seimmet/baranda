import mongoose from "mongoose";

const knowledgeBaseSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      default: "Store Knowledge Base",
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "syncing", "error"],
      default: "active",
    },

    lastSyncedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const KnowledgeBase = mongoose.model(
  "KnowledgeBase",
  knowledgeBaseSchema
);

export default KnowledgeBase;