"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function StudentLogin() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/student/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mobileNumber, dateOfBirth }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Redirection to dashboard
                router.push("/student/dashboard");
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Header/Navigation */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-20 py-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
                        <Link href="/" className="flex items-center gap-3 text-primary">
                            <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
                                <span className="material-symbols-outlined">school</span>
                            </div>
                            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">
                                Ishore Educational Institution
                            </h2>
                        </Link>
                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/admission" className="text-sm font-medium hover:text-primary transition-colors">
                                Admissions
                            </Link>
                            <Link href="/programme" className="text-sm font-medium hover:text-primary transition-colors">
                                Courses
                            </Link>
                            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                                Contact
                            </Link>
                        </div>
                    </header>

                    <main className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
                        {/* Background Pattern/Image Overlay */}
                        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none overflow-hidden">
                            <div
                                className="absolute inset-0 bg-repeat"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1Z7b9o09tYvx9KNkf-RVGxibQT8TiTgWc9GlNB5GGUEUIaUc68z_wh-Sv3V4Pv5raWI0aLCABJ7ejIUaKSzH60016Kh6BrNohZoumDBwClPLrjAw1LHf_MH49xxJWeQ_Xbeo4U_d0syVBxVNDb0Ttq9WAaTNamhlhyPBUoVEETZ1azNgXuXLBpuhc0x7nuVfyJukJIAEbybdN38uqF-n8AF64L7MvpSqSyn-6pWUHoS4t4vgAQngtWWzZxXk6KKmqB1mgqrIF5LUh')",
                                }}
                            ></div>
                        </div>

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="layout-content-container flex flex-col md:flex-row max-w-5xl w-full bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden relative z-10 border border-primary/5"
                        >
                            {/* Left Side: Visual/Branding */}
                            <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-12 bg-primary text-white relative overflow-hidden">
                                <div
                                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7PDgMVDGvC4pXGRqDpNNVvRIDoQDV4LX56FjWg0Ue6_I14NpFGHo8XyHCNswYECt4seJuCjhxv0BlJDiSBfQ4i_f85PW7De9Z7ChoJrOXK0yVGh0zUKFzAPZDGac9HZ2Q8n0TaNUZD8tpqNS06-il2XrOC9FUIKc7RtcBT33IbAvwgmVQnOqIvy7usw_fT_Ep0KIzFWCXTSJZoWH6s6Mx_8a8XkQRQU1HsjTYdqj_dADYIwb2zdJPKE4ytnd7fcmwmeWAREf3Oygj')",
                                    }}
                                ></div>
                                <div className="relative z-10 text-center">
                                    <h1 className="text-4xl font-extrabold mb-4">Welcome Back!</h1>
                                    <p className="text-primary/20 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-white/90">
                                        Connect with your academic journey. Access schedules, grades, and course materials in one place.
                                    </p>
                                </div>
                            </div>

                            {/* Right Side: Login Form */}
                            <div className="flex-1 flex flex-col justify-center p-8 md:p-16">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                                        Student Login
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                                        Enter the credentials from your admission form
                                    </p>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-800 flex items-start gap-2">
                                        <span className="material-symbols-outlined text-sm mt-0.5">error</span>
                                        <span>{error}</span>
                                    </div>
                                )}

                                <form className="space-y-6" onSubmit={handleLogin}>
                                    {/* Mobile Number Field */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold uppercase tracking-wider">
                                            Mobile Number (Username)
                                        </label>
                                        <div className="relative group">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                                call
                                            </span>
                                            <input
                                                className="form-input flex w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary h-14 pl-12 pr-4 outline-none transition-all"
                                                placeholder="e.g. 9876543210"
                                                type="tel"
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value)}
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>

                                    {/* DOB Field */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold uppercase tracking-wider">
                                            Date of Birth (Password)
                                        </label>
                                        <div className="relative group">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                                calendar_today
                                            </span>
                                            <input
                                                className="form-input flex w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary h-14 pl-12 pr-4 outline-none transition-all"
                                                placeholder="DD/MM/YYYY"
                                                type="text"
                                                value={dateOfBirth}
                                                onChange={(e) => setDateOfBirth(e.target.value)}
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 italic mt-1">
                                            Format: DD/MM/YYYY as per records
                                        </p>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        className={`w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        <span>{isLoading ? 'Logging in...' : 'Login to Portal'}</span>
                                        {!isLoading && (
                                            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                                                arrow_forward
                                            </span>
                                        )}
                                    </button>
                                </form>

                                {/* Links */}
                                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium">
                                    <a className="text-primary hover:underline flex items-center gap-1" href="#">
                                        <span className="material-symbols-outlined text-lg">lock_reset</span>
                                        Forgot Password?
                                    </a>
                                    <a
                                        className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1"
                                        href="#"
                                    >
                                        <span className="material-symbols-outlined text-lg">help</span>
                                        Need Help?
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </main>

                    {/* Footer */}
                    <footer className="px-6 md:px-20 py-8 border-t border-primary/10 text-center text-slate-500 dark:text-slate-400 text-xs shadow-inner bg-white dark:bg-slate-900 mt-auto">
                        <p>© 2024 Ishore Educational Institution. All rights reserved.</p>
                        <div className="mt-2 flex justify-center gap-4">
                            <Link className="hover:text-primary" href="#">Privacy Policy</Link>
                            <Link className="hover:text-primary" href="#">Terms of Service</Link>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
