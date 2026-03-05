"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ScholarshipPage() {
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
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 tracking-tight">Scholarship Programs</h1>
                        <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 space-y-8">
                            <p className="text-xl font-medium text-slate-900 dark:text-white leading-relaxed">
                                To support talented and deserving students, Ishore offers a variety of scholarship programs.
                            </p>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
                                {[
                                    { title: "Academic Merit", icon: "workspace_premium", desc: "For top-performing students in entrance and term exams." },
                                    { title: "Financial Need", icon: "savings", desc: "Support for deserving students from low-income backgrounds." },
                                    { title: "Special Achievement", icon: "stars", desc: "For excellence in arts, sports, or community service." }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white dark:bg-background-dark p-8 rounded-2xl border border-primary/5 shadow-sm text-center group hover:border-accent transition-colors">
                                        <span className="material-symbols-outlined text-4xl text-accent mb-4 group-hover:rotate-12 transition-transform">{item.icon}</span>
                                        <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                                        <p className="text-sm m-0">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
                                <h2 className="text-2xl font-bold text-primary m-0 mb-4">How to Apply</h2>
                                <p>
                                    Students can apply through the scholarship application form available on this page. Make sure to provide all necessary documentation to support your application.
                                </p>
                                <button className="mt-4 px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
                                    Download Form
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer contact={content?.contact} />
        </div>
    );
}

