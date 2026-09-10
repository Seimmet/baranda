import { OfferRule } from "../models/offer-rule.model.js";

export async function createOfferRule(req, res) {
  try {
    const {
      storeId,
      name,
      conditions,
      discountType,
      discountValue,
      maximumDiscount,
      minimumCartValue,
      eligibleProducts,
      firstTimeCustomerOnly,
    } = req.body;

    if (
      !storeId ||
      !name ||
      discountValue === undefined
    ) {
      return res.status(400).json({
        error:
          "storeId, name and discountValue are required",
      });
    }

    const rule = await OfferRule.create({
      storeId,
      name,
      conditions,
      discountType,
      discountValue,
      maximumDiscount,
      minimumCartValue,
      eligibleProducts,
      firstTimeCustomerOnly,
    });

    return res.status(201).json({
      message: "Offer rule created successfully",
      rule,
    });
  } catch (error) {
    console.error(
      "Error in createOfferRule controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getOfferRules(req, res) {
  try {
    const { storeId } = req.params;

    const rules = await OfferRule.find({
      storeId,
    })
      .populate("eligibleProducts")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      rules,
    });
  } catch (error) {
    console.error(
      "Error in getOfferRules controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getOfferRule(req, res) {
  try {
    const { id } = req.params;

    const rule = await OfferRule.findById(id).populate(
      "eligibleProducts"
    );

    if (!rule) {
      return res.status(404).json({
        error: "Offer rule not found",
      });
    }

    return res.status(200).json({
      rule,
    });
  } catch (error) {
    console.error(
      "Error in getOfferRule controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateOfferRule(req, res) {
  try {
    const { id } = req.params;

    const rule = await OfferRule.findById(id);

    if (!rule) {
      return res.status(404).json({
        error: "Offer rule not found",
      });
    }

    const fields = [
      "name",
      "conditions",
      "discountType",
      "discountValue",
      "maximumDiscount",
      "minimumCartValue",
      "eligibleProducts",
      "firstTimeCustomerOnly",
      "isActive",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        rule[field] = req.body[field];
      }
    });

    await rule.save();

    return res.status(200).json({
      message: "Offer rule updated successfully",
      rule,
    });
  } catch (error) {
    console.error(
      "Error in updateOfferRule controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function deleteOfferRule(req, res) {
  try {
    const { id } = req.params;

    const rule = await OfferRule.findById(id);

    if (!rule) {
      return res.status(404).json({
        error: "Offer rule not found",
      });
    }

    await rule.deleteOne();

    return res.status(200).json({
      message: "Offer rule deleted successfully",
    });
  } catch (error) {
    console.error(
      "Error in deleteOfferRule controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}