import { Store } from "../models/store.model.js";
import { StoreIntegration } from "../models/store-integration.model.js";

export async function getIntegration(req, res) {
  try {
    const { storeId } = req.params;

    const store = await Store.findOne({
      _id: storeId,
      organizationId: req.user.organizationId,
    });

    if (!store) {
      return res.status(404).json({
        error: "Store not found",
      });
    }

    const integration = await StoreIntegration.findOne({
      storeId,
    }).select("-accessToken");

    return res.status(200).json({
      integration,
    });
  } catch (error) {
    console.error(
      "Error in getIntegration controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function disconnectIntegration(req, res) {
  try {
    const { storeId } = req.params;

    const store = await Store.findOne({
      _id: storeId,
      organizationId: req.user.organizationId,
    });

    if (!store) {
      return res.status(404).json({
        error: "Store not found",
      });
    }

    const integration =
      await StoreIntegration.findOne({
        storeId,
      });

    if (integration) {
      integration.status = "revoked";
      await integration.save();
    }

    store.status = "disconnected";
    store.widgetEnabled = false;

    await store.save();

    return res.status(200).json({
      message: "Store integration disconnected successfully",
    });
  } catch (error) {
    console.error(
      "Error in disconnectIntegration controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}