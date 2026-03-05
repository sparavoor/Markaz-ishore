"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FacilitiesPage() {
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        fetch("/api/content")
            .then((res) => res.json())
            .then((data) => setContent(data))
            .catch((err) => console.error("Load error:", err));
    }, []);

    const facilities = [
        { title: "Modern Classrooms", icon: "meeting_room", desc: "Well-equipped classrooms designed to facilitate interactive learning." },
        { title: "Digital Library", icon: "menu_book", desc: "Access to thousands of books and digital resources for research and study." },
        { title: "Computer Lab", icon: "computer", desc: "High-speed internet and modern systems for technical skill development." },
        { title: "Conference Hall", icon: "theater_comedy", desc: "A spacious hall for seminars, workshops, and community events." },
        { title: "Prayer Hall", icon: "mosque", desc: "A quiet and peaceful space for spiritual reflection and daily prayers." },
        { title: "Student Activity Areas", icon: "sports_kabaddi", desc: "Dedicated spaces for extracurricular activities and socializing." }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <section className="py-20 bg-primary/5">
                    <div className="max-w-6xl mx-auto px-4 md:px-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 tracking-tight">Campus Facilities</h1>
                        <p className="text-xl text-slate-700 dark:text-slate-300 mb-12 max-w-3xl">
                            Our campus provides a range of facilities to support learning and student development, ensuring a holistic educational experience.
                        </p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {facilities.map((facility, idx) => (
                                <div key={idx} className="bg-white dark:bg-background-dark p-8 rounded-3xl border border-primary/5 shadow-sm group hover:shadow-xl transition-all">
                                    <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                                        <span className="material-symbols-outlined text-4xl">{facility.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-3">{facility.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                        {facility.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-20 rounded-[3rem] overflow-hidden shadow-2xl h-[400px] relative">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZRjNJp5-QN5QEcEJM7Fq9OWW3oLfyn0yullO_0jcsKGOXIoIm7fjsVP0T57x4EjUtsroZzZIKtlg7P8ESjlchinugvCKau0acTsgryS0vnxiNhFMweXwBhNzz3Q6MyX2izKT26ETpB7UOYEd1YLiRYpTNhT0qNbyq4L2VqVrz9_U_dcOgtd_QW1wLH32J1nAwQvqAvJEwmAcofAQOe4CBWm-1KKFglAnVWy6g2aIk2MismWhegZ8FkbJForuon7feuOAMgg67j0Uq')` }}
                            ></div>
                            <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"></div>
                            <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                                <div className="max-w-2xl text-white">
                                    <h2 className="text-3xl font-bold mb-4">A Vibrant Campus Life</h2>
                                    <p className="text-lg opacity-90">Beyond academics, our campus is a place where students build lifelong friendships and explore their passions.</p>
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

