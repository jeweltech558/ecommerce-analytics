// Middleware for handling uncaught errors
const errorHandler = (err, req, res, next) => {
    console.error("Unhandled Error: ", err); // Log the error for internal tracking
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      status: "error",
      message,
      error: err.stack || err,
    });
  };
  
  module.exports = errorHandler;
  