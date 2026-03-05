import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // Fetch all sections from the database
        const sections = await prisma.siteContent.findMany();
        const newsItems = await prisma.newsItem.findMany({ orderBy: { createdAt: "asc" } });
        const galleryImages = await prisma.galleryImage.findMany({ orderBy: { createdAt: "asc" } });
        const alumniList = await prisma.alumni.findMany({ orderBy: { createdAt: "asc" } });

        // Build the content object matching the old JSON structure
        const sectionMap: Record<string, any> = {};
        for (const s of sections) {
            sectionMap[s.section] = s.data;
        }

        const content: any = {
            home: {
                hero: sectionMap["home_hero"] || {},
                about: sectionMap["home_about"] || {},
                philosophy: sectionMap["home_philosophy"] || {},
                programmes: sectionMap["home_programmes"] || {},
                collaborators: sectionMap["home_collaborators"] || [],
                testimonial: sectionMap["home_testimonial"] || {},
                news: newsItems.map((n) => ({
                    id: n.id,
                    title: n.title,
                    date: n.date,
                    img: n.img,
                    content: n.content,
                })),
                gallery: galleryImages.map((g) => ({
                    id: g.id,
                    url: g.url,
                })),
            },
            about: sectionMap["about"] || {},
            alumni: alumniList.map((a) => ({
                id: a.id,
                name: a.name,
                batch: a.batch,
                role: a.role,
                img: a.img,
                quote: a.quote,
            })),
            contact: sectionMap["contact"] || {},
            studentPortal: sectionMap["studentPortal"] || {},
            principal: sectionMap["principal"] || {},
            markaz: sectionMap["markaz"] || {},
        };

        return NextResponse.json(content);
    } catch (error) {
        console.error("Failed to read content:", error);
        return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newContent = await request.json();

        // Update SiteContent sections
        const sectionUpdates: { section: string; data: any }[] = [
            { section: "home_hero", data: newContent.home?.hero },
            { section: "home_about", data: newContent.home?.about },
            { section: "home_philosophy", data: newContent.home?.philosophy },
            { section: "home_programmes", data: newContent.home?.programmes },
            { section: "home_collaborators", data: newContent.home?.collaborators },
            { section: "home_testimonial", data: newContent.home?.testimonial },
            { section: "about", data: newContent.about },
            { section: "contact", data: newContent.contact },
            { section: "principal", data: newContent.principal },
            { section: "markaz", data: newContent.markaz },
            { section: "studentPortal", data: newContent.studentPortal },
        ];

        for (const s of sectionUpdates) {
            if (s.data !== undefined) {
                await prisma.siteContent.upsert({
                    where: { section: s.section },
                    update: { data: s.data },
                    create: { section: s.section, data: s.data },
                });
            }
        }

        // Update News Items — full replacement
        if (newContent.home?.news) {
            // Get existing IDs
            const existing = await prisma.newsItem.findMany({ select: { id: true } });
            const existingIds = new Set(existing.map((n) => n.id));
            const newIds = new Set(newContent.home.news.map((n: any) => n.id).filter(Boolean));

            // Delete removed items
            for (const id of existingIds) {
                if (!newIds.has(id)) {
                    await prisma.newsItem.delete({ where: { id } });
                }
            }

            // Upsert all items
            for (const news of newContent.home.news) {
                if (news.id) {
                    await prisma.newsItem.upsert({
                        where: { id: news.id },
                        update: { title: news.title, date: news.date, img: news.img, content: news.content },
                        create: { id: news.id, title: news.title, date: news.date, img: news.img, content: news.content },
                    });
                } else {
                    await prisma.newsItem.create({
                        data: { title: news.title, date: news.date, img: news.img, content: news.content },
                    });
                }
            }
        }

        // Update Gallery Images — full replacement
        if (newContent.home?.gallery) {
            await prisma.galleryImage.deleteMany();
            for (const img of newContent.home.gallery) {
                await prisma.galleryImage.create({
                    data: { url: img.url },
                });
            }
        }

        // Update Alumni — full replacement
        if (newContent.alumni) {
            await prisma.alumni.deleteMany();
            for (const a of newContent.alumni) {
                await prisma.alumni.create({
                    data: {
                        name: a.name || "",
                        batch: a.batch || "",
                        role: a.role || "",
                        img: a.img || "",
                        quote: a.quote || "",
                    },
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update content:", error);
        return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
    }
}
