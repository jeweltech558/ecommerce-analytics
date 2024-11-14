// routes/socketRoutes.js
const socketController = require("../controllers/socketController");

/**
 * Registers socket events and links them to controller functions
 * @param {Socket} socket The socket object for the current client
 * @param {Server} io The Socket.io server instance
 */
module.exports = (socket, io) => {
  // Example event listeners for socket actions
  socket.on("visitorActivity", (data) => socketController.handleVisitorActivityAction(socket, data));
};
