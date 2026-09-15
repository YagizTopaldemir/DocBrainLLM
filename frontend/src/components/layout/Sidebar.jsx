import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    logout
} from "../../services/api";

function SidebarBody({
    isActive,
    onNewWorkspace,
    onLogout
}) {
    const user = {
        name: "Yağız Topaldemir",
        email: "yagiz@example.com"
    };

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    return (
        <>
            {/* New Workspace */}
            <div className="px-4 pt-8">

                <button
                    type="button"
                    onClick={onNewWorkspace}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#171717] px-4 py-3 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#292929] dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                    <span className="text-lg leading-none transition-transform duration-200 group-hover:rotate-90">
                        +
                    </span>

                    Yeni çalışma
                </button>

            </div>

            {/* Navigation */}
            <nav className="mt-8 px-3">

                <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                    Workspace
                </p>

                <Link
                    to="/dashboard"
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        isActive("/dashboard")
                            ? "bg-zinc-100 text-[#171717] dark:bg-zinc-800 dark:text-white"
                            : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                    }`}
                >

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-[18px] w-[18px]"
                    >
                        <path
                            d="M4 10.5L12 4L20 10.5V20H4V10.5Z"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinejoin="round"
                        />

                        <path
                            d="M9 20V14H15V20"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinejoin="round"
                        />
                    </svg>

                    Ana sayfa

                </Link>

            </nav>

            {/* Bottom */}
            <div className="mt-auto p-3">

                {/* User Card */}
                <div className="mb-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-[#1b1b1b]">

                    <div className="flex items-center gap-3">

                        {/* Avatar */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#6757F5] text-xs font-semibold text-white">
                            {getInitials(user.name)}
                        </div>

                        {/* User Info */}
                        <div className="min-w-0 flex-1">

                            <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">
                                {user.name}
                            </p>

                            <p className="mt-0.5 truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                                {user.email}
                            </p>

                        </div>

                    </div>

                    {/* Plan */}
                    <div className="mt-3 flex items-center justify-between border-t border-zinc-200 pt-3 dark:border-zinc-800">

                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                            Plan
                        </span>

                        <span className="rounded-md bg-[#6757F5]/10 px-2 py-1 text-[10px] font-medium text-[#6757F5]">
                            Ücretsiz
                        </span>

                    </div>

                </div>

                {/* Logout */}
                <button
                    type="button"
                    onClick={onLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-500 transition hover:bg-red-50 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                >

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-[18px] w-[18px]"
                    >
                        <path
                            d="M10 17L15 12L10 7"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        <path
                            d="M15 12H4"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                        />

                        <path
                            d="M20 4V20"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                        />
                    </svg>

                    Çıkış yap

                </button>

            </div>
        </>
    );
}

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path) =>
        location.pathname === path;

    const closeMobile = () => setMobileOpen(false);

    const handleLogout = async (closeAfter) => {
        try {
            await logout();
            closeAfter?.();
            navigate("/login");
        } catch (error) {
            console.error(
                "LOGOUT ERROR:",
                error
            );
        }
    };

    const goToNewWorkspace = (closeAfter) => {
        closeAfter?.();
        navigate("/workspace/pdf");
    };

    return (
        <>
            {/* Mobile top bar */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 lg:hidden dark:border-zinc-800 dark:bg-[#151515]">

                <Link
                    to="/"
                    className="text-lg font-semibold tracking-tight text-[#171717] dark:text-white"
                >
                    DocBrain
                    <span className="text-[#6757F5]">
                        LLM
                    </span>
                </Link>

                <button
                    type="button"
                    onClick={() => setMobileOpen(true)}
                    aria-label="Menüyü aç"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                    >
                        <path
                            d="M4 7H20M4 12H20M4 17H20"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

            </div>

            {/* Mobile overlay + drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">

                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={closeMobile}
                    />

                    <aside className="relative flex h-full w-[280px] max-w-[80%] flex-col overflow-y-auto bg-white pb-6 shadow-xl dark:bg-[#151515]">

                        <div className="flex items-center justify-between px-5 pt-6">

                            <Link
                                to="/"
                                onClick={closeMobile}
                                className="text-xl font-semibold tracking-tight text-[#171717] dark:text-white"
                            >
                                DocBrain
                                <span className="text-[#6757F5]">
                                    LLM
                                </span>
                            </Link>

                            <button
                                type="button"
                                onClick={closeMobile}
                                aria-label="Menüyü kapat"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-4 w-4"
                                >
                                    <path
                                        d="M6 6L18 18M18 6L6 18"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>

                        </div>

                        <SidebarBody
                            isActive={isActive}
                            onNewWorkspace={() => goToNewWorkspace(closeMobile)}
                            onLogout={() => handleLogout(closeMobile)}
                        />

                    </aside>

                </div>
            )}

            {/* Desktop sidebar */}
            <aside className="hidden h-screen w-[260px] shrink-0 border-r border-zinc-200 bg-white lg:sticky lg:top-0 lg:flex lg:flex-col dark:border-zinc-800 dark:bg-[#151515]">

                {/* Brand */}
                <div className="px-5 pt-6">

                    <Link
                        to="/"
                        className="text-xl font-semibold tracking-tight text-[#171717] dark:text-white"
                    >
                        DocBrain
                        <span className="text-[#6757F5]">
                            LLM
                        </span>
                    </Link>

                </div>

                <SidebarBody
                    isActive={isActive}
                    onNewWorkspace={() => goToNewWorkspace()}
                    onLogout={() => handleLogout()}
                />

            </aside>
        </>
    );
}

export default Sidebar;
