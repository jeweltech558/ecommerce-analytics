const { Schema, model } = require("mongoose");
const { getBdDateTime } = require("../utils/date.time");

const VisitorActivitySchema = new Schema({
  visitorId: { type: String, required: true },
  userId: { type: String },
  userType: { type: String, required: true },
  deviceType: { type: String },
  userName: { type: String },
  ipAddress: { type: String },
  requestDevice: { type: String },
  sourceName: { type: String },
  reqUrl: { type: String },
  pageCount: { type: Number, default: 1 },
  requestStartDateTime: { type: Date, default: getBdDateTime },
  requestEndDateTime: { type: Date, default: getBdDateTime },
  duration: { type: Number },
  createdAt: { type: Date, default: getBdDateTime },
  pageName: { type: String },
  pageId: { type: String },
  statusId: { type: Number, default: 1 },
});

const VisitorActivity = model("VisitorActivity", VisitorActivitySchema);

module.exports = VisitorActivity;
