"use client";

import { useEffect, useState, use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FullArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [content, setContent] = useState<any>(null);
    const [newsItem, setNewsItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/content")
            .then((res) => res.json())
            .then((data) => {
                setContent(data);
                const item = data.home.news.find((n: any) => n.id === resolvedParams.id);
                setNewsItem(item);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Load error:", err);
                setLoading(false);
            });
    }, [resolvedParams.id]);

    if (loading) return <div className="min-h-screen bg-primary/5 flex items-center justify-center">Loading Article...</div>;

    if (!newsItem) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow flex flex-col items-center justify-center gap-6 text-center px-4">
                    <span className="material-symbols-outlined text-6xl text-red-500">error</span>
                    <h1 className="text-3xl font-bold text-primary">Article Not Found</h1>
                    <p className="text-slate-500 max-w-md">The news article you are looking for does not exist or has been removed.</p>
                    <Link href="/academics" className="px-6 py-3 bg-primary text-white rounded-lg font-bold shadow-md hover:bg-accent transition-colors">
                        Back to Academics
                    </Link>
                </main>
                <Footer contact={content?.contact} />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-white dark:bg-background-dark">
                {/* Hero / Header */}
                <section className="bg-primary/5 pt-32 pb-16 relative">
                    <div className="max-w-4xl mx-auto px-4 md:px-10 z-10 relative">
                        <Link href="/academics" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:text-accent transition-colors">
                            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to News Feed
                        </Link>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent font-bold rounded-full tracking-widest uppercase mb-4 text-xs">
                                {newsItem.date}
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary dark:text-white leading-tight mb-8">
                                {newsItem.title}
                            </h1>
                        </motion.div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-12 relative -mt-10">
                    <div className="max-w-4xl mx-auto px-4 md:px-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border-4 border-white dark:border-slate-800 bg-white mb-12"
                        >
                            <img src={newsItem.img} alt={newsItem.title} className="w-full max-h-[60vh] object-cover" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed"
                        >
                            {/* In a real app with markdown, you'd use a markdown renderer here. For now, simple text. */}
                            {newsItem.content?.split('\n').map((paragraph: string, i: number) => (
                                <p key={i} className="mb-6">{paragraph}</p>
                            )) || <p>No extended content available for this news item.</p>}
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer contact={content?.contact} />
        </div>
    );
}
