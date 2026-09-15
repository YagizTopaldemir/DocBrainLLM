function PdfMessage({ role, content }) {
const isUser = role === "user";

return (
    <div
        className={`flex w-full ${
            isUser ? "justify-end" : "justify-start"
        }`}
    >
        <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                isUser
                    ? "bg-[#6757F5] text-white"
                    : "border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-[#181818] dark:text-zinc-100"
            }`}
        >
            <div className="whitespace-pre-wrap">
                {content}
            </div>
        </div>
    </div>
);


}

export default PdfMessage;
