"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function ProgrammePage() {
    const [content, setContent] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch("/api/content")
            .then((res) => res.json())
            .then((data) => {
                setContent(data);
                setIsLoaded(true);
            })
            .catch((err) => console.error("Load error:", err));
    }, []);

    if (!isLoaded || !content) {
        return (
            <div className="min-h-screen bg-primary/5 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-accent rounded-full animate-spin"></div>
            </div>
        );
    }

    const programmes = content?.home?.programmes?.items || [];

    return (
        <div className="flex flex-col min-h-screen font-['Lexend']">
            <Navbar />
            <main className="flex-grow">
                <section className="py-20 bg-primary/5">
                    <div className="max-w-6xl mx-auto px-4 md:px-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 tracking-tight">Academic Programmes</h1>
                            <p className="text-xl text-slate-700 dark:text-slate-300 mb-12 max-w-3xl">
                                We offer a range of educational programs designed to meet the needs of modern learners while staying true to our core values.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            {programmes.map((item: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="bg-white dark:bg-background-dark p-10 rounded-3xl border border-primary/5 shadow-lg group hover:border-accent transition-all"
                                >
                                    <span className="material-symbols-outlined text-5xl text-accent mb-6 block group-hover:scale-110 transition-transform">{item.icon}</span>
                                    <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                        {item.desc}
                                    </p>
                                    <button className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
                                        Course Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-20 p-12 bg-primary rounded-[3rem] text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-4">Quality Education for All</h2>
                                <p className="text-primary-foreground/90 max-w-2xl text-lg">
                                    Join our vibrant learning community and take the first step towards a successful career built on a foundation of ethical values.
                                </p>
                                <div className="flex gap-4 mt-8">
                                    <button className="px-8 py-3 bg-white text-primary font-bold rounded-xl hover:bg-slate-100 transition-colors">Apply Now</button>
                                    <button className="px-8 py-3 bg-primary-foreground/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">Download Syllabus</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer contact={content.contact} />
        </div>
    );
}
