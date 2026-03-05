"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar";

export default function StudentSupport() {
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
            <Sidebar currentPath="/student-portal/support" />
            <main className="flex-1 flex flex-col overflow-y-auto">
                <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-primary dark:text-accent">Student Support</h2>
                        <p className="text-slate-500 mt-1">Get help with your application, admissions, or technical issues.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Admission Enquiry */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm p-6 flex flex-col justify-between group hover:border-primary/30 transition-all">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined">help_center</span>
                                </div>
                                <h3 className="font-bold text-lg text-primary dark:text-slate-100 mb-2">Admission Enquiry</h3>
                                <p className="text-sm text-slate-500 mb-6">Questions about programs, eligibility, or documentation.</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">+91 9745 28 88 50</p>
                                <p className="text-sm text-slate-500">admissions@ishore.edu.in</p>
                            </div>
                        </div>

                        {/* Technical Support */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm p-6 flex flex-col justify-between group hover:border-accent/50 transition-all">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined">bug_report</span>
                                </div>
                                <h3 className="font-bold text-lg text-primary dark:text-slate-100 mb-2">Technical Support</h3>
                                <p className="text-sm text-slate-500 mb-6">Issues with the portal, login, or online payments.</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">+91 9745 28 88 50</p>
                                <p className="text-sm text-slate-500">it.support@ishore.edu.in</p>
                            </div>
                        </div>

                        {/* General Admin */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm p-6 flex flex-col justify-between group hover:border-primary/30 transition-all">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center mb-6 group-hover:bg-slate-800 group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined">domain</span>
                                </div>
                                <h3 className="font-bold text-lg text-primary dark:text-slate-100 mb-2">General Office</h3>
                                <p className="text-sm text-slate-500 mb-6">Campus visits, administration, or other queries.</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">0476 29 65 303</p>
                                <p className="text-sm text-slate-500">info@ishore.edu.in</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/10 p-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-primary dark:text-accent mb-2">Send us a message</h3>
                            <p className="text-slate-600 dark:text-slate-400">Can't find what you're looking for? Submit a ticket and our team will get back to you within 24 hours.</p>
                        </div>
                        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all whitespace-nowrap shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined">send</span> Create Ticket
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
