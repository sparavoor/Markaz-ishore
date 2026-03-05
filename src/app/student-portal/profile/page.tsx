"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "../Sidebar";

export default function StudentProfile() {
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
                console.error("Error fetching profile:", error);
                router.push("/student-portal/login");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
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
    if (!student) return null;

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <Sidebar currentPath="/student-portal/profile" />
            <main className="flex-1 flex flex-col overflow-y-auto">
                <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-primary dark:text-accent">My Profile</h2>
                        <p className="text-slate-500 mt-1">View and manage your personal and academic details.</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm overflow-hidden">
                        <div className="px-8 py-6 border-b border-primary/5 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                            <div className="w-24 h-32 md:w-32 md:h-40 rounded-xl border-4 border-accent shadow-lg bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 relative">
                                {student.photoPath ? (
                                    <img src={student.photoPath} alt={`${student.studentName}'s Photo`} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="material-symbols-outlined text-6xl text-slate-300">person</span>
                                )}
                            </div>
                            <div className="mt-2 md:mt-4">
                                <h3 className="text-2xl md:text-3xl font-bold text-primary">{student.studentName}</h3>
                                <p className="text-slate-500 font-medium text-lg mt-1">{student.department}</p>
                                <span className="inline-block mt-3 px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full border border-primary/20">
                                    {student.status || 'Pending Review'}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 grid md:grid-cols-2 gap-y-8 gap-x-12">
                            <div>
                                <p className="text-xs uppercase text-slate-400 font-bold tracking-wider mb-1">Registration ID</p>
                                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 uppercase">{student.id.substring(0, 12)}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-slate-400 font-bold tracking-wider mb-1">Admission Number</p>
                                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">{student.admissionNumber || "Pending Allocation"}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-slate-400 font-bold tracking-wider mb-1">Date of Birth</p>
                                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-slate-400 font-bold tracking-wider mb-1">Aadhar Number</p>
                                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono tracking-widest">{student.aadharNumber || "Not Provided"}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-slate-400 font-bold tracking-wider mb-1">Father's Name</p>
                                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">{student.fatherName}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm overflow-hidden">
                        <div className="px-8 py-6 border-b border-primary/5">
                            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                                <span className="material-symbols-outlined">contact_phone</span> Contact Information
                            </h3>
                        </div>
                        <div className="p-8 grid md:grid-cols-2 gap-y-8 gap-x-12">
                            <div>
                                <p className="text-xs uppercase text-slate-400 font-bold tracking-wider mb-1">Mobile Number</p>
                                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">{student.mobileNumber}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-slate-400 font-bold tracking-wider mb-1">WhatsApp Number</p>
                                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    {student.whatsappNumber}
                                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                </p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-xs uppercase text-slate-400 font-bold tracking-wider mb-1">Permanent Address</p>
                                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                                    {student.place}, {student.district}<br />
                                    {student.state} - {student.pin}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
