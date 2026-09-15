const pool = require("../config/database");

async function createConversation(
    userId,
    documentId,
    title = "Yeni sohbet"
) {
    const [result] = await pool.execute(
        `
        INSERT INTO conversations (
            user_id,
            document_id,
            title
        )
        VALUES (?, ?, ?)
        `,
        [
            userId,
            documentId,
            title
        ]
    );

    return result.insertId;
}


async function getConversation(
    conversationId,
    userId
) {
    const [rows] = await pool.execute(
        `
        SELECT
            id,
            user_id,
            document_id,
            title,
            created_at,
            updated_at
        FROM conversations
        WHERE id = ?
        AND user_id = ?
        `,
        [
            conversationId,
            userId
        ]
    );

    return rows[0] || null;
}


async function getConversationByDocument(
    documentId,
    userId
) {
    const [rows] = await pool.execute(
        `
        SELECT
            id,
            user_id,
            document_id,
            title,
            created_at,
            updated_at
        FROM conversations
        WHERE document_id = ?
        AND user_id = ?
        ORDER BY updated_at DESC, id DESC
        LIMIT 1
        `,
        [
            documentId,
            userId
        ]
    );

    return rows[0] || null;
}


module.exports = {
    createConversation,
    getConversation,
    getConversationByDocument
};