"use client";

import Link from "next/link";
import { useState } from "react";

const NavItem = ({ label, href, dropdownItems }: { label: string; href?: string; dropdownItems?: { label: string; href: string }[] }) => {
    if (dropdownItems) {
        return (
            <div className="group relative">
                <button className="nav-link flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors py-2">
                    {label} <span className="material-symbols-outlined text-xs">expand_more</span>
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block bg-white dark:bg-[#10221d] shadow-xl border border-primary/5 rounded-xl py-2 min-w-[200px] z-50">
                    {dropdownItems.map((item, idx) => (
                        <Link key={idx} href={item.href} className="block px-4 py-2 hover:bg-primary/5 hover:text-primary text-sm transition-colors text-slate-700 dark:text-slate-200">
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <Link href={href || "#"} className="nav-link text-sm font-medium hover:text-primary transition-colors py-2">
            {label}
        </Link>
    );
};

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 glass-effect border-b border-primary/10 px-4 md:px-10 lg:px-20 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <img src="/company-logo.png" alt="iSHORE Educational Institution" className="h-8 md:h-10 w-auto drop-shadow-sm" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden xl:flex items-center gap-8">
                    <NavItem
                        label="About"
                        dropdownItems={[
                            { label: "Ishore Heritage", href: "/about" },
                            { label: "Principal's Message", href: "/principal-message" },
                            { label: "Markaz Connection", href: "/markaz" },
                        ]}
                    />
                    <NavItem
                        label="Admission"
                        dropdownItems={[
                            { label: "Apply Online", href: "/admission" },
                            { label: "Scholarships", href: "/scholarship" },
                            { label: "Student Login", href: "/student-portal/login" },
                        ]}
                    />
                    <NavItem
                        label="Academics"
                        dropdownItems={[
                            { label: "Latest News", href: "/academics" },
                            { label: "Gallery", href: "/gallery" },
                            { label: "Careers", href: "#" },
                        ]}
                    />
                    <NavItem label="Programmes" href="/programme" />
                    <NavItem label="Facilities" href="/facilities" />
                    <NavItem label="Alumni" href="/alumni" />
                </nav>

                <div className="flex items-center gap-4">
                    <button className="hidden sm:flex items-center justify-center p-2 text-primary dark:text-accent hover:bg-primary/10 rounded-full">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <Link href="/admission" className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all border-b-4 border-accent/30">
                        Apply Now
                    </Link>
                    <button
                        className="xl:hidden flex items-center p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="xl:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#10221d] border-b border-primary/10 p-4 flex flex-col gap-4 shadow-xl">
                    <Link href="/about" className="text-sm font-medium py-2 border-b border-primary/5">About</Link>
                    <Link href="/admission" className="text-sm font-medium py-2 border-b border-primary/5">Admission</Link>
                    <Link href="/academics" className="text-sm font-medium py-2 border-b border-primary/5">Academics</Link>
                    <Link href="/programme" className="text-sm font-medium py-2 border-b border-primary/5">Programmes</Link>
                    <Link href="/facilities" className="text-sm font-medium py-2 border-b border-primary/5">Facilities</Link>
                    <Link href="/alumni" className="text-sm font-medium py-2 border-b border-primary/5">Alumni</Link>
                </div>
            )}
        </header>
    );
}
