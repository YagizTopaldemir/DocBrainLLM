const { z } = require("zod");
const authService = require("../services/authService");

const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "İsim en az 2 karakter olmalı.")
        .max(100, "İsim en fazla 100 karakter olabilir."),

    email: z
        .string()
        .trim()
        .email("Geçerli bir email adresi girin.")
        .max(255),

    password: z
        .string()
        .min(8, "Şifre en az 8 karakter olmalı.")
        .max(128)
});

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email()
        .max(255),

    password: z
        .string()
        .min(1)
        .max(128)
});


async function register(req, res) {
    try {
        const result = registerSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Geçersiz bilgiler.",
                errors: result.error.flatten().fieldErrors
            });
        }

        const {
            name,
            email,
            password
        } = result.data;

        const user =
            await authService.registerUser(
                name,
                email.toLowerCase(),
                password
            );

        return res.status(201).json({
            message: "Kayıt başarılı.",
            user
        });

    } catch (error) {
        if (error.message === "EMAIL_ALREADY_EXISTS") {
            return res.status(409).json({
                message: "Bu email adresi zaten kullanılıyor."
            });
        }

        console.error(
            "REGISTER ERROR:",
            error.message
        );

        return res.status(500).json({
            message: "Kayıt sırasında bir hata oluştu."
        });
    }
}

async function login(req, res) {
    try {
        const result = loginSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Geçersiz bilgiler."
            });
        }

        const {
            email,
            password
        } = result.data;

        const user =
            await authService.loginUser(
                email.toLowerCase(),
                password
            );

        const token =
            authService.generateAccessToken(user);

      res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/"
});
        return res.status(200).json({
            message: "Giriş başarılı.",
            user
        });

    } catch (error) {
        if (error.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({
                message: "Email veya şifre hatalı."
            });
        }

        console.error(
            "LOGIN ERROR:",
            error.message
        );

        return res.status(500).json({
            message: "Giriş sırasında bir hata oluştu."
        });
    }
}

async function logout(req, res) {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
    });

    return res.status(200).json({
        message: "Çıkış başarılı."
    });
}

async function me(req, res) {
    try {
        return res.status(200).json({
            user: req.user
        });
    } catch (error) {
        console.error("GET ME ERROR:", error);

        return res.status(500).json({
            message: "Kullanıcı bilgileri alınamadı."
        });
    }
}

module.exports = {
    register,
    login,
    logout,
    me
};