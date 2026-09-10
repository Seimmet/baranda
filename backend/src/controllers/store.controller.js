import { Store } from "../models/store.model.js";

export async function createStore(req, res) {
  try {
    const {
      name,
      platform,
      domain,
      currency,
      timezone,
    } = req.body;

    if (!name || !platform || !domain) {
      return res.status(400).json({
        error: "Name, platform and domain are required",
      });
    }

    const existingStore = await Store.findOne({
      organizationId: req.user.organizationId,
      domain,
    });

    if (existingStore) {
      return res.status(400).json({
        error: "This store is already connected",
      });
    }

    const store = await Store.create({
      organizationId: req.user.organizationId,
      name,
      platform,
      domain,
      currency,
      timezone,
      status: "pending",
    });

    return res.status(201).json({
      message: "Store created successfully",
      store,
    });
  } catch (error) {
    console.error("Error in createStore controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getStores(req, res) {
  try {
    const stores = await Store.find({
      organizationId: req.user.organizationId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      stores,
    });
  } catch (error) {
    console.error("Error in getStores controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getStore(req, res) {
  try {
    const { id } = req.params;

    const store = await Store.findOne({
      _id: id,
      organizationId: req.user.organizationId,
    });

    if (!store) {
      return res.status(404).json({
        error: "Store not found",
      });
    }

    return res.status(200).json({
      store,
    });
  } catch (error) {
    console.error("Error in getStore controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateStore(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      currency,
      timezone,
      widgetEnabled,
      isActive,
    } = req.body;

    const store = await Store.findOne({
      _id: id,
      organizationId: req.user.organizationId,
    });

    if (!store) {
      return res.status(404).json({
        error: "Store not found",
      });
    }

    store.name = name || store.name;
    store.currency = currency || store.currency;
    store.timezone = timezone || store.timezone;

    if (widgetEnabled !== undefined) {
      store.widgetEnabled = widgetEnabled;
    }

    if (isActive !== undefined) {
      store.isActive = isActive;
    }

    await store.save();

    return res.status(200).json({
      message: "Store updated successfully",
      store,
    });
  } catch (error) {
    console.error("Error in updateStore controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function deleteStore(req, res) {
  try {
    const { id } = req.params;

    const store = await Store.findOne({
      _id: id,
      organizationId: req.user.organizationId,
    });

    if (!store) {
      return res.status(404).json({
        error: "Store not found",
      });
    }

    store.isActive = false;
    store.status = "disconnected";

    await store.save();

    return res.status(200).json({
      message: "Store disconnected successfully",
    });
  } catch (error) {
    console.error("Error in deleteStore controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}