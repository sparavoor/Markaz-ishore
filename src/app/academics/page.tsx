"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function AcademicsPage() {
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        fetch("/api/content")
            .then((res) => res.json())
            .then((data) => setContent(data))
            .catch((err) => console.error("Load error:", err));
    }, []);

    if (!content) return <div className="min-h-screen bg-primary/5 flex items-center justify-center">Loading Academics...</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {/* Academics Hero */}
                <section className="bg-primary pt-32 pb-20 text-white relative overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 relative z-10"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Latest News & Events</h1>
                        <p className="text-xl text-slate-300 max-w-2xl">Stay connected with the latest happenings at Ishore Educational Institution. From academic milestones to campus events.</p>
                    </motion.div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent)] z-0"></div>
                </section>

                {/* News Feed */}
                <section className="py-24 bg-white dark:bg-background-dark">
                    <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...content.home.news].reverse().map((item: any, i: number) => (
                                <Link href={`/academics/${item.id}`} key={i} className="block group">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex flex-col h-full bg-background-light dark:bg-white/5 rounded-[2rem] border border-primary/5 hover:border-accent transition-all duration-500 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
                                    >
                                        <div className="w-full h-64 shrink-0 overflow-hidden relative">
                                            <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-bold text-primary uppercase tracking-widest shadow-sm">
                                                {item.date}
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-grow">
                                            <h2 className="text-2xl font-bold text-primary dark:text-white leading-tight mb-4 group-hover:text-accent transition-colors line-clamp-2">{item.title}</h2>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                                {item.content || "Ishore Educational Institution continues its legacy of excellence. This event highlights our commitment to providing a balanced education where spiritual growth meets academic rigor."}
                                            </p>
                                            <span
                                                className="inline-flex items-center gap-2 text-primary dark:text-accent font-bold group-hover:gap-4 transition-all mt-auto w-fit border-b border-transparent group-hover:border-accent"
                                            >
                                                Read Full Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </span>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer contact={content.contact} />
        </div>
    );
}
