const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");


function internalAuthHeaders() {
    return {
        "X-Internal-Api-Key": process.env.INTERNAL_API_SECRET
    };
}


async function uploadPdfToAI(
    file,
    documentId
) {
    const formData = new FormData();

    formData.append(
        "document_id",
        String(documentId)
    );

    formData.append(
        "file",
        fs.createReadStream(file.path),
        {
            filename: file.originalname,
            contentType: "application/pdf"
        }
    );

    const response = await axios.post(
        `${process.env.AI_SERVICE_URL}/api/pdf/upload`,
        formData,
        {
            headers: {
                ...formData.getHeaders(),
                ...internalAuthHeaders()
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        }
    );

    return response.data;
}


async function askPdfQuestion(
    documentId,
    question
) {

    const response = await axios.post(
        `${process.env.AI_SERVICE_URL}/api/pdf/ask`,
        {
            document_id: documentId,
            question: question
        },
        {
            headers: internalAuthHeaders()
        }
    );

    return response.data;
}


module.exports = {
    uploadPdfToAI,
    askPdfQuestion
};
