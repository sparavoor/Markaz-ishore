import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { mobileNumber, dateOfBirth } = await request.json();

        if (!mobileNumber || !dateOfBirth) {
            return NextResponse.json({ error: "Mobile number and Date of Birth are required" }, { status: 400 });
        }

        // Find the student matching the credentials
        const student = await prisma.admission.findFirst({
            where: {
                mobileNumber,
                dateOfBirth,
            },
        });

        if (!student) {
            return NextResponse.json({ error: "Invalid credentials. Need help? Contact the administration." }, { status: 401 });
        }

        // Authentication successful: set cookie
        const cookieStore = await cookies();
        cookieStore.set("studentToken", student.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return NextResponse.json({
            success: true,
            user: {
                id: student.id,
                studentName: student.studentName,
                department: student.department,
            },
        });
    } catch (error) {
        console.error("Student Auth Error:", error);
        return NextResponse.json({ error: "An error occurred during authentication" }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("studentToken");
        return NextResponse.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
    }
}
