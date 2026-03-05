"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        fetch("/api/content")
            .then((res) => res.json())
            .then((data) => setContent(data))
            .catch((err) => console.error("Load error:", err));
    }, []);

    if (!content) return <div className="min-h-screen bg-primary/5 flex items-center justify-center">Loading...</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {/* About Hero */}
                <section className="bg-primary pt-32 pb-20 text-white relative overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 relative z-10"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">{content.about.hero.title}</h1>
                        <p className="text-xl text-slate-300 max-w-2xl">{content.about.hero.description}</p>
                    </motion.div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent)] z-0"></div>
                </section>

                {/* Content Section */}
                <section className="py-20 bg-white dark:bg-background-dark">
                    <div className="max-w-4xl mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="prose prose-lg dark:prose-invert"
                        >
                            <h2 className="text-3xl font-bold text-primary mb-8 underline decoration-accent decoration-4 underline-offset-8">Our Vision & Legacy</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xl">
                                {content.about.content}
                            </p>

                            <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 bg-background-light dark:bg-white/5 rounded-3xl border border-primary/5 shadow-sm">
                                    <span className="material-symbols-outlined text-4xl text-accent mb-4">history</span>
                                    <h3 className="text-xl font-bold mb-4">Historical Context</h3>
                                    <p className="text-slate-600 dark:text-slate-400">Founded in 1994, Ishore has evolved from a small local initiative into a global beacon of balanced education.</p>
                                </div>
                                <div className="p-8 bg-background-light dark:bg-white/5 rounded-3xl border border-primary/5 shadow-sm">
                                    <span className="material-symbols-outlined text-4xl text-accent mb-4">psychology</span>
                                    <h3 className="text-xl font-bold mb-4">Ethical Core</h3>
                                    <p className="text-slate-600 dark:text-slate-400">Our pedagogy is centered on the integration of modern empirical knowledge with deep-rooted ethical foundations.</p>
                                </div>
                            </div>

                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xl">
                                Today, we continue to bridge the gap between tradition and modernity, ensuring our students are prepared for the digital age while remaining anchored in their values.
                            </p>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer contact={content.contact} />
        </div>
    );
}
