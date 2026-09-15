function PdfSidebar({
    document,
    documents = [],
    loading,
    onSelectDocument,
    onNewDocument,
    onDeleteDocument,
    className = "hidden w-[280px] shrink-0 overflow-y-auto border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#151515] md:block",
}) {
    const pdfColors = [
        "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
        "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
        "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
        "bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
        "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
    ];

    return (
        <aside className={className}>
            <div className="p-5">

                <button
                    type="button"
                    onClick={onNewDocument}
                    className="flex w-full items-center gap-3 rounded-xl border border-dashed border-zinc-300 px-4 py-3 text-left transition hover:border-[#6757F5] hover:bg-[#6757F5]/5 dark:border-zinc-700"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6757F5]/10 text-lg text-[#6757F5]">
                        +
                    </div>

                    <div>
                        <p className="text-sm font-medium text-[#171717] dark:text-white">
                            Yeni PDF
                        </p>

                        <p className="mt-0.5 text-xs text-zinc-500">
                            Yeni bir belge yükle
                        </p>
                    </div>
                </button>

                <div className="mt-8">

                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                            Belgelerim
                        </p>

                        <span className="text-[11px] text-zinc-400">
                            {documents.length}
                        </span>
                    </div>

                    <div className="mt-4 space-y-1">

                        {loading ? (
                            <>
                                <DocumentSkeleton />
                                <DocumentSkeleton />
                                <DocumentSkeleton />
                            </>
                        ) : documents.length === 0 ? (
                            <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                                <p className="text-xs leading-5 text-zinc-500">
                                    Henüz PDF yüklemediniz.
                                </p>
                            </div>
                        ) : (
                            documents.map((item, index) => {

                                const isActive =
                                    document?.id === item.id;

                                const pdfColor =
                                    pdfColors[
                                        index % pdfColors.length
                                    ];

                                return (
                                    <div
                                        key={item.id}
                                        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                                            isActive
                                                ? "bg-[#6757F5]/10"
                                                : "hover:bg-zinc-100 dark:hover:bg-zinc-800/70"
                                        }`}
                                    >

                                        <button
                                            type="button"
                                            onClick={() =>
                                                onSelectDocument(item)
                                            }
                                            className="flex min-w-0 flex-1 items-center gap-3 text-left"
                                        >

                                            {/* PDF */}
                                            <div
                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold ${
                                                    isActive
                                                        ? "bg-[#6757F5]/10 text-[#6757F5]"
                                                        : pdfColor
                                                }`}
                                            >
                                                PDF
                                            </div>

                                            {/* Bilgi */}
                                            <div className="min-w-0 flex-1">

                                                <p
                                                    className={`truncate text-xs font-medium ${
                                                        isActive
                                                            ? "text-[#6757F5]"
                                                            : "text-[#171717] dark:text-zinc-200"
                                                    }`}
                                                >
                                                    {item.original_name || "PDF"}
                                                </p>

                                                <p className="mt-1 text-[10px] text-zinc-400">
                                                    PDF
                                                </p>

                                            </div>

                                        </button>

                                        {onDeleteDocument && (
                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    onDeleteDocument(item);
                                                }}
                                                title="Dokümanı sil"
                                                className="shrink-0 rounded-lg p-1.5 text-zinc-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                                            >
                                                🗑
                                            </button>
                                        )}

                                    </div>
                                );
                            })
                        )}

                    </div>
                </div>

            </div>
        </aside>
    );
}


function DocumentSkeleton() {
    return (
        <div className="flex animate-pulse items-center gap-3 rounded-xl px-3 py-3">

            <div className="h-9 w-9 rounded-lg bg-zinc-200 dark:bg-zinc-800" />

            <div className="flex-1">

                <div className="h-3 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />

                <div className="mt-2 h-2 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />

            </div>

        </div>
    );
}


export default PdfSidebar;