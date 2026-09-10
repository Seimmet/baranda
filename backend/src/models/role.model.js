import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    privileges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Privilege",
      },
    ],

    isSystemRole: {
      type: Boolean,
      default: false,
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

roleSchema.index(
  { organizationId: 1, code: 1 },
  { unique: true }
);

export const Role = mongoose.model("Role", roleSchema);

export default Role;