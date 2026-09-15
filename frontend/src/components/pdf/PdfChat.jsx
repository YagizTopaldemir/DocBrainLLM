import PdfUpload from "./PdfUpload";
import PdfInput from "./PdfInput";

function PdfChat({
    document,
    conversationId,
    onUpload
}) {

    return (
        <section className="flex min-w-0 flex-1 flex-col bg-[#f7f7f5] dark:bg-[#101010]">

            {/* Chat area */}
            <div className="min-h-0 flex-1 overflow-hidden">

                {!document ? (

                    /* PDF yükleme ekranı */
                    <div className="flex h-full items-center justify-center overflow-y-auto px-6">

                        <div className="w-full max-w-2xl text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-[#181818]">
                                PDF
                            </div>

                            <h2 className="mt-6 text-xl font-semibold tracking-tight text-[#171717] dark:text-white">
                                PDF'inizle çalışmaya başlayın
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                                Bir PDF yükleyin. Ardından belgenin içeriği
                                hakkında sorular sorabilirsiniz.
                            </p>

                            <div className="mt-7">

                                <PdfUpload
                                    onUpload={onUpload}
                                />

                            </div>

                        </div>

                    </div>

                ) : (

                    /* Chat */
                    <div className="h-full overflow-y-auto px-6">

                        <div className="mx-auto w-full max-w-3xl py-8">

<PdfInput
    documentId={document.id}
    conversationId={conversationId}
/>

                        </div>

                    </div>

                )}

            </div>

        </section>
    );
}

export default PdfChat;