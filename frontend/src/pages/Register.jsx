import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Şifreler eşleşmiyor.");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                "http://localhost:3000/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            window.location.href = "/login";

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Kayıt sırasında bir hata oluştu."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f7f5] px-6 py-12 dark:bg-[#101010]">

            <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#7667ff]/10 blur-[140px]" />

            <div className="relative w-full max-w-md">

                <div className="mb-10 text-center">
                    <Link
                        to="/"
                        className="text-2xl font-semibold tracking-tight text-[#171717] dark:text-white"
                    >
                        DocBrain
                        <span className="text-[#6757F5]">
                            LLM
                        </span>
                    </Link>
                </div>

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#171717] dark:text-white">
                        Hesabınızı oluşturun.
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                        DocBrainLLM ile belgeleriniz üzerinde çalışmaya başlayın.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-[28px] border border-zinc-200 bg-white p-7 shadow-[0_25px_70px_-35px_rgba(0,0,0,0.25)] dark:border-zinc-800 dark:bg-[#181818]"
                >
                    <div className="space-y-5">

                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                            >
                                Ad Soyad
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                placeholder="Adınız Soyadınız"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-xl border border-zinc-200 bg-[#fafafa] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#6757F5] focus:bg-white focus:ring-4 focus:ring-[#6757F5]/10 dark:border-zinc-700 dark:bg-[#111111] dark:text-white dark:focus:bg-[#111111]"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                            >
                                E-posta
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="ornek@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-zinc-200 bg-[#fafafa] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#6757F5] focus:bg-white focus:ring-4 focus:ring-[#6757F5]/10 dark:border-zinc-700 dark:bg-[#111111] dark:text-white dark:focus:bg-[#111111]"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                            >
                                Şifre
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Şifrenizi oluşturun"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-zinc-200 bg-[#fafafa] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#6757F5] focus:bg-white focus:ring-4 focus:ring-[#6757F5]/10 dark:border-zinc-700 dark:bg-[#111111] dark:text-white dark:focus:bg-[#111111]"
                            />
                        </div>

                        {/* Confirm password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                            >
                                Şifre Tekrar
                            </label>

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Şifrenizi tekrar girin"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded-xl border border-zinc-200 bg-[#fafafa] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#6757F5] focus:bg-white focus:ring-4 focus:ring-[#6757F5]/10 dark:border-zinc-700 dark:bg-[#111111] dark:text-white dark:focus:bg-[#111111]"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-sm text-red-500">
                                {error}
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#171717] py-3.5 text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#292929] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                        >
                            {loading ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}

                            {!loading && (
                                <span className="transition-transform duration-200 group-hover:translate-x-1">
                                    →
                                </span>
                            )}
                        </button>

                    </div>
                </form>

                <p className="mt-7 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    Zaten hesabınız var?{" "}

                    <Link
                        to="/login"
                        className="font-medium text-[#6757F5] transition hover:text-[#5545E8]"
                    >
                        Giriş yapın
                    </Link>
                </p>

                <div className="mt-6 text-center">
                    <Link
                        to="/"
                        className="text-sm text-zinc-400 transition hover:text-zinc-700 dark:hover:text-zinc-200"
                    >
                        ← Ana sayfaya dön
                    </Link>
                </div>

            </div>
        </main>
    );
}

export default Register;