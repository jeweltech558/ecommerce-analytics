const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIO = require("socket.io");
const { mongooseConnect } = require("./config/db");
const socketRoutes = require("./routes/socketRoutes");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const moment = require("moment-timezone");
dotenv.config();
const app = express();

dotenv.config(); // Load environment variables from .env file

// Set the default timezone for the entire application
moment.tz.setDefault("Asia/Dhaka");
process.env.TZ = "Asia/Dhaka"; // Ensure application-wide timezone to Asia/Dhaka

// HTTP server for Socket.io
const socketServer = http.createServer();

// Create Socket.io server attached to a different HTTP server
const io = socketIO(socketServer, {
  cors: {
    origin: "*", // Adjust this for more strict CORS policies as needed
    methods: ["GET", "POST"],
    credentials: true, // Allow credentialed requests
  },
});

// Socket event handling
io.on("connection", (socket) => {
  console.log("New socket connection:", socket.id);

  // Register socket event routes
  socketRoutes(socket, io);

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

// Middleware setup for Express
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(errorHandler);
// Routes (API routes)
app.use(router);

// Database connection setup
mongooseConnect();

// Error handling middleware for Express
app.use((err, _req, res, _next) => {
  const message = err.message || "Server Error Occurred";
  const status = err.status || 500;
  res.status(status).json({ message });
});

// Start the Express API server on a separate port (8010)
const PORT = process.env.PORT || 8010;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

// Start the Socket.io server on a different port (8011)
const SOCKET_PORT = process.env.SOCKET_PORT || 8011;
socketServer.listen(SOCKET_PORT, () => {
  console.log(`Socket server running on port ${SOCKET_PORT}`);
});
