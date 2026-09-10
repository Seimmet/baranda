import mongoose from "mongoose";

const aiAgentSchema = new mongoose.Schema(
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
      required: true,
      trim: true,
      default: "Ava",
    },

    avatarUrl: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      default: "AI Sales Specialist",
    },

    personality: {
      type: String,
      enum: [
        "friendly",
        "professional",
        "luxury",
        "energetic",
        "casual",
      ],
      default: "friendly",
    },

    salesObjective: {
      type: String,
      enum: [
        "maximize_conversion",
        "increase_average_order_value",
        "recommend_products",
        "promote_products",
      ],
      default: "maximize_conversion",
    },

    systemInstructions: {
      type: String,
      default: "",
    },

    capabilities: {
      answerProductQuestions: {
        type: Boolean,
        default: true,
      },

      recommendProducts: {
        type: Boolean,
        default: true,
      },

      compareProducts: {
        type: Boolean,
        default: true,
      },

      answerShippingQuestions: {
        type: Boolean,
        default: true,
      },

      answerReturnQuestions: {
        type: Boolean,
        default: true,
      },

      proactiveEngagement: {
        type: Boolean,
        default: true,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AiAgent = mongoose.model("AiAgent", aiAgentSchema);

export default AiAgent;