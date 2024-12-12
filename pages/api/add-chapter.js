import prisma from "@/server/prisma";

export default async function handler(req, res) {
    const chapterCount = await prisma.chapter.count();

    await prisma.chapter.create({
        data: {
            index: chapterCount,
        },
    });

    return res.status(200).json({ success: true });
};