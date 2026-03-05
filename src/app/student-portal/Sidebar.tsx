"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar({ currentPath }: { currentPath: string }) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/student-auth", { method: "DELETE" });
            router.push("/student-portal/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const navItems = [
        { label: "Dashboard", icon: "dashboard", href: "/student-portal" },
        { label: "My Profile", icon: "person", href: "/student-portal/profile" },
        { label: "Admission Status", icon: "verified_user", href: "/student-portal/admission-status" },
        { label: "Downloads", icon: "download", href: "/student-portal/downloads" },
        { label: "Fee Payment", icon: "payments", href: "/student-portal/fee-payment" },
        { label: "Support", icon: "support_agent", href: "/student-portal/support" },
    ];

    return (
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-primary/10 flex flex-col h-full shrink-0">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-accent">
                    <span className="material-symbols-outlined">school</span>
                </div>
                <div>
                    <h1 className="text-primary dark:text-accent text-lg font-bold leading-none">Ishore</h1>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Education</p>
                </div>
            </div>
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${currentPath === item.href
                                ? "bg-primary text-white"
                                : "text-slate-600 dark:text-slate-400 hover:bg-primary/5"
                            }`}
                        href={item.href}
                    >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-primary/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                >
                    <span className="material-symbols-outlined">logout</span>
                    <span className="text-sm font-bold">Logout</span>
                </button>
            </div>
        </aside>
    );
}
