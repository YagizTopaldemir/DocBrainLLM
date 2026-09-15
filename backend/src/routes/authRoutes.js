const express = require("express");
console.log("AUTH ROUTES LOADED");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const { loginLimiter } = require("../middleware/rateLimit");

const authController = require("../controllers/authController");

router.post(
    "/register",
    loginLimiter,
    authController.register
);

router.post(
    "/login",
    loginLimiter,
    authController.login
);

router.post(
    "/logout",
    authController.logout
);

router.get(
    "/me",
    authenticate,
    authController.me
);

module.exports = router;