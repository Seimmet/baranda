import { Organization } from "../models/organization.model.js";

export async function getOrganization(req, res) {
  try {
    const organization = await Organization.findById(
      req.user.organizationId
    );

    if (!organization) {
      return res.status(404).json({
        error: "Organization not found",
      });
    }

    return res.status(200).json({
      organization,
    });
  } catch (error) {
    console.error("Error in getOrganization controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateOrganization(req, res) {
  try {
    const { name, logoUrl, timezone, currency } = req.body;

    const organization = await Organization.findById(
      req.user.organizationId
    );

    if (!organization) {
      return res.status(404).json({
        error: "Organization not found",
      });
    }

    organization.name = name || organization.name;

    organization.logoUrl =
      logoUrl !== undefined ? logoUrl : organization.logoUrl;

    organization.timezone =
      timezone || organization.timezone;

    organization.currency =
      currency || organization.currency;

    await organization.save();

    return res.status(200).json({
      message: "Organization updated successfully",
      organization,
    });
  } catch (error) {
    console.error("Error in updateOrganization controller:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}