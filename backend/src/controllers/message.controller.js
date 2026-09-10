import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";

export async function createMessage(req, res) {
  try {
    const {
      conversationId,
      senderType,
      content,
      productIds,
      metadata,
    } = req.body;

    if (
      !conversationId ||
      !senderType ||
      !content
    ) {
      return res.status(400).json({
        error:
          "conversationId, senderType and content are required",
      });
    }

    const conversation =
      await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        error: "Conversation not found",
      });
    }

    const message = await Message.create({
      conversationId,
      senderType,
      content,
      productIds,
      metadata,
    });

    return res.status(201).json({
      message: "Message created successfully",
      data: message,
    });
  } catch (error) {
    console.error(
      "Error in createMessage controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getMessages(req, res) {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({
      conversationId,
    })
      .populate("productIds")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error(
      "Error in getMessages controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}