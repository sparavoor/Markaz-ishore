import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { mobileNumber, dateOfBirth } = await req.json();

        if (!mobileNumber || !dateOfBirth) {
            return NextResponse.json({ success: false, message: "Missing credentials" }, { status: 400 });
        }

        // Parse DD/MM/YYYY to YYYY-MM-DD for comparison
        const parts = dateOfBirth.split("/");
        let formattedDob = dateOfBirth;
        if (parts.length === 3) {
            formattedDob = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
        }

        const student = await prisma.admission.findFirst({
            where: {
                mobileNumber,
                dateOfBirth: formattedDob,
            },
        });

        if (student) {
            const response = NextResponse.json({
                success: true,
                message: "Login successful",
                studentId: student.id,
            });

            response.cookies.set("student_id", student.id, {
                path: "/",
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: "lax",
            });

            response.cookies.set("student_name", student.studentName, {
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            });

            return response;
        } else {
            return NextResponse.json(
                { success: false, message: "Invalid credentials. Please check your mobile number and Date of Birth." },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
