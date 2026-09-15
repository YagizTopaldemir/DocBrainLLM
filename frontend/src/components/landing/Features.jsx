
function Features() {
    const features = [
        {
            number: "01",
            title: "PDF ile Sohbet",
            description:
                "PDF belgelerinizi yükleyin ve içerikleriyle doğal bir sohbet gerçekleştirin.",
            featured: true
        },
        {
            number: "02",
            title: "Akıllı Arama",
            description:
                "Sorunuzla ilişkili bilgileri belge içerisinden anlamsal olarak bulur ve doğru bağlamı AI'a iletir."
        },
        {
            number: "03",
            title: "Anlamlı Cevaplar",
            description:
                "RAG ve LLM teknolojileriyle belgelerinizdeki bilgileri anlayarak doğal ve anlaşılır cevaplar üretir."
        }
    ];

    return (
        <section
            id="features"
            className="relative overflow-hidden bg-[#f7f7f5] py-28 dark:bg-[#101010]"
        >

            {/* Background glow */}
            <div className="pointer-events-none absolute right-[-150px] top-1/3 h-[400px] w-[400px] rounded-full bg-[#7667ff]/8 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* Section heading */}
                <div className="max-w-3xl">

                    <span className="text-sm font-medium tracking-wide text-[#6757F5]">
                        ÖZELLİKLER
                    </span>

                    <h2 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-[#171717] sm:text-5xl lg:text-6xl dark:text-white">
                        Belgelerinizle
                        <span className="text-zinc-400 dark:text-zinc-600">
                            {" "}çalışmanın daha iyi yolu.
                        </span>
                    </h2>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6B6B68] dark:text-zinc-400">
                        DocBrainLLM, belgelerinizdeki bilgileri bulmayı,
                        anlamayı ve kullanmayı tek bir çalışma alanında birleştirir.
                    </p>

                </div>


                {/* Feature cards */}
                <div  data-aos="fade-up" className="mt-16 grid gap-5 md:grid-cols-3">

                    {features.map((feature) => (
                        <div
                            key={feature.number}
                            className={`group relative overflow-hidden rounded-[28px] border p-8 transition duration-300 hover:-translate-y-1 ${
                                feature.featured
                                    ? "border-[#7667ff]/20 bg-gradient-to-br from-[#eeebff] via-white to-white dark:border-[#7667ff]/20 dark:from-[#211e38] dark:via-[#181818] dark:to-[#181818]"
                                    : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#181818]"
                            }`}
                        >

                            {/* Number */}
                            <div className="flex items-center justify-between">

                                <span
                                    className={`text-sm font-medium ${
                                        feature.featured
                                            ? "text-[#6757F5]"
                                            : "text-zinc-400 dark:text-zinc-600"
                                    }`}
                                >
                                    {feature.number}
                                </span>

                                <span
                                    className={`flex h-9 w-9 items-center justify-center rounded-full text-lg transition duration-300 group-hover:translate-x-1 ${
                                        feature.featured
                                            ? "bg-[#6757F5] text-white"
                                            : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                                    }`}
                                >
                                    →
                                </span>

                            </div>


                            {/* Content */}
                            <div className="mt-20">

                                <h3 className="text-2xl font-semibold tracking-tight text-[#171717] dark:text-white">
                                    {feature.title}
                                </h3>

                                <p className="mt-4 leading-7 text-[#6B6B68] dark:text-zinc-400">
                                    {feature.description}
                                </p>

                            </div>


                            {/* Decorative element */}
                            <div
                                className={`absolute -bottom-20 -right-20 h-40 w-40 rounded-full blur-3xl ${
                                    feature.featured
                                        ? "bg-[#7667ff]/15"
                                        : "bg-zinc-300/30 dark:bg-white/5"
                                }`}
                            />

                        </div>
                    ))}

                </div>


                {/* Bottom statement */}
           {/* Technical flow */}
<div className="mt-20 overflow-hidden rounded-[28px] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#181818]">

    <div className="flex flex-col items-center justify-center gap-4 px-6 py-8 text-center sm:flex-row sm:gap-5">

        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            PDF
        </span>

        <span className="text-zinc-400">
            →
        </span>

        <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Embedding
        </span>

        <span className="text-zinc-400">
            →
        </span>

        <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Vector Search
        </span>

        <span className="text-zinc-400">
            →
        </span>

        <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Relevant Context
        </span>

        <span className="text-zinc-400">
            →
        </span>

        <span className="font-medium text-[#6757F5]">
            LLM
        </span>

    </div>

</div>

            </div>

        </section>
    );
}

export default Features;

