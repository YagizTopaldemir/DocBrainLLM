import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
    createConversation,
    deleteDocument,
    getConversationByDocument,
    getDocuments
} from "../services/api";

import Sidebar from "../components/layout/Sidebar";
import PdfSidebar from "../components/pdf/PdfSidebar";
import PdfChat from "../components/pdf/PdfChat";

function PdfWorkspace() {
    const [searchParams] = useSearchParams();

    const [conversationId, setConversationId] = useState(null);
    const [document, setDocument] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [loadingDocuments, setLoadingDocuments] = useState(true);
    const [newDocument, setNewDocument] = useState(false);
    const [docDrawerOpen, setDocDrawerOpen] = useState(false);

    async function fetchDocuments() {
        try {
            setLoadingDocuments(true);

            const data = await getDocuments();

            setDocuments(data.documents || []);

        } catch (error) {
            console.error(
                "FETCH DOCUMENTS ERROR:",
                error.response?.data || error
            );
        } finally {
            setLoadingDocuments(false);
        }
    }

  async function openConversation(documentId) {
    try {
        setConversationId(null);

        const data =
            await getConversationByDocument(
                documentId
            );

        if (data.conversation) {
            setConversationId(
                data.conversation.id
            );

            return;
        }

        const newConversation =
            await createConversation(
                documentId
            );

        setConversationId(
            newConversation.conversationId
        );

    } catch (error) {
        console.error(
            "OPEN CONVERSATION ERROR:",
            error.response?.data || error
        );

        setConversationId(null);
    }
}

    useEffect(() => {
        fetchDocuments();
    }, []);

    useEffect(() => {
        if (documents.length === 0) return;

        const documentId =
            searchParams.get("document");

        if (!documentId) return;

        const selectedDocument =
            documents.find(
                (item) =>
                    String(item.id) ===
                    String(documentId)
            );

        if (selectedDocument) {
            setDocument(selectedDocument);
            setNewDocument(false);

            openConversation(selectedDocument.id);
        }

    }, [documents, searchParams]);

    function handleUpload(result) {
        const newDoc = {
            id: result.document_id,
            ...result
        };

        setDocument(newDoc);

        setDocuments((previous) => [
            newDoc,
            ...previous.filter(
                (item) => item.id !== newDoc.id
            )
        ]);

        setNewDocument(false);

        openConversation(newDoc.id);
    }

    function handleSelectDocument(selectedDocument) {
        setDocument(selectedDocument);
        setNewDocument(false);
        setDocDrawerOpen(false);

        openConversation(selectedDocument.id);
    }

    function handleNewDocument() {
        setDocument(null);
        setConversationId(null);
        setNewDocument(true);
        setDocDrawerOpen(false);
    }

    async function handleDeleteDocument(documentToDelete) {
        const confirmed = window.confirm(
            `"${documentToDelete.original_name}" belgesini silmek istediğinize emin misiniz?`
        );

        if (!confirmed) return;

        try {
            await deleteDocument(documentToDelete.id);

            setDocuments((previous) =>
                previous.filter(
                    (item) => item.id !== documentToDelete.id
                )
            );

            if (document?.id === documentToDelete.id) {
                setDocument(null);
                setConversationId(null);
            }

        } catch (error) {
            console.error(
                "DELETE DOCUMENT ERROR:",
                error.response?.data || error
            );

            window.alert(
                "Doküman silinirken bir hata oluştu."
            );
        }
    }

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-[#f7f7f5] lg:flex-row dark:bg-[#101010]">

            <Sidebar />

            <main className="min-h-0 min-w-0 flex-1">

                <div className="flex h-full flex-col">

                    <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 sm:px-6 dark:border-zinc-800 dark:bg-[#151515]">

                        <div className="min-w-0">

                            <h1 className="truncate text-sm font-semibold text-[#171717] dark:text-white">
                                PDF ile Sohbet
                            </h1>

                            <p className="truncate text-xs text-zinc-500">
                                {document
                                    ? document.original_name
                                    : "Belgenizle konuşun"
                                }
                            </p>

                        </div>

                        <button
                            type="button"
                            onClick={() => setDocDrawerOpen(true)}
                            aria-label="Belgeleri göster"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 md:hidden dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-4 w-4"
                            >
                                <path
                                    d="M4 6H16M4 12H16M4 18H12"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>

                    </header>

                    <div className="flex min-h-0 flex-1">

                        <PdfSidebar
                            document={document}
                            documents={documents}
                            loading={loadingDocuments}
                            onSelectDocument={handleSelectDocument}
                            onNewDocument={handleNewDocument}
                            onDeleteDocument={handleDeleteDocument}
                        />

                        <PdfChat
                            document={document}
                            conversationId={conversationId}
                            onUpload={handleUpload}
                            showUpload={newDocument}
                        />

                    </div>

                </div>

            </main>

            {docDrawerOpen && (
                <div className="fixed inset-0 z-50 md:hidden">

                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setDocDrawerOpen(false)}
                    />

                    <div className="absolute inset-y-0 left-0 flex w-[280px] max-w-[80%] flex-col bg-white shadow-xl dark:bg-[#151515]">

                        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">

                            <span className="text-sm font-semibold text-[#171717] dark:text-white">
                                Belgelerim
                            </span>

                            <button
                                type="button"
                                onClick={() => setDocDrawerOpen(false)}
                                aria-label="Kapat"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-4 w-4"
                                >
                                    <path
                                        d="M6 6L18 18M18 6L6 18"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>

                        </div>

                        <PdfSidebar
                            document={document}
                            documents={documents}
                            loading={loadingDocuments}
                            onSelectDocument={handleSelectDocument}
                            onNewDocument={handleNewDocument}
                            onDeleteDocument={handleDeleteDocument}
                            className="min-h-0 flex-1 overflow-y-auto bg-white dark:bg-[#151515]"
                        />

                    </div>

                </div>
            )}

        </div>
    );
}

export default PdfWorkspace;