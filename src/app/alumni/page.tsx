"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AlumniPage() {
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        fetch("/api/content")
            .then((res) => res.json())
            .then((data) => setContent(data))
            .catch((err) => console.error("Error loading content:", err));
    }, []);

    const alumni = content?.alumni || [];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <section className="py-20 bg-primary/5">
                    <div className="max-w-6xl mx-auto px-4 md:px-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 tracking-tight">Our Alumni</h1>
                        <p className="text-xl text-slate-700 dark:text-slate-300 mb-12 max-w-3xl">
                            Our alumni community reflects the success and impact of Ishore Educational Institution. Graduates of our institution have gone on to excel in various professional fields.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                            {alumni.map((person: any, idx: number) => (
                                <div key={idx} className="bg-white dark:bg-background-dark p-8 rounded-[2.5rem] border border-primary/5 shadow-sm group hover:border-accent transition-all">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div
                                            className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-accent/20 shrink-0"
                                            style={{ backgroundImage: `url('${person.img || 'https://www.w3schools.com/howto/img_avatar.png'}')` }}
                                        ></div>
                                        <div>
                                            <h3 className="font-bold text-lg text-primary leading-none">{person.name}</h3>
                                            <p className="text-xs text-slate-500 mt-1">{person.role}, Batch of {person.batch}</p>
                                        </div>
                                    </div>
                                    <p className="italic text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                                        &quot;{person.quote || "True education encompasses character building and service to society."}&quot;
                                    </p>
                                </div>
                            ))}
                            {alumni.length === 0 && (
                                <div className="col-span-full py-20 text-center">
                                    <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                        <span className="material-symbols-outlined text-4xl">group</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary">No Alumni Profiles Yet</h3>
                                    <p className="text-slate-500">Profiles added in the admin panel will appear here.</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-white dark:bg-background-dark p-12 rounded-[3.5rem] border border-primary/10 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
                            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h2 className="text-3xl font-bold text-primary mb-6">Join the Alumni Network</h2>
                                    <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                        The alumni network continues to support the institution through mentorship and collaboration. We invite all graduates to stay connected and contribute to the growth of our community.
                                    </p>
                                    <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors">Register Now</button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: "Active Members", value: "2500+" },
                                        { label: "Mentors", value: "150+" },
                                        { label: "Nations", value: "20+" },
                                        { label: "Chapters", value: "5" }
                                    ].map((stat, idx) => (
                                        <div key={idx} className="bg-primary/5 p-6 rounded-2xl text-center">
                                            <div className="text-2xl font-bold text-primary">{stat.value}</div>
                                            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer contact={content?.contact} />
        </div>
    );
}

