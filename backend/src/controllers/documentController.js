const fs = require("fs/promises");

const pool = require("../config/database");

const {
    uploadPdfToAI
} = require("../services/aiService");

const {
    getAllDocuments,
    getDocumentById,
    deleteDocument
} = require("../services/documentService");


// ==============================
// PDF UPLOAD
// ==============================

async function uploadDocument(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "PDF dosyası gönderilmedi."
            });
        }

        const userId = req.user.userId;

        const [result] = await pool.execute(
            `
            INSERT INTO documents (
                user_id,
                original_name,
                stored_name,
                file_path
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                userId,
                req.file.originalname,
                req.file.filename,
                req.file.path
            ]
        );

        const documentId = result.insertId;

        const aiResult = await uploadPdfToAI(
            req.file,
            documentId
        );

        return res.status(200).json({
            message: "PDF başarıyla işlendi.",
            document_id: documentId,
            ai_result: aiResult
        });

    } catch (error) {
        console.error("UPLOAD ERROR:", error);

        return res.status(500).json({
            message: "PDF yüklenirken hata oluştu."
        });
    }
}


// ==============================
// LIST DOCUMENTS
// ==============================

async function listDocuments(req, res) {
    try {
        const userId = req.user.userId;

        const documents = await getAllDocuments(userId);

        return res.status(200).json({
            documents
        });

    } catch (error) {
        console.error("LIST DOCUMENTS ERROR:", error);

        return res.status(500).json({
            message: "Dokümanlar getirilemedi."
        });
    }
}


// ==============================
// GET DOCUMENT
// ==============================

async function getDocument(req, res) {
    try {
        const documentId = Number(
            req.params.documentId
        );

        if (!Number.isInteger(documentId)) {
            return res.status(400).json({
                message: "Geçersiz document ID."
            });
        }

        const document = await getDocumentById(
            documentId,
            req.user.userId
        );

        if (!document) {
            return res.status(404).json({
                message: "Doküman bulunamadı."
            });
        }

        return res.status(200).json({
            document
        });

    } catch (error) {
        console.error("GET DOCUMENT ERROR:", error);

        return res.status(500).json({
            message: "Doküman getirilemedi."
        });
    }
}


// ==============================
// DELETE DOCUMENT
// ==============================

async function removeDocument(req, res) {
    try {
        const documentId = Number(
            req.params.documentId
        );

        if (!Number.isInteger(documentId)) {
            return res.status(400).json({
                message: "Geçersiz document ID."
            });
        }

        const document = await getDocumentById(
            documentId,
            req.user.userId
        );

        if (!document) {
            return res.status(404).json({
                message: "Doküman bulunamadı."
            });
        }

        const affectedRows = await deleteDocument(
            documentId,
            req.user.userId
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                message: "Doküman silinemedi."
            });
        }

        if (document.file_path) {
            try {
                await fs.unlink(document.file_path);
            } catch (unlinkError) {
                if (unlinkError.code !== "ENOENT") {
                    console.error(
                        "DELETE FILE ERROR:",
                        unlinkError
                    );
                }
            }
        }

        return res.status(200).json({
            message: "Doküman başarıyla silindi.",
            document_id: documentId
        });

    } catch (error) {
        console.error("DELETE DOCUMENT ERROR:", error);

        return res.status(500).json({
            message: "Doküman silinemedi."
        });
    }
}


// ==============================
// EXPORTS
// ==============================

module.exports = {
    uploadDocument,
    listDocuments,
    getDocument,
    removeDocument
};