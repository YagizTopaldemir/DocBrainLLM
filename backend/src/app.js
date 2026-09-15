const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
console.log("AUTH ROUTES MOUNTED");
const {
    apiLimiter
} = require("./middleware/rateLimit");

const documentRoutes = require("./routes/documentRoutes");
const chatRoutes = require("./routes/chatRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();


// ============================================
// SECURITY HEADERS
// ============================================

app.use(helmet());


// ============================================
// CORS
// ============================================

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);


// ============================================
// BODY PARSER
// ============================================

app.use(
    express.json({
        limit: "100kb"
    })
);


// ============================================
// COOKIES
// ============================================

app.use(cookieParser());


// ============================================
// HEALTH CHECK
// ============================================

app.get("/", (req, res) => {
    res.json({
        message: "DocBrainLLM Backend çalışıyor."
    });
});


// ============================================
// API RATE LIMIT
// ============================================

app.use("/api", apiLimiter);


// ============================================
// ROUTES
// ============================================

app.use("/api/documents", documentRoutes);
app.use("/api", chatRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/auth", authRoutes);


module.exports = app;