import Store from "../models/store.model.js";

export const requireStoreAccess = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const storeId =
      req.params.storeId ||
      req.body.storeId ||
      req.query.storeId;

    if (!storeId) {
      return res.status(400).json({
        success: false,
        message: "Store ID is required",
      });
    }

    const store = await Store.findOne({
      _id: storeId,
      organizationId: req.user.organizationId,
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    req.store = store;

    next();
  } catch (error) {
    console.error("Store access middleware error:", error);
    next(error);
  }
};