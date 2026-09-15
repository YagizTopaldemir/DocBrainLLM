const conversationRepository = require("./conversationRepository");

async function createConversation(
    userId,
    documentId,
    title
) {
    if (!Number.isInteger(userId) || userId <= 0) {
        throw new Error("INVALID_USER_ID");
    }

    if (!Number.isInteger(documentId) || documentId <= 0) {
        throw new Error("INVALID_DOCUMENT_ID");
    }

    return await conversationRepository.createConversation(
        userId,
        documentId,
        title
    );
}

async function getConversation(
    conversationId,
    userId
) {
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

    return await conversationRepository.getConversation(
        conversationId,
        userId
    );
}

async function getConversationByDocument(
    documentId,
    userId
) {
    if (
        !Number.isInteger(documentId) ||
        documentId <= 0
    ) {
        throw new Error("INVALID_DOCUMENT_ID");
    }

    if (
        !Number.isInteger(userId) ||
        userId <= 0
    ) {
        throw new Error("INVALID_USER_ID");
    }

    return await conversationRepository.getConversationByDocument(
        documentId,
        userId
    );
}

module.exports = {
    createConversation,
    getConversation,
    getConversationByDocument
};