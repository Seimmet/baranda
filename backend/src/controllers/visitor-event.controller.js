import { VisitorEvent } from "../models/visitor-event.model.js";
import { Visitor } from "../models/visitor.model.js";

export async function createVisitorEvent(req, res) {
  try {
    const {
      storeId,
      visitorId,
      sessionId,
      type,
      productId,
      pageUrl,
      metadata,
    } = req.body;

    if (!storeId || !visitorId || !sessionId || !type) {
      return res.status(400).json({
        error:
          "storeId, visitorId, sessionId and type are required",
      });
    }

    const visitor = await Visitor.findOne({
      _id: visitorId,
      storeId,
    });

    if (!visitor) {
      return res.status(404).json({
        error: "Visitor not found",
      });
    }

    const event = await VisitorEvent.create({
      storeId,
      visitorId,
      sessionId,
      type,
      productId,
      pageUrl,
      metadata,
    });

    visitor.lastSeenAt = new Date();
    visitor.isCurrentlyOnline = true;

    if (pageUrl) {
      visitor.currentPage = pageUrl;
    }

    if (productId) {
      visitor.currentProductId = productId;
    }

    await visitor.save();

    return res.status(201).json({
      message: "Visitor event recorded successfully",
      event,
    });
  } catch (error) {
    console.error(
      "Error in createVisitorEvent controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getVisitorEvents(req, res) {
  try {
    const { visitorId } = req.params;

    const events = await VisitorEvent.find({
      visitorId,
    })
      .sort({ occurredAt: -1 })
      .limit(500);

    return res.status(200).json({
      events,
    });
  } catch (error) {
    console.error(
      "Error in getVisitorEvents controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}