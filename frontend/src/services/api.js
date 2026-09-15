import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});


export async function createConversation(documentId) {
    const response = await api.post(
        "/conversations",
        {
            documentId,
            title: "Yeni sohbet"
        }
    );

    return response.data;
}


export async function getDocuments() {
    const response = await api.get("/documents");

    return response.data;
}


export async function getDocument(documentId) {
    const response = await api.get(
        `/documents/${documentId}`
    );

    return response.data;
}


export async function deleteDocument(documentId) {
    const response = await api.delete(
        `/documents/${documentId}`
    );

    return response.data;
}


export async function uploadDocument(file) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/documents/upload",
        formData
    );

    return response.data;
}


export async function askPdfQuestion(
    documentId,
    conversationId,
    question
) {
    const response = await api.post(
        `/documents/${documentId}/chat`,
        {
            conversationId,
            question
        }
    );

    let data = response.data;

    if (typeof data === "string") {
        data = JSON.parse(data);
    }

    return data;
}


export async function getConversationMessages(
    conversationId
) {
    const response = await api.get(
        `/conversations/${conversationId}/messages`
    );

    return response.data;
}
export async function logout() {
    const response = await api.post("/auth/logout");
    return response.data;
}

export async function getConversationByDocument(
    documentId
) {
    const response = await api.get(
        `/conversations/document/${documentId}`
    );

    return response.data;
}

export default api;