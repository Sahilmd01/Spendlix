const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    });
    isConnected = true;
    console.log(`MongoDB connected ✅ Host: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error❌ :", err.message);
    throw err;
  }
};

module.exports = connectDB;
