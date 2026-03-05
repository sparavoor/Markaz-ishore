"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar";

export default function StudentDownloads() {
    const [student, setStudent] = useState<any>(null);
    const [portalData, setPortalData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/student-profile");
                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        setStudent(data.student);
                    } else {
                        router.push("/student-portal/login");
                    }
                } else {
                    router.push("/student-portal/login");
                }
            } catch (error) {
                router.push("/student-portal/login");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchContent = async () => {
            try {
                const res = await fetch("/api/content");
                if (res.ok) {
                    const data = await res.json();
                    setPortalData(data.studentPortal);
                }
            } catch (error) {
                console.error("Error fetching portal content:", error);
            }
        };

        fetchProfile();
        fetchContent();
    }, [router]);

    if (isLoading) return null;
    if (!student) return null;

    const isApproved = student.status === "Approved";
    const idCardRef = useRef<HTMLDivElement>(null);
    const admissionRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async (ref: React.RefObject<HTMLDivElement>, filename: string) => {
        if (!ref.current) return;
        try {
            const html2canvas = (await import('html2canvas')).default;
            const canvas = await html2canvas(ref.current);
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = await import('jspdf');
            const pdf = new jsPDF();
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(filename);
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('Failed to generate PDF.');
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <Sidebar currentPath="/student-portal/downloads" />
            <main className="flex-1 flex flex-col overflow-y-auto">
                <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-primary dark:text-accent">Downloads Resources</h2>
                        <p className="text-slate-500 mt-1">Access your official documents and institutional resources.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Dynamic Downloads from Admin */}
                        {portalData?.downloads?.map((dl: any, idx: number) => (
                            <div key={idx} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 hover:shadow-lg transition-all flex flex-col justify-between group">
                                <div className="flex items-start gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined">
                                            {dl.type === 'schedule' ? 'calendar_today' :
                                                dl.type === 'map' ? 'map' : 'description'}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-primary dark:text-slate-100">{dl.title}</h3>
                                        <p className="text-sm text-slate-500 mt-1">{dl.desc}</p>
                                    </div>
                                </div>
                                <a
                                    href={dl.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-primary text-white hover:brightness-110 shadow-lg shadow-primary/20"
                                >
                                    <span className="material-symbols-outlined">download</span>
                                    Download Now
                                </a>
                            </div>
                        ))}

                        {/* ID Card */}
                        <div ref={idCardRef} className={`p-6 rounded-2xl border flex flex-col justify-between group transition-all ${isApproved ? 'bg-white dark:bg-slate-900 border-primary/10 hover:shadow-lg' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-70'}`}>
                            <div className="flex items-start gap-4 mb-8">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${isApproved ? 'bg-accent' : 'bg-slate-400'}`}>
                                    <span className="material-symbols-outlined">badge</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary dark:text-slate-100">Digital ID Card</h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        {isApproved ? "Your official institutional identity card. Download and keep a digital copy handy." : "This document will be available after your admission is approved."}
                                    </p>
                                </div>
                            </div>
                            <button
                                disabled={!isApproved}
                                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isApproved ? 'bg-primary/5 text-primary hover:bg-primary hover:text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800'}`}
                            >
                                <span className="material-symbols-outlined">{isApproved ? 'download' : 'lock'}</span>
                                {isApproved ? 'Download PDF' : 'Locked'}
                            </button>
                        </div>

                        {/* Admission Letter */}
                        <div ref={admissionRef} className={`p-6 rounded-2xl border flex flex-col justify-between group transition-all ${isApproved ? 'bg-white dark:bg-slate-900 border-primary/10 hover:shadow-lg' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-70'}`}>
                            <div className="flex items-start gap-4 mb-8">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${isApproved ? 'bg-primary' : 'bg-slate-400'}`}>
                                    <span className="material-symbols-outlined">description</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary dark:text-slate-100">Admission Letter</h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        {isApproved ? "Official confirmation of your enrollment at Ishore." : "This document will be generated upon approval of your application."}
                                    </p>
                                </div>
                            </div>
                            <button
                                disabled={!isApproved}
                                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isApproved ? 'bg-primary/5 text-primary hover:bg-primary hover:text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800'}`}
                            >
                                <span className="material-symbols-outlined">{isApproved ? 'download' : 'lock'}</span>
                                {isApproved ? 'Download PDF' : 'Locked'}
                            </button>
                        </div>

                        {/* Application Copy */}
                        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 hover:shadow-lg transition-all flex flex-col justify-between group">
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 dark:bg-slate-700 flex items-center justify-center text-white shrink-0">
                                    <span className="material-symbols-outlined">history_edu</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary dark:text-slate-100">Application Copy</h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        A copy of the admission application you submitted online.
                                    </p>
                                </div>
                            </div>
                            <button className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-primary/5 text-primary hover:bg-primary hover:text-white">
                                <span className="material-symbols-outlined">download</span>
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
