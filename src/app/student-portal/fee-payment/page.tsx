"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar";

export default function StudentFeePayment() {
    const [student, setStudent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/student-profile");
                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        setStudent(data.student);
                    } else {
                        router.push("/student-portal/login");
                    }
                } else {
                    router.push("/student-portal/login");
                }
            } catch (error) {
                router.push("/student-portal/login");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, [router]);

    if (isLoading) return null;
    if (!student) return null;

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <Sidebar currentPath="/student-portal/fee-payment" />
            <main className="flex-1 flex flex-col overflow-y-auto">
                <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-primary dark:text-accent">Fee Payments & Dues</h2>
                        <p className="text-slate-500 mt-1">Manage your academic financial obligations.</p>
                    </div>

                    <div className="bg-primary text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full -ml-16 -mb-16"></div>

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-primary-200">
                                    <span className="material-symbols-outlined">account_balance_wallet</span>
                                    Total Outstanding Dues
                                </h3>
                                <p className="text-5xl font-black text-accent tracking-tight">₹500.00</p>
                                <p className="text-sm mt-3 text-primary-100">Application Processing Fee (One-time)</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shrink-0 w-full md:w-auto">
                                <p className="text-xs uppercase font-bold text-primary-200 tracking-wider mb-1">Due Date</p>
                                <p className="text-xl font-bold mb-6">Within 7 days</p>
                                <button className="w-full bg-accent text-primary px-8 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg hover:-translate-y-0.5 min-w-[200px]">
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-primary dark:text-slate-100 mb-4">Payment History</h3>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm overflow-hidden text-center py-12">
                            <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-700 mb-4">receipt_long</span>
                            <h4 className="text-lg font-bold text-slate-600 dark:text-slate-300">No payment history found</h4>
                            <p className="text-slate-500 mt-1">Your past successful transactions will appear here.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
