const pool = require("../config/database");

function validateTokens(tokens) {
    return (
        Number.isInteger(Number(tokens)) &&
        Number(tokens) > 0
    );
}


async function getUsage(userId) {
    const [rows] = await pool.execute(
        `
        SELECT
            used_tokens,
            monthly_limit,
            period_start
        FROM user_ai_usage
        WHERE user_id = ?
        `,
        [userId]
    );

    return rows[0] || null;
}


async function canUseTokens(userId, tokens) {
    if (!validateTokens(tokens)) {
        return false;
    }

    const usage = await getUsage(userId);

    if (!usage) {
        return false;
    }

    return (
        Number(usage.used_tokens) + Number(tokens) <=
        Number(usage.monthly_limit)
    );
}


async function addUsedTokens(userId, tokens) {
    if (!validateTokens(tokens)) {
        throw new Error("INVALID_TOKEN_AMOUNT");
    }

    const [result] = await pool.execute(
        `
        UPDATE user_ai_usage
        SET used_tokens = used_tokens + ?
        WHERE user_id = ?
        AND used_tokens + ? <= monthly_limit
        `,
        [
            Number(tokens),
            userId,
            Number(tokens)
        ]
    );

    if (result.affectedRows === 0) {
        throw new Error("AI_USAGE_LIMIT_EXCEEDED");
    }

    return true;
}


module.exports = {
    getUsage,
    canUseTokens,
    addUsedTokens
};