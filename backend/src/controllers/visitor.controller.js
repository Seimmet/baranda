import { Visitor } from "../models/visitor.model.js";

export async function getVisitors(req, res) {
  try {
    const {
      storeId,
      intentLevel,
      online,
    } = req.query;

    const filter = {
      storeId,
    };

    if (intentLevel) {
      filter.intentLevel = intentLevel;
    }

    if (online !== undefined) {
      filter.isCurrentlyOnline = online === "true";
    }

    const visitors = await Visitor.find(filter)
      .populate("currentProductId")
      .sort({ lastSeenAt: -1 });

    return res.status(200).json({
      visitors,
    });
  } catch (error) {
    console.error("Error in getVisitors controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getVisitor(req, res) {
  try {
    const { id } = req.params;

    const visitor = await Visitor.findById(id).populate(
      "currentProductId"
    );

    if (!visitor) {
      return res.status(404).json({
        error: "Visitor not found",
      });
    }

    return res.status(200).json({
      visitor,
    });
  } catch (error) {
    console.error("Error in getVisitor controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateVisitor(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      intentScore,
      intentLevel,
      cartValue,
      isCurrentlyOnline,
      hasPurchased,
    } = req.body;

    const visitor = await Visitor.findById(id);

    if (!visitor) {
      return res.status(404).json({
        error: "Visitor not found",
      });
    }

    visitor.name = name !== undefined ? name : visitor.name;
    visitor.email =
      email !== undefined ? email : visitor.email;

    if (intentScore !== undefined) {
      visitor.intentScore = intentScore;
    }

    if (intentLevel !== undefined) {
      visitor.intentLevel = intentLevel;
    }

    if (cartValue !== undefined) {
      visitor.cartValue = cartValue;
    }

    if (isCurrentlyOnline !== undefined) {
      visitor.isCurrentlyOnline = isCurrentlyOnline;
    }

    if (hasPurchased !== undefined) {
      visitor.hasPurchased = hasPurchased;
    }

    visitor.lastSeenAt = new Date();

    await visitor.save();

    return res.status(200).json({
      message: "Visitor updated successfully",
      visitor,
    });
  } catch (error) {
    console.error(
      "Error in updateVisitor controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}