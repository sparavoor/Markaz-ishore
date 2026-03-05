"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar";

export default function StudentAdmissionStatus() {
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

    const status = student.status || "Pending";
    const appliedDate = student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A';

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <Sidebar currentPath="/student-portal/admission-status" />
            <main className="flex-1 flex flex-col overflow-y-auto">
                <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-primary dark:text-accent">Admission Status</h2>
                        <p className="text-slate-500 mt-1">Track the progress of your application.</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm p-8 text-center relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-full h-2 ${status === 'Approved' ? 'bg-emerald-500' :
                            status === 'Rejected' ? 'bg-red-500' :
                                'bg-amber-500'
                            }`}></div>

                        <div className="flex justify-center mb-6">
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${status === 'Approved' ? 'bg-emerald-50 border-emerald-200 text-emerald-500 dark:bg-emerald-900/20 dark:border-emerald-800' :
                                status === 'Rejected' ? 'bg-red-50 border-red-200 text-red-500 dark:bg-red-900/20 dark:border-red-800' :
                                    'bg-amber-50 border-amber-200 text-amber-500 dark:bg-amber-900/20 dark:border-amber-800'
                                }`}>
                                <span className="material-symbols-outlined text-5xl">
                                    {status === 'Approved' ? 'verified' : status === 'Rejected' ? 'cancel' : 'hourglass_empty'}
                                </span>
                            </div>
                        </div>

                        <h3 className="text-2xl font-black mb-2 text-slate-900 dark:text-slate-100">
                            {status === 'Approved' ? 'Application Approved' :
                                status === 'Rejected' ? 'Application Rejected' :
                                    'Application Under Review'}
                        </h3>
                        <p className="text-slate-500 max-w-lg mx-auto mb-8">
                            {status === 'Approved' ? 'Congratulations! Your application has been approved. You can now download your admission letter from the Downloads section.' :
                                status === 'Rejected' ? 'We regret to inform you that your application could not be approved at this time. Please contact support for more details.' :
                                    'Your application was received and is currently being reviewed by the administration. Check back later for updates.'}
                        </p>

                        <div className="grid md:grid-cols-3 gap-4 text-left border-t border-primary/10 pt-8">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date Applied</p>
                                <p className="font-semibold text-slate-800 dark:text-slate-200">{appliedDate}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Department</p>
                                <p className="font-semibold text-slate-800 dark:text-slate-200">{student.department}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Reference ID</p>
                                <p className="font-semibold text-slate-800 dark:text-slate-200 uppercase font-mono">{student.id.substring(0, 8)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
