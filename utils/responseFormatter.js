// Utility to standardize the response format
const successResponse = (res, data, message = "Success") => {
    res.status(200).json({
      status: "success",
      message,
      data,
    });
  };
  
  const errorResponse = (res, error, message = "An error occurred", statusCode = 500) => {
    console.error(error); // Log the error for internal tracking
    res.status(statusCode).json({
      status: "error",
      message,
      error: error.message || error,
    });
  };
  
  module.exports = { successResponse, errorResponse };
  