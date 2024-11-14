const moment = require("moment");

exports.convertDate = async (date) => {
  var current = new Date(date);
  const timeStamp = new Date(
    Date.UTC(current.getFullYear(), current.getMonth(), current.getDate())
  );
  return timeStamp;
};
exports.todayDate = async () => {
  var current = new Date(date);
  const data = new Date(
    Date.UTC(current.getFullYear(), current.getMonth(), current.getDate())
  );
  return data;
};

exports.timeStamp = async () => {
  var current = new Date();
  const timeStamp = new Date(
    Date.UTC(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      current.getHours(),
      current.getMinutes(),
      current.getSeconds(),
      current.getMilliseconds()
    )
  );
  return timeStamp;
};

exports.timestampPrev = async (time) => {
  var current = new Date(Date.now() - time);
  const timeStamp = new Date(
    Date.UTC(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      current.getHours(),
      current.getMinutes(),
      current.getSeconds(),
      current.getMilliseconds()
    )
  );
  return timeStamp;
};

/**
 * Calculates the time duration in milliseconds based on the provided time interval.
 *
 * @param {string} timeInterval - A string representing the time interval (e.g., "5m", "1h", "7d").
 * @returns {number} The time duration in milliseconds for the given time interval.
 */
exports.getTimeInMillisecondsCateculator = async (timeInterval) => {
  // Define a mapping of time intervals to their respective durations in milliseconds
  const intervals = {
    "5m": 5 * 60 * 1000,
    "30m": 30 * 60 * 1000,
    "1h": 60 * 60 * 1000,
    "6h": 6 * 60 * 60 * 1000,
    "12h": 12 * 60 * 60 * 1000,
    "1d": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "15d": 15 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000,
    "3month": 3 * 30 * 24 * 60 * 60 * 1000,
    "6month": 6 * 30 * 24 * 60 * 60 * 1000,
  };

  return intervals[timeInterval];
};

/**
 * Helper function to get the start of the day for a given date.
 *
 * @param {Date} date - The input date for which to retrieve the start of the day.
 * @returns {Date} A new Date object representing the start of the day.
 */
exports.getStartOfDay = (date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  return startOfDay;
};

/**
 * Helper function to get the end of the day for a given date.
 *
 * @param {Date} date - The input date for which to retrieve the end of the day.
 * @returns {Date} A new Date object representing the end of the day.
 */
exports.getEndOfDay = (date) => {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay;
};


/**
 * Calculates the percentage difference between two sets of data based on their totalPage values.
 *
 * @param {Array} today - An array of objects representing data for the current day.
 * @param {Array} yesterday - An array of objects representing data for the previous day.
 * @returns {number} The percentage difference between the totalPage values of today and yesterday.
 */
exports.calculatePercentageDifference = (today, yesterday) => {
  // Calculate the totalPage values for today and yesterday
  const todayTotal = today.reduce((sum, entry) => sum + entry.totalPage, 0);
  const yesterdayTotal = yesterday.reduce(
    (sum, entry) => sum + entry.totalPage,
    0
  );

  // Calculate the percentage difference, handle division by zero
  return yesterdayTotal !== 0
    ? ((todayTotal - yesterdayTotal) / yesterdayTotal) * 100
    : 0;
};

/**
 * Calculates the total session time from the aggregation results.
 * @param {Array} results - The aggregation results containing session time data.
 * @returns {number} The total session time in minutes.
 */
exports.calculateTotalSessionTime = (results) => {
  if (results.length > 0) {
    const totalAverageDurationInMilliseconds = results[0].totalAverageDuration;
    return Number((totalAverageDurationInMilliseconds / 60000).toFixed(2));
  }
  return 0;
};
