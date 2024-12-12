import prisma from "@/server/prisma";

export default async function handler(req, res) {
    const partToBeDeleted = await prisma.part.findUnique({
        where: {
            id: Number(req.query.partId),
        },
        select: {
            index: true,
            unitId: true,
        },
    });

    await prisma.$transaction([
        prisma.part.delete({
            where: {
                id: Number(req.query.partId),
            },
        }),
        prisma.part.updateMany({
            where: {
                unitId: partToBeDeleted.unitId,
                index: {
                    gt: partToBeDeleted.index,
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