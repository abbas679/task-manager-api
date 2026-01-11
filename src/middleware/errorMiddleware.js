const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server error";

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // Duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value";
  }

  // Fallback for unexpected errors
  if (!(err instanceof ApiError)) {
    statusCode = 500;
    message = "Internal server error";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
