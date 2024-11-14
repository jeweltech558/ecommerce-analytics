// const moment = require("moment-timezone");

// // const getBdDateTime = () => {
// //   return moment.tz("Asia/Dhaka").utc().toDate();// Returns the current date and time in BDT
// // };

// const getBdDateTime = () => {
//   const bdDate = new moment.tz(Date.now(), "Asia/Dhaka")._d;
//   return bdDate;
// };
// module.exports = {
//   getBdDateTime,
// };



// utils/date.time.js
const moment = require("moment-timezone");

/**
 * Returns the current date and time in Bangladesh Time (Asia/Dhaka) in ISO 8601 format with +06:00 offset.
 * @returns {string} - ISO 8601 formatted date-time string with BDT timezone
 */
const getBdDateTime = () => {
  return moment.tz(Date.now(), "Asia/Dhaka").format("YYYY-MM-DD HH:mm:ss"); // e.g., "2024-11-14T11:13:37.000+06:00"
};

module.exports = {
  getBdDateTime,
};
