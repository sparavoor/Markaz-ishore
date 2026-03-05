"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import statesDistrictsData from "@/data/states_districts.json";

export default function AdmissionApplyPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submittedData, setSubmittedData] = useState<any>(null);
    const [generatingPDF, setGeneratingPDF] = useState(false);
    const [formData, setFormData] = useState({
        studentName: "",
        dateOfBirth: "",
        aadharNumber: "",
        fatherName: "",
        place: "",
        state: "",
        district: "",
        pin: "",
        mobileNumber: "",
        whatsappNumber: "",
        department: "",
    });

    const [photoName, setPhotoName] = useState("");
    const [photoBase64, setPhotoBase64] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "state") {
            setFormData({ ...formData, state: value, district: "" });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhotoName(file.name);

            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setPhotoBase64(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/admissions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, photoName, photoBase64 }),
            });

            if (res.ok) {
                const result = await res.json();
                setSubmittedData(result.data);
                setIsSuccess(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                alert("Failed to submit application. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form", error);
            alert("An error occurred while submitting.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDownloadPDF = async () => {
        const element = document.getElementById('pdf-content');
        if (!element || generatingPDF) return;

        setGeneratingPDF(true);
        try {
            const html2canvas = (await import('html2canvas')).default;
            const { jsPDF } = await import('jspdf');

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Admission_${submittedData.admissionNumber}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Could not generate PDF. Please try again.");
        } finally {
            setGeneratingPDF(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
            <main className="flex-grow flex flex-col items-center w-full px-4 py-8 md:py-16">
                <div className="w-full max-w-[960px]">
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-slate-900 dark:text-slate-100 text-3xl md:text-4xl font-black leading-tight tracking-tight mb-2">Student Admission Application</h1>
                        <p className="text-primary/70 dark:text-primary/90 text-base font-normal">Please fill in the details below carefully to complete your admission process.</p>
                    </div>

                    {isSuccess && submittedData ? (
                        <div className="bg-white dark:bg-slate-900/50 shadow-xl shadow-primary/5 rounded-xl border border-primary/5 p-6 md:p-10">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-3xl">check_circle</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Application Submitted!</h2>
                                        <p className="text-slate-500 dark:text-slate-400 mt-1">Your admission application has been successfully recorded.</p>
                                    </div>
                                </div>
                                <button onClick={handleDownloadPDF} disabled={generatingPDF} className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 shrink-0 w-full md:w-auto justify-center disabled:opacity-70">
                                    {generatingPDF ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            Generating PDF...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined">download</span>
                                            Download PDF
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* PDF Content Area */}
                            <div id="pdf-content" className="border border-primary/10 rounded-[2rem] p-8 md:p-12 bg-white text-slate-900 shadow-sm mx-auto max-w-3xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                                <div className="text-center mb-10 border-b border-slate-100 pb-8 relative">
                                    <div className="flex justify-center mb-6">
                                        <img src="/company-logo.png" alt="iSHORE Educational Institution" className="h-16 md:h-20 w-auto" />
                                    </div>
                                    <p className="text-slate-500 mt-2 font-medium">Admission Application Receipt</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                    <div className="md:col-span-2 bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center border border-primary/10 gap-4">
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Admission Number</p>
                                            <p className="text-3xl font-black text-primary tracking-tight">{submittedData.admissionNumber}</p>
                                        </div>
                                        <div className="sm:text-right self-end">
                                            {submittedData.photoPath && (
                                                <div className="w-24 h-32 md:w-28 md:h-36 rounded-xl overflow-hidden border-4 border-white shadow-lg shadow-black/5 bg-slate-100">
                                                    <img
                                                        src={submittedData.photoPath}
                                                        alt="Student Photo"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Student Name</p>
                                        <p className="font-bold text-lg text-slate-900">{submittedData.studentName}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Department</p>
                                        <p className="font-bold text-lg text-primary">{submittedData.department}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date of Birth</p>
                                        <p className="font-semibold text-slate-700">{new Date(submittedData.dateOfBirth).toLocaleDateString()}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aadhar Number</p>
                                        <p className="font-semibold text-slate-700">{submittedData.aadharNumber}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Father's Name</p>
                                        <p className="font-semibold text-slate-700">{submittedData.fatherName}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mobile Number</p>
                                        <p className="font-semibold text-slate-700">{submittedData.mobileNumber}</p>
                                    </div>

                                    <div className="md:col-span-2 space-y-1 pt-4 border-t border-slate-100">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Address</p>
                                        <p className="font-semibold text-slate-700">{submittedData.place}, {submittedData.district}, {submittedData.state} - {submittedData.pin}</p>
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t border-slate-200 text-center flex flex-col items-center">
                                    <div className="w-16 h-1 bg-slate-200 rounded-full mb-6"></div>
                                    <p className="text-sm font-medium text-slate-500">This is an automatically generated document.</p>
                                    <p className="text-xs text-slate-400 mt-1">Please keep your Admission Number safe for future reference.</p>
                                </div>
                            </div>

                            <div className="mt-10 text-center flex flex-wrap gap-4 justify-center">
                                <button onClick={() => router.push("/")} className="px-6 py-3 border-2 border-primary/20 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    Return to Home
                                </button>
                                <button onClick={() => { setIsSuccess(false); setSubmittedData(null); setFormData({ ...formData, studentName: '', aadharNumber: '', mobileNumber: '' }); }} className="px-6 py-3 bg-primary/10 text-primary font-bold rounded-xl hover:bg-primary/20 transition-colors">
                                    Submit Another
                                </button>
                                <button onClick={() => router.push("/student-portal/login")} className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2">
                                    Student Login
                                    <span className="material-symbols-outlined text-sm">login</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900/50 shadow-xl shadow-primary/5 rounded-xl border border-primary/5 p-6 md:p-10">
                            <div className="flex items-center gap-2 mb-8 border-b border-primary/10 pb-4">
                                <span className="material-symbols-outlined text-primary">person_edit</span>
                                <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">STUDENT'S PROFILE</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Name of the Student (With Initial)*</label>
                                    <input name="studentName" value={formData.studentName} onChange={handleChange} className="w-full rounded-lg border border-primary/20 bg-background-light/50 dark:bg-background-dark/50 h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Enter full name" required type="text" />
                                </div>

                                <div className="flex flex-col">
                                    <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Date of Birth*</label>
                                    <div className="relative">
                                        <input name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full rounded-lg border border-primary/20 bg-background-light/50 dark:bg-background-dark/50 h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" required type="date" />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Aadhar Number*</label>
                                    <input name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} className="w-full rounded-lg border border-primary/20 bg-background-light/50 dark:bg-background-dark/50 h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="12-digit Aadhar number" required type="text" pattern="\d{12}" title="12-digit Aadhar number" />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Student's Photo (Studio photo taken within 6 month)*</label>
                                    <label className="block border-2 border-dashed border-primary/30 rounded-xl p-8 text-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
                                        <span className="material-symbols-outlined text-4xl text-primary/60 group-hover:text-primary mb-2">add_a_photo</span>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {photoName ? `Selected: ${photoName}` : "Drag and drop your photo here, or click to select"}
                                        </p>
                                        <p className="text-xs text-primary/60 mt-2 font-medium">Passport size | Max size 500KB</p>
                                        <input accept="image/*" className="hidden" type="file" onChange={handleFileChange} required={!photoName} />
                                    </label>
                                </div>

                                <div className="flex flex-col">
                                    <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Name of Father*</label>
                                    <input name="fatherName" value={formData.fatherName} onChange={handleChange} className="w-full rounded-lg border border-primary/20 bg-background-light/50 dark:bg-background-dark/50 h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Enter father's name" required type="text" />
                                </div>

                                <div className="flex flex-col">
                                    <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Place*</label>
                                    <input name="place" value={formData.place} onChange={handleChange} className="w-full rounded-lg border border-primary/20 bg-background-light/50 dark:bg-background-dark/50 h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Enter locality/village" required type="text" />
                                </div>

                                <div className="flex flex-col">
                                    <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">State*</label>
                                    <select name="state" value={formData.state} onChange={handleChange} className="w-full rounded-lg border border-primary/20 bg-background-light/50 dark:bg-background-dark/50 h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none bg-transparent" required>
                                        <option value="">Select State</option>
                                        {Object.keys(statesDistrictsData).sort().map((state) => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">District*</label>
                                    <select name="district" value={formData.district} onChange={handleChange} className="w-full rounded-lg border border-primary/20 bg-background-light/50 dark:bg-background-dark/50 h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none bg-transparent" required disabled={!formData.state}>
                                        <option value="">Select District</option>
                                        {formData.state && (statesDistrictsData as any)[formData.state]?.sort().map((district: string) => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">PIN*</label>
                                    <input name="pin" value={formData.pin} onChange={handleChange} className="w-full rounded-lg border border-primary/20 bg-background-light/50 dark:bg-background-dark/50 h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="6-digit PIN" required type="text" pattern="\d{6}" title="6-digit PIN" />
                                </div>

                                <div className="flex flex-col">
                                    <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Mobile Number*</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">+91</span>
                                        <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-full rounded-lg border border-primary/20 bg-background-light/50 dark:bg-background-dark/50 h-12 pl-14 pr-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Phone number" required type="tel" />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">WhatsApp Number*</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">+91</span>
                                        <input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} className="w-full rounded-lg border border-primary/20 bg-background-light/50 dark:bg-background-dark/50 h-12 pl-14 pr-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="WhatsApp number" required type="tel" />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Department*</label>
                                    <select name="department" value={formData.department} onChange={handleChange} className="w-full rounded-lg border border-primary/20 bg-background-light/50 dark:bg-background-dark/50 h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none bg-transparent" required>
                                        <option value="">Select Department</option>
                                        <option value="Science Academy">Science Academy</option>
                                        <option value="Commerce Academy">Commerce Academy</option>
                                        <option value="Humanities Academy">Humanities Academy</option>
                                        <option value="Islamic Heritage">Islamic Heritage (Daras)</option>
                                        <option value="UG & PG">UG & PG (Wayanad Campus)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-12 flex flex-col items-center gap-6">
                                <button disabled={isSubmitting} className="w-full md:w-auto min-w-[240px] bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50" type="submit">
                                    {isSubmitting ? "Submitting..." : "Submit Application"}
                                    {!isSubmitting && <span className="material-symbols-outlined">send</span>}
                                </button>
                                <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 w-full flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                                    <p className="text-sm text-primary font-medium leading-relaxed">
                                        <span className="font-bold">Note:</span> Your Mobile Number will be your Username and Date of Birth will be your Password for the Student Login.
                                    </p>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}
