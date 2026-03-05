"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrincipalMessagePage() {
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

    const principal = content.principal;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <section className="py-20 bg-primary/5">
                    <div className="max-w-6xl mx-auto px-4 md:px-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid lg:grid-cols-3 gap-12 items-start"
                        >
                            {/* Principal Photo & Name */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-accent/20 rounded-[3rem] blur-3xl group-hover:bg-accent/30 transition-all"></div>
                                    <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl">
                                        <img
                                            src={principal.image || "https://www.w3schools.com/howto/img_avatar.png"}
                                            alt={principal.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                                <div className="text-center lg:text-left space-y-2">
                                    <h2 className="text-3xl font-black text-primary tracking-tight">{principal.name}</h2>
                                    <p className="text-accent font-bold uppercase tracking-widest text-sm">{principal.designation}</p>
                                    <div className="w-12 h-1 bg-accent mx-auto lg:mx-0 rounded-full mt-4"></div>
                                </div>
                            </div>

                            {/* Message Content */}
                            <div className="lg:col-span-2 space-y-8">
                                <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">Principal&apos;s Message</h1>
                                <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 space-y-6">
                                    <p className="text-2xl font-semibold text-slate-900 dark:text-white leading-tight italic border-l-4 border-accent pl-6 py-2">
                                        &quot;{principal.message.split('.')[0]}.&quot;
                                    </p>
                                    <p>
                                        {principal.message}
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-8 my-12">
                                        <div className="bg-white dark:bg-background-dark p-8 rounded-3xl border border-primary/5 shadow-sm hover:border-accent transition-colors">
                                            <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-accent">flag</span>
                                                Our Mission
                                            </h3>
                                            <p className="text-sm leading-relaxed text-slate-500">{principal.mission}</p>
                                        </div>
                                        <div className="bg-white dark:bg-background-dark p-8 rounded-3xl border border-primary/5 shadow-sm hover:border-accent transition-colors">
                                            <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-accent">auto_awesome</span>
                                                Future Leaders
                                            </h3>
                                            <p className="text-sm leading-relaxed text-slate-500">{principal.vision}</p>
                                        </div>
                                    </div>
                                    <p className="font-medium text-primary flex items-center gap-2">
                                        <span className="material-symbols-outlined">explore</span>
                                        Together, we can build a brighter future for generations to come.
                                    </p>
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
