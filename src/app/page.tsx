"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  const [content, setContent] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setIsLoaded(true);
      })
      .catch((err) => console.error("Load error:", err));
  }, []);

  if (!isLoaded || !content) {
    return (
      <div className="min-h-screen bg-primary/5 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-accent rounded-full animate-spin"></div>
          <p className="text-primary font-bold animate-pulse">Loading Ishore...</p>
        </div>
      </div>
    );
  }

  const { home } = content;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-primary/95 mix-blend-multiply z-10"></div>
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${home.hero.image}')` }}
          ></motion.div>

          <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 relative z-20 grid lg:grid-cols-2 gap-12 py-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center gap-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-semibold w-fit">
                <span className="material-symbols-outlined text-sm">verified</span>
                Est. 1994 - Legacy of Excellence
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
                {home.hero.title.split(' ').map((word: string, i: number) => (
                  <span key={i} className={word === 'Knowledge' ? 'text-accent' : ''}>{word} </span>
                ))}
              </h2>
              <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-xl">
                {home.hero.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/admission" className="px-8 py-4 bg-white text-primary font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-accent/20">
                  {home.hero.ctaPrimary}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link href="/programme" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all">
                  {home.hero.ctaSecondary}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full aspect-square max-w-md">
                <div className="absolute inset-0 border-2 border-accent rounded-3xl rotate-6 animate-pulse"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center rounded-3xl z-10 shadow-2xl overflow-hidden"
                  style={{ backgroundImage: `url('${home.hero.image}')` }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-semibold italic">&quot;The future belongs to those who learn the art of balanced living.&quot;</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 bg-white dark:bg-background-dark overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h3 className="text-primary text-sm font-bold tracking-widest uppercase">About Ishore</h3>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-snug">
                  {home.about.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  {home.about.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6">
                  {home.about.stats.slice(0, 2).map((stat: any, idx: number) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/5"
                    >
                      <div className="p-3 bg-primary text-white rounded-xl">
                        <span className="material-symbols-outlined">{idx === 0 ? 'verified_user' : 'public'}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{stat.label}</h4>
                        <p className="text-sm text-slate-500">{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link href="/about" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group">
                  Learn More About Our Heritage
                  <span className="material-symbols-outlined text-sm group-hover:text-accent">arrow_forward</span>
                </Link>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-4 pt-12"
                >
                  <div className="h-64 rounded-2xl bg-slate-100 dark:bg-slate-800 bg-cover bg-center shadow-lg" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKs0kGE2j0rDmqmcD44EyXMghPZya4UFBsptBK0dR_ujzHxe1jZ_Aub4PLufc-Ox8uG34DTz96LkwL6lLwJN-2Z6Sj69RzLoPZSNB9itYOIvO8i-75wrHY2ARYl548mupp4_KXwjHrX08sAE0Yva5xBdfMsKGdKe6s4cYsutDl271bn-cjHJGJrUowFAg7cv6Ny0w5vxAd9SqVDUWEi0zrIXxrtp4cRL45HZ3ljDz3QHIkaofVump7ePNfJyAIIHzP9-sxlqX-49Ih')` }}></div>
                  <div className="h-48 rounded-2xl bg-primary flex flex-col items-center justify-center text-center p-6 text-white border-b-8 border-accent shadow-xl">
                    <span className="text-4xl font-bold mb-1">{home.about.stats[3].value}</span>
                    <span className="text-sm opacity-80 uppercase tracking-widest font-semibold">{home.about.stats[3].label}</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-4"
                >
                  <div className="h-48 rounded-2xl bg-accent flex flex-col items-center justify-center text-center p-6 text-primary shadow-xl">
                    <span className="text-4xl font-bold mb-1">{home.about.stats[2].value}</span>
                    <span className="text-sm font-bold uppercase tracking-widest opacity-70">{home.about.stats[2].label}</span>
                  </div>
                  <div className="h-64 rounded-2xl bg-slate-100 dark:bg-slate-800 bg-cover bg-center shadow-lg" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXqIiYD6HOvmZmO9YoAVukWeZ4_-Qt3GUaLbuE-Nz9qEQ8BL4I7SEXmdqQ1r_kRxGptcimNxyUipxb78R2x0fVoXZbXR2CNLpHvtP9vJ94g760h1SlIVPzYGyUPf2vZe1lxOZ-HdgOHPX-Og71wgUXhz9W7P2vVIps-moJ_EHbuelnC7wzpnraH0ScudQ6hOiRAXQf9em90hXTXLbOqhAoGWLIcBSca_pSh16ZUqP1Lu5YEElDgZ5QKJccjSdaTtURQ5dxfkKWk0nw')` }}></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 bg-background-light dark:bg-background-dark/50">
          <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{home.philosophy.title}</h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ y: -10 }}
                className="group p-10 bg-white dark:bg-background-dark rounded-[2.5rem] shadow-sm border border-primary/5 hover:border-accent transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="w-16 h-16 bg-primary text-accent rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                  <span className="material-symbols-outlined text-4xl">visibility</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Our Vision</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  {home.philosophy.vision}
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -10 }}
                className="group p-10 bg-white dark:bg-background-dark rounded-[2.5rem] shadow-sm border border-primary/5 hover:border-accent transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="w-16 h-16 bg-primary text-accent rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                  <span className="material-symbols-outlined text-4xl">my_location</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Our Mission</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  {home.philosophy.mission}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Programmes Section */}
        <section className="py-24 bg-white dark:bg-background-dark">
          <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">{home.programmes.subtitle}</h3>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{home.programmes.title}</h2>
              </motion.div>
              <Link className="px-6 py-3 bg-primary/5 text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm" href="/programme">View All Courses</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {home.programmes.items.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-background-light dark:bg-background-dark/80 p-8 rounded-3xl border border-primary/5 hover:border-accent/30 shadow-sm transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-accent text-5xl mb-6">{item.icon}</span>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">{item.desc}</p>
                  <Link href="/programme" className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Explore <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Collaborators Rolling Section */}
        <section className="py-20 bg-primary/5 overflow-hidden border-y border-primary/5">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-12">Our Global Collaborators</h3>
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
              {home.collaborators.map((partner: any, i: number) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="flex flex-col items-center gap-3 cursor-pointer"
                >
                  <img src={partner.img} alt={partner.name} className="h-12 md:h-16 w-auto object-contain" />
                  <span className="font-extrabold text-[10px] tracking-tighter uppercase text-primary/40">{partner.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest News & Testimonials Grid */}
        <section className="py-24 bg-white dark:bg-background-dark">
          <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 grid lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Left Column: News */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="flex justify-between items-baseline mb-12">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Latest News & Events</h2>
                <Link href="/academics" className="text-primary font-bold text-sm hover:text-accent transition-colors">
                  View All
                </Link>
              </div>

              <div className="space-y-10 flex-grow">
                {[...home.news].reverse().slice(0, 3).map((item: any, i: number) => (
                  <Link href={`/academics/${item.id}`} key={i} className="block group">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-6 items-start"
                    >
                      <div className="w-32 h-32 shrink-0 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-start h-full">
                        <span className="text-[var(--accent)] text-[10px] font-extrabold uppercase tracking-wider mb-2">{item.date}</span>
                        <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-[var(--primary)] transition-colors line-clamp-2">{item.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-3">
                          {item.content || "Keep up to date with the latest developments, achievements, and events happening at Ishore Educational Institution."}
                        </p>
                        <span className="text-[var(--primary)] dark:text-[var(--accent)] font-bold text-sm flex items-center gap-1 mt-auto group-hover:gap-2 transition-all w-fit">
                          Read Full Article <span className="material-symbols-outlined text-xs">arrow_forward</span>
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column: Testimonial */}
            <div className="flex flex-col">
              <div className="mb-12">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">What People Say</h2>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[var(--tertiary)] rounded-[2rem] p-10 flex flex-col flex-grow shadow-lg"
              >
                <div className="text-[var(--accent)] text-5xl font-serif font-black leading-none mb-4 tracking-tighter shrink-0 inline-flex items-center gap-1">
                  <span>&ldquo;</span>
                </div>

                <p className="text-white/90 italic text-lg leading-relaxed mb-10 flex-grow font-light">
                  &quot;{home.testimonial.quote}&quot;
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-md">
                    <img src={home.testimonial.image} alt={home.testimonial.author} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-white font-bold">{home.testimonial.author}</h5>
                    <p className="text-[var(--accent)] text-xs font-semibold">{home.testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Preview (Sliced) */}
        <section className="py-24 bg-white dark:bg-background-dark">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-accent font-bold tracking-widest uppercase text-xs mb-2">Our Campus Life</h3>
            <h2 className="text-4xl font-bold text-primary dark:text-white mb-12">Captured Moments</h2>

            <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-4">
              {[...home.gallery].reverse().slice(0, 8).map((img: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-[2.5rem] shadow-xl border-4 border-white dark:border-white/5 group shrink-0 snap-center w-[85vw] md:w-[45vw] lg:w-[calc(25%-1.125rem)] h-64 md:h-80"
                >
                  <img src={img.url} alt="Campus Life" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <Link href="/gallery" className="inline-flex items-center gap-3 bg-primary text-white px-12 py-4 rounded-full font-bold shadow-2xl shadow-primary/30 hover:bg-accent hover:text-primary transition-all group">
              Explore Full Gallery
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">photo_library</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer contact={content.contact} />
    </div>
  );
}
