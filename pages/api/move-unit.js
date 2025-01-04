import prisma from "@/server/prisma";

export default async function handler(req, res) {
    const unitCount = await prisma.unit.count({
        where: {
            sectionId: Number(req.query.sectionId),
        },
    });

    if (
        isNaN(req.body.target) ||
        req.body.target !== Math.round(req.body.target) ||
        req.body.target < 0 ||
        req.body.target > unitCount
    ) {
        return res.status(400).json({ success: false, message: "Invalid target." });
    }

    if (
        req.body.target === req.body.origin ||
        req.body.target === req.body.origin + 1
    ) {
        return res.status(200).json({ success: true });
    }

    if (req.body.target > req.body.origin) {
        await prisma.$transaction([
            prisma.unit.updateMany({
                where: {
                    sectionId: Number(req.query.sectionId),
                    index: {
                        gt: req.body.origin,
                        lt: req.body.target,
                    },
                },
                data: {
                    index: {
                        decrement: 1,
                    },
                },
            }),
            prisma.unit.update({
                where: {
                    id: Number(req.query.unitId),
                },
                data: {
                    index: req.body.target - 1,
                },
            }),
        ]);
    }

    if (req.body.target < req.body.origin) {
        await prisma.$transaction([
            prisma.unit.updateMany({
                where: {
                    sectionId: Number(req.query.sectionId),
                    index: {
                        gt: req.body.target - 1,
                        lt: req.body.origin,
                    },
                },
                data: {
                    index: {
                        increment: 1,
                    },
                },
            }),
            prisma.unit.updateMany({
                where: {
                    id: Number(req.query.unitId),
                },
                data: {
                    index: req.body.target,
                },
            }),
        ]);
    }

    return res.status(200).json({ success: true });
};