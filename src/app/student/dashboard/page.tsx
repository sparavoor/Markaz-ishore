"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function StudentDashboard() {
    const [studentName, setStudentName] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Read cookie for student name (simple client-side check)
        // For a real app, this should be a protected route and validated server-side
        const cookies = document.cookie.split(';');
        const nameCookie = cookies.find(c => c.trim().startsWith('student_name='));
        const idCookie = cookies.find(c => c.trim().startsWith('student_id='));

        if (!idCookie) {
            // Not logged in
            router.push("/student-login");
            return;
        }

        if (nameCookie) {
            setStudentName(decodeURIComponent(nameCookie.split('=')[1]));
        } else {
            setStudentName("Student");
        }
    }, [router]);

    const handleLogout = () => {
        // Clear cookies
        document.cookie = "student_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "student_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/student-login");
    };

    if (!studentName) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-display">
            {/* Top Navigation */}
            <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-sm">school</span>
                            </div>
                            <span className="font-bold text-xl text-slate-900 dark:text-white hidden sm:block">Ishore Student Portal</span>
                            <span className="font-bold text-xl text-slate-900 dark:text-white sm:hidden">Portal</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 mr-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined">person</span>
                                Welcome, {studentName}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">logout</span>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Dashboard Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Overview of your academic progress and recent activities.
                    </p>
                </motion.div>

                {/* Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: "My Courses", icon: "menu_book", color: "bg-blue-500", detail: "4 Active" },
                        { title: "Exams & Results", icon: "assignment", color: "bg-green-500", detail: "Latest: 85%" },
                        { title: "Attendance", icon: "event_available", color: "bg-purple-500", detail: "92% Overall" },
                        { title: "Announcements", icon: "campaign", color: "bg-amber-500", detail: "2 New" },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex items-start gap-4 cursor-pointer hover:shadow-md transition-all"
                        >
                            <div className={`size-12 rounded-lg flex items-center justify-center text-white ${item.color}`}>
                                <span className="material-symbols-outlined">{item.icon}</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">{item.detail}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Content Modules */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Recent Updates */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
                        >
                            <div className="border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex justify-between items-center">
                                <h2 className="font-bold text-lg text-slate-900 dark:text-white">Recent Announcements</h2>
                                <button className="text-primary text-sm font-medium hover:underline">View All</button>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-700">
                                {[
                                    { title: "End of Semester Exam Schedule Posted", date: "Today", desc: "The final exam schedule for all departments is now available via the exam portal." },
                                    { title: "Library Renovation Update", date: "Yesterday", desc: "The main campus library will be partially closed next week for scheduled renovations." },
                                    { title: "Scholarship Applications Open", date: "Mar 2", desc: "Applications for the merit-based scholarship program for the upcoming academic year are now open." },
                                ].map((news, idx) => (
                                    <div key={idx} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-slate-800 dark:text-slate-200">{news.title}</h3>
                                            <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{news.date}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{news.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 text-center"
                        >
                            <div className="size-24 rounded-full bg-primary/10 mx-auto mb-4 border-4 border-white dark:border-slate-800 shadow-lg flex items-center justify-center text-primary overflow-hidden">
                                <span className="material-symbols-outlined text-4xl">person</span>
                            </div>
                            <h2 className="font-bold text-xl text-slate-900 dark:text-white">{studentName}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Student ID: ISH-{Math.floor(1000 + Math.random() * 9000)}</p>

                            <div className="flex justify-center gap-2">
                                <button className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg text-sm font-semibold transition-colors w-full">
                                    Profile Settings
                                </button>
                            </div>
                        </motion.div>

                        {/* Upcoming Schedule */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                        >
                            <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">calendar_month</span>
                                Today's Schedule
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { time: "09:00 AM", class: "Advanced Mathematics", room: "Room 102" },
                                    { time: "11:30 AM", class: "Physics Lab", room: "Lab 3" },
                                    { time: "02:00 PM", class: "Literature", room: "Room 205" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-start border-l-2 border-primary pl-4 py-1">
                                        <div className="w-20 shrink-0">
                                            <span className="text-xs font-bold text-slate-500 block">{item.time}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">{item.class}</h4>
                                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                                <span className="material-symbols-outlined text-[14px]">location_on</span>
                                                {item.room}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
