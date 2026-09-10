import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
    externalId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      default: "",
    },

    sku: {
      type: String,
      default: null,
    },

    price: {
      type: Number,
      default: 0,
    },

    compareAtPrice: {
      type: Number,
      default: null,
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  }
);

const productSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    externalId: {
      type: String,
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    handle: {
      type: String,
      default: null,
    },

    description: {
      type: String,
      default: "",
    },

    vendor: {
      type: String,
      default: null,
    },

    productType: {
      type: String,
      default: null,
    },

    images: [
      {
        type: String,
      },
    ],

    variants: [productVariantSchema],

    price: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "USD",
    },

    available: {
      type: Boolean,
      default: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    syncedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index(
  { storeId: 1, externalId: 1 },
  { unique: true }
);

export const Product = mongoose.model("Product", productSchema);

export default Product;