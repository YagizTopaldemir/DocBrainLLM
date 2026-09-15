import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { getDocuments } from "../services/api";

function Dashboard() {
    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);
    const [loadingDocuments, setLoadingDocuments] = useState(true);
const documentColors = [
    "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
    "bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
    "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
];

function getDocumentColor(id) {
    return documentColors[
        Number(id || 0) % documentColors.length
    ];
}
   useEffect(() => {
    async function fetchDocuments() {
        try {
            const data = await getDocuments();

            console.log("DOCUMENTS RESPONSE:", data);

            setDocuments(
                Array.isArray(data)
                    ? data.slice(0, 4)
                    : data.documents?.slice(0, 4) || []
            );

        } catch (error) {
            console.error(
                "DOCUMENTS ERROR:",
                error.response?.data || error
            );
        } finally {
            setLoadingDocuments(false);
        }
    }

    fetchDocuments();
}, []);

    return (
        <div className="flex min-h-screen flex-col bg-[#f7f7f5] lg:flex-row dark:bg-[#101010]">

            <Sidebar />

            <main className="min-w-0 flex-1">

                <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10">

                    {/* Header */}
                    <header>
                        <p className="text-sm font-medium text-[#6757F5]">
                            AI Workspace
                        </p>

                        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#171717] dark:text-white sm:text-4xl">
                            Belgelerinizle çalışın.
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                            PDF belgelerinizi yükleyin ve içerikleri hakkında
                            yapay zekaya sorular sorun.
                        </p>
                    </header>


                    {/* PDF Workspace */}
                    <section className="mt-10">

                        <button
                            type="button"
                            onClick={() => navigate("/workspace/pdf")}
                            className="group relative w-full overflow-hidden rounded-[28px] border border-[#6757F5]/20 bg-gradient-to-br from-[#eeebff] via-white to-white p-8 text-left transition duration-300 hover:-translate-y-1 hover:border-[#6757F5]/40 hover:shadow-[0_25px_70px_-30px_rgba(103,87,245,0.35)] dark:border-[#6757F5]/20 dark:from-[#211e38] dark:via-[#181818] dark:to-[#181818]"
                        >

                            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#6757F5]/10 blur-3xl" />

                            <div className="relative">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6757F5]/10 text-[#6757F5]">
                                    📄
                                </div>

                                <div className="mt-10">

                                    <h2 className="text-2xl font-semibold tracking-tight text-[#171717] dark:text-white">
                                        PDF ile Sohbet
                                    </h2>

                                    <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                                        PDF belgenizi yükleyin, içeriğini
                                        anlayın ve belge hakkında doğal
                                        dilde sorular sorun.
                                    </p>

                                </div>

                                <div className="mt-8 text-sm font-medium text-[#6757F5]">
                                    Çalışma alanını aç
                                </div>

                            </div>

                        </button>

                    </section>


                    {/* Recent Documents */}
                    <section className="mt-14">

                        <div>
                            <h2 className="text-lg font-semibold tracking-tight text-[#171717] dark:text-white">
                                Son dokümanlar
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                Son yüklediğiniz PDF belgeleri.
                            </p>
                        </div>


                        <div className="mt-5 overflow-hidden rounded-[24px] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#181818]">

                            {loadingDocuments ? (

                                <div className="px-6 py-12 text-center text-sm text-zinc-500">
                                    Dokümanlar yükleniyor...
                                </div>

                            ) : documents.length === 0 ? (

                                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 dark:bg-zinc-800">
                                        ▤
                                    </div>

                                    <h3 className="mt-5 text-sm font-medium text-[#171717] dark:text-white">
                                        Henüz doküman bulunmuyor
                                    </h3>

                                    <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                                        İlk PDF'inizi yüklediğinizde burada
                                        görüntülenecek.
                                    </p>

                                </div>

                            ) : (

                                <div className="divide-y divide-zinc-200 dark:divide-zinc-800">

                                    {documents.map((document) => (

                                      <button
    key={document.id}
    type="button"
    onClick={() =>
        navigate(`/workspace/pdf?document=${document.id}`)
    }
                                            className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                        >

                                           <div
    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${getDocumentColor(document.id)}`}
>
    📄
</div>

                                            <div className="min-w-0 flex-1">

                                                <p className="truncate text-sm font-medium text-[#171717] dark:text-white">
                                                    {document.original_name}
                                                </p>

                                                <p className="mt-1 text-xs text-zinc-400">
                                                    PDF
                                                </p>

                                            </div>

                                          

                                        </button>

                                    ))}

                                </div>

                            )}

                        </div>

                    </section>


                    {/* Status */}
                    <section className="mt-6">

                        <div className="rounded-[20px] border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-[#181818]">

                            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                                AI Service
                            </p>

                            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-emerald-600">

                                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                                Hazır

                            </p>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default Dashboard;