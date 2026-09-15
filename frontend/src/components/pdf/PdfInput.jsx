import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    askPdfQuestion,
    getConversationMessages
} from "../../services/api";

function PdfInput({
    documentId,
    conversationId
}) {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copiedIndex, setCopiedIndex] = useState(null);

    const messagesEndRef = useRef(null);

    async function handleCopy(text, index) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            console.error("COPY ERROR:", error);
            return;
        }

        setCopiedIndex(index);

        setTimeout(() => {
            setCopiedIndex((current) =>
                current === index ? null : current
            );
        }, 1500);
    }

    const exampleQuestions = [
        "Bu PDF'nin kısa bir özetini çıkar.",
        "Bu PDF ne anlatıyor?",
        "PDF'deki en önemli noktaları listele.",
        "PDF'deki ana fikirleri açıkla."
    ];

    useEffect(() => {
        if (!conversationId) {
            setMessages([]);
            return;
        }

        async function loadMessages() {
            try {
                setError("");

                const data =
                    await getConversationMessages(
                        conversationId
                    );

                console.log(
                    "HISTORY:",
                    data.messages
                );

                setMessages(data.messages || []);

            } catch (error) {
                console.error(
                    "LOAD MESSAGES ERROR:",
                    error
                );

                setError(
                    "Konuşma geçmişi yüklenemedi."
                );
            }
        }

        loadMessages();

    }, [conversationId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    function handleExampleQuestion(question) {
        if (loading || !conversationId) {
            return;
        }

        setQuestion(question);
        setError("");

        // Input'a geldikten sonra kullanıcı isterse
        // değiştirebilir veya direkt gönderebilir.
        setTimeout(() => {
            const textarea =
                document.querySelector(
                    'textarea[data-pdf-input="true"]'
                );

            textarea?.focus();
        }, 0);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const trimmedQuestion =
            question.trim();

        if (
            !trimmedQuestion ||
            loading ||
            !conversationId
        ) {
            return;
        }

        setQuestion("");
        setError("");

        setMessages((previous) => [
            ...previous,
            {
                role: "user",
                content: trimmedQuestion
            }
        ]);

        setLoading(true);

        try {
            const result =
                await askPdfQuestion(
                    documentId,
                    conversationId,
                    trimmedQuestion
                );

            console.log(
                "PDF QUESTION RESULT:",
                result
            );

            if (result?.answer) {
                setMessages((previous) => [
                    ...previous,
                    {
                        role: "assistant",
                        content: result.answer,
                        sources:
                            result.sources || []
                    }
                ]);
            } else {
                setError(
                    "AI cevap döndürmedi."
                );
            }

        } catch (error) {
            console.error(
                "PDF QUESTION ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Sorunuz gönderilirken hata oluştu."
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-10rem)] flex-col">

            {messages.length === 0 && (
                <div className="flex flex-1 items-center justify-center px-4">

                    <div className="w-full max-w-2xl text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-[#181818]">
                            PDF
                        </div>

                        <h2 className="mt-6 text-xl font-semibold tracking-tight text-[#171717] dark:text-white">
                            PDF'iniz hazır
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            PDF hakkında merak ettiğiniz bir şeyi sorun.
                        </p>

                        {/* Örnek Sorular */}
                        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

                            {exampleQuestions.map(
                                (exampleQuestion) => (
                                    <button
                                        key={exampleQuestion}
                                        type="button"
                                        onClick={() =>
                                            handleExampleQuestion(
                                                exampleQuestion
                                            )
                                        }
                                        disabled={
                                            loading ||
                                            !conversationId
                                        }
                                        className="group rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-left text-sm text-zinc-700 transition hover:-translate-y-0.5 hover:border-[#6757F5]/40 hover:bg-[#6757F5]/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-[#181818] dark:text-zinc-300 dark:hover:border-[#6757F5]/40 dark:hover:bg-[#6757F5]/10"
                                    >
                                        <div className="mb-2 text-xs font-medium text-[#6757F5]">
                                            Örnek soru
                                        </div>

                                        <div className="leading-5">
                                            {exampleQuestion}
                                        </div>
                                    </button>
                                )
                            )}

                        </div>

                    </div>

                </div>
            )}

            {messages.length > 0 && (
                <div className="space-y-6">

                    {messages.map(
                        (message, index) => {

                            const isUser =
                                message.role === "user";

                            return (
                                <div
                                    key={
                                        message.id ||
                                        `${message.role}-${index}`
                                    }
                                    className={
                                        isUser
                                            ? "group flex flex-col items-end"
                                            : "group flex flex-col items-start"
                                    }
                                >

                                    <div
                                        className={
                                            isUser
                                                ? "max-w-[80%] rounded-2xl bg-[#6757F5] px-5 py-3 text-sm leading-6 text-white"
                                                : "max-w-[90%] rounded-2xl border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-[#181818]"
                                        }
                                    >

                                        {!isUser && (
                                            <div className="mb-3 text-xs font-medium text-[#6757F5]">
                                                DocBrain
                                            </div>
                                        )}

                                        <p
                                            className={
                                                isUser
                                                    ? "whitespace-pre-line text-white"
                                                    : "whitespace-pre-line text-zinc-900 dark:text-zinc-100"
                                            }
                                        >
                                            {message.content}
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleCopy(
                                                message.content,
                                                index
                                            )
                                        }
                                        title="Kopyala"
                                        className="mt-1.5 flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                                    >
                                        {copiedIndex === index ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-4 w-4"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-4 w-4"
                                            >
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                            </svg>
                                        )}
                                    </button>

                                </div>
                            );
                        }
                    )}

                    <div ref={messagesEndRef} />

                    {loading && (
                        <div className="flex justify-start">

                            <div className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-[#181818]">

                                <div className="flex gap-1">

                                    <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-400" />

                                    <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-400 [animation-delay:150ms]" />

                                    <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-400 [animation-delay:300ms]" />

                                </div>

                            </div>

                        </div>
                    )}

                </div>
            )}

            {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                    {error}
                </div>
            )}

            <div className="mt-auto pt-8">

                <form
                    onSubmit={handleSubmit}
                    className="flex items-end gap-3 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-700 dark:bg-[#202020]"
                >

                    <textarea
                        data-pdf-input="true"
                        value={question}
                        onChange={(event) =>
                            setQuestion(
                                event.target.value
                            )
                        }
                        rows={1}
                        disabled={
                            loading ||
                            !conversationId
                        }
                        placeholder={
                            conversationId
                                ? "PDF hakkında bir soru sorun..."
                                : "Konuşma hazırlanıyor..."
                        }
                        className="min-h-[44px] flex-1 resize-none bg-transparent px-3 py-3 text-sm text-[#171717] outline-none placeholder:text-zinc-400 dark:text-white"
                    />

                    <button
                        type="submit"
                        disabled={
                            loading ||
                            !question.trim() ||
                            !conversationId
                        }
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#171717] text-white transition hover:bg-[#292929] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black"
                    >
                        {loading ? "..." : "→"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default PdfInput;