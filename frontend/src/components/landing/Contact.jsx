
function Contact() {
    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-[#f7f7f5] py-28 dark:bg-[#101010]"
        >

            {/* Background glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7667ff]/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                <div className="relative overflow-hidden rounded-[32px] border border-zinc-200 bg-white px-6 py-16 text-center shadow-[0_25px_80px_-35px_rgba(0,0,0,0.2)] sm:px-12 dark:border-zinc-800 dark:bg-[#181818]">

                    {/* Decorative glow */}
                    <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-72 -translate-x-1/2 rounded-full bg-[#7667ff]/10 blur-3xl" />


                    <div className="relative mx-auto max-w-2xl">

                        <span className="text-sm font-medium tracking-wide text-[#6757F5]">
                            İLETİŞİM
                        </span>

                        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-[#171717] sm:text-5xl dark:text-white">
                            Bir fikriniz mi var?
                        </h2>

                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#6B6B68] dark:text-zinc-400">
                            DocBrainLLM hakkında görüşlerinizi, önerilerinizi
                            veya sorularınızı paylaşabilirsiniz.
                        </p>


                        <a
                            href="mailto:contact@docbrainllm.com"
                            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#171717] px-7 py-3.5 text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#292929] dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                        >
                            contact@docbrainllm.com

                            <span className="transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>

                        </a>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Contact;

