"use client";

export default function Header({ student }: { student: any }) {
    if (!student) return null;

    return (
        <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-primary/10 px-8 flex items-center justify-between sticky top-0 z-10 shrink-0">
            <div className="flex items-center bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/10 w-96">
                <span className="material-symbols-outlined text-primary/60 text-xl">search</span>
                <input className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400 outline-none" placeholder="Search portal..." type="text" />
            </div>
            <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/5 text-slate-600 relative">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
                </button>
                <div className="h-8 w-[1px] bg-primary/10"></div>
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold leading-none">{student.studentName}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-semibold">Reg: {student.id.substring(0, 8).toUpperCase()}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-accent object-cover bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                        {student.photoName ? (
                            <span className="material-symbols-outlined text-primary">person</span>
                        ) : (
                            <span className="material-symbols-outlined text-primary">person</span>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
