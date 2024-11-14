const visitorServices = require("../services/visitorLogServices");
const { successResponse, errorResponse } = require("../utils/responseFormatter");


const getDailyVisitorActivityCount = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date parameter is required." });
    }

    const result = await visitorServices.getDailyVisitorActivityCount(date);
    return successResponse(res, result, "Your request is successful.");
  } catch (error) {
    console.error("Error fetching daily visitor activity count:", error);
    return errorResponse(res, error);
  }
};


// Controller function to handle page-wise visitor count
const getPageWiseVisitorCount = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date parameter is required." });
    }

    const result = await visitorServices.getPageWiseVisitorCount(date);
    return successResponse(res, result, "Your request is successful.");
  } catch (error) {
    console.error("Error fetching page-wise visitor count:", error);
    return errorResponse(res, error);
  }
};

module.exports = { getDailyVisitorActivityCount, getPageWiseVisitorCount };



