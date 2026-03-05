"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryPage() {
    const [content, setContent] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/content")
            .then((res) => res.json())
            .then((data) => setContent(data))
            .catch((err) => console.error("Load error:", err));
    }, []);

    if (!content) return <div className="min-h-screen bg-primary/5 flex items-center justify-center">Loading Gallery...</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {/* Gallery Hero */}
                <section className="bg-primary pt-32 pb-20 text-white relative overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 relative z-10"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 italic">Glimpses of Ishore</h1>
                        <p className="text-xl text-slate-300 max-w-2xl">A journey through our campus life, events, and milestones. Captured moments that define our legacy.</p>
                    </motion.div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.1),transparent)] z-0"></div>
                </section>

                {/* Gallery Grid */}
                <section className="py-20 bg-white dark:bg-background-dark">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                            {[...content.home.gallery].reverse().map((img: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setSelectedImage(img.url)}
                                    className="relative overflow-hidden rounded-[2rem] shadow-xl border-4 border-white dark:border-white/10 group cursor-pointer"
                                >
                                    <img src={img.url} alt={`Gallery ${i}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                        <span className="material-symbols-outlined text-white text-5xl">zoom_in</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                        >
                            <motion.button
                                className="absolute top-8 right-8 text-white text-3xl hover:bg-white/10 rounded-full p-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(null);
                                }}
                            >
                                <span className="material-symbols-outlined text-3xl">close</span>
                            </motion.button>
                            <motion.img
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                src={selectedImage}
                                alt="Gallery Lightbox"
                                className="max-w-full max-h-full rounded-2xl shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
            <Footer contact={content.contact} />
        </div>
    );
}
