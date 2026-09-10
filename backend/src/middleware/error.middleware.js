export const errorHandler = (
  error,
  req,
  res,
  next
) => {
  console.error("Unhandled application error:", error);

  if (res.headersSent) {
    return next(error);
  }

  const statusCode =
    error.statusCode ||
    error.status ||
    500;

  res.status(statusCode).json({
    success: false,
    message:
      error.message || "Internal server error",
  });
};