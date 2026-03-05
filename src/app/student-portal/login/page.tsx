"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function StudentLoginPage() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/student-auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mobileNumber, dateOfBirth }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                router.push("/student-portal");
                router.refresh();
            } else {
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-6">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-primary/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>

                <div className="text-center mb-8 relative z-10">
                    <div className="size-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-accent shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-3xl">school</span>
                    </div>
                    <h1 className="text-2xl font-bold text-primary dark:text-accent tracking-tight">Student Portal</h1>
                    <p className="text-slate-500 text-sm mt-2">Log in to view your academic profile</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-200 dark:border-red-800 flex items-start gap-3">
                        <span className="material-symbols-outlined text-xl shrink-0">error</span>
                        <p className="font-medium mt-0.5">{error}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                            Mobile Number (Username)
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">phone_iphone</span>
                            <input
                                type="tel"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="w-full pl-12 pr-5 py-4 rounded-xl border border-primary/10 bg-slate-50 dark:bg-primary/5 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                                placeholder="Enter your registered mobile"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                            Date of Birth (Password)
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">calendar_month</span>
                            <input
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                className="w-full pl-12 pr-5 py-4 rounded-xl border border-primary/10 bg-slate-50 dark:bg-primary/5 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white [&::-webkit-calendar-picker-indicator]:dark:invert"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <span className="material-symbols-outlined animate-spin text-accent">progress_activity</span>
                                Logging in...
                            </>
                        ) : (
                            <>
                                Login to Portal
                                <span className="material-symbols-outlined text-accent">login</span>
                            </>
                        )}
                    </button>

                    <div className="text-center mt-6">
                        <Link href="/" className="text-sm font-semibold text-primary/70 hover:text-primary transition-colors flex items-center justify-center gap-1">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Home
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
