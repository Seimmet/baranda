import mongoose from "mongoose";

const visitorEventSchema = new mongoose.Schema(
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

    sessionId: {
      type: String,
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: [
        "page_view",
        "product_view",
        "collection_view",
        "search",
        "variant_selected",
        "review_view",
        "shipping_policy_view",
        "return_policy_view",
        "add_to_cart",
        "remove_from_cart",
        "cart_view",
        "checkout_started",
        "checkout_abandoned",
        "purchase",
        "exit_intent",
        "ai_engagement",
        "conversation_started",
      ],
      required: true,
      index: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    pageUrl: {
      type: String,
      default: null,
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

visitorEventSchema.index({
  storeId: 1,
  visitorId: 1,
  occurredAt: -1,
});

export const VisitorEvent = mongoose.model(
  "VisitorEvent",
  visitorEventSchema
);

export default VisitorEvent;