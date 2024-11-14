const router = require("express").Router();
const {
  getPageWiseVisitorCount,
  getDailyVisitorActivityCount,
} = require("../../controllers/visitorLogsController");

router
  .get("/page-wise-count", getPageWiseVisitorCount)
  .get("/daily-visitor-wise-activity-count", getDailyVisitorActivityCount);

module.exports = router;
