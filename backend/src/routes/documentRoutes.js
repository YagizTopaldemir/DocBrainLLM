const express = require("express");
const multer = require("multer");

const authenticate = require("../middleware/authMiddleware");

const {
    uploadDocument,
    listDocuments,
    getDocument,
    removeDocument
} = require("../controllers/documentController");

const router = express.Router();

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const upload = multer({
    dest: "uploads/",
    limits: {
        fileSize: MAX_FILE_SIZE
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(null, false);
        }

        cb(null, true);
    }
});

function handleUploadErrors(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({
                message: "PDF dosyası 20 MB'dan büyük olamaz."
            });
        }

        return res.status(400).json({
            message: "Dosya yüklenirken hata oluştu."
        });
    }

    next(err);
}

router.get(
    "/",
    authenticate,
    listDocuments
);

router.get(
    "/:documentId",
    authenticate,
    getDocument
);

router.post(
    "/upload",
    authenticate,
    upload.single("file"),
    handleUploadErrors,
    uploadDocument
);

router.delete(
    "/:documentId",
    authenticate,
    removeDocument
);

module.exports = router;