import { Conversion } from "../models/conversion.model.js";

export async function createConversion(req, res) {
  try {
    const {
      storeId,
      visitorId,
      conversationId,
      externalOrderId,
      orderValue,
      currency,
      attributionType,
      attributionWindowHours,
      purchasedAt,
    } = req.body;

    if (
      !storeId ||
      !visitorId ||
      !externalOrderId ||
      orderValue === undefined ||
      !purchasedAt
    ) {
      return res.status(400).json({
        error:
          "storeId, visitorId, externalOrderId, orderValue and purchasedAt are required",
      });
    }

    const existing = await Conversion.findOne({
      storeId,
      externalOrderId,
    });

    if (existing) {
      return res.status(400).json({
        error: "This order has already been recorded",
      });
    }

    const conversion = await Conversion.create({
      storeId,
      visitorId,
      conversationId,
      externalOrderId,
      orderValue,
      currency,
      attributionType,
      attributionWindowHours,
      purchasedAt,
    });

    return res.status(201).json({
      message: "Conversion recorded successfully",
      conversion,
    });
  } catch (error) {
    console.error(
      "Error in createConversion controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getConversions(req, res) {
  try {
    const { storeId } = req.params;

    const conversions = await Conversion.find({
      storeId,
    })
      .populate("visitorId")
      .populate("conversationId")
      .sort({ purchasedAt: -1 });

    return res.status(200).json({
      conversions,
    });
  } catch (error) {
    console.error(
      "Error in getConversions controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getConversion(req, res) {
  try {
    const { id } = req.params;

    const conversion = await Conversion.findById(id)
      .populate("visitorId")
      .populate("conversationId");

    if (!conversion) {
      return res.status(404).json({
        error: "Conversion not found",
      });
    }

    return res.status(200).json({
      conversion,
    });
  } catch (error) {
    console.error(
      "Error in getConversion controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}