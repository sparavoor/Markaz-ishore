import { NextResponse } from "next/server";
import { getAllAdmissions, createAdmission, updateAdmissionStatus, deleteAdmission } from "@/lib/persistence";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const admissions = await getAllAdmissions();
        return NextResponse.json(admissions);
    } catch (error) {
        console.error("Failed to read admissions:", error);
        return NextResponse.json({ error: "Failed to read admissions" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newAdmission = await request.json();

        // Generate random 6-digit number for admission
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        const admissionNumber = `i-${randomNum}`;

        let photoPath: string | null = null;

        // Handle Photo Upload
        if (newAdmission.photoBase64 && newAdmission.photoName) {
            try {
                const uploadDir = path.join(process.cwd(), "public", "uploads", "admissions");
                await fs.mkdir(uploadDir, { recursive: true });

                const base64Data = newAdmission.photoBase64.replace(/^data:image\/\w+;base64,/, "");
                const ext = newAdmission.photoName.split('.').pop() || 'jpg';
                const fileName = `${admissionNumber}-${Date.now()}.${ext}`;
                const filePath = path.join(uploadDir, fileName);

                await fs.writeFile(filePath, base64Data, "base64");
                photoPath = `/uploads/admissions/${fileName}`;
            } catch (err) {
                console.error("Error saving photo:", err);
            }
        }

        const admissionData = {
            admissionNumber,
            studentName: newAdmission.studentName || "",
            fatherName: newAdmission.fatherName || null,
            motherName: newAdmission.motherName || null,
            mobileNumber: newAdmission.mobileNumber || "",
            dateOfBirth: newAdmission.dateOfBirth || "",
            gender: newAdmission.gender || null,
            email: newAdmission.email || null,
            state: newAdmission.state || null,
            district: newAdmission.district || null,
            address: newAdmission.fullAddress || newAdmission.address || null,
            lastInstitution: newAdmission.lastInstitution || null,
            department: newAdmission.department || null,
            status: "Pending",
            photoPath,
            extraData: {
                aadharNumber: newAdmission.aadharNumber || "",
                whatsappNumber: newAdmission.whatsappNumber || "",
            }
        };

        const admission = await createAdmission(admissionData);

        return NextResponse.json({ success: true, id: (admission as any).id, admissionNumber: (admission as any).admissionNumber, data: admission });
    } catch (error) {
        console.error("Failed to handle admission application:", error);
        return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const { id, status } = await request.json();

        if (!id || !status) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await updateAdmissionStatus(id, status);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update admission status:", error);
        return NextResponse.json({ error: "Failed to update admission" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const id = body.id;

        if (!id) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 });
        }

        await deleteAdmission(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete API Error:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}

