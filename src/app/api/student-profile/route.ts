import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const studentToken = cookieStore.get("studentToken")?.value;

        if (!studentToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const student = await prisma.admission.findUnique({
            where: { id: studentToken },
        });

        if (!student) {
            cookieStore.delete("studentToken");
            return NextResponse.json({ error: "Student not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            student,
        });
    } catch (error) {
        console.error("Student Profile Error:", error);
        return NextResponse.json({ error: "An error occurred while fetching profile" }, { status: 500 });
    }
}
