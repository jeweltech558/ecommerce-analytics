const VisitorActivity = require("../models/VisitorActivity");
const moment = require("moment-timezone");

// Service function to get daily visitor activity count
const getDailyVisitorActivityCount = async (date) => {
  try {
    const startOfDay = moment.tz(date, "Asia/Dhaka").startOf("day").toDate();
    const endOfDay = moment.tz(date, "Asia/Dhaka").endOf("day").toDate();

    // Aggregate query to group by visitorId and pageName, counting occurrences within the date range
    const visitorActivityCount = await VisitorActivity.aggregate([
      {
        $match: {
          requestStartDateTime: { $gte: startOfDay, $lt: endOfDay },
        },
      },
      {
        $group: {
          _id: { visitorId: "$visitorId", pageName: "$pageName" },
          visitCount: { $sum: "$pageCount" },
        },
      },
      {
        $project: {
          visitorId: "$_id.visitorId",
          pageName: "$_id.pageName",
          visitCount: "$visitCount",
          _id: 0,
        },
      },
    ]);

    return visitorActivityCount;
  } catch (error) {
    throw new Error("Error fetching visitor count from the database");
  }
};

// Service function to get page-wise visitor count based on pageCount for a specific day
const getPageWiseVisitorCount = async (date) => {
  try {
    const startOfDay = moment.tz(date, "Asia/Dhaka").startOf("day").toDate();
    const endOfDay = moment.tz(date, "Asia/Dhaka").endOf("day").toDate();

    // Aggregate query to sum the pageCount for each page
    const pageWiseVisitorCount = await VisitorActivity.aggregate([
      {
        $match: {
          requestStartDateTime: { $gte: startOfDay, $lt: endOfDay },
        },
      },
      {
        $group: {
          _id: "$pageName", // Group by pageName
          totalPageVisits: { $sum: "$pageCount" }, // Sum the pageCount field
        },
      },
      {
        $project: {
          pageName: "$_id",
          totalPageVisits: "$totalPageVisits",
          _id: 0,
        },
      },
    ]);

    return pageWiseVisitorCount;
  } catch (error) {
    throw new Error("Error fetching visitor count from the database");
  }
};

module.exports = { getDailyVisitorActivityCount, getPageWiseVisitorCount };
