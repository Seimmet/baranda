import { KnowledgeItem } from "../models/knowledge-item.model.js";

export async function createKnowledgeItem(req, res) {
  try {
    const {
      knowledgeBaseId,
      storeId,
      type,
      title,
      content,
      source,
      externalId,
      fileUrl,
      metadata,
    } = req.body;

    if (
      !knowledgeBaseId ||
      !storeId ||
      !type ||
      !title
    ) {
      return res.status(400).json({
        error:
          "knowledgeBaseId, storeId, type and title are required",
      });
    }

    const item = await KnowledgeItem.create({
      knowledgeBaseId,
      storeId,
      type,
      title,
      content,
      source,
      externalId,
      fileUrl,
      metadata,
    });

    return res.status(201).json({
      message: "Knowledge item created successfully",
      item,
    });
  } catch (error) {
    console.error(
      "Error in createKnowledgeItem controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getKnowledgeItems(req, res) {
  try {
    const { storeId } = req.params;
    const { type } = req.query;

    const filter = {
      storeId,
      isActive: true,
    };

    if (type) {
      filter.type = type;
    }

    const items = await KnowledgeItem.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      items,
    });
  } catch (error) {
    console.error(
      "Error in getKnowledgeItems controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getKnowledgeItem(req, res) {
  try {
    const { id } = req.params;

    const item = await KnowledgeItem.findById(id);

    if (!item) {
      return res.status(404).json({
        error: "Knowledge item not found",
      });
    }

    return res.status(200).json({
      item,
    });
  } catch (error) {
    console.error(
      "Error in getKnowledgeItem controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateKnowledgeItem(req, res) {
  try {
    const { id } = req.params;

    const item = await KnowledgeItem.findById(id);

    if (!item) {
      return res.status(404).json({
        error: "Knowledge item not found",
      });
    }

    const fields = [
      "title",
      "content",
      "type",
      "fileUrl",
      "metadata",
      "isActive",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        item[field] = req.body[field];
      }
    });

    await item.save();

    return res.status(200).json({
      message: "Knowledge item updated successfully",
      item,
    });
  } catch (error) {
    console.error(
      "Error in updateKnowledgeItem controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function deleteKnowledgeItem(req, res) {
  try {
    const { id } = req.params;

    const item = await KnowledgeItem.findById(id);

    if (!item) {
      return res.status(404).json({
        error: "Knowledge item not found",
      });
    }

    item.isActive = false;

    await item.save();

    return res.status(200).json({
      message: "Knowledge item deleted successfully",
    });
  } catch (error) {
    console.error(
      "Error in deleteKnowledgeItem controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}