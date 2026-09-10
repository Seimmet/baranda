export const requireOrganization = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (!req.user.organizationId) {
    return res.status(403).json({
      success: false,
      message: "Your account is not associated with an organization",
    });
  }

  next();
};