const VisitorActivity = require("../models/VisitorActivity");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Dhaka");
const { getBdDateTime } = require("../utils/date.time");

const processVisitorActivityAction = async (data) => {
  const { visitorId, pageName, } = data;

  const currentTimeDBT = getBdDateTime(); // For BDT

  const startOfDay = moment.tz("Asia/Dhaka").startOf("day").format("YYYY-MM-DD HH:mm:ss");
  const endOfDay = moment.tz("Asia/Dhaka").endOf("day").format("YYYY-MM-DD HH:mm:ss");
  

  // Check if there's an existing record with the same visitorId, pageName, and createdAt
  const existingActivity = await VisitorActivity.findOne({
    visitorId,
    pageName: pageName?.toLowerCase(),
    requestStartDateTime: { $gte: startOfDay, $lt: endOfDay },
  });

  if (existingActivity) {
    existingActivity.pageCount += 1;
    existingActivity.requestEndDateTime = currentTimeDBT;
    existingActivity.duration += data.duration;

    await existingActivity.save();
    return { status: "---updated---", data: existingActivity };
  } else {
    // If no existing record, create a new one
    const newActivity = new VisitorActivity({
      visitorId: data.visitorId,
      userName: data.userName,
      pageId: data.pageId,
      deviceType: data.deviceType,
      ipAddress: data.ipAddress,
      requestDevice: data.requestDevice,
      sourceName: data.sourceName,
      reqUrl: data.reqUrl,
      duration: data.duration,
      statusId: data.statusId,
      pageName: pageName?.toLowerCase(),
      userType: data.userType?.toLowerCase(),
      requestStartDateTime: currentTimeDBT,
      createdAt: currentTimeDBT,
    });

    await newActivity.save();

    return { status: "new", message: "New visitor log created" };
  }
};

module.exports = { processVisitorActivityAction };
