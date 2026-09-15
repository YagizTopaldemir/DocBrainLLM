const rateLimit = require("express-rate-limit");


// ============================================
// LOGIN
// ============================================

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        message:
            "Çok fazla giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin."
    }
});


// ============================================
// GENERAL API
// ============================================

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        message:
            "Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin."
    }
});


module.exports = {
    loginLimiter,
    apiLimiter
};