
function HowItWorks() {
    const steps = [
        {
            number: "01",
            title: "PDF'nizi yükleyin",
            description:
                "Çalışmak istediğiniz PDF dosyasını yükleyin. DocBrainLLM belgeyi analiz için hazırlar."
        },
        {
            number: "02",
            title: "Sorunuzu sorun",
            description:
                "Belgenizin içeriği hakkında doğal dil kullanarak istediğiniz soruyu sorun."
        },
        {
            number: "03",
            title: "Cevabı bulun",
            description:
                "Sistem, sorunuzla ilgili bölümleri bulur ve AI bu bilgiler üzerinden cevap oluşturur."
        }
    ];

    return (
        <section
            id="how-it-works"
            className="relative overflow-hidden bg-white py-28 dark:bg-[#101010]"
        >

            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">

                    <span className="text-sm font-medium tracking-wide text-[#6757F5]">
                        NASIL ÇALIŞIR?
                    </span>

                    <h2 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-[#171717] sm:text-5xl lg:text-6xl dark:text-white">
                        Sorudan cevaba,
                        <span className="text-zinc-400 dark:text-zinc-600">
                            {" "}tek bir akış.
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6B6B68] dark:text-zinc-400">
                        Belgenizi yükleyin, sorunuzu sorun ve ihtiyacınız olan
                        bilgiyi doğrudan belgenizden alın.
                    </p>

                </div>


                {/* Steps */}
                <div data-aos="fade-right" className="relative mt-20 grid gap-6 md:grid-cols-3">

                    {/* Connection line */}
                    <div   className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-10 hidden h-px bg-zinc-200 md:block dark:bg-zinc-800" />


                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className="relative"
                        >

                            {/* Number */}
                            <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-200 bg-white text-lg font-semibold text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-[#101010] dark:text-zinc-300">

                                <span
                                    className={
                                        index === steps.length - 1
                                            ? "text-[#6757F5]"
                                            : ""
                                    }
                                >
                                    {step.number}
                                </span>

                            </div>


                            {/* Content */}
                            <div className="mt-8">

                                <h3 className="text-2xl font-semibold tracking-tight text-[#171717] dark:text-white">
                                    {step.title}
                                </h3>

                                <p className="mt-4 max-w-sm leading-7 text-[#6B6B68] dark:text-zinc-400">
                                    {step.description}
                                </p>

                            </div>

                        </div>
                    ))}

                </div>


                {/* Technical flow */}
                <div className="mt-20 overflow-hidden rounded-[28px] border border-zinc-200 bg-[#f7f7f5] dark:border-zinc-800 dark:bg-[#181818]">

                    <div className="flex flex-col items-center justify-center gap-4 px-6 py-8 text-center sm:flex-row sm:gap-5">

                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            PDF
                        </span>

                        <span className="text-zinc-400">
                            →
                        </span>

                        <span className="text-sm text-zinc-500">
                            Metin
                        </span>

                        <span className="text-zinc-400">
                            →
                        </span>

                        <span className="text-sm text-zinc-500">
                            Embedding
                        </span>

                        <span className="text-zinc-400">
                            →
                        </span>

                        <span className="text-sm text-zinc-500">
                            Vector Search
                        </span>

                        <span className="text-zinc-400">
                            →
                        </span>

                        <span className="font-medium text-[#6757F5]">
                            AI Cevabı
                        </span>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default HowItWorks;

