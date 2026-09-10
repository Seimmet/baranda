import { AiAgent } from "../models/ai-agent.model.js";

export async function createAiAgent(req, res) {
  try {
    const { storeId } = req.body;

    if (!storeId) {
      return res.status(400).json({
        error: "storeId is required",
      });
    }

    const existingAgent = await AiAgent.findOne({
      storeId,
    });

    if (existingAgent) {
      return res.status(400).json({
        error: "AI agent already exists for this store",
      });
    }

    const agent = await AiAgent.create({
      storeId,
      name: req.body.name || "Ava",
      avatarUrl: req.body.avatarUrl,
      role:
        req.body.role || "AI Sales Specialist",
      personality:
        req.body.personality || "friendly",
      salesObjective:
        req.body.salesObjective ||
        "maximize_conversion",
      systemInstructions:
        req.body.systemInstructions || "",
      capabilities: req.body.capabilities,
    });

    return res.status(201).json({
      message: "AI agent created successfully",
      agent,
    });
  } catch (error) {
    console.error(
      "Error in createAiAgent controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getAiAgent(req, res) {
  try {
    const { storeId } = req.params;

    const agent = await AiAgent.findOne({
      storeId,
    });

    if (!agent) {
      return res.status(404).json({
        error: "AI agent not found",
      });
    }

    return res.status(200).json({
      agent,
    });
  } catch (error) {
    console.error(
      "Error in getAiAgent controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateAiAgent(req, res) {
  try {
    const { storeId } = req.params;

    const agent = await AiAgent.findOne({
      storeId,
    });

    if (!agent) {
      return res.status(404).json({
        error: "AI agent not found",
      });
    }

    const fields = [
      "name",
      "avatarUrl",
      "role",
      "personality",
      "salesObjective",
      "systemInstructions",
      "capabilities",
      "isActive",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        agent[field] = req.body[field];
      }
    });

    await agent.save();

    return res.status(200).json({
      message: "AI agent updated successfully",
      agent,
    });
  } catch (error) {
    console.error(
      "Error in updateAiAgent controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}