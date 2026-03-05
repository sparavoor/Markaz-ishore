"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function MarkazPage() {
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        fetch("/api/content")
            .then((res) => res.json())
            .then((data) => setContent(data))
            .catch((err) => console.error("Error loading content:", err));
    }, []);

    if (!content) return (
        <div className="min-h-screen bg-primary/5 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-accent rounded-full animate-spin"></div>
        </div>
    );

    const markaz = content.markaz;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <section className="py-20 bg-primary/5">
                    <div className="max-w-5xl mx-auto px-4 md:px-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-background-dark p-8 md:p-16 rounded-[3.5rem] border border-primary/5 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

                            <h1 className="text-4xl md:text-5xl font-black text-primary mb-12 tracking-tight relative z-10 leading-tight">
                                {markaz.title}
                            </h1>

                            <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 space-y-10 relative z-10">
                                <div className="p-8 bg-primary/5 border-l-8 border-accent rounded-2xl">
                                    <p className="text-xl font-medium text-slate-900 dark:text-white leading-relaxed m-0 italic">
                                        {markaz.history}
                                    </p>
                                </div>

                                <p className="text-lg leading-relaxed">
                                    {markaz.content}
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 my-16">
                                    {markaz.programs.map((item: any, idx: number) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -10 }}
                                            className="bg-background-light dark:bg-white/5 p-8 rounded-3xl border border-primary/5 shadow-sm text-center group hover:border-accent transition-all duration-300"
                                        >
                                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-accent transition-colors">
                                                <span className="material-symbols-outlined text-4xl text-accent group-hover:text-accent transition-transform">{item.icon}</span>
                                            </div>
                                            <h3 className="font-bold text-primary group-hover:scale-110 transition-transform">{item.title}</h3>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="bg-primary p-10 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-xl">
                                    <div className="size-20 bg-accent rounded-full flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary text-4xl font-bold">handshake</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">Our Spiritual Foundation</h3>
                                        <p className="text-slate-200 leading-relaxed">
                                            We believe that spiritual development is an integral part of a well-rounded education. Our programs are designed to inspire and challenge students to grow in their faith and understanding.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer contact={content?.contact} />
        </div>
    );
}
