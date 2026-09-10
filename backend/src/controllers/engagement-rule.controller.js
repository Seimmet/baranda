import { EngagementRule } from "../models/engagement-rule.model.js";

export async function createEngagementRule(req, res) {
  try {
    const {
      storeId,
      name,
      description,
      conditions,
      conditionOperator,
      action,
      message,
      cooldownMinutes,
      priority,
    } = req.body;

    if (!storeId || !name || !action) {
      return res.status(400).json({
        error:
          "storeId, name and action are required",
      });
    }

    const rule = await EngagementRule.create({
      storeId,
      name,
      description,
      conditions,
      conditionOperator,
      action,
      message,
      cooldownMinutes,
      priority,
    });

    return res.status(201).json({
      message: "Engagement rule created successfully",
      rule,
    });
  } catch (error) {
    console.error(
      "Error in createEngagementRule controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getEngagementRules(req, res) {
  try {
    const { storeId } = req.params;

    const rules = await EngagementRule.find({
      storeId,
    }).sort({
      priority: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      rules,
    });
  } catch (error) {
    console.error(
      "Error in getEngagementRules controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getEngagementRule(req, res) {
  try {
    const { id } = req.params;

    const rule = await EngagementRule.findById(id);

    if (!rule) {
      return res.status(404).json({
        error: "Engagement rule not found",
      });
    }

    return res.status(200).json({
      rule,
    });
  } catch (error) {
    console.error(
      "Error in getEngagementRule controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateEngagementRule(req, res) {
  try {
    const { id } = req.params;

    const rule = await EngagementRule.findById(id);

    if (!rule) {
      return res.status(404).json({
        error: "Engagement rule not found",
      });
    }

    const fields = [
      "name",
      "description",
      "conditions",
      "conditionOperator",
      "action",
      "message",
      "cooldownMinutes",
      "priority",
      "isActive",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        rule[field] = req.body[field];
      }
    });

    await rule.save();

    return res.status(200).json({
      message: "Engagement rule updated successfully",
      rule,
    });
  } catch (error) {
    console.error(
      "Error in updateEngagementRule controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function deleteEngagementRule(req, res) {
  try {
    const { id } = req.params;

    const rule = await EngagementRule.findById(id);

    if (!rule) {
      return res.status(404).json({
        error: "Engagement rule not found",
      });
    }

    await rule.deleteOne();

    return res.status(200).json({
      message: "Engagement rule deleted successfully",
    });
  } catch (error) {
    console.error(
      "Error in deleteEngagementRule controller:",
      error
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}