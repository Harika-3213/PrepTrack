
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
}));
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to PrepTrack API",
        status: "Running successfully"
    });
});

// API routes
app.use("/api/auth", require("./routes/authRoutes"));

// IMPORTANT: Specific route must come before general /api route
app.use("/api/companies", require("./routes/companyRoutes"));

app.use("/api", require("./routes/dataRoutes"));

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: "Internal server error"
    });
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`PrepTrack server running on port ${PORT}`);
    });
});
