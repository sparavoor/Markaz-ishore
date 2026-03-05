"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdmissionPage() {
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        fetch("/api/content")
            .then((res) => res.json())
            .then((data) => setContent(data))
            .catch((err) => console.error("Load error:", err));
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <section className="py-20 bg-primary/5">
                    <div className="max-w-4xl mx-auto px-4 md:px-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 tracking-tight">Admission Information</h1>
                        <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 space-y-8">
                            <p className="text-xl font-medium text-slate-900 dark:text-white leading-relaxed">
                                Admissions are open for students who wish to pursue excellence in education combined with strong moral values.
                            </p>

                            <div className="bg-white dark:bg-background-dark p-10 rounded-3xl border border-primary/10 shadow-xl space-y-6">
                                <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined">assignment</span>
                                    The Admission Process
                                </h2>
                                <ul className="grid gap-4 list-none p-0">
                                    {[
                                        { step: "01", title: "Application Submission", desc: "Complete the online application form with personal and academic details." },
                                        { step: "02", title: "Document Verification", desc: "Our team will verify your submitted documents for eligibility." },
                                        { step: "03", title: "Admission Confirmation", desc: "Once approved, you will receive a confirmation letter for enrollment." }
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex gap-6 items-start p-4 rounded-xl hover:bg-primary/5 transition-colors">
                                            <span className="text-3xl font-black text-accent/30">{item.step}</span>
                                            <div>
                                                <h3 className="font-bold text-slate-900 dark:text-white m-0">{item.title}</h3>
                                                <p className="text-sm m-0">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between p-8 bg-primary rounded-2xl text-white gap-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Ready to start?</h3>
                                    <p className="text-primary-foreground/80 text-sm">Apply now through our online admission portal.</p>
                                </div>
                                <a href="/admission/apply" className="px-8 py-3 bg-white text-primary font-bold rounded-xl hover:scale-105 transition-transform whitespace-nowrap block text-center">
                                    Apply Online
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer contact={content?.contact} />
        </div>
    );
}

