import Store from "../models/store.model.js";

export const authenticateTrackingRequest = async (
  req,
  res,
  next
) => {
  try {
    const siteKey = req.headers["x-baranda-site-key"];

    if (!siteKey) {
      return res.status(401).json({
        success: false,
        message: "Tracking site key is required",
      });
    }

    const store = await Store.findOne({
      trackingKey: siteKey,
      status: "active",
    });

    if (!store) {
      return res.status(401).json({
        success: false,
        message: "Invalid tracking site key",
      });
    }

    req.store = store;

    req.tracking = {
      storeId: store._id,
      organizationId: store.organizationId,
    };

    next();
  } catch (error) {
    console.error(
      "Tracking authentication middleware error:",
      error
    );

    next(error);
  }
};