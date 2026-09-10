import { KnowledgeBase } from "../models/knowledge-base.model.js";

export async function createKnowledgeBase(req, res) {
  try {
    const { storeId, name, description } = req.body;

    if (!storeId) {
      return res.status(400).json({
        error: "storeId is required",
      });
    }

    const existing = await KnowledgeBase.findOne({
      storeId,
    });

    if (existing) {
      return res.status(400).json({
        error:
          "Knowledge base already exists for this store",
      });
    }

    const knowledgeBase = await KnowledgeBase.create({
      storeId,
      name,
      description,
    });

    return res.status(201).json({
      message: "Knowledge base created successfully",
      knowledgeBase,
    });
  } catch (error) {
    console.error(
      "Error in createKnowledgeBase controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getKnowledgeBase(req, res) {
  try {
    const { storeId } = req.params;

    const knowledgeBase =
      await KnowledgeBase.findOne({ storeId });

    if (!knowledgeBase) {
      return res.status(404).json({
        error: "Knowledge base not found",
      });
    }

    return res.status(200).json({
      knowledgeBase,
    });
  } catch (error) {
    console.error(
      "Error in getKnowledgeBase controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateKnowledgeBase(req, res) {
  try {
    const { storeId } = req.params;

    const knowledgeBase =
      await KnowledgeBase.findOne({ storeId });

    if (!knowledgeBase) {
      return res.status(404).json({
        error: "Knowledge base not found",
      });
    }

    const { name, description, status } = req.body;

    knowledgeBase.name = name || knowledgeBase.name;

    knowledgeBase.description =
      description !== undefined
        ? description
        : knowledgeBase.description;

    if (status) {
      knowledgeBase.status = status;
    }

    await knowledgeBase.save();

    return res.status(200).json({
      message: "Knowledge base updated successfully",
      knowledgeBase,
    });
  } catch (error) {
    console.error(
      "Error in updateKnowledgeBase controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}