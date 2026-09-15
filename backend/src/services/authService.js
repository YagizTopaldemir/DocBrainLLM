const bcrypt = require("bcrypt");
const pool = require("../config/database");
const jwt = require("jsonwebtoken");

function getJwtSecret() {
    const secret = process.env.JWT_SECRET;

    if (!secret || secret.length < 32) {
        throw new Error("JWT_SECRET is missing or too weak.");
    }

    return secret;
}

async function registerUser(name, email, password) {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [existingUsers] = await connection.execute(
            `
            SELECT id
            FROM users
            WHERE email = ?
            `,
            [email]
        );

        if (existingUsers.length > 0) {
            throw new Error("EMAIL_ALREADY_EXISTS");
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const [result] = await connection.execute(
            `
            INSERT INTO users (
                name,
                email,
                password_hash
            )
            VALUES (?, ?, ?)
            `,
            [name, email, passwordHash]
        );

        const userId = result.insertId;

        await connection.execute(
            `
            INSERT INTO user_ai_usage (
                user_id,
                used_tokens,
                monthly_limit,
                period_start
            )
            VALUES (?, 0, ?, CURDATE())
            `,
            [userId, 30000]
        );

        await connection.commit();

        return {
            id: userId,
            name,
            email
        };

    } catch (error) {
        await connection.rollback();
        throw error;

    } finally {
        connection.release();
    }
}

async function loginUser(email, password) {
    const [users] = await pool.execute(
        `
        SELECT
            id,
            name,
            email,
            password_hash,
            role
        FROM users
        WHERE email = ?
        `,
        [email]
    );

    if (users.length === 0) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!passwordMatch) {
        throw new Error("INVALID_CREDENTIALS");
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
}

function generateAccessToken(user) {
    return jwt.sign(
        {
            userId: user.id,
            role: user.role
        },
        getJwtSecret(),
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d",
            algorithm: "HS256"
        }
    );
}

module.exports = {
    registerUser,
    loginUser,
    generateAccessToken
};