import Link from "next/link";

interface FooterProps {
    contact?: {
        address?: string;
        phone?: string;
        email?: string;
        socials?: {
            whatsapp?: string;
            facebook?: string;
            instagram?: string;
        };
    };
}

export default function Footer({ contact }: FooterProps) {
    return (
        <footer className="bg-primary text-white pt-24 pb-12 border-t-8 border-accent">
            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">
                <div className="grid lg:grid-cols-4 gap-12 mb-20">
                    <div className="space-y-6">
                        <div className="flex items-center mb-6">
                            <img src="/company-logo.png" alt="iSHORE Educational Institution" className="h-8 md:h-10 w-auto brightness-0 invert opacity-90" />
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Leading the way in holistic education. Blending intellectual rigor with ethical excellence since 1994.
                        </p>
                        <div className="flex gap-4">
                            {contact?.socials?.facebook && (
                                <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors font-bold text-sm" href={contact.socials.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
                                    in
                                </a>
                            )}
                            {contact?.socials?.instagram && (
                                <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors font-bold text-sm" href={contact.socials.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                                    ig
                                </a>
                            )}
                            {contact?.socials?.whatsapp && (
                                <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors font-bold text-sm" href={`https://wa.me/${contact.socials.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" title="WhatsApp">
                                    wa
                                </a>
                            )}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-accent font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-slate-300 text-sm">
                            <li><Link className="hover:text-white transition-colors" href="/about">About Us</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/admission">Admissions</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/programme">Academic Programs</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/student-portal/login">Student Login</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/gallery">Campus Life</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-accent font-bold mb-6">Contact Info</h4>
                        <ul className="space-y-4 text-slate-300 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-accent text-sm">location_on</span>
                                <span className="whitespace-pre-line">{contact?.address || "Ishore Educational Campus,\nMain Road, City - 673001"}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-accent text-sm">call</span>
                                <span>{contact?.phone || "+91 495 242 0000"}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-accent text-sm">mail</span>
                                <span>{contact?.email || "info@ishore.edu"}</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-accent font-bold mb-6">Newsletter</h4>
                        <p className="text-slate-300 text-xs mb-4">Get latest updates and announcements.</p>
                        <div className="flex gap-2">
                            <input
                                className="bg-white/10 border-white/20 rounded-lg px-4 py-2 text-sm w-full focus:ring-accent focus:border-accent text-white placeholder-slate-400"
                                placeholder="Email address"
                                type="email"
                            />
                            <button className="bg-accent text-primary p-2 rounded-lg hover:bg-accent/90 transition-colors">
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-400 text-xs">© {new Date().getFullYear()} Ishore Educational Institution. All Rights Reserved.</p>
                    <div className="flex gap-6 text-xs text-slate-400">
                        <Link className="hover:text-white" href="#">Privacy Policy</Link>
                        <Link className="hover:text-white" href="#">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

