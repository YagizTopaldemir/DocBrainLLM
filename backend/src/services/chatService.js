const pool = require("../config/database");

async function saveMessage(
    conversationId,
    documentId,
    role,
    content
) {
    const [result] = await pool.execute(
        `
        INSERT INTO chat_messages (
            conversation_id,
            document_id,
            role,
            content
        )
        SELECT
            c.id,
            c.document_id,
            ?,
            ?
        FROM conversations c
        WHERE c.id = ?
        AND c.document_id = ?
        `,
        [
            role,
            content,
            conversationId,
            documentId
        ]
    );

    if (result.affectedRows === 0) {
        throw new Error(
            "CONVERSATION_DOCUMENT_MISMATCH"
        );
    }

    return result.insertId;
}


async function getConversationMessages(
    conversationId,
    userId
) {
    console.log("GET MESSAGES PARAMS:", {
        conversationId,
        userId
    });

    if (
        !Number.isInteger(conversationId) ||
        conversationId <= 0
    ) {
        throw new Error("INVALID_CONVERSATION_ID");
    }

    if (
        !Number.isInteger(userId) ||
        userId <= 0
    ) {
        throw new Error("INVALID_USER_ID");
    }

    const [rows] = await pool.execute(
        `
        SELECT
            cm.id,
            cm.role,
            cm.content,
            cm.created_at
        FROM chat_messages cm
        INNER JOIN conversations c
            ON c.id = cm.conversation_id
        WHERE cm.conversation_id = ?
        AND c.user_id = ?
        ORDER BY cm.created_at ASC
        `,
        [
            conversationId,
            userId
        ]
    );

    return rows;
}

module.exports = {
    saveMessage,
    getConversationMessages
};