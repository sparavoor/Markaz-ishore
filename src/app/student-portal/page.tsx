"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Sidebar from "./Sidebar";

export default function StudentPortal() {
    const [student, setStudent] = useState<any>(null);
    const [portalData, setPortalData] = useState<any>(null);
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
                console.error("Error fetching profile:", error);
                router.push("/student-portal/login");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchContent = async () => {
            try {
                const res = await fetch("/api/content");
                if (res.ok) {
                    const data = await res.json();
                    setPortalData(data.studentPortal);
                }
            } catch (error) {
                console.error("Error fetching portal content:", error);
            }
        };

        fetchProfile();
        fetchContent();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined text-4xl text-primary animate-spin">refresh</span>
                    <p className="text-slate-500 font-medium">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (!student) return null; // Will redirect

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <Sidebar currentPath="/student-portal" />
            <main className="flex-1 flex flex-col overflow-y-auto">
                {/* Dashboard Content */}
                <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
                    {/* Welcome Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-primary dark:text-accent">Welcome back, {student.studentName.split(' ')[0]}!</h2>
                        <p className="text-slate-500 mt-1">Here is what is happening with your academic profile today.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Status & Profile */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Admission Status Card */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-primary/10 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                                <div className="relative flex items-center justify-between">
                                    <div className="space-y-4">
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${(student.status || 'Pending') === 'Approved' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                                            (student.status || 'Pending') === 'Pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                                                'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${(student.status || 'Pending') === 'Approved' ? 'bg-emerald-500' :
                                                (student.status || 'Pending') === 'Pending' ? 'bg-amber-500' :
                                                    'bg-red-500'
                                                }`}></span>
                                            Status: {student.status || 'Pending'}
                                        </div>
                                        <h3 className="text-xl font-bold text-primary dark:text-slate-100">
                                            {
                                                (student.status || 'Pending') === 'Approved' ? 'Admission Process Complete' :
                                                    (student.status || 'Pending') === 'Pending' ? 'Admission Process Ongoing' :
                                                        'Application Rejected'
                                            }
                                        </h3>
                                        <p className="text-slate-500 text-sm max-w-md">
                                            {
                                                (student.status || 'Pending') === 'Approved' ? "Your documents for the Academic Year 2024-25 have been successfully verified. You are now officially enrolled." :
                                                    (student.status || 'Pending') === 'Pending' ? "Your documents for the Academic Year 2024-25 have been received and are currently under review by the administration. You will be notified once officially verified." :
                                                        "We regret to inform you that your admission application could not be approved at this time. Please contact the administration for more information."
                                            }
                                        </p>
                                        <button
                                            onClick={() => router.push("/student-portal/admission-status")}
                                            className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all"
                                        >
                                            View Admission Details
                                        </button>
                                    </div>
                                    <div className="hidden md:block">
                                        <span className="material-symbols-outlined text-7xl text-primary/10">
                                            {
                                                (student.status || 'Pending') === 'Approved' ? 'verified' :
                                                    (student.status || 'Pending') === 'Pending' ? 'hourglass_empty' :
                                                        'cancel'
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Profile Summary */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-primary/5 flex justify-between items-center">
                                    <h3 className="font-bold text-primary">Academic Profile Summary</h3>
                                    <button className="text-accent text-sm font-bold hover:underline">Edit Info</button>
                                </div>
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-slate-400">school</span>
                                            <div>
                                                <p className="text-[10px] uppercase text-slate-400 font-bold">Department</p>
                                                <p className="text-sm font-semibold">{student.department || "N/A"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-slate-400">cake</span>
                                            <div>
                                                <p className="text-[10px] uppercase text-slate-400 font-bold">Date of Birth</p>
                                                <p className="text-sm font-semibold">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-slate-400">badge</span>
                                            <div>
                                                <p className="text-[10px] uppercase text-slate-400 font-bold">Registration ID</p>
                                                <p className="text-sm font-semibold uppercase">{student.id.substring(0, 8)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-slate-400">phone</span>
                                            <div>
                                                <p className="text-[10px] uppercase text-slate-400 font-bold">Mobile / WhatsApp</p>
                                                <p className="text-sm font-semibold">{student.mobileNumber}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Distribution Handouts Checklist */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-primary/5 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-indigo-500">checklist</span>
                                    <h3 className="font-bold text-primary">Required Distribution Items</h3>
                                </div>
                                <div className="divide-y divide-primary/5">
                                    {portalData?.handouts && portalData.handouts.length > 0 ? (
                                        portalData.handouts.map((item: any, idx: number) => (
                                            <div key={idx} className="p-4 sm:p-6 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <div className="mt-1">
                                                    <div className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center">
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                                        {item.title}
                                                        {item.isRequired && <span className="text-[10px] uppercase font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">Required</span>}
                                                    </h4>
                                                    <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-slate-500 text-sm">
                                            No collection items registered for you currently.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Right Column: Announcements & Fees */}
                        <div className="space-y-8">
                            {/* Fee Status */}
                            <div className="bg-primary text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full -mb-12 -mr-12"></div>
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined">account_balance_wallet</span>
                                    Fee Summary
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-xs text-primary-200 opacity-70">Application Fee</p>
                                            <p className="text-2xl font-bold text-accent">₹500.00</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] uppercase font-bold text-primary-200">Status</p>
                                            <p className="text-sm font-semibold">Pending</p>
                                        </div>
                                    </div>
                                    <button className="w-full bg-accent text-primary py-2.5 rounded-lg font-bold text-sm hover:brightness-110 transition-all">
                                        Pay Now
                                    </button>
                                </div>
                            </div>

                            {/* Important Announcements */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm overflow-hidden flex flex-col h-[400px]">
                                <div className="px-6 py-4 border-b border-primary/5 flex items-center gap-2 shrink-0">
                                    <span className="material-symbols-outlined text-accent">campaign</span>
                                    <h3 className="font-bold text-primary">Announcements</h3>
                                </div>
                                <div className="p-0 overflow-y-auto flex-1">
                                    {portalData?.announcements && portalData.announcements.length > 0 ? (
                                        portalData.announcements.map((ann: any, idx: number) => (
                                            <div key={idx} className="p-4 border-b border-primary/5 hover:bg-primary/5 transition-colors cursor-pointer">
                                                <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">{new Date(ann.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{ann.title}</p>
                                                <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">{ann.desc}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center flex flex-col items-center justify-center h-full text-slate-400">
                                            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">notifications_off</span>
                                            <p className="text-sm">No new announcements today</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Support Card */}
                            <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border-2 border-dashed border-primary/20 text-center space-y-3">
                                <span className="material-symbols-outlined text-3xl text-primary/40">help_center</span>
                                <h4 className="font-bold text-primary text-sm">Need Assistance?</h4>
                                <p className="text-xs text-slate-500">Our student helpdesk is available Mon-Fri, 9AM to 5PM.</p>
                                <a className="inline-block text-accent text-sm font-bold border-b-2 border-accent/30 hover:border-accent" href="#">Contact Support</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
