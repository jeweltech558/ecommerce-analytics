const Visitor = require("../models/VisitorLog");

/**
 * Generates an aggregation pipeline for calculating session time within a given date range.
 * The pipeline includes matching page view within the specified start and end datetimes.
 *
 * @param {Date} startDatetime - The start datetime of the date range.
 * @param {Date} endDatetime - The end datetime of the date range.
 * @returns {Array} An array representing the MongoDB aggregation pipeline.
 */
exports.getDateRangePageViewPipeline = (startDatetime, endDatetime) => [
  {
    $match: {
      createdAt: {
        $gte: startDatetime,
        $lt: endDatetime,
      },
      status_id: 1,
    },
  },
  {
    $group: {
      _id: { visitor_id: "$visitor_id", page_name: "$page_name" },
      count: { $sum: 1 },
    },
  },
  {
    $group: {
      _id: "$_id.visitor_id",
      totalPage: { $sum: "$count" },
    },
  },
];

/**
 * Generates an aggregation pipeline for calculating session time within a given date range.
 * The pipeline includes matching active visitor within the specified start and end datetimes.
 *
 * @param {Date} startDatetime - The start datetime of the date range.
 * @param {Date} endDatetime - The end datetime of the date range.
 * @returns {Array} An array representing the MongoDB aggregation pipeline.
 */
exports.getDateRangeActiveVisitorPipeline = (startDatetime, endDatetime) => [
  {
    $match: {
      createdAt: {
        $gte: startDatetime,
        $lt: endDatetime,
      },
      status_id: 1,
    },
  },
  {
    $group: {
      _id: "$visitor_id",
    },
  },
  {
    $group: {
      _id: null,
      totalVisitors: { $sum: 1 },
    },
  },
];

/**
 * Generates an aggregation pipeline for calculating session time within a given date range.
 * The pipeline includes matching sessions within the specified start and end datetimes.
 *
 * @param {Date} startDatetime - The start datetime of the date range.
 * @param {Date} endDatetime - The end datetime of the date range.
 * @returns {Array} An array representing the MongoDB aggregation pipeline.
 */
exports.getDateRangeSessionTimePipeline = (startDatetime, endDatetime) => [
  {
    $match: {
      createdAt: {
        $gte: startDatetime,
        $lt: endDatetime,
      },
      status_id: 1,
    },
  },
  {
    $group: {
      _id: {
        $cond: [{ $ne: ["$visitor_id", null] }, "$visitor_id", "$createdAt"],
      },
      count: { $sum: "$total_count" },
      duration: { $avg: "$duration" }, // Calculate the average "duration" time
      visitor_id: { $first: "$visitor_id" },
    },
  },
  {
    $group: {
      _id: null,
      totalSessions: { $sum: 1 }, // Count the total number of sessions
      totalAverageDuration: { $avg: "$duration" }, // Calculate the average duration of all sessions
    },
  },
];

/**
 * Generates an aggregation pipeline for calculating the total number of active visitors
 * within a given date range. The pipeline includes matching visitors who logged in (user_type: "Login")
 * and have a status_id of 1.
 *
 * @param {Date} startDatetime - The start datetime of the date range.
 * @param {Date} endDatetime - The end datetime of the date range.
 * @returns {Array} An array representing the MongoDB aggregation pipeline.
 */
exports.getDateRangeGoalsActiveUserPipeline = (startDatetime, endDatetime) => [
  {
    $match: {
      createdAt: {
        $gte: startDatetime,
        $lt: endDatetime,
      },
      user_type: "Login",
      status_id: 1,
    },
  },
  {
    $group: {
      _id: "$visitor_id",
    },
  },
  {
    $group: {
      _id: null,
      totalVisitors: { $sum: 1 },
    },
  },
];

/**
 * Generates an aggregation pipeline for calculating visitor statistics aggregated by day
 * within a given date range. The pipeline includes matching visitors based on their creation date.
 *
 * @param {Date} startDate - The start date of the date range.
 * @param {Date} endDate - The end date of the date range.
 * @returns {Array} An array representing the MongoDB aggregation pipeline.
 */
exports.getVisitorAggregate = async (startDate, endDate) => {
  return Visitor.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        uniqueVisitors: { $addToSet: "$visitor_id" },
        totalPageViews: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: {
          month: "$_id.month",
          day: "$_id.day",
        },
        totalVisitors: { $sum: { $size: "$uniqueVisitors" } },
        totalPageViews: { $sum: "$totalPageViews" },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        day: "$_id.day",
        totalVisitors: "$totalVisitors",
        totalPageViews: "$totalPageViews",
      },
    },
    { $sort: { month: 1, day: 1 } },
  ]);
};

/**
 * Generates an aggregation pipeline for calculating the total number of sessions and average duration
 * of active visitors within a given date range. The pipeline includes matching visitors who have a status_id of 1.
 *
 * @param {Date} startDate - The start date of the date range.
 * @param {Date} endDate - The end date of the date range.
 * @returns {Array} An array representing the MongoDB aggregation pipeline.
 */
exports.getTotalAverageDuration = async (startDate, endDate) => {
  return Visitor.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
        status_id: 1,
      },
    },
    {
      $group: {
        _id: {
          day: { $dayOfMonth: "$createdAt" },
          month: { $month: "$createdAt" },
          visitor_id: { $ifNull: ["$visitor_id", null] },
        },
        count: { $sum: "$total_count" },
        duration: { $avg: "$duration" },
        visitor_id: { $first: "$visitor_id" },
      },
    },
    {
      $group: {
        _id: {
          month: "$_id.month",
          day: "$_id.day",
        },
        totalSessions: { $sum: 1 },
        totalAverageDuration: { $avg: "$duration" },
      },
    },
    {
      $project: {
        _id: 0,
        day: "$_id.day",
        month: "$_id.month",
        totalSessions: 1,
        totalAverageDuration: {
          $round: [{ $divide: ["$totalAverageDuration", 60000] }, 2],
        },
      },
    },
    { $sort: { month: 1, day: 1 } },
  ]);
};

/**
 * Generates an aggregation pipeline for calculating the total number of registered users
 * within a given date range. The pipeline includes matching visitors who logged in (user_type: "Login")
 * and have a status_id of 1.
 *
 * @param {Date} startDate - The start date of the date range.
 * @param {Date} endDate - The end date of the date range.
 * @returns {Array} An array representing the MongoDB aggregation pipeline.
 */
exports.getTotalRegisterUser = async (startDate, endDate) => {
  return Visitor.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
        user_type: "Login",
        status_id: 1,
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
          visitor_id: "$visitor_id",
        },
      },
    },
    {
      $group: {
        _id: {
          month: "$_id.month",
          day: "$_id.day",
        },
        totalVisitors: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        day: "$_id.day",
        month: "$_id.month",
        totalVisitors: 1,
      },
    },
    {
      $sort: {
        month: 1,
        day: 1,
      },
    },
  ]);
};