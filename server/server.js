require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

//Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Root Health Check Route (responds immediately without waiting for DB)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Spendlix API server is running live on Vercel 🚀",
  });
});

// Ensure database is connected before handling API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({
      message: "Database connection failed",
      error: err.message,
    });
  }
});


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  // Auto Keep-Alive Cron Job for Render (Pings every 8 minutes to prevent sleep)
  const https = require("https");
  const RENDER_EXTERNAL_URL =
    process.env.RENDER_EXTERNAL_URL || "https://spendlix.onrender.com";

  setInterval(() => {
    https
      .get(RENDER_EXTERNAL_URL, (res) => {
        console.log(`[Keep-Alive Ping] Status: ${res.statusCode} at ${new Date().toISOString()}`);
      })
      .on("error", (err) => {
        console.error("[Keep-Alive Error]:", err.message);
      });
  }, 8 * 60 * 1000); // 8 minutes (480,000 ms)
});

module.exports = app;

