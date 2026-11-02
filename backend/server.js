
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
const allowedOrigins = (process.env.CLIENT_URL || "")
    .split(",")
    .map(url => url.trim().replace(/\/+$/, ""))
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const cleanOrigin = origin.replace(/\/+$/, "");

        if (allowedOrigins.length === 0 || allowedOrigins.includes("*")) {
            return callback(null, true);
        }

        const isAllowed = allowedOrigins.some(allowed => {
            if (allowed === cleanOrigin) return true;
            if (allowed.includes(".vercel.app") && cleanOrigin.endsWith(".vercel.app")) return true;
            return false;
        }) || cleanOrigin.includes("localhost") || cleanOrigin.includes("127.0.0.1");

        if (isAllowed) {
            return callback(null, true);
        }

        // Fallback to allow request in case CLIENT_URL is slightly misconfigured
        return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
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
