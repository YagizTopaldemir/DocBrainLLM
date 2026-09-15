
function Footer() {
    return (
        <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#101010]">

            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

                <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">

                    {/* Brand */}
                    <div className="max-w-sm">

                        <a
                            href="#"
                            className="inline-block text-xl font-semibold tracking-tight text-[#171717] dark:text-white"
                        >
                            DocBrain
                            <span className="text-[#6757F5]">
                                LLM
                            </span>
                        </a>

                        <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-500 dark:text-zinc-500">
                            Belgelerinizdeki bilgileri daha hızlı bulmanız,
                            anlamanız ve kullanmanız için AI destekli çalışma alanı.
                        </p>

                    </div>


                    {/* Navigation */}
                    <div className="flex gap-12 text-sm">

                        <div className="flex flex-col gap-3">

                            <span className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-400">
                                Ürün
                            </span>

                            <a
                                href="#features"
                                className="text-zinc-600 transition hover:text-[#6757F5] dark:text-zinc-400"
                            >
                                Özellikler
                            </a>

                            <a
                                href="#how-it-works"
                                className="text-zinc-600 transition hover:text-[#6757F5] dark:text-zinc-400"
                            >
                                Nasıl çalışır?
                            </a>

                        </div>


                        <div className="flex flex-col gap-3">

                            <span className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-400">
                                Destek
                            </span>

                            <a
                                href="#contact"
                                className="text-zinc-600 transition hover:text-[#6757F5] dark:text-zinc-400"
                            >
                                İletişim
                            </a>

                            <a
                                href="mailto:contact@docbrainllm.com"
                                className="text-zinc-600 transition hover:text-[#6757F5] dark:text-zinc-400"
                            >
                                E-posta
                            </a>

                        </div>

                    </div>

                </div>


                {/* Bottom */}
                <div className="mt-12 flex flex-col gap-3 border-t border-zinc-200 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">

                    <p>
                        © {new Date().getFullYear()} DocBrainLLM.
                        Tüm hakları saklıdır.
                    </p>

                    <p className="text-zinc-400">
                        AI-powered document workspace
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default Footer;

