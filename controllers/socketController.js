const socketService = require("../services/socketService");

const handleVisitorActivityAction = async (socket, data) => {
  try {
    // console.log("Processing user action data:", data);
    const result = await socketService.processVisitorActivityAction(data);
    socket.emit('visitorActivityResponse', { status: 'success', data: result });
  } catch (error) {
    console.error("Error in handlevisitorActivity:", error);
    socket.emit('visitorActivityResponse', { status: 'error', message: error.message });
  }
};

module.exports = {  handleVisitorActivityAction };



