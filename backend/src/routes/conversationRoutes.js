const express = require("express");

const {
    createConversation,
    getConversation,
    getConversationMessages,
    getConversationByDocument
} = require("../controllers/conversationController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    authenticate,
    createConversation
);

router.get(
    "/:conversationId/messages",
    authenticate,
    getConversationMessages
);

router.get(
    "/:conversationId",
    authenticate,
    getConversation
);

router.get(
    "/document/:documentId",
    authenticate,
    getConversationByDocument
);

module.exports = router;