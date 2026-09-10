import mongoose from "mongoose";

const conditionSchema = new mongoose.Schema(
  {
    field: {
      type: String,
      required: true,
    },

    operator: {
      type: String,
      enum: [
        "equals",
        "not_equals",
        "greater_than",
        "less_than",
        "greater_than_or_equal",
        "less_than_or_equal",
      ],
      required: true,
    },

    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const engagementRuleSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    conditions: {
      type: [conditionSchema],
      default: [],
    },

    conditionOperator: {
      type: String,
      enum: ["AND", "OR"],
      default: "AND",
    },

    action: {
      type: String,
      enum: [
        "show_chat_prompt",
        "send_welcome_message",
        "recommend_assistance",
      ],
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    cooldownMinutes: {
      type: Number,
      default: 60,
      min: 0,
    },

    priority: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const EngagementRule = mongoose.model(
  "EngagementRule",
  engagementRuleSchema
);

export default EngagementRule;