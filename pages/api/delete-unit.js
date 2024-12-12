import prisma from "@/server/prisma";

export default async function handler(req, res) {
    const unitToBeDeleted = await prisma.unit.findUnique({
        where: {
            id: Number(req.query.unitId),
        },
        select: {
            index: true,
            sectionId: true,
            parts: {
                select: {
                    id: true,
                },
            },
        },
    });

    if (unitToBeDeleted.parts.length > 0) {
        return res.status(400).json({ success: false, message: "Unit contains parts." });
    }

    await prisma.$transaction([
        prisma.unit.delete({
            where: {
                id: Number(req.query.unitId),
            },
        }),
        prisma.unit.updateMany({
            where: {
                sectionId: unitToBeDeleted.sectionId,
                index: {
                    gt: unitToBeDeleted.index,
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