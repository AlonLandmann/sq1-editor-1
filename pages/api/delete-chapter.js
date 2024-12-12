import prisma from "@/server/prisma";

export default async function handler(req, res) {
    const chapterToBeDeleted = await prisma.chapter.findUnique({
        where: {
            id: Number(req.query.chapterId),
        },
        select: {
            index: true,
            sections: {
                select: {
                    id: true,
                },
            },
        },
    });

    if (chapterToBeDeleted.sections.length > 0) {
        return res.status(400).json({ success: false, message: "Chapter contains sections." });
    }

    await prisma.$transaction([
        prisma.chapter.delete({
            where: {
                id: Number(req.query.chapterId),
            },
        }),
        prisma.chapter.updateMany({
            where: {
                index: {
                    gt: chapterToBeDeleted.index,
                },
            },
            data: {
                index: {
                    decrement: 1,
                },
            },
        }),
    ]);

    return res.status(200).json({ success: true });
};