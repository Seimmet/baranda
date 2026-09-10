import { Conversation } from "../models/conversation.model.js";

export async function createConversation(req, res) {
  try {
    const {
      storeId,
      visitorId,
      aiAgentId,
      sessionId,
      channel,
      primaryProductId,
      intentScoreAtStart,
    } = req.body;

    if (
      !storeId ||
      !visitorId ||
      !aiAgentId ||
      !sessionId
    ) {
      return res.status(400).json({
        error:
          "storeId, visitorId, aiAgentId and sessionId are required",
      });
    }

    const conversation = await Conversation.create({
      storeId,
      visitorId,
      aiAgentId,
      sessionId,
      channel: channel || "chat",
      primaryProductId,
      intentScoreAtStart,
      intentScoreAtEnd: intentScoreAtStart || 0,
    });

    return res.status(201).json({
      message: "Conversation created successfully",
      conversation,
    });
  } catch (error) {
    console.error(
      "Error in createConversation controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getConversations(req, res) {
  try {
    const {
      storeId,
      status,
      outcome,
    } = req.query;

    const filter = { storeId };

    if (status) filter.status = status;
    if (outcome) filter.outcome = outcome;

    const conversations = await Conversation.find(filter)
      .populate("visitorId")
      .populate("aiAgentId")
      .populate("primaryProductId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      conversations,
    });
  } catch (error) {
    console.error(
      "Error in getConversations controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getConversation(req, res) {
  try {
    const { id } = req.params;

    const conversation = await Conversation.findById(id)
      .populate("visitorId")
      .populate("aiAgentId")
      .populate("primaryProductId");

    if (!conversation) {
      return res.status(404).json({
        error: "Conversation not found",
      });
    }

    return res.status(200).json({
      conversation,
    });
  } catch (error) {
    console.error(
      "Error in getConversation controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateConversation(req, res) {
  try {
    const { id } = req.params;

    const {
      status,
      intentScoreAtEnd,
      outcome,
      endedAt,
    } = req.body;

    const conversation =
      await Conversation.findById(id);

    if (!conversation) {
      return res.status(404).json({
        error: "Conversation not found",
      });
    }

    if (status) conversation.status = status;

    if (intentScoreAtEnd !== undefined) {
      conversation.intentScoreAtEnd = intentScoreAtEnd;
    }

    if (outcome) conversation.outcome = outcome;

    if (endedAt) {
      conversation.endedAt = endedAt;
    }

    await conversation.save();

    return res.status(200).json({
      message: "Conversation updated successfully",
      conversation,
    });
  } catch (error) {
    console.error(
      "Error in updateConversation controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}