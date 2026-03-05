"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentNav, setCurrentNav] = useState("dashboard");
    const [activePageTab, setActivePageTab] = useState("home");
    const [password, setPassword] = useState("");
    const [content, setContent] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [admissions, setAdmissions] = useState<any[]>([]);

    // Admission Filters State
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterDate, setFilterDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const pages = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" }
    ];

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: "dashboard" },
        { id: "content", label: "Page Content", icon: "article" },
        { id: "admissions", label: "Admissions", icon: "person_add" },
        { id: "news", label: "News", icon: "news" },
        { id: "gallery", label: "Gallery", icon: "image" },
        { id: "programs", label: "Programs", icon: "child_hat" },
        { id: "testimonials", label: "Testimonials", icon: "format_quote" },
        { id: "collaborators", label: "Collaborators", icon: "handshake" },
        { id: "alumni", label: "Alumni", icon: "group" },
        { id: "principal", label: "Principal's Message", icon: "person" },
        { id: "markaz", label: "Markaz History", icon: "history_edu" },
        { id: "contact", label: "Contact Details", icon: "contact_support" },
        { id: "portal", label: "Portal Resources", icon: "door_open" },
    ];

    useEffect(() => {
        fetch("/api/content")
            .then((res) => res.json())
            .then((data) => setContent(data))
            .catch((err) => console.error("Load error:", err));

        fetch("/api/admissions")
            .then((res) => res.json())
            .then((data) => setAdmissions(data))
            .catch((err) => console.error("Load admissions error:", err));
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin123") {
            setIsLoggedIn(true);
        } else {
            alert("Invalid password");
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content),
            });
            if (res.ok) alert("Changes saved successfully!");
            else alert("Failed to save changes.");
        } catch (error) {
            alert("Error saving: " + error);
        } finally {
            setIsSaving(false);
        }
    };

    const updateField = (page: string, section: string, field: string, value: string) => {
        setContent((prev: any) => ({
            ...prev,
            [page]: {
                ...prev[page],
                [section]: {
                    ...prev[page][section],
                    [field]: value,
                },
            },
        }));
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#10221d] p-6">
                <div
                    className="max-w-md w-full bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-emerald-900/10 shadow-2xl"
                >
                    <div className="text-center mb-8">
                        <div className="size-16 bg-[var(--primary)] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[var(--accent)]">
                            <span className="material-symbols-outlined text-3xl">school</span>
                        </div>
                        <h1 className="text-2xl font-bold text-[var(--primary)] dark:text-[var(--accent)]">Admin Access</h1>
                        <p className="text-slate-500 text-sm mt-2">Ishore Educational Institution Portal</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 rounded-xl border border-emerald-900/10 bg-slate-50 dark:bg-emerald-950/20 focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all dark:text-white"
                                placeholder="••••••••"
                            />
                        </div>
                        <button className="w-full py-4 bg-[var(--primary)] text-white font-bold rounded-xl hover:bg-[var(--primary)]/90 transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]">
                            Login to Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-[100dvh] overflow-hidden bg-[#f6f8f7] dark:bg-[#10221d] relative">
            {/* Sidebar */}
            <aside className="w-72 bg-white dark:bg-slate-900 border-r border-[var(--primary)]/10 flex flex-col h-full overflow-y-auto">
                <div className="p-6 flex items-center gap-3">
                    <div className="size-10 bg-[var(--primary)] rounded-lg flex items-center justify-center text-[var(--accent)]">
                        <span className="material-symbols-outlined text-2xl font-bold">school</span>
                    </div>
                    <div>
                        <h1 className="text-[var(--primary)] dark:text-[var(--accent)] font-bold text-lg leading-tight">Ishore Admin</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Educational Institution</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-2 space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentNav(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${currentNav === item.id
                                ? "bg-[var(--primary)] text-white font-medium"
                                : "text-slate-600 dark:text-slate-300 hover:bg-[var(--primary)]/5"
                                }`}
                        >
                            <span className={`material-symbols-outlined ${currentNav === item.id ? "text-white" : "text-[var(--primary)]"}`}>
                                {item.icon}
                            </span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 mt-auto border-t border-[var(--primary)]/10">
                    <div className="bg-[var(--primary)]/5 rounded-xl p-4 mb-4">
                        <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider mb-2">Storage Usage</p>
                        <div className="w-full bg-[var(--primary)]/20 rounded-full h-2 mb-2">
                            <div className="bg-[var(--accent)] h-2 rounded-full w-3/4"></div>
                        </div>
                        <p className="text-xs text-slate-500">7.5 GB of 10 GB used</p>
                    </div>
                    <button
                        onClick={() => setIsLoggedIn(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors font-medium"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white dark:bg-slate-900 border-b border-[var(--primary)]/10 flex items-center justify-between px-8 shrink-0 sticky top-0 z-40">
                    <div className="flex items-center flex-1 max-w-md">
                        <div className="relative w-full">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-emerald-950/20 border-none rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary)]/50 outline-none transition-all dark:text-white"
                                placeholder="Search records, students, or news..."
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-500 hover:text-[var(--primary)] transition-colors relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Super Admin</p>
                                <p className="text-xs text-slate-500">Ishore Institution</p>
                            </div>
                            <div className="size-10 rounded-full border-2 border-[var(--accent)] overflow-hidden bg-[var(--primary)]/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[var(--primary)]">person</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">

                    {currentNav === "dashboard" && (
                        <div
                            key="dashboard-page"
                        >
                            <div className="sticky top-0 bg-[#f6f8f7] dark:bg-[#10221d] z-30 pb-4 pt-2 border-b border-[var(--primary)]/5 -mt-2 mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Welcome back, Administrator. Here's what's happening today.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {[
                                    {
                                        label: "Total Applications",
                                        value: admissions.length.toLocaleString(),
                                        icon: "description",
                                        trend: admissions.length > 0 ? `+${Math.round((admissions.filter(a => new Date(a.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length / admissions.length) * 100)}%` : "0%"
                                    },
                                    {
                                        label: "Approved Students",
                                        value: admissions.filter(a => a.status === "Approved").length.toLocaleString(),
                                        icon: "group",
                                        trend: "Verified"
                                    },
                                    { label: "Active Programs", value: content?.home?.programmes?.items?.length || 0, icon: "school", trend: "Live" },
                                    { label: "Recent News", value: content?.home?.news?.length || 0, icon: "feed", trend: "Updated" },
                                ].map((stat, idx) => (
                                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-[var(--primary)]/10 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="size-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                                                <span className="material-symbols-outlined">{stat.icon}</span>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500`}>
                                                {stat.trend}
                                            </span>
                                        </div>
                                        <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-[var(--primary)]/10 shadow-sm overflow-hidden mb-8">
                                <div className="p-6 border-b border-[var(--primary)]/10 flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Admission Applications</h3>
                                    <button className="text-[var(--primary)] hover:underline text-sm font-bold flex items-center gap-1">
                                        <span>View All</span>
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-[var(--primary)]/5 text-[var(--primary)] text-xs uppercase tracking-wider font-semibold">
                                            <tr>
                                                <th className="px-6 py-4">Student Name</th>
                                                <th className="px-6 py-4">Program</th>
                                                <th className="px-6 py-4">Date Applied</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[var(--primary)]/10 text-sm">
                                            {admissions.slice(0, 5).map((row: any, idx: number) => (
                                                <tr key={idx} className="hover:bg-[var(--primary)]/5 transition-colors">
                                                    <td className="px-6 py-4 font-medium dark:text-white">{row.studentName}</td>
                                                    <td className="px-6 py-4 text-slate-500">{row.department}</td>
                                                    <td className="px-6 py-4 text-slate-500">{new Date(row.createdAt).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${row.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                                                            row.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                                'bg-slate-100 text-slate-700'
                                                            }`}>
                                                            {row.status || 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                className="p-1.5 rounded-lg hover:bg-[var(--primary)]/10 text-[var(--primary)]"
                                                                onClick={() => setCurrentNav("admissions")}
                                                                title="Go to Admissions"
                                                            >
                                                                <span className="material-symbols-outlined text-lg">visibility</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {admissions.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                                        No applications found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                    {currentNav === "admissions" && (
                        <div key="admissions-page">
                            <div className="sticky top-0 bg-[#f6f8f7] dark:bg-[#10221d] z-30 pb-4 pt-4 border-b border-[var(--primary)]/5 -mt-4 mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Admissions List</h2>
                                    <p className="text-slate-500 dark:text-slate-400">View and manage student admission applications.</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            const dataToExport = admissions
                                                .filter((app: any) => filterStatus === "All" || (app.status || "Pending") === filterStatus)
                                                .filter((app: any) => !filterDate || (app.createdAt && app.createdAt.includes(filterDate)))
                                                .filter((app: any) => !searchQuery ||
                                                    app.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                    app.admissionNumber?.toLowerCase().includes(searchQuery.toLowerCase())
                                                );

                                            const csvContent = "data:text/csv;charset=utf-8,"
                                                + ["ADMISSION ID,Student Name,Phone,Department,Date Applied,Status"]
                                                    .concat(dataToExport.map(r => `${r.admissionNumber},${r.studentName},${r.mobileNumber},${r.department},${new Date(r.createdAt).toLocaleDateString()},${r.status || "Pending"}`))
                                                    .join("\n");

                                            const encodedUri = encodeURI(csvContent);
                                            const link = document.createElement("a");
                                            link.setAttribute("href", encodedUri);
                                            link.setAttribute("download", `admissions_export_${new Date().toISOString().split('T')[0]}.csv`);
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }}
                                        className="px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
                                    >
                                        <span className="material-symbols-outlined text-sm">download</span>
                                        Export Excel
                                    </button>
                                    <button
                                        onClick={async (e) => {
                                            const btn = e.currentTarget;
                                            btn.disabled = true;
                                            btn.textContent = 'Generating...';
                                            try {
                                                const html2canvas = (await import('html2canvas')).default;
                                                const { jsPDF } = await import('jspdf');
                                                const element = document.getElementById('admissions-table-container');
                                                if (!element) throw new Error('Table not found');

                                                const canvas = await html2canvas(element, {
                                                    scale: 2,
                                                    useCORS: true,
                                                    logging: false,
                                                    backgroundColor: '#ffffff',
                                                });

                                                const imgData = canvas.toDataURL('image/jpeg', 0.95);
                                                const pdf = new jsPDF('l', 'mm', 'a4');
                                                const pdfWidth = pdf.internal.pageSize.getWidth();
                                                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                                                pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                                                pdf.save(`admissions_report_${new Date().toISOString().split('T')[0]}.pdf`);
                                            } catch (err) {
                                                console.error('PDF export error:', err);
                                                alert('Failed to generate PDF.');
                                            } finally {
                                                btn.disabled = false;
                                                btn.innerHTML = '<span class="material-symbols-outlined text-sm">picture_as_pdf</span>Export PDF';
                                            }
                                        }}
                                        className="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-slate-800/20 hover:bg-slate-900 transition-all"
                                    >
                                        <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                                        Export PDF
                                    </button>
                                </div>
                            </div>
                            <div id="admissions-table-container">
                                <div className="mb-6 flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-[var(--primary)]/10 shadow-sm mt-4">
                                    <div className="flex-grow">
                                        <input
                                            type="text"
                                            placeholder="Search by Name or Admission ID..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <select
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm font-medium focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                        >
                                            <option value="All">All Statuses</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                        <input
                                            type="date"
                                            value={filterDate}
                                            onChange={(e) => setFilterDate(e.target.value)}
                                            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-[var(--primary)]/10 shadow-sm overflow-hidden mb-8">
                                    <div className="p-6 border-b border-[var(--primary)]/10 flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">All Applications ({admissions.length})</h3>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-[var(--primary)]/5 text-[var(--primary)] text-xs uppercase tracking-wider font-semibold">
                                                <tr>
                                                    <th className="px-6 py-4">ADMISSION ID</th>
                                                    <th className="px-6 py-4">Student Name</th>
                                                    <th className="px-6 py-4">Phone</th>
                                                    <th className="px-6 py-4">Department</th>
                                                    <th className="px-6 py-4">Date Applied</th>
                                                    <th className="px-6 py-4">Status</th>
                                                    <th className="px-6 py-4 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[var(--primary)]/10 text-sm">
                                                {admissions
                                                    .filter((app: any) => filterStatus === "All" || (app.status || "Pending") === filterStatus)
                                                    .filter((app: any) => !filterDate || (app.createdAt && app.createdAt.includes(filterDate)))
                                                    .filter((app: any) => !searchQuery ||
                                                        app.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                        app.admissionNumber?.toLowerCase().includes(searchQuery.toLowerCase())
                                                    )
                                                    .map((row, idx) => (
                                                        <tr key={idx} className="hover:bg-[var(--primary)]/5 transition-colors">
                                                            <td className="px-6 py-4 font-mono text-[var(--primary)] font-bold">{row.admissionNumber}</td>
                                                            <td className="px-6 py-4 font-medium dark:text-white">{row.studentName}</td>
                                                            <td className="px-6 py-4 text-slate-500">{row.mobileNumber}</td>
                                                            <td className="px-6 py-4 text-slate-500">{row.department}</td>
                                                            <td className="px-6 py-4 text-slate-500">{new Date(row.createdAt).toLocaleDateString()}</td>
                                                            <td className="px-6 py-4">
                                                                <select
                                                                    value={row.status || "Pending"}
                                                                    onChange={async (e) => {
                                                                        const newStatus = e.target.value;
                                                                        setAdmissions((prev: any[]) => prev.map((a) => a.id === row.id ? { ...a, status: newStatus } : a));
                                                                        try {
                                                                            await fetch("/api/admissions", {
                                                                                method: "PATCH",
                                                                                headers: { "Content-Type": "application/json" },
                                                                                body: JSON.stringify({ id: row.id, status: newStatus })
                                                                            });
                                                                        } catch (err) {
                                                                            console.error("Failed to auto-save status:", err);
                                                                            setAdmissions((prev: any[]) => prev.map((a) => a.id === row.id ? { ...a, status: row.status } : a));
                                                                            alert("Failed to save changes.");
                                                                        }
                                                                    }}
                                                                    className={`text-xs font-bold px-3 py-1.5 rounded-full border border-slate-200 outline-none cursor-pointer transition-colors ${(row.status || 'Pending') === 'Approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                                                                        (row.status || 'Pending') === 'Pending' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                                                                            'bg-red-100 text-red-800 border-red-200'
                                                                        }`}
                                                                >
                                                                    <option value="Pending">Pending</option>
                                                                    <option value="Approved">Approved</option>
                                                                    <option value="Rejected">Rejected</option>
                                                                </select>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <button
                                                                    onClick={async () => {
                                                                        if (confirm(`Are you sure you want to delete admission ${row.admissionNumber}?`)) {
                                                                            try {
                                                                                const res = await fetch("/api/admissions", {
                                                                                    method: "DELETE",
                                                                                    headers: { "Content-Type": "application/json" },
                                                                                    body: JSON.stringify({ id: row.id })
                                                                                });
                                                                                if (res.ok) {
                                                                                    setAdmissions(prev => prev.filter(a => a.id !== row.id));
                                                                                } else {
                                                                                    alert("Failed to delete record.");
                                                                                }
                                                                            } catch (err) {
                                                                                console.error("Delete error:", err);
                                                                                alert("An error occurred during deletion.");
                                                                            }
                                                                        }
                                                                    }}
                                                                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                                    title="Delete Application"
                                                                >
                                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                {admissions.length === 0 && (
                                                    <tr>
                                                        <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                                                            No applications found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentNav === "news" && (
                        <div
                            key="news-page"
                        >
                            <div className="sticky top-0 bg-[#f6f8f7] dark:bg-[#10221d] z-30 pb-4 pt-4 border-b border-[var(--primary)]/5 -mt-4 mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">News & Events</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Manage the latest updates and announcements.</p>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => {
                                            const newItem = {
                                                id: crypto.randomUUID(),
                                                date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
                                                title: "New Event Title",
                                                img: "",
                                                content: ""
                                            };
                                            const newItems = [...content.home.news, newItem];
                                            setContent((prev: any) => ({
                                                ...prev,
                                                home: { ...prev.home, news: newItems }
                                            }));
                                        }}
                                        className="px-6 py-3 bg-[var(--primary)] text-white font-bold rounded-xl flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">add</span>
                                        <span>Add News</span>
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="px-6 py-3 border-2 border-[var(--primary)] text-[var(--primary)] font-bold rounded-xl disabled:opacity-50"
                                    >
                                        {isSaving ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {content?.home?.news?.map((item: any, idx: number) => (
                                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[var(--primary)]/10 shadow-sm flex gap-6 items-start">
                                        <div className="w-32 h-32 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-[var(--primary)]/5">
                                            {item.img ? (
                                                <img src={item.img} className="w-full h-full object-cover" alt="" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                    <span className="material-symbols-outlined text-3xl">image</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-grow space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div className="grid grid-cols-2 gap-4 flex-grow mr-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Publish Date</label>
                                                        <input
                                                            type="text"
                                                            value={item.date}
                                                            onChange={(e) => {
                                                                const newItems = [...content.home.news];
                                                                newItems[idx].date = e.target.value;
                                                                setContent((prev: any) => ({
                                                                    ...prev,
                                                                    home: { ...prev.home, news: newItems }
                                                                }));
                                                            }}
                                                            className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Headline</label>
                                                        <input
                                                            type="text"
                                                            value={item.title}
                                                            onChange={(e) => {
                                                                const newItems = [...content.home.news];
                                                                newItems[idx].title = e.target.value;
                                                                setContent((prev: any) => ({
                                                                    ...prev,
                                                                    home: { ...prev.home, news: newItems }
                                                                }));
                                                            }}
                                                            className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const newItems = content.home.news.filter((_: any, i: number) => i !== idx);
                                                        setContent((prev: any) => ({
                                                            ...prev,
                                                            home: { ...prev.home, news: newItems }
                                                        }));
                                                    }}
                                                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Image URL</label>
                                                <input
                                                    type="text"
                                                    value={item.img}
                                                    onChange={(e) => {
                                                        const newItems = [...content.home.news];
                                                        newItems[idx].img = e.target.value;
                                                        setContent((prev: any) => ({
                                                            ...prev,
                                                            home: { ...prev.home, news: newItems }
                                                        }));
                                                    }}
                                                    className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800"
                                                    placeholder="Enter image URL"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">News Content</label>
                                                <textarea
                                                    rows={4}
                                                    value={item.content || ""}
                                                    onChange={(e) => {
                                                        const newItems = [...content.home.news];
                                                        newItems[idx].content = e.target.value;
                                                        setContent((prev: any) => ({
                                                            ...prev,
                                                            home: { ...prev.home, news: newItems }
                                                        }));
                                                    }}
                                                    className="w-full px-3 py-2 text-sm rounded-xl border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all resize-none"
                                                    placeholder="Write detailed news content here..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentNav === "content" && (
                        <div
                            key="content-page"
                        >
                            <div className="sticky top-0 bg-[#f6f8f7] dark:bg-[#10221d] z-30 pb-4 pt-4 border-b border-[var(--primary)]/5 -mt-4 mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Page Content Management</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Manage headlines, descriptions and images for your pages.</p>
                                </div>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-6 py-3 bg-[var(--primary)] text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                                >
                                    {isSaving ? "Saving..." : "Save All Changes"}
                                </button>
                            </div>

                            <div className="flex gap-4 mb-8">
                                {pages.map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => setActivePageTab(p.id)}
                                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activePageTab === p.id
                                            ? "bg-[var(--primary)] text-white shadow-md shadow-emerald-900/10"
                                            : "bg-white dark:bg-slate-900 text-slate-600 border border-[var(--primary)]/10"
                                            }`}
                                    >
                                        {p.label} Page
                                    </button>
                                ))}
                            </div>

                            {content && content[activePageTab] && (
                                <div className="space-y-8">
                                    {/* Hero Section */}
                                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-[var(--primary)]/10 p-8 shadow-sm">
                                        <h3 className="text-lg font-bold text-[var(--primary)] dark:text-[var(--accent)] mb-6 flex items-center gap-2">
                                            <span className="material-symbols-outlined">identity_platform</span> Hero Section
                                        </h3>
                                        <div className="grid gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-500 mb-2">Main Headline</label>
                                                <input
                                                    type="text"
                                                    value={content[activePageTab].hero.title}
                                                    onChange={(e) => updateField(activePageTab, "hero", "title", e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-slate-500 mb-2">Description / Subtext</label>
                                                <textarea
                                                    rows={3}
                                                    value={content[activePageTab].hero.description}
                                                    onChange={(e) => updateField(activePageTab, "hero", "description", e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Home Specific Sections */}
                                    {activePageTab === "home" && (
                                        <>
                                            {/* About Section */}
                                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-[var(--primary)]/10 p-8 shadow-sm">
                                                <h3 className="text-lg font-bold text-[var(--primary)] dark:text-[var(--accent)] mb-6 flex items-center gap-2">
                                                    <span className="material-symbols-outlined">info</span> About Section
                                                </h3>
                                                <div className="grid gap-6">
                                                    <div>
                                                        <label className="block text-sm font-bold text-slate-500 mb-2">Section Heading</label>
                                                        <input
                                                            type="text"
                                                            value={content.home.about.title}
                                                            onChange={(e) => updateField("home", "about", "title", e.target.value)}
                                                            className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-slate-500 mb-2">About Content</label>
                                                        <textarea
                                                            rows={4}
                                                            value={content.home.about.description}
                                                            onChange={(e) => updateField("home", "about", "description", e.target.value)}
                                                            className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all resize-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Philosophy Section */}
                                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-[var(--primary)]/10 p-8 shadow-sm">
                                                <h3 className="text-lg font-bold text-[var(--primary)] dark:text-[var(--accent)] mb-6 flex items-center gap-2">
                                                    <span className="material-symbols-outlined">psychology</span> Philosophy & Vision
                                                </h3>
                                                <div className="grid gap-6">
                                                    <div>
                                                        <label className="block text-sm font-bold text-slate-500 mb-2">Philosophy Title</label>
                                                        <input
                                                            type="text"
                                                            value={content.home.philosophy.title}
                                                            onChange={(e) => updateField("home", "philosophy", "title", e.target.value)}
                                                            className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-slate-500 mb-2">Vision Statement</label>
                                                        <textarea
                                                            rows={3}
                                                            value={content.home.philosophy.vision}
                                                            onChange={(e) => updateField("home", "philosophy", "vision", e.target.value)}
                                                            className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all resize-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-slate-500 mb-2">Mission Statement</label>
                                                        <textarea
                                                            rows={3}
                                                            value={content.home.philosophy.mission}
                                                            onChange={(e) => updateField("home", "philosophy", "mission", e.target.value)}
                                                            className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all resize-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Testimonial Section */}
                                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-[var(--primary)]/10 p-8 shadow-sm">
                                                <h3 className="text-lg font-bold text-[var(--primary)] dark:text-[var(--accent)] mb-6 flex items-center gap-2">
                                                    <span className="material-symbols-outlined">format_quote</span> Featured Testimonial
                                                </h3>
                                                <div className="grid gap-6">
                                                    <div>
                                                        <label className="block text-sm font-bold text-slate-500 mb-2">Quote</label>
                                                        <textarea
                                                            rows={3}
                                                            value={content.home.testimonial.quote}
                                                            onChange={(e) => updateField("home", "testimonial", "quote", e.target.value)}
                                                            className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all resize-none"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-bold text-slate-500 mb-2">Author Name</label>
                                                            <input
                                                                type="text"
                                                                value={content.home.testimonial.author}
                                                                onChange={(e) => updateField("home", "testimonial", "author", e.target.value)}
                                                                className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-bold text-slate-500 mb-2">Role/Batch</label>
                                                            <input
                                                                type="text"
                                                                value={content.home.testimonial.role}
                                                                onChange={(e) => updateField("home", "testimonial", "role", e.target.value)}
                                                                className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Collaborators Section */}
                                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-[var(--primary)]/10 p-8 shadow-sm">
                                                <h3 className="text-lg font-bold text-[var(--primary)] dark:text-[var(--accent)] mb-6 flex items-center gap-2">
                                                    <span className="material-symbols-outlined">handshake</span> Collaborator Logos
                                                </h3>
                                                <div className="grid sm:grid-cols-2 gap-6">
                                                    {content.home.collaborators.map((c: any, i: number) => (
                                                        <div key={i} className="space-y-4 p-4 border border-[var(--primary)]/5 rounded-xl bg-slate-50 dark:bg-emerald-950/10">
                                                            <div className="flex items-center justify-between">
                                                                <label className="text-xs font-bold text-slate-400 uppercase">{c.name}</label>
                                                                <img src={c.img} className="size-8 object-contain bg-white rounded-lg border p-1" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={c.img}
                                                                onChange={(e) => {
                                                                    const newCollabs = [...content.home.collaborators];
                                                                    newCollabs[i].img = e.target.value;
                                                                    setContent((prev: any) => ({
                                                                        ...prev,
                                                                        home: { ...prev.home, collaborators: newCollabs }
                                                                    }));
                                                                }}
                                                                className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--primary)]/10 bg-white dark:bg-slate-800 outline-none focus:ring-1 focus:ring-[var(--primary)]"
                                                                placeholder="Logo Image URL"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-primary/5">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                                                        <span className="material-symbols-outlined">newspaper</span> Latest News
                                                    </h3>
                                                    <button
                                                        onClick={() => {
                                                            const newId = `news-${Date.now()}`;
                                                            const newNews = [{ id: newId, date: "New Date", title: "New News Title", content: "Write detailed news content here...", img: "" }, ...content.home.news];
                                                            setContent((prev: any) => ({ ...prev, home: { ...prev.home, news: newNews } }));
                                                        }}
                                                        className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">add</span> Add News
                                                    </button>
                                                </div>
                                                <div className="space-y-4">
                                                    {content.home.news.map((item: any, i: number) => (
                                                        <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-primary/5 space-y-3 relative group">
                                                            <button
                                                                onClick={() => {
                                                                    const newNews = content.home.news.filter((_: any, idx: number) => idx !== i);
                                                                    setContent((prev: any) => ({ ...prev, home: { ...prev.home, news: newNews } }));
                                                                }}
                                                                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <span className="material-symbols-outlined">delete</span>
                                                            </button>
                                                            <div className="grid sm:grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Unique ID / Slug</label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="e.g., annual-sports-day"
                                                                        value={item.id || ""}
                                                                        onChange={(e) => {
                                                                            const newNews = [...content.home.news];
                                                                            newNews[i].id = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                                                            setContent((prev: any) => ({ ...prev, home: { ...prev.home, news: newNews } }));
                                                                        }}
                                                                        className="w-full px-3 py-2 text-sm rounded-lg border border-primary/10 bg-slate-50 dark:bg-slate-900"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Date</label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="October 15, 2023"
                                                                        value={item.date}
                                                                        onChange={(e) => {
                                                                            const newNews = [...content.home.news];
                                                                            newNews[i].date = e.target.value;
                                                                            setContent((prev: any) => ({ ...prev, home: { ...prev.home, news: newNews } }));
                                                                        }}
                                                                        className="w-full px-3 py-2 text-sm rounded-lg border border-primary/10 bg-slate-50 dark:bg-slate-900"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Title</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Title"
                                                                    value={item.title}
                                                                    onChange={(e) => {
                                                                        const newNews = [...content.home.news];
                                                                        newNews[i].title = e.target.value;
                                                                        setContent((prev: any) => ({ ...prev, home: { ...prev.home, news: newNews } }));
                                                                    }}
                                                                    className="w-full px-3 py-2 text-sm font-bold rounded-lg border border-primary/10 bg-slate-50 dark:bg-slate-900"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Cover Image URL</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Image URL"
                                                                    value={item.img}
                                                                    onChange={(e) => {
                                                                        const newNews = [...content.home.news];
                                                                        newNews[i].img = e.target.value;
                                                                        setContent((prev: any) => ({ ...prev, home: { ...prev.home, news: newNews } }));
                                                                    }}
                                                                    className="w-full px-3 py-2 text-sm rounded-lg border border-primary/10 bg-slate-50 dark:bg-slate-900"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Full Article Content</label>
                                                                <textarea
                                                                    rows={5}
                                                                    placeholder="Write the full news article here..."
                                                                    value={item.content || ""}
                                                                    onChange={(e) => {
                                                                        const newNews = [...content.home.news];
                                                                        newNews[i].content = e.target.value;
                                                                        setContent((prev: any) => ({ ...prev, home: { ...prev.home, news: newNews } }));
                                                                    }}
                                                                    className="w-full px-3 py-2 text-sm rounded-lg border border-primary/10 bg-slate-50 dark:bg-slate-900 resize-y"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Gallery Images Section */}
                                            <div className="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-primary/5">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                                                        <span className="material-symbols-outlined">photo_library</span> Gallery Images
                                                    </h3>
                                                    <button
                                                        onClick={() => {
                                                            const newGallery = [{ url: "" }, ...content.home.gallery];
                                                            setContent((prev: any) => ({ ...prev, home: { ...prev.home, gallery: newGallery } }));
                                                        }}
                                                        className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">add</span> Add Image
                                                    </button>
                                                </div>
                                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {content.home.gallery.map((img: any, i: number) => (
                                                        <div key={i} className="relative group p-2 bg-white dark:bg-slate-800 rounded-xl border border-primary/5">
                                                            <img src={img.url} className="w-full h-32 object-cover rounded-lg mb-2" />
                                                            <input
                                                                type="text"
                                                                placeholder="URL"
                                                                value={img.url}
                                                                onChange={(e) => {
                                                                    const newGallery = [...content.home.gallery];
                                                                    newGallery[i].url = e.target.value;
                                                                    setContent((prev: any) => ({ ...prev, home: { ...prev.home, gallery: newGallery } }));
                                                                }}
                                                                className="w-full px-2 py-1 text-[10px] rounded border border-primary/10 outline-none"
                                                            />
                                                            <button
                                                                onClick={() => {
                                                                    const newGallery = content.home.gallery.filter((_: any, idx: number) => idx !== i);
                                                                    setContent((prev: any) => ({ ...prev, home: { ...prev.home, gallery: newGallery } }));
                                                                }}
                                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <span className="material-symbols-outlined text-xs">close</span>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {currentNav === "programs" && (
                        <div
                            key="programs-page"
                        >
                            <div className="sticky top-0 bg-[#f6f8f7] dark:bg-[#10221d] z-30 pb-4 pt-4 border-b border-[var(--primary)]/5 -mt-4 mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Academic Programs</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Manage the courses and programs offered by the institution.</p>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => {
                                            const newItem = { icon: "school", title: "New Program", desc: "Program description goes here" };
                                            const newItems = [...content.home.programmes.items, newItem];
                                            setContent((prev: any) => ({
                                                ...prev,
                                                home: {
                                                    ...prev.home,
                                                    programmes: { ...prev.home.programmes, items: newItems }
                                                }
                                            }));
                                        }}
                                        className="px-6 py-3 bg-[var(--primary)] text-white font-bold rounded-xl flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">add</span>
                                        <span>Add Program</span>
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="px-6 py-3 border-2 border-[var(--primary)] text-[var(--primary)] font-bold rounded-xl disabled:opacity-50"
                                    >
                                        {isSaving ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {content?.home?.programmes?.items?.map((item: any, idx: number) => (
                                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[var(--primary)]/10 shadow-sm space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="size-12 rounded-xl bg-[var(--primary)]/5 flex items-center justify-center text-[var(--primary)]">
                                                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const newItems = content.home.programmes.items.filter((_: any, i: number) => i !== idx);
                                                    setContent((prev: any) => ({
                                                        ...prev,
                                                        home: {
                                                            ...prev.home,
                                                            programmes: { ...prev.home.programmes, items: newItems }
                                                        }
                                                    }));
                                                }}
                                                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Icon Name</label>
                                                    <input
                                                        type="text"
                                                        value={item.icon}
                                                        onChange={(e) => {
                                                            const newItems = [...content.home.programmes.items];
                                                            newItems[idx].icon = e.target.value;
                                                            setContent((prev: any) => ({
                                                                ...prev,
                                                                home: {
                                                                    ...prev.home,
                                                                    programmes: { ...prev.home.programmes, items: newItems }
                                                                }
                                                            }));
                                                        }}
                                                        className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Program Title</label>
                                                    <input
                                                        type="text"
                                                        value={item.title}
                                                        onChange={(e) => {
                                                            const newItems = [...content.home.programmes.items];
                                                            newItems[idx].title = e.target.value;
                                                            setContent((prev: any) => ({
                                                                ...prev,
                                                                home: {
                                                                    ...prev.home,
                                                                    programmes: { ...prev.home.programmes, items: newItems }
                                                                }
                                                            }));
                                                        }}
                                                        className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description</label>
                                                <textarea
                                                    rows={2}
                                                    value={item.desc}
                                                    onChange={(e) => {
                                                        const newItems = [...content.home.programmes.items];
                                                        newItems[idx].desc = e.target.value;
                                                        setContent((prev: any) => ({
                                                            ...prev,
                                                            home: {
                                                                ...prev.home,
                                                                programmes: { ...prev.home.programmes, items: newItems }
                                                            }
                                                        }));
                                                    }}
                                                    className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800 resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {currentNav === "gallery" && (
                        <div
                            key="gallery-page"
                        >
                            <div className="sticky top-0 bg-[#f6f8f7] dark:bg-[#10221d] z-30 pb-4 pt-4 border-b border-[var(--primary)]/5 -mt-4 mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Image Gallery</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Manage the photos displayed in the campus life gallery.</p>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => {
                                            const newItem = { url: "" };
                                            const newItems = [...(content.home.gallery || []), newItem];
                                            setContent((prev: any) => ({
                                                ...prev,
                                                home: { ...prev.home, gallery: newItems }
                                            }));
                                        }}
                                        className="px-6 py-3 bg-[var(--primary)] text-white font-bold rounded-xl flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">add_a_photo</span>
                                        <span>Add Image</span>
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="px-6 py-3 border-2 border-[var(--primary)] text-[var(--primary)] font-bold rounded-xl disabled:opacity-50"
                                    >
                                        {isSaving ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {content?.home?.gallery?.map((item: any, idx: number) => (
                                    <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-[var(--primary)]/10 shadow-sm space-y-4 group relative">
                                        <div className="aspect-video rounded-xl bg-slate-100 overflow-hidden border border-[var(--primary)]/5 relative">
                                            {item.url ? (
                                                <img src={item.url} className="w-full h-full object-cover" alt="" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                    <span className="material-symbols-outlined text-4xl">image</span>
                                                </div>
                                            )}
                                            <button
                                                onClick={() => {
                                                    const newItems = content.home.gallery.filter((_: any, i: number) => i !== idx);
                                                    setContent((prev: any) => ({
                                                        ...prev,
                                                        home: { ...prev.home, gallery: newItems }
                                                    }));
                                                }}
                                                className="absolute top-2 right-2 bg-white/90 hover:bg-red-50 text-red-500 p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Image URL</label>
                                            <input
                                                type="text"
                                                value={item.url}
                                                onChange={(e) => {
                                                    const newItems = [...content.home.gallery];
                                                    newItems[idx].url = e.target.value;
                                                    setContent((prev: any) => ({
                                                        ...prev,
                                                        home: { ...prev.home, gallery: newItems }
                                                    }));
                                                }}
                                                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800"
                                                placeholder="Enter image URL"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentNav === "testimonials" && (
                        <div
                            key="testimonials-page"
                        >
                            <div className="sticky top-0 bg-[#f6f8f7] dark:bg-[#10221d] z-30 pb-4 pt-4 border-b border-[var(--primary)]/5 -mt-4 mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Testimonials</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Manage what students and alumni are saying.</p>
                                </div>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-6 py-3 bg-[var(--primary)] text-white font-bold rounded-xl"
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-[var(--primary)]/10 p-8 shadow-sm space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-500 mb-2">Featured Testimony / Quote</label>
                                    <textarea
                                        rows={4}
                                        value={content.home.testimonial.quote}
                                        onChange={(e) => setContent((prev: any) => ({
                                            ...prev,
                                            home: {
                                                ...prev.home,
                                                testimonial: { ...prev.home.testimonial, quote: e.target.value }
                                            }
                                        }))}
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all resize-none"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-500 mb-2">Author Name</label>
                                        <input
                                            type="text"
                                            value={content.home.testimonial.author}
                                            onChange={(e) => setContent((prev: any) => ({
                                                ...prev,
                                                home: {
                                                    ...prev.home,
                                                    testimonial: { ...prev.home.testimonial, author: e.target.value }
                                                }
                                            }))}
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-500 mb-2">Role/Batch</label>
                                        <input
                                            type="text"
                                            value={content.home.testimonial.role}
                                            onChange={(e) => setContent((prev: any) => ({
                                                ...prev,
                                                home: {
                                                    ...prev.home,
                                                    testimonial: { ...prev.home.testimonial, role: e.target.value }
                                                }
                                            }))}
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-500 mb-2">Image URL</label>
                                        <input
                                            type="text"
                                            value={content.home.testimonial.image}
                                            onChange={(e) => setContent((prev: any) => ({
                                                ...prev,
                                                home: {
                                                    ...prev.home,
                                                    testimonial: { ...prev.home.testimonial, image: e.target.value }
                                                }
                                            }))}
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentNav === "alumni" && (
                        <div
                            key="alumni-page"
                        >
                            <div className="sticky top-0 bg-[#f6f8f7] dark:bg-[#10221d] z-30 pb-4 pt-4 border-b border-[var(--primary)]/5 -mt-4 mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Alumni Profiles</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Highlight successful students and their achievements.</p>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => {
                                            const newItem = { name: "New Alumni", batch: "2024", role: "Graduate", img: "", quote: "" };
                                            const newItems = [...(content.alumni || []), newItem];
                                            setContent((prev: any) => ({ ...prev, alumni: newItems }));
                                        }}
                                        className="px-6 py-3 bg-[var(--primary)] text-white font-bold rounded-xl flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">person_add</span>
                                        <span>Add Alumni</span>
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="px-6 py-3 border-2 border-[var(--primary)] text-[var(--primary)] font-bold rounded-xl"
                                    >
                                        {isSaving ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {content?.alumni?.map((alumnus: any, idx: number) => (
                                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[var(--primary)]/10 shadow-sm space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div className="size-20 rounded-full bg-slate-100 overflow-hidden border-2 border-[var(--primary)]/20">
                                                {alumnus.img ? <img src={alumnus.img} className="w-full h-full object-cover" /> :
                                                    <div className="w-full h-full flex items-center justify-center text-[var(--primary)] bg-[var(--primary)]/5"><span className="material-symbols-outlined text-4xl">person</span></div>}
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const newItems = content.alumni.filter((_: any, i: number) => i !== idx);
                                                    setContent((prev: any) => ({ ...prev, alumni: newItems }));
                                                }}
                                                className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Name</label>
                                                <input
                                                    type="text"
                                                    value={alumnus.name}
                                                    onChange={(e) => {
                                                        const newItems = [...content.alumni];
                                                        newItems[idx].name = e.target.value;
                                                        setContent((prev: any) => ({ ...prev, alumni: newItems }));
                                                    }}
                                                    className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Batch</label>
                                                <input
                                                    type="text"
                                                    value={alumnus.batch}
                                                    onChange={(e) => {
                                                        const newItems = [...content.alumni];
                                                        newItems[idx].batch = e.target.value;
                                                        setContent((prev: any) => ({ ...prev, alumni: newItems }));
                                                    }}
                                                    className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Current Role</label>
                                                <input
                                                    type="text"
                                                    value={alumnus.role}
                                                    onChange={(e) => {
                                                        const newItems = [...content.alumni];
                                                        newItems[idx].role = e.target.value;
                                                        setContent((prev: any) => ({ ...prev, alumni: newItems }));
                                                    }}
                                                    className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Image URL</label>
                                                <input
                                                    type="text"
                                                    value={alumnus.img}
                                                    onChange={(e) => {
                                                        const newItems = [...content.alumni];
                                                        newItems[idx].img = e.target.value;
                                                        setContent((prev: any) => ({ ...prev, alumni: newItems }));
                                                    }}
                                                    className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Alumni Quote</label>
                                            <textarea
                                                rows={3}
                                                value={alumnus.quote || ""}
                                                onChange={(e) => {
                                                    const newItems = [...content.alumni];
                                                    newItems[idx].quote = e.target.value;
                                                    setContent((prev: any) => ({ ...prev, alumni: newItems }));
                                                }}
                                                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800 resize-none outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                                                placeholder="Write a short quote or testimonial..."
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentNav === "principal" && (
                        <div key="principal-page">
                            <div className="sticky top-0 bg-[#f6f8f7] dark:bg-[#10221d] z-30 pb-4 pt-4 border-b border-[var(--primary)]/5 -mt-4 mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Principal's Message</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Manage the principal's public profile and message.</p>
                                </div>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-6 py-3 bg-[var(--primary)] text-white font-bold rounded-xl shadow-lg shadow-primary/20"
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-1 space-y-6">
                                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[var(--primary)]/10 shadow-sm">
                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-4">Profile Photo</label>
                                        <div className="aspect-square rounded-2xl bg-slate-50 border-2 border-dashed border-[var(--primary)]/20 flex flex-col items-center justify-center overflow-hidden relative group">
                                            {content?.principal?.image ? (
                                                <img src={content.principal.image} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="material-symbols-outlined text-4xl text-slate-300">add_a_photo</span>
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            value={content?.principal?.image || ""}
                                            onChange={(e) => setContent((prev: any) => ({ ...prev, principal: { ...prev.principal, image: e.target.value } }))}
                                            className="w-full mt-4 px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800"
                                            placeholder="Image URL"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2 space-y-6">
                                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-[var(--primary)]/10 shadow-sm space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Principal Name</label>
                                                <input
                                                    type="text"
                                                    value={content?.principal?.name || ""}
                                                    onChange={(e) => setContent((prev: any) => ({ ...prev, principal: { ...prev.principal, name: e.target.value } }))}
                                                    className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Designation</label>
                                                <input
                                                    type="text"
                                                    value={content?.principal?.designation || ""}
                                                    onChange={(e) => setContent((prev: any) => ({ ...prev, principal: { ...prev.principal, designation: e.target.value } }))}
                                                    className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Main Message</label>
                                            <textarea
                                                rows={5}
                                                value={content?.principal?.message || ""}
                                                onChange={(e) => setContent((prev: any) => ({ ...prev, principal: { ...prev.principal, message: e.target.value } }))}
                                                className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all resize-none"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Mission Highlights</label>
                                                <textarea
                                                    rows={4}
                                                    value={content?.principal?.mission || ""}
                                                    onChange={(e) => setContent((prev: any) => ({ ...prev, principal: { ...prev.principal, mission: e.target.value } }))}
                                                    className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all resize-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Vision for Future</label>
                                                <textarea
                                                    rows={4}
                                                    value={content?.principal?.vision || ""}
                                                    onChange={(e) => setContent((prev: any) => ({ ...prev, principal: { ...prev.principal, vision: e.target.value } }))}
                                                    className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentNav === "markaz" && (
                        <div key="markaz-page">
                            <div className="sticky top-0 bg-[#f6f8f7] dark:bg-[#10221d] z-30 pb-4 pt-4 border-b border-[var(--primary)]/5 -mt-4 mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Markaz History & Info</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Update the information about Markazu Saqafathi Sunniyya.</p>
                                </div>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-6 py-3 bg-[var(--primary)] text-white font-bold rounded-xl shadow-lg shadow-primary/20"
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-[var(--primary)]/10 shadow-sm space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Section Title</label>
                                        <input
                                            type="text"
                                            value={content?.markaz?.title || ""}
                                            onChange={(e) => setContent((prev: any) => ({ ...prev, markaz: { ...prev.markaz, title: e.target.value } }))}
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all font-bold text-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Historical Background</label>
                                        <textarea
                                            rows={6}
                                            value={content?.markaz?.history || ""}
                                            onChange={(e) => setContent((prev: any) => ({ ...prev, markaz: { ...prev.markaz, history: e.target.value } }))}
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all leading-relaxed"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Current Context / Mission</label>
                                        <textarea
                                            rows={4}
                                            value={content?.markaz?.content || ""}
                                            onChange={(e) => setContent((prev: any) => ({ ...prev, markaz: { ...prev.markaz, content: e.target.value } }))}
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all leading-relaxed"
                                        />
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-[var(--primary)]/10 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-bold text-lg text-primary">Markaz Programs</h3>
                                        <button
                                            onClick={() => {
                                                const newPrograms = [...(content.markaz.programs || []), { title: "New Program", icon: "school" }];
                                                setContent((prev: any) => ({ ...prev, markaz: { ...prev.markaz, programs: newPrograms } }));
                                            }}
                                            className="text-sm font-bold text-primary flex items-center gap-1 hover:underline"
                                        >
                                            <span className="material-symbols-outlined text-sm">add</span>
                                            Add Program
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {content?.markaz?.programs?.map((program: any, idx: number) => (
                                            <div key={idx} className="p-4 rounded-xl border border-[var(--primary)]/5 bg-slate-50 dark:bg-slate-800 space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="material-symbols-outlined text-accent">{program.icon}</span>
                                                    <button
                                                        onClick={() => {
                                                            const newPrograms = content.markaz.programs.filter((_: any, i: number) => i !== idx);
                                                            setContent((prev: any) => ({ ...prev, markaz: { ...prev.markaz, programs: newPrograms } }));
                                                        }}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">close</span>
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={program.title}
                                                    onChange={(e) => {
                                                        const newPrograms = [...content.markaz.programs];
                                                        newPrograms[idx].title = e.target.value;
                                                        setContent((prev: any) => ({ ...prev, markaz: { ...prev.markaz, programs: newPrograms } }));
                                                    }}
                                                    className="w-full bg-transparent border-b border-primary/10 py-1 text-sm font-bold outline-none focus:border-primary"
                                                />
                                                <input
                                                    type="text"
                                                    value={program.icon}
                                                    onChange={(e) => {
                                                        const newPrograms = [...content.markaz.programs];
                                                        newPrograms[idx].icon = e.target.value;
                                                        setContent((prev: any) => ({ ...prev, markaz: { ...prev.markaz, programs: newPrograms } }));
                                                    }}
                                                    className="w-full bg-transparent border-b border-primary/10 py-1 text-xs text-slate-500 outline-none focus:border-primary"
                                                    placeholder="Icon name (Material Symbols)"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Portal Resources Tab */}
                    {currentNav === "portal" && (
                        <div key="portal-resources-page">
                            <div className="sticky top-0 bg-[#f6f8f7] dark:bg-[#10221d] z-30 pb-4 pt-4 border-b border-[var(--primary)]/5 -mt-4 mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Portal Resources</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Manage announcements, downloads, and student handouts.</p>
                                </div>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-6 py-3 bg-[var(--primary)] text-white font-bold rounded-xl shadow-lg hover:shadow-[var(--primary)]/20 transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined">{isSaving ? "sync" : "save"}</span>
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>

                            <div className="space-y-12">
                                {/* Announcements Section */}
                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="size-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                                            <span className="material-symbols-outlined">campaign</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Announcements</h3>
                                            <p className="text-sm text-slate-500">Live notifications shown on the student portal dashboard.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {content?.studentPortal?.announcements?.map((item: any, idx: number) => (
                                            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[var(--primary)]/10 shadow-sm relative group">
                                                <button
                                                    onClick={() => {
                                                        const newItems = content.studentPortal.announcements.filter((_: any, i: number) => i !== idx);
                                                        setContent((prev: any) => ({
                                                            ...prev,
                                                            studentPortal: { ...prev.studentPortal, announcements: newItems }
                                                        }));
                                                    }}
                                                    className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Title</label>
                                                        <input
                                                            value={item.title}
                                                            onChange={(e) => {
                                                                const newItems = [...content.studentPortal.announcements];
                                                                newItems[idx].title = e.target.value;
                                                                setContent((prev: any) => ({ ...prev, studentPortal: { ...prev.studentPortal, announcements: newItems } }));
                                                            }}
                                                            className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 text-slate-900 dark:text-white dark:bg-slate-800"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Date</label>
                                                        <input
                                                            type="date"
                                                            value={item.date}
                                                            onChange={(e) => {
                                                                const newItems = [...content.studentPortal.announcements];
                                                                newItems[idx].date = e.target.value;
                                                                setContent((prev: any) => ({ ...prev, studentPortal: { ...prev.studentPortal, announcements: newItems } }));
                                                            }}
                                                            className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 text-slate-900 dark:text-white dark:bg-slate-800"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description</label>
                                                        <textarea
                                                            rows={3}
                                                            value={item.desc}
                                                            onChange={(e) => {
                                                                const newItems = [...content.studentPortal.announcements];
                                                                newItems[idx].desc = e.target.value;
                                                                setContent((prev: any) => ({ ...prev, studentPortal: { ...prev.studentPortal, announcements: newItems } }));
                                                            }}
                                                            className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 text-slate-900 dark:text-white dark:bg-slate-800 resize-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => {
                                                const newItem = { id: Date.now().toString(), title: "New Announcement", date: new Date().toISOString().split('T')[0], desc: "Announcement details here." };
                                                const newItems = [...(content?.studentPortal?.announcements || []), newItem];
                                                setContent((prev: any) => ({ ...prev, studentPortal: { ...prev.studentPortal, announcements: newItems } }));
                                            }}
                                            className="bg-[var(--primary)]/5 hover:bg-[var(--primary)]/10 border-2 border-dashed border-[var(--primary)]/20 p-6 rounded-2xl flex flex-col items-center justify-center text-[var(--primary)] gap-2 transition-colors min-h-[250px]"
                                        >
                                            <span className="material-symbols-outlined text-4xl">add_circle</span>
                                            <span className="font-bold">Add Announcement</span>
                                        </button>
                                    </div>
                                </section>

                                {/* Handouts Section */}
                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="size-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                                            <span className="material-symbols-outlined">checklist</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Distribution Handouts</h3>
                                            <p className="text-sm text-slate-500">Physical items admitted students need to collect (e.g., ID Cards, Uniforms).</p>
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-[var(--primary)]/10 shadow-sm overflow-hidden">
                                        <div className="divide-y divide-[var(--primary)]/5">
                                            {content?.studentPortal?.handouts?.map((item: any, idx: number) => (
                                                <div key={idx} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                    <div className="flex-1 space-y-3 w-full">
                                                        <div className="flex items-center gap-3">
                                                            <input
                                                                type="text"
                                                                value={item.title}
                                                                onChange={(e) => {
                                                                    const newItems = [...content.studentPortal.handouts];
                                                                    newItems[idx].title = e.target.value;
                                                                    setContent((prev: any) => ({ ...prev, studentPortal: { ...prev.studentPortal, handouts: newItems } }));
                                                                }}
                                                                className="flex-1 font-bold text-slate-900 dark:text-white bg-transparent border-b border-transparent focus:border-[var(--primary)] outline-none px-1 py-0.5"
                                                                placeholder="Item Title"
                                                            />
                                                            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={item.isRequired}
                                                                    onChange={(e) => {
                                                                        const newItems = [...content.studentPortal.handouts];
                                                                        newItems[idx].isRequired = e.target.checked;
                                                                        setContent((prev: any) => ({ ...prev, studentPortal: { ...prev.studentPortal, handouts: newItems } }));
                                                                    }}
                                                                    className="rounded text-[var(--primary)] focus:ring-[var(--primary)] accent-[var(--primary)]"
                                                                />
                                                                Required Task
                                                            </label>
                                                        </div>
                                                        <input
                                                            value={item.desc}
                                                            onChange={(e) => {
                                                                const newItems = [...content.studentPortal.handouts];
                                                                newItems[idx].desc = e.target.value;
                                                                setContent((prev: any) => ({ ...prev, studentPortal: { ...prev.studentPortal, handouts: newItems } }));
                                                            }}
                                                            className="w-full text-sm text-slate-500 bg-transparent border-b border-transparent focus:border-[var(--primary)] outline-none px-1 py-0.5"
                                                            placeholder="Instructions for collection..."
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            const newItems = content.studentPortal.handouts.filter((_: any, i: number) => i !== idx);
                                                            setContent((prev: any) => ({ ...prev, studentPortal: { ...prev.studentPortal, handouts: newItems } }));
                                                        }}
                                                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg shrink-0 self-end sm:self-auto"
                                                    >
                                                        <span className="material-symbols-outlined">delete_sweep</span>
                                                    </button>
                                                </div>
                                            ))}
                                            <div className="p-4 bg-slate-50 dark:bg-slate-800/20">
                                                <button
                                                    onClick={() => {
                                                        const newItem = { id: Date.now().toString(), title: "New Handout", desc: "Description here.", isRequired: true };
                                                        const newItems = [...(content?.studentPortal?.handouts || []), newItem];
                                                        setContent((prev: any) => ({ ...prev, studentPortal: { ...prev.studentPortal, handouts: newItems } }));
                                                    }}
                                                    className="text-sm font-bold text-[var(--primary)] flex items-center gap-2 hover:underline"
                                                >
                                                    <span className="material-symbols-outlined text-lg">add</span>
                                                    Add Checklist Item
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Downloads Section */}
                                <section className="pb-12">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="size-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                                            <span className="material-symbols-outlined">download</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Downloadable Documents</h3>
                                            <p className="text-sm text-slate-500">Add PDF schedules, maps, and study materials for students.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {content?.studentPortal?.downloads?.map((item: any, idx: number) => (
                                            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[var(--primary)]/10 shadow-sm flex flex-col md:flex-row gap-6 relative group">
                                                <div className="flex-1 space-y-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Document Title</label>
                                                        <input
                                                            value={item.title}
                                                            onChange={(e) => {
                                                                const newItems = [...content.studentPortal.downloads];
                                                                newItems[idx].title = e.target.value;
                                                                setContent((prev: any) => ({ ...prev, studentPortal: { ...prev.studentPortal, downloads: newItems } }));
                                                            }}
                                                            className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 text-slate-900 dark:text-white dark:bg-slate-800"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">File URL</label>
                                                        <input
                                                            placeholder="https://..."
                                                            value={item.fileUrl}
                                                            onChange={(e) => {
                                                                const newItems = [...content.studentPortal.downloads];
                                                                newItems[idx].fileUrl = e.target.value;
                                                                setContent((prev: any) => ({ ...prev, studentPortal: { ...prev.studentPortal, downloads: newItems } }));
                                                            }}
                                                            className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 text-slate-900 dark:text-white dark:bg-slate-800"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description</label>
                                                        <input
                                                            value={item.desc}
                                                            onChange={(e) => {
                                                                const newItems = [...content.studentPortal.downloads];
                                                                newItems[idx].desc = e.target.value;
                                                                setContent((prev: any) => ({ ...prev, studentPortal: { ...prev.studentPortal, downloads: newItems } }));
                                                            }}
                                                            className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 text-slate-900 dark:text-white dark:bg-slate-800"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const newItems = content.studentPortal.downloads.filter((_: any, i: number) => i !== idx);
                                                        setContent((prev: any) => ({ ...prev, studentPortal: { ...prev.studentPortal, downloads: newItems } }));
                                                    }}
                                                    className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        ))}
                                        {/* Add Button */}
                                        <button
                                            onClick={() => {
                                                const newItem = { id: Date.now().toString(), title: "New Document", desc: "Description...", fileUrl: "#", type: "document" };
                                                const newItems = [...(content?.studentPortal?.downloads || []), newItem];
                                                setContent((prev: any) => ({ ...prev, studentPortal: { ...prev.studentPortal, downloads: newItems } }));
                                            }}
                                            className="bg-[var(--primary)]/5 hover:bg-[var(--primary)]/10 border-2 border-dashed border-[var(--primary)]/20 p-6 rounded-2xl flex flex-col items-center justify-center text-[var(--primary)] gap-2 transition-colors min-h-[220px]"
                                        >
                                            <span className="material-symbols-outlined text-4xl">post_add</span>
                                            <span className="font-bold">Add Downloadable File</span>
                                        </button>
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}

                    {/* Fallback for other nav items */}
                    {!["dashboard", "content", "programs", "news", "gallery", "admissions", "testimonials", "alumni", "collaborators", "contact", "portal"].includes(currentNav) && (
                        <div
                            className="flex flex-col items-center justify-center h-full text-center py-20"
                        >
                            <div className="size-20 bg-[var(--primary)]/5 rounded-full flex items-center justify-center text-[var(--primary)] mb-4">
                                <span className="material-symbols-outlined text-4xl">construction</span>
                            </div>
                            <h3 className="text-xl font-bold text-[var(--primary)]">{navItems.find(n => n.id === currentNav)?.label} Mode</h3>
                            <p className="text-slate-500 mt-2">This module is currently under development.</p>
                        </div>
                    )}
                    {currentNav === "collaborators" && (
                        <div
                            key="collaborators-page"
                        >
                            <div className="sticky top-0 bg-[#f6f8f7] dark:bg-[#10221d] z-30 pb-4 pt-4 border-b border-[var(--primary)]/5 -mt-4 mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Collaborators</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Manage institutional partners and display logos.</p>
                                </div>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-6 py-3 bg-[var(--primary)] text-white font-bold rounded-xl"
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {content?.home?.collaborators?.map((collab: any, idx: number) => (
                                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[var(--primary)]/10 shadow-sm space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="size-16 rounded-xl bg-white border border-slate-100 p-2 flex items-center justify-center">
                                                <img src={collab.img} className="max-w-full max-h-full object-contain" />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const newItems = content.home.collaborators.filter((_: any, i: number) => i !== idx);
                                                    setContent((prev: any) => ({
                                                        ...prev,
                                                        home: { ...prev.home, collaborators: newItems }
                                                    }));
                                                }}
                                                className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Partner Name</label>
                                                <input
                                                    type="text"
                                                    value={collab.name}
                                                    onChange={(e) => {
                                                        const newItems = [...content.home.collaborators];
                                                        newItems[idx].name = e.target.value;
                                                        setContent((prev: any) => ({
                                                            ...prev,
                                                            home: { ...prev.home, collaborators: newItems }
                                                        }));
                                                    }}
                                                    className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Logo URL</label>
                                                <input
                                                    type="text"
                                                    value={collab.img}
                                                    onChange={(e) => {
                                                        const newItems = [...content.home.collaborators];
                                                        newItems[idx].img = e.target.value;
                                                        setContent((prev: any) => ({
                                                            ...prev,
                                                            home: { ...prev.home, collaborators: newItems }
                                                        }));
                                                    }}
                                                    className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)]/10 bg-slate-50 dark:bg-slate-800"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        const newItem = { name: "New Partner", img: "" };
                                        const newItems = [...(content.home.collaborators || []), newItem];
                                        setContent((prev: any) => ({
                                            ...prev,
                                            home: { ...prev.home, collaborators: newItems }
                                        }));
                                    }}
                                    className="border-2 border-dashed border-[var(--primary)]/20 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-400 hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition-all"
                                >
                                    <span className="material-symbols-outlined text-4xl mb-2">add</span>
                                    <span className="font-bold">Add Partner</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {currentNav === "contact" && (
                        <div
                            key="contact-page"
                        >
                            <div className="sticky top-0 bg-[#f6f8f7] dark:bg-[#10221d] z-30 pb-4 pt-4 border-b border-[var(--primary)]/5 -mt-4 mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Contact Details</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Update the institution's contact information and social links.</p>
                                </div>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-8 py-3 bg-[var(--primary)] text-white font-bold rounded-xl shadow-lg"
                                >
                                    {isSaving ? "Saving..." : "Save Details"}
                                </button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-[var(--primary)]/10 p-8 shadow-sm space-y-6">
                                    <h3 className="text-lg font-bold text-[var(--primary)] mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined">location_on</span> Basic Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-500 mb-2">Mailing Address</label>
                                            <textarea
                                                rows={3}
                                                value={content?.contact?.address || ""}
                                                onChange={(e) => setContent((prev: any) => ({
                                                    ...prev,
                                                    contact: { ...(prev.contact || {}), address: e.target.value }
                                                }))}
                                                className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all resize-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-500 mb-2">Phone Number</label>
                                                <input
                                                    type="text"
                                                    value={content?.contact?.phone || ""}
                                                    onChange={(e) => setContent((prev: any) => ({
                                                        ...prev,
                                                        contact: { ...(prev.contact || {}), phone: e.target.value }
                                                    }))}
                                                    className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-slate-500 mb-2">Email Address</label>
                                                <input
                                                    type="text"
                                                    value={content?.contact?.email || ""}
                                                    onChange={(e) => setContent((prev: any) => ({
                                                        ...prev,
                                                        contact: { ...(prev.contact || {}), email: e.target.value }
                                                    }))}
                                                    className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-[var(--primary)]/10 p-8 shadow-sm space-y-6">
                                    <h3 className="text-lg font-bold text-[var(--primary)] mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined">share</span> Social Presence
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-500 mb-2">WhatsApp Number</label>
                                            <input
                                                type="text"
                                                value={content?.contact?.socials?.whatsapp || ""}
                                                onChange={(e) => setContent((prev: any) => ({
                                                    ...prev,
                                                    contact: {
                                                        ...(prev.contact || {}),
                                                        socials: { ...(prev.contact?.socials || {}), whatsapp: e.target.value }
                                                    }
                                                }))}
                                                className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-500 mb-2">Facebook Page</label>
                                            <input
                                                type="text"
                                                value={content?.contact?.socials?.facebook || ""}
                                                onChange={(e) => setContent((prev: any) => ({
                                                    ...prev,
                                                    contact: {
                                                        ...(prev.contact || {}),
                                                        socials: { ...(prev.contact?.socials || {}), facebook: e.target.value }
                                                    }
                                                }))}
                                                className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-500 mb-2">Instagram Handle</label>
                                            <input
                                                type="text"
                                                value={content?.contact?.socials?.instagram || ""}
                                                onChange={(e) => setContent((prev: any) => ({
                                                    ...prev,
                                                    contact: {
                                                        ...(prev.contact || {}),
                                                        socials: { ...(prev.contact?.socials || {}), instagram: e.target.value }
                                                    }
                                                }))}
                                                className="w-full px-4 py-3 rounded-xl border border-[var(--primary)]/10 bg-[#f6f8f7] dark:bg-emerald-950/20 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main >
        </div >
    );
}
