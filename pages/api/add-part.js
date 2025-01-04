import prisma from "@/server/prisma";

export default async function handler(req, res) {
    const partCount = await prisma.part.count({
        where: {
            unitId: Number(req.query.unitId),
        },
    });

    await prisma.part.create({
        data: {
            index: partCount,
            unitId: Number(req.query.unitId),
            content: "---",
        },
    });

    return res.status(200).json({ success: true });
}