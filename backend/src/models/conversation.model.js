import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
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

    aiAgentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AiAgent",
      required: true,
    },

    sessionId: {
      type: String,
      required: true,
      index: true,
    },

    channel: {
      type: String,
      enum: ["chat", "voice", "video"],
      default: "chat",
    },

    status: {
      type: String,
      enum: [
        "active",
        "completed",
        "abandoned",
        "transferred",
      ],
      default: "active",
      index: true,
    },

    intentScoreAtStart: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    intentScoreAtEnd: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    outcome: {
      type: String,
      enum: [
        "unknown",
        "purchased",
        "added_to_cart",
        "no_conversion",
        "follow_up_requested",
      ],
      default: "unknown",
    },

    primaryProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    endedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);

export default Conversation;