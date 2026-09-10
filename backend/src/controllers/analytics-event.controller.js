import { AnalyticsEvent } from "../models/analytics-event.model.js";

export async function createAnalyticsEvent(req, res) {
  try {
    const {
      storeId,
      visitorId,
      conversationId,
      type,
      value,
      metadata,
      occurredAt,
    } = req.body;

    if (!storeId || !type) {
      return res.status(400).json({
        error: "storeId and type are required",
      });
    }

    const event = await AnalyticsEvent.create({
      storeId,
      visitorId,
      conversationId,
      type,
      value,
      metadata,
      occurredAt,
    });

    return res.status(201).json({
      message: "Analytics event recorded successfully",
      event,
    });
  } catch (error) {
    console.error(
      "Error in createAnalyticsEvent controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getAnalyticsEvents(req, res) {
  try {
    const {
      storeId,
      type,
      startDate,
      endDate,
    } = req.query;

    const filter = {
      storeId,
    };

    if (type) {
      filter.type = type;
    }

    if (startDate || endDate) {
      filter.occurredAt = {};

      if (startDate) {
        filter.occurredAt.$gte = new Date(startDate);
      }

      if (endDate) {
        filter.occurredAt.$lte = new Date(endDate);
      }
    }

    const events = await AnalyticsEvent.find(filter)
      .sort({ occurredAt: -1 })
      .limit(5000);

    return res.status(200).json({
      events,
    });
  } catch (error) {
    console.error(
      "Error in getAnalyticsEvents controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}