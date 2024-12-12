import prisma from "@/server/prisma";

export default async function handler(req, res) {
    const sectionToBeDeleted = await prisma.section.findUnique({
        where: {
            id: Number(req.query.sectionId),
        },
        select: {
            index: true,
            chapterId: true,
            units: {
                select: {
                    id: true,
                },
            },
        },
    });

    if (sectionToBeDeleted.units.length > 0) {
        return res.status(400).json({ success: false, message: "Section contains units." });
    }

    await prisma.$transaction([
        prisma.section.delete({
            where: {
                id: Number(req.query.sectionId),
            },
        }),
        prisma.section.updateMany({
            where: {
                chapterId: sectionToBeDeleted.chapterId,
                index: {
                    gt: sectionToBeDeleted.index,
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