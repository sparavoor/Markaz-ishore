import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as fs from "fs";
import * as path from "path";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Seeding database...");

    // Read content.json
    const contentPath = path.join(process.cwd(), "src/data/content.json");
    const content = JSON.parse(fs.readFileSync(contentPath, "utf-8"));

    // --- Seed SiteContent ---
    const sections: { section: string; data: any }[] = [
        { section: "home_hero", data: content.home.hero },
        { section: "home_about", data: content.home.about },
        { section: "home_philosophy", data: content.home.philosophy },
        { section: "home_programmes", data: content.home.programmes },
        { section: "home_collaborators", data: content.home.collaborators },
        { section: "home_testimonial", data: content.home.testimonial },
        { section: "about", data: content.about },
        { section: "contact", data: content.contact },
        { section: "principal", data: content.principal },
        { section: "markaz", data: content.markaz },
        { section: "studentPortal", data: content.studentPortal },
    ];

    for (const s of sections) {
        await prisma.siteContent.upsert({
            where: { section: s.section },
            update: { data: s.data },
            create: { section: s.section, data: s.data },
        });
        console.log(`  ✅ Section: ${s.section}`);
    }

    // --- Seed News Items ---
    if (content.home.news && content.home.news.length > 0) {
        for (const news of content.home.news) {
            await prisma.newsItem.upsert({
                where: { id: news.id },
                update: { title: news.title, date: news.date, img: news.img, content: news.content },
                create: { id: news.id, title: news.title, date: news.date, img: news.img, content: news.content },
            });
        }
        console.log(`  ✅ News items: ${content.home.news.length}`);
    }

    // --- Seed Gallery Images ---
    if (content.home.gallery && content.home.gallery.length > 0) {
        // Clear existing gallery
        await prisma.galleryImage.deleteMany();
        for (const img of content.home.gallery) {
            await prisma.galleryImage.create({
                data: { url: img.url },
            });
        }
        console.log(`  ✅ Gallery images: ${content.home.gallery.length}`);
    }

    // --- Seed Alumni ---
    if (content.alumni && content.alumni.length > 0) {
        await prisma.alumni.deleteMany();
        for (const a of content.alumni) {
            await prisma.alumni.create({
                data: { name: a.name, batch: a.batch, role: a.role || "", img: a.img || "", quote: a.quote || "" },
            });
        }
        console.log(`  ✅ Alumni: ${content.alumni.length}`);
    }

    // --- Seed Admissions ---
    const admissionsPath = path.join(process.cwd(), "src/data/admissions.json");
    if (fs.existsSync(admissionsPath)) {
        const admissions = JSON.parse(fs.readFileSync(admissionsPath, "utf-8"));
        if (admissions.length > 0) {
            for (const a of admissions) {
                await prisma.admission.upsert({
                    where: { id: a.id },
                    update: {},
                    create: {
                        id: a.id,
                        admissionNumber: a.admissionNumber || `i-${Math.floor(100000 + Math.random() * 900000)}`,
                        studentName: a.studentName || "",
                        fatherName: a.fatherName || null,
                        motherName: a.motherName || null,
                        mobileNumber: a.mobileNumber || "",
                        dateOfBirth: a.dateOfBirth || "",
                        gender: a.gender || null,
                        email: a.email || null,
                        state: a.state || null,
                        district: a.district || null,
                        address: a.address || null,
                        lastInstitution: a.lastInstitution || null,
                        department: a.department || null,
                        status: a.status || "Pending",
                        photoPath: a.photoPath || null,
                        remarks: a.remarks || null,
                        createdAt: a.createdAt ? new Date(a.createdAt) : new Date(),
                    },
                });
            }
            console.log(`  ✅ Admissions: ${admissions.length}`);
        }
    }

    console.log("✨ Seeding complete!");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
