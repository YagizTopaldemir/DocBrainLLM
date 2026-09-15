const pool = require("../config/database");

async function getAllDocuments(userId) {
    const [rows] = await pool.execute(
        `
        SELECT
            id,
            original_name,
            stored_name,
            file_path,
            created_at
        FROM documents
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId]
    );

    return rows;
}

async function getDocumentById(documentId, userId) {
    const [rows] = await pool.execute(
        `
        SELECT
            id,
            original_name,
            stored_name,
            file_path,
            created_at
        FROM documents
        WHERE id = ?
        AND user_id = ?
        `,
        [documentId, userId]
    );

    return rows[0] || null;
}

async function deleteDocument(documentId, userId) {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        await connection.execute(
            `
            DELETE cm FROM chat_messages cm
            INNER JOIN conversations c
                ON c.id = cm.conversation_id
            WHERE cm.document_id = ?
            AND c.user_id = ?
            `,
            [documentId, userId]
        );

        await connection.execute(
            `
            DELETE FROM conversations
            WHERE document_id = ?
            AND user_id = ?
            `,
            [documentId, userId]
        );

        const [result] = await connection.execute(
            `
            DELETE FROM documents
            WHERE id = ?
            AND user_id = ?
            `,
            [documentId, userId]
        );

        await connection.commit();

        return result.affectedRows;

    } catch (error) {
        await connection.rollback();
        throw error;

    } finally {
        connection.release();
    }
}

module.exports = {
    getAllDocuments,
    getDocumentById,
    deleteDocument
};