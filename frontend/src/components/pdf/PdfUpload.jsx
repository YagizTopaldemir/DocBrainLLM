import { useState } from "react";
import { uploadDocument } from "../../services/api";

function PdfUpload({ onUpload }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleChange(event) {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (file.type !== "application/pdf") {
            setError("Lütfen bir PDF dosyası seçin.");
            return;
        }

        setError("");
        setLoading(true);

        try {

            const result = await uploadDocument(file);

            console.log("PDF UPLOAD RESULT:", result);

            if (onUpload) {
                onUpload(result);
            }

        } catch (error) {

            console.error(
                "PDF UPLOAD ERROR:",
                error.response?.data || error
            );

            setError(
                error.response?.data?.message ||
                "PDF yüklenirken bir hata oluştu."
            );

        } finally {

            setLoading(false);

        }
    }


    return (
        <div className="flex flex-col items-center">

            <label
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition ${
                    loading
                        ? "cursor-not-allowed bg-zinc-400 text-white"
                        : "cursor-pointer bg-[#171717] text-white hover:bg-[#292929] dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                }`}
            >

                <span>
                    {loading ? "PDF işleniyor..." : "PDF yükle"}
                </span>

                <input
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={handleChange}
                    disabled={loading}
                />

            </label>


            {error && (
                <p className="mt-3 text-sm text-red-500">
                    {error}
                </p>
            )}

        </div>
    );
}

export default PdfUpload;