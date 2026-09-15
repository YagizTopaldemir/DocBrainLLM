import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="relative isolate min-h-screen overflow-hidden bg-[#f7f7f5] pt-24 dark:bg-[#101010]">

            {/* Background glow */}
            <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#7667ff]/10 blur-[120px]" />

            <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center px-6 py-20 lg:px-8">

                <div className="w-full">

                    <div className="mx-auto max-w-5xl text-center">

                       


                        <h1 className="text-balance text-5xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-6xl lg:text-8xl dark:text-white">

                            Belgelerinizle

                            <span className="block bg-gradient-to-r from-[#6757F5] via-[#806DFF] to-[#9A8EFF] bg-clip-text text-transparent">
                                daha akıllı çalışın.
                            </span>

                        </h1>


                        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#6B6B68] sm:text-xl dark:text-zinc-400">

                            PDF belgelerinizi yükleyin.
                            İçeriğini anlayın, sorular sorun
                            ve ihtiyacınız olan bilgiyi saniyeler içinde bulun.

                        </p>


                        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">

                            <Link
                                to="/register"
                                className="group flex items-center gap-2 rounded-full bg-[#171717] px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:bg-[#292929] dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                            >
                                Ücretsiz Başla

                             

                            </Link>


                            <a
                                href="#how-it-works"
                                className="rounded-full border border-zinc-300 bg-white/60 px-7 py-3.5 text-sm font-medium text-zinc-700 backdrop-blur transition hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:bg-zinc-900"
                            >
                                Nasıl çalışır?
                            </a>

                        </div>

                    </div>


                    {/* Product preview */}

 <div  data-aos="fade-up" className="mx-auto mt-20 max-w-6xl">
    <div className="rounded-[30px] border border-zinc-200 bg-white/80 p-2 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.25)] backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">

        <div className="overflow-hidden rounded-[24px] border border-zinc-200 bg-[#f7f7f5] dark:border-zinc-800 dark:bg-[#101010]">

            {/* Browser / App Header */}
            <div className="flex h-12 items-center justify-between border-b border-zinc-200 bg-white px-5 dark:border-zinc-800 dark:bg-[#151515]">

                <div className="flex items-center gap-4">

                    <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    </div>

                    <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        DocBrainLLM
                    </span>

                </div>

                <div className="flex items-center gap-2">

                    <div className="hidden h-7 w-28 rounded-md border border-zinc-200 bg-zinc-50 sm:block dark:border-zinc-800 dark:bg-zinc-900" />

                    <div className="h-7 w-7 rounded-full bg-zinc-200 dark:bg-zinc-800" />

                </div>

            </div>


            {/* App */}
            <div className="grid min-h-[520px] grid-cols-12">


                {/* Sidebar */}
                <aside className="col-span-3 hidden border-r border-zinc-200 bg-white md:block dark:border-zinc-800 dark:bg-[#151515]">

                    <div className="flex h-full flex-col p-4">

                        {/* Logo */}
                        <div className="mb-7 flex items-center gap-2.5 px-2">

                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-[10px] font-bold text-white dark:bg-white dark:text-zinc-900">
                                D
                            </div>

                            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                                DocBrainLLM
                            </span>

                        </div>


                        {/* Main Navigation */}
                        <div className="space-y-1">

                            {/* PDF ile Sohbet */}
                            <div className="flex items-center gap-3 rounded-lg bg-[#EEEBFF] px-3 py-2.5 text-xs font-medium text-zinc-900 dark:bg-[#211e38] dark:text-zinc-100">

                                <svg
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="h-4 w-4"
                                >
                                    <path
                                        d="M5 3.5H11L15 7.5V16C15 16.8 14.3 17.5 13.5 17.5H5C4.2 17.5 3.5 16.8 3.5 16V5C3.5 4.2 4.2 3.5 5 3.5Z"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                    />

                                    <path
                                        d="M11 3.5V7.5H15"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                    />

                                    <path
                                        d="M6.5 11H12.5M6.5 13.5H10.5"
                                        stroke="currentColor"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                PDF ile Sohbet

                            </div>


                            {/* Görsel Analizi */}
                            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-zinc-500">

                                <svg
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="h-4 w-4"
                                >
                                    <rect
                                        x="3.5"
                                        y="4"
                                        width="13"
                                        height="12"
                                        rx="1.5"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                    />

                                    <circle
                                        cx="7.5"
                                        cy="8"
                                        r="1.2"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                    />

                                    <path
                                        d="M4.5 14L8.5 10.5L11 13L13 11L15.5 14"
                                        stroke="currentColor"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                Görsel Analizi

                            </div>


                            {/* Genel AI */}
                            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-zinc-500">

                                <svg
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="h-4 w-4"
                                >
                                    <path
                                        d="M10 3.5V16.5M3.5 10H16.5"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                Genel AI

                            </div>

                        </div>


                        {/* Documents */}
                        <div className="mt-8">

                            <div className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                                Belgeler
                            </div>


                            <div className="space-y-1">

                                <div className="flex items-center gap-2.5 rounded-lg bg-zinc-100 px-2.5 py-2.5 dark:bg-zinc-900">

                                    <div className="flex h-7 w-6 items-center justify-center rounded bg-white text-[7px] font-semibold text-zinc-400 shadow-sm dark:bg-zinc-800">
                                        PDF
                                    </div>

                                    <div className="min-w-0">

                                        <div className="truncate text-[10px] font-medium text-zinc-700 dark:text-zinc-300">
                                            Yapay Zeka.pdf
                                        </div>

                                        <div className="text-[9px] text-zinc-400">
                                            12 sayfa
                                        </div>

                                    </div>

                                </div>


                                <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5">

                                    <div className="flex h-7 w-6 items-center justify-center rounded bg-zinc-100 text-[7px] font-semibold text-zinc-400 dark:bg-zinc-900">
                                        PDF
                                    </div>

                                    <div className="min-w-0">

                                        <div className="truncate text-[10px] text-zinc-500">
                                            RAG Mimarisi.pdf
                                        </div>

                                        <div className="text-[9px] text-zinc-400">
                                            8 sayfa
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Bottom */}
                        <div className="mt-auto border-t border-zinc-200 pt-4 dark:border-zinc-800">

                            <div className="flex items-center gap-2 px-2">

                                <div className="h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-800" />

                                <div>
                                    <div className="text-[9px] font-medium text-zinc-600 dark:text-zinc-300">
                                        Kullanıcı
                                    </div>

                                    <div className="text-[8px] text-zinc-400">
                                        Ücretsiz plan
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </aside>


                {/* PDF Content */}
                <main className="col-span-12 border-r border-zinc-200 bg-[#f4f4f2] md:col-span-5 dark:border-zinc-800 dark:bg-[#181818]">

                    {/* Header */}
                    <div className="flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-[#151515]">

                        <div>

                            <h2 className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                                Yapay Zeka Temelleri
                            </h2>

                            <p className="mt-0.5 text-[9px] text-zinc-400">
                                Sayfa 4 / 12
                            </p>

                        </div>


                        <div className="flex items-center gap-1.5">

                            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">

                                <svg
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="h-3.5 w-3.5 text-zinc-400"
                                >
                                    <path
                                        d="M5 10H15M10 5V15"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                    />
                                </svg>

                            </div>

                            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">

                                <svg
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="h-3.5 w-3.5 text-zinc-400"
                                >
                                    <path
                                        d="M6 3.5H14C14.8 3.5 15.5 4.2 15.5 5V15C15.5 15.8 14.8 16.5 14 16.5H6C5.2 16.5 4.5 15.8 4.5 15V5C4.5 4.2 5.2 3.5 6 3.5Z"
                                        stroke="currentColor"
                                        strokeWidth="1.3"
                                    />

                                    <path
                                        d="M7.5 7H12.5M7.5 10H12.5M7.5 13H10.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                    />
                                </svg>

                            </div>

                        </div>

                    </div>


                    {/* PDF Page */}
                    <div className="flex justify-center overflow-hidden p-6">

                        <div className="w-full max-w-[300px] rounded-sm bg-white px-7 py-8 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.35)]">

                            <div className="mb-6">

                                <div className="h-4 w-40 rounded bg-zinc-800" />

                                <div className="mt-2 h-2 w-52 rounded bg-zinc-200" />

                            </div>


                            <div className="space-y-2">

                                <div className="h-2 w-full rounded bg-zinc-200" />
                                <div className="h-2 w-[94%] rounded bg-zinc-200" />
                                <div className="h-2 w-[87%] rounded bg-zinc-200" />
                                <div className="h-2 w-[91%] rounded bg-zinc-200" />

                            </div>


                            <div className="my-7 rounded-lg border border-zinc-200 p-4">

                                <div className="mb-4 h-2.5 w-28 rounded bg-zinc-700" />

                                <div className="space-y-2">

                                    <div className="h-2 w-full rounded bg-zinc-100" />
                                    <div className="h-2 w-[91%] rounded bg-zinc-100" />
                                    <div className="h-2 w-[82%] rounded bg-zinc-100" />

                                </div>

                            </div>


                            <div className="mb-4 h-3 w-36 rounded bg-zinc-700" />

                            <div className="space-y-2">

                                <div className="h-2 w-full rounded bg-zinc-200" />
                                <div className="h-2 w-[96%] rounded bg-zinc-200" />
                                <div className="h-2 w-[89%] rounded bg-zinc-200" />
                                <div className="h-2 w-[78%] rounded bg-zinc-200" />
                                <div className="h-2 w-[91%] rounded bg-zinc-200" />

                            </div>


                            <div className="mt-7 space-y-2">

                                <div className="h-2 w-[95%] rounded bg-zinc-200" />
                                <div className="h-2 w-[87%] rounded bg-zinc-200" />
                                <div className="h-2 w-[73%] rounded bg-zinc-200" />

                            </div>

                        </div>

                    </div>

                </main>


                {/* Chat */}
                <section className="col-span-12 bg-white md:col-span-4 dark:bg-[#151515]">

                    <div className="flex h-full flex-col">


                        {/* Chat Header */}
                        <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">

                            <div>

                                <h2 className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                                    PDF ile Sohbet
                                </h2>

                                <p className="mt-0.5 text-[9px] text-zinc-400">
                                    Belgeniz hakkında soru sorun
                                </p>

                            </div>

                            <div className="flex items-center gap-1.5">

                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                                <span className="text-[8px] text-zinc-400">
                                    Hazır
                                </span>

                            </div>

                        </div>


                        {/* Messages */}
                        <div className="flex-1 space-y-5 overflow-hidden p-5">


                            {/* User Message */}
                            <div className="flex justify-end">

                                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[#EEEBFF] px-4 py-3 dark:bg-[#211e38]">

                                    <p className="text-[10px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                                        Yapay zekanın temel bileşenleri nelerdir?
                                    </p>

                                </div>

                            </div>


                            {/* AI Response */}
                            <div className="flex gap-3">

                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-white text-[8px] font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
                                    DB
                                </div>


                                <div className="max-w-[90%]">

                                    <p className="text-[10px] leading-[1.7] text-zinc-600 dark:text-zinc-400">

                                        Yapay zeka sistemleri genel olarak veri,
                                        model, eğitim ve çıkarım süreçlerinden
                                        oluşur. Bu bileşenler birlikte çalışarak
                                        girdilerden anlamlı sonuçlar üretir.

                                    </p>


                                    {/* Source */}
                                    <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">

                                        <div className="mb-2.5 flex items-center justify-between">

                                            <span className="text-[9px] font-semibold text-zinc-600 dark:text-zinc-300">
                                                Kaynak
                                            </span>

                                            <span className="text-[8px] text-zinc-400">
                                                Sayfa 4
                                            </span>

                                        </div>


                                        <div className="flex items-center gap-2.5">

                                            <div className="flex h-6 w-5 items-center justify-center rounded bg-white text-[6px] font-semibold text-zinc-400 shadow-sm dark:bg-zinc-800">
                                                PDF
                                            </div>

                                            <span className="truncate text-[9px] text-zinc-500">
                                                Yapay Zeka Temelleri
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* User Message */}
                            <div className="flex justify-end">

                                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-[#EEEBFF] px-4 py-3 dark:bg-[#211e38]">

                                    <p className="text-[10px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                                        Eğitim süreci nasıl çalışır?
                                    </p>

                                </div>

                            </div>


                            {/* AI Response */}
                            <div className="flex gap-3">

                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-white text-[8px] font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
                                    DB
                                </div>

                                <div className="flex items-center gap-1 rounded-xl bg-zinc-100 px-3 py-2.5 dark:bg-zinc-900">

                                    <span className="h-1 w-1 rounded-full bg-zinc-400" />
                                    <span className="h-1 w-1 rounded-full bg-zinc-400" />
                                    <span className="h-1 w-1 rounded-full bg-zinc-400" />

                                </div>

                            </div>

                        </div>


                        {/* Input */}
                        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">

                            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

                                <span className="flex-1 text-[10px] text-zinc-400">
                                    Belgeniz hakkında soru sorun...
                                </span>


                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">

                                    <svg
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        className="h-3.5 w-3.5"
                                    >
                                        <path
                                            d="M4 10L16 4L12 16L9.5 11.5L4 10Z"
                                            stroke="currentColor"
                                            strokeWidth="1.4"
                                            strokeLinejoin="round"
                                        />
                                    </svg>

                                </div>

                            </div>


                            <div className="mt-2 text-center text-[8px] text-zinc-400">
                                Yanıtlar yüklediğiniz belgeden oluşturulur
                            </div>

                        </div>

                    </div>

                </section>

            </div>

        </div>
    </div>
</div>

                </div>

            </div>

        </section>
    );
}

export default Hero;