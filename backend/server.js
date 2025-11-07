// backend/server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const { startScheduler, stopScheduler } = require('./utils/scheduler');
const feedbackRoutes = require('./routes/feedback');
const { sanitizeInput } = require('./middleware/validation');

// Hero Slide Routes
const adminHeroRoutes = require('./routes/admin/heroSlide');
const publicHeroRoutes = require('./routes/public/heroSlides');

dotenv.config();

const app = express();

// ✅ Required for Render cookies, sessions, JWT
app.set('trust proxy', 1);

// ✅ Connect database
connectDB()
  .then(() => {
    startScheduler();
    console.log("✅ Schedulers started");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

/* ✅ SECURITY (SAFE FOR VERCEL + RENDER) */
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

/* ✅ Rate Limiting */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use('/api', limiter);

/* ✅ CORS for Vercel + Localhost */
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://arvind-dportfolio.vercel.app",
    /https:\/\/arvind-dportfolio.*\.vercel\.app$/,
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options('/api/*', cors(corsOptions));


/* ✅ Body Parsing */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ✅ Sanitize user input */
app.use(sanitizeInput);

/* ✅ Logging */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* ✅ Health Route */
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    time: new Date().toISOString(),
    env: process.env.NODE_ENV || "development",
  });
});

/* ✅ API ROUTES */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/otp", require("./routes/otp"));
app.use("/api/volunteer", require("./routes/volunteer"));
app.use("/api/feedback", feedbackRoutes);
app.use("/api/events", require("./routes/events"));
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/wishlist", require("./routes/wishlist"));
app.use("/api/donations", require("./routes/donations"));
app.use("/api/admin/hero-slides", adminHeroRoutes);
app.use("/api/hero-slides", publicHeroRoutes);

/* ✅ Serve uploaded files */
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ✅ 404 Handler */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

/* ✅ Global Error Handler */
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ✅ Start Server */
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);

/* ✅ Graceful Shutdown */
process.on("SIGTERM", () => {
  stopScheduler();
  server.close(() => process.exit(0));
});

process.on("SIGINT", () => {
  stopScheduler();
  server.close(() => process.exit(0));
});

module.exports = app;
