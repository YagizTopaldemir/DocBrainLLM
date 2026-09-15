const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({
                message: "Yetkilendirme gerekli."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
            { algorithms: ["HS256"] }
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Geçersiz veya süresi dolmuş oturum."
        });
    }
}

module.exports = authenticate;