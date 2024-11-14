// db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const moment = require("moment-timezone");

dotenv.config(); // Load environment variables from .env file

// Set the default timezone for the entire application
moment.tz.setDefault("Asia/Dhaka");
process.env.TZ = "Asia/Dhaka"; // Ensure application-wide timezone to Asia/Dhaka

/**
 * MongoDB connection function
 * @returns {Promise<void>} Resolves when the database connection is established
 */
const mongooseConnect = async () => {
  try {
    const dbUri = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/ecommerce-analytics";
    console.log("Connecting to MongoDB...");
    
    // Set the strictQuery option (fixes the deprecation warning)
    mongoose.set('strictQuery', false); // or true, depending on your preference

    // Connecting to MongoDB database with updated options
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,  // Allows the new MongoDB connection string parser
      useUnifiedTopology: true, // Ensures compatibility with the latest MongoDB features
    });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure if the connection fails
  }
};

module.exports = { mongooseConnect };
