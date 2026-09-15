const { z } = require("zod");

const conversationService = require("../services/conversationService");
const chatService = require("../services/chatService");
const {
    getDocumentById
} = require("../services/documentService");

const createConversationSchema = z.object({
    documentId: z.coerce.number().int().positive(),
    title: z
        .string()
        .trim()
        .min(1)
        .max(100)
        .optional()
});

async function createConversation(req, res) {
    try {
        const userId = req.user.userId;

        const validation =
            createConversationSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: "Geçersiz konuşma bilgileri."
            });
        }

        const {
            documentId,
            title
        } = validation.data;

        // Kullanıcı bu PDF'in sahibi mi?
        const document = await getDocumentById(
            documentId,
            userId
        );

        if (!document) {
            return res.status(404).json({
                message: "Doküman bulunamadı."
            });
        }

        const conversationId =
            await conversationService.createConversation(
                userId,
                documentId,
                title || "Yeni sohbet"
            );

        return res.status(201).json({
            message: "Konuşma oluşturuldu.",
            conversationId
        });

    } catch (error) {
        console.error(
            "CREATE CONVERSATION ERROR:",
            error
        );

        return res.status(500).json({
            message: "Konuşma oluşturulamadı."
        });
    }
}
async function getConversationByDocument(req, res) {
    try {
        const userId = req.user.userId;

        const documentId =
            Number(req.params.documentId);

        if (
            !Number.isInteger(documentId) ||
            documentId <= 0
        ) {
            return res.status(400).json({
                message: "Geçersiz document ID."
            });
        }

        const conversation =
            await conversationService.getConversationByDocument(
                documentId,
                userId
            );

        return res.status(200).json({
            conversation
        });

    } catch (error) {
        console.error(
            "GET CONVERSATION BY DOCUMENT ERROR:",
            error
        );

        return res.status(500).json({
            message: "Konuşma getirilemedi."
        });
    }
}

async function getConversationMessages(req, res) {
    try {
        const userId = req.user.userId;

        const conversationId =
            Number(req.params.conversationId);

        if (
            !Number.isInteger(conversationId) ||
            conversationId <= 0
        ) {
            return res.status(400).json({
                message: "Geçersiz conversation ID."
            });
        }

        // Önce sahiplik kontrolü
        const conversation =
            await conversationService.getConversation(
                conversationId,
                userId
            );

        if (!conversation) {
            return res.status(404).json({
                message: "Konuşma bulunamadı."
            });
        }

        const messages =
    await chatService.getConversationMessages(
        conversationId,
        userId
    );

console.log("MESSAGES FROM DB:", messages);

return res.status(200).json({
    messages
});

    } catch (error) {
        console.error(
            "GET CONVERSATION MESSAGES ERROR:",
            error
        );

        return res.status(500).json({
            message: "Mesajlar getirilemedi."
        });
    }
}

async function getConversation(req, res) {
    try {
        const userId = req.user.userId;

        const conversationId =
            Number(req.params.conversationId);

        if (
            !Number.isInteger(conversationId) ||
            conversationId <= 0
        ) {
            return res.status(400).json({
                message: "Geçersiz conversation ID."
            });
        }

        const conversation =
            await conversationService.getConversation(
                conversationId,
                userId
            );

        if (!conversation) {
            return res.status(404).json({
                message: "Konuşma bulunamadı."
            });
        }

        return res.status(200).json(conversation);

    } catch (error) {
        console.error(
            "GET CONVERSATION ERROR:",
            error
        );

        return res.status(500).json({
            message: "Konuşma getirilemedi."
        });
    }
}

module.exports = {
    createConversation,
    getConversation,
    getConversationMessages,
    getConversationByDocument
};