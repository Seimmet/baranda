import { Product } from "../models/product.model.js";
import { Store } from "../models/store.model.js";

export async function getProducts(req, res) {
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

    const products = await Product.find({
      storeId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      products,
    });
  } catch (error) {
    console.error("Error in getProducts controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate(
      "storeId"
    );

    if (
      !product ||
      product.storeId.organizationId.toString() !==
        req.user.organizationId.toString()
    ) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    return res.status(200).json({
      product,
    });
  } catch (error) {
    console.error("Error in getProduct controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      images,
      price,
      available,
      isActive,
    } = req.body;

    const product = await Product.findById(id).populate(
      "storeId"
    );

    if (
      !product ||
      product.storeId.organizationId.toString() !==
        req.user.organizationId.toString()
    ) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    product.title = title || product.title;
    product.description =
      description !== undefined
        ? description
        : product.description;

    product.images =
      images !== undefined ? images : product.images;

    if (price !== undefined) {
      product.price = price;
    }

    if (available !== undefined) {
      product.available = available;
    }

    if (isActive !== undefined) {
      product.isActive = isActive;
    }

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(
      "Error in updateProduct controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}