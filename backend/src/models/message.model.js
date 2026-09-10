import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    senderType: {
      type: String,
      enum: ["visitor", "ai", "agent", "system"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  }
);

messageSchema.index({
  conversationId: 1,
  createdAt: 1,
});

export const Message = mongoose.model("Message", messageSchema);

export default Message;