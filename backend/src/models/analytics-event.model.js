import mongoose from "mongoose";

const analyticsEventSchema = new mongoose.Schema(
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
      default: null,
      index: true,
    },

    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      default: null,
    },

    type: {
      type: String,
      enum: [
        "visitor_tracked",
        "high_intent_detected",
        "ai_engagement",
        "conversation_started",
        "product_recommendation",
        "add_to_cart_influenced",
        "purchase_influenced",
        "offer_shown",
        "offer_accepted",
      ],
      required: true,
      index: true,
    },

    value: {
      type: Number,
      default: 0,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    occurredAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

analyticsEventSchema.index({
  storeId: 1,
  occurredAt: -1,
});

export const AnalyticsEvent = mongoose.model(
  "AnalyticsEvent",
  analyticsEventSchema
);

export default AnalyticsEvent;