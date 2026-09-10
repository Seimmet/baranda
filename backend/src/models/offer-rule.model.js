import mongoose from "mongoose";

const offerConditionSchema = new mongoose.Schema(
  {
    field: {
      type: String,
      required: true,
    },

    operator: {
      type: String,
      enum: [
        "equals",
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

const offerRuleSchema = new mongoose.Schema(
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

    conditions: {
      type: [offerConditionSchema],
      default: [],
    },

    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "percentage",
    },

    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },

    maximumDiscount: {
      type: Number,
      default: null,
      min: 0,
    },

    minimumCartValue: {
      type: Number,
      default: 0,
      min: 0,
    },

    eligibleProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    firstTimeCustomerOnly: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OfferRule = mongoose.model(
  "OfferRule",
  offerRuleSchema
);

export default OfferRule;