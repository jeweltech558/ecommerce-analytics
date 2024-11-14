const router = require("express").Router();
const visitorLogRoutes = require("./visitorLogs");
const { helloController } = require("../controllers/healthCheck");

//New Development API Endpoint...
router.use("/api/visitor",  visitorLogRoutes);

//Health check
router.use("/hello", helloController);

module.exports = router;
