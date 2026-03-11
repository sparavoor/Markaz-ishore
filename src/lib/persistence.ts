import { prisma } from "./prisma";
import fs from "fs/promises";
import path from "path";

const ADMISSIONS_FILE = path.join(process.cwd(), "src", "data", "admissions.json");

export async function getAllAdmissions() {
    try {
        const admissions = await prisma.admission.findMany({
            orderBy: { createdAt: "desc" },
        });
        return admissions;
    } catch (error) {
        console.warn("Prisma failed, falling back to JSON:", error);
        try {
            const data = await fs.readFile(ADMISSIONS_FILE, "utf-8");
            return JSON.parse(data);
        } catch (fileError) {
            console.error("JSON fallback failed:", fileError);
            return [];
        }
    }
}

export async function createAdmission(data: any) {
    let prismaResult = null;
    try {
        prismaResult = await prisma.admission.create({ data });
    } catch (error) {
        console.warn("Prisma create failed, will save to JSON only:", error);
    }

    // Always sync to JSON as well for robustness
    try {
        const fileData = await fs.readFile(ADMISSIONS_FILE, "utf-8");
        const admissions = JSON.parse(fileData);

        const newEntry = prismaResult || {
            ...data,
            id: data.id || Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            status: data.status || "Pending",
        };

        admissions.unshift(newEntry);
        await fs.writeFile(ADMISSIONS_FILE, JSON.stringify(admissions, null, 2));
        return newEntry;
    } catch (error) {
        console.error("Failed to sync to JSON:", error);
        if (!prismaResult) throw error;
        return prismaResult;
    }
}

export async function updateAdmissionStatus(id: string, status: string) {
    try {
        await prisma.admission.update({
            where: { id },
            data: { status },
        });
    } catch (error) {
        console.warn("Prisma update failed, updating JSON only:", error);
    }

    try {
        const fileData = await fs.readFile(ADMISSIONS_FILE, "utf-8");
        const admissions = JSON.parse(fileData);
        const index = admissions.findIndex((a: any) => a.id === id);
        if (index !== -1) {
            admissions[index].status = status;
            await fs.writeFile(ADMISSIONS_FILE, JSON.stringify(admissions, null, 2));
        }
    } catch (error) {
        console.error("Failed to update JSON:", error);
    }
}

export async function deleteAdmission(id: string) {
    try {
        await prisma.admission.delete({ where: { id } });
    } catch (error) {
        console.warn("Prisma delete failed, deleting from JSON only:", error);
    }

    try {
        const fileData = await fs.readFile(ADMISSIONS_FILE, "utf-8");
        let admissions = JSON.parse(fileData);
        admissions = admissions.filter((a: any) => a.id !== id);
        await fs.writeFile(ADMISSIONS_FILE, JSON.stringify(admissions, null, 2));
    } catch (error) {
        console.error("Failed to delete from JSON:", error);
    }
}

export async function getAdmissionById(id: string) {
    try {
        const student = await prisma.admission.findUnique({
            where: { id },
        });
        if (student) return student;
    } catch (error) {
        console.warn("Prisma findUnique failed, falling back to JSON:", error);
    }

    try {
        const data = await fs.readFile(ADMISSIONS_FILE, "utf-8");
        const admissions = JSON.parse(data);
        return admissions.find((a: any) => a.id === id);
    } catch (fileError) {
        console.error("JSON findById fallback failed:", fileError);
        return null;
    }
}

export async function findStudentByCredentials(mobileNumber: string, formattedDob: string) {
    try {
        const student = await prisma.admission.findFirst({
            where: {
                mobileNumber,
                dateOfBirth: formattedDob,
            },
        });
        if (student) return student;
    } catch (error) {
        console.warn("Prisma login failed, falling back to JSON:", error);
    }

    try {
        const data = await fs.readFile(ADMISSIONS_FILE, "utf-8");
        const admissions = JSON.parse(data);
        return admissions.find((a: any) =>
            a.mobileNumber === mobileNumber && a.dateOfBirth === formattedDob
        );
    } catch (fileError) {
        console.error("JSON login fallback failed:", fileError);
        return null;
    }
}

