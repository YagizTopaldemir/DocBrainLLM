const express = require("express");
const { z } = require("zod");

const chatService = require("../services/chatService");
const authenticate = require("../middleware/authMiddleware");
const aiUsageService = require("../services/aiUsageService");

const {
    askPdfQuestion
} = require("../services/aiService");

const {
    getDocumentById
} = require("../services/documentService");

const conversationService =
    require("../services/conversationService");

const router = express.Router();

const pdfChatSchema = z.object({
    conversationId: z.coerce.number().int().positive(),
    question: z
        .string()
        .trim()
        .min(1, "Soru boş olamaz.")
        .max(5000, "Soru çok uzun.")
});


// ============================================
// PDF CHAT
// ============================================

router.post(
    "/documents/:documentId/chat",
    authenticate,
    async (req, res) => {
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

            // -----------------------------
            // INPUT VALIDATION
            // -----------------------------

            const validation =
                pdfChatSchema.safeParse(req.body);

            if (!validation.success) {
                return res.status(400).json({
                    message: "Geçersiz soru bilgileri."
                });
            }

            const {
                conversationId,
                question
            } = validation.data;


            // -----------------------------
            // DOCUMENT OWNERSHIP
            // -----------------------------

            const document =
                await getDocumentById(
                    documentId,
                    userId
                );

            if (!document) {
                return res.status(404).json({
                    message: "Doküman bulunamadı."
                });
            }


            // -----------------------------
            // CONVERSATION OWNERSHIP
            // -----------------------------

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


            // Conversation başka PDF'e ait mi?
            if (
                Number(conversation.document_id) !==
                documentId
            ) {
                return res.status(403).json({
                    message:
                        "Bu konuşma bu dokümana ait değil."
                });
            }


            // -----------------------------
            // AI USAGE
            // -----------------------------

            const usage =
                await aiUsageService.getUsage(userId);

            if (!usage) {
                return res.status(404).json({
                    message:
                        "AI kullanım bilgisi bulunamadı."
                });
            }

            if (
                Number(usage.used_tokens) >=
                Number(usage.monthly_limit)
            ) {
                return res.status(429).json({
                    message:
                        "Aylık AI kullanım limitiniz doldu."
                });
            }


            // -----------------------------
            // SAVE USER MESSAGE
            // -----------------------------

            await chatService.saveMessage(
                conversationId,
                documentId,
                "user",
                question
            );


            // -----------------------------
            // AI
            // -----------------------------

            let result =
                await askPdfQuestion(
                    documentId,
                    question
                );

            if (typeof result === "string") {
                result = JSON.parse(result);
            }


            // -----------------------------
            // TOKEN USAGE
            // -----------------------------

            const totalTokens =
                result?.usage?.total_tokens;

            if (
                Number.isFinite(totalTokens) &&
                totalTokens > 0
            ) {
                await aiUsageService.addUsedTokens(
                    userId,
                    totalTokens
                );
            }


            // -----------------------------
            // SAVE ASSISTANT MESSAGE
            // -----------------------------

            if (result?.answer) {
                await chatService.saveMessage(
                    conversationId,
                    documentId,
                    "assistant",
                    result.answer
                );
            }


            return res.status(200).json(result);

        } catch (error) {
            console.error(
                "PDF CHAT ERROR:",
                error
            );

            return res.status(500).json({
                answer:
                    "PDF sorusu işlenirken hata oluştu.",
                sources: []
            });
        }
    }
);


module.exports = router;