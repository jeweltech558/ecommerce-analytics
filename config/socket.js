const socketIO = require("socket.io");
const socketRoutes = require("../routes/socketRoutes"); // Import the socket event handler

/**
 * Configures and initializes the Socket.io server.
 * 
 * @param {http.Server} server - The HTTP server to bind Socket.io to.
 * @returns {SocketIO.Server} The initialized Socket.io server instance.
 */
function configureSocket(server) {
  // Initialize the Socket.io server
  const io = socketIO(server, {
    cors: {
      origin: "*",  // Adjust this for more strict CORS policies as needed
      methods: ["GET", "POST"],
      credentials: true,  // Allow credentialed requests (cookies, HTTP authentication)
    },
  });

  // Listen for incoming socket connections
  io.on("connection", (socket) => {
    console.log(`New socket connection established: ${socket.id}`);

    // Register socket events (defined in socketRoutes)
    socketRoutes(socket, io);

    // Handle disconnection event
    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });

  return io;
}

module.exports = { configureSocket };
