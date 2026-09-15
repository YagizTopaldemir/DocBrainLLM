import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { href: "#features", label: "Özellikler" },
        { href: "#how-it-works", label: "Nasıl Çalışır?" },
        { href: "#contact", label: "İletişim" }
    ];

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <nav className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 rounded-[28px] border border-zinc-200/80 bg-white/75 shadow-sm backdrop-blur-xl sm:rounded-full dark:border-zinc-800 dark:bg-zinc-900/75">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                <Link
                    to="/"
                    onClick={closeMenu}
                    className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white"
                >
                    DocBrain<span className="text-indigo-600">LLM</span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="hidden text-sm font-medium text-zinc-700 hover:text-zinc-950 sm:block dark:text-zinc-300 dark:hover:text-white"
                    >
                        Giriş Yap
                    </Link>

                    <Link
                        to="/register"
                        className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                    >
                        Kayıt Ol
                    </Link>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label="Menüyü aç"
                        aria-expanded={menuOpen}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 md:hidden dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-5 w-5"
                        >
                            {menuOpen ? (
                                <path
                                    d="M6 6L18 18M18 6L6 18"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            ) : (
                                <path
                                    d="M4 7H20M4 12H20M4 17H20"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            )}
                        </svg>
                    </button>
                </div>

            </div>

            {menuOpen && (
                <div className="flex flex-col gap-1 border-t border-zinc-200/80 px-4 py-3 md:hidden dark:border-zinc-800">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={closeMenu}
                            className="rounded-xl px-3 py-2.5 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                        >
                            {link.label}
                        </a>
                    ))}

                    <Link
                        to="/login"
                        onClick={closeMenu}
                        className="rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 sm:hidden dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                        Giriş Yap
                    </Link>
                </div>
            )}

        </nav>
    );
}

export default Navbar;
