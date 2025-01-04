import prisma from "@/server/prisma";

export default async function handler(req, res) {
    const sectionCount = await prisma.section.count({
        where: {
            chapterId: Number(req.query.chapterId),
        },
    });

    if (
        isNaN(req.body.target) ||
        req.body.target !== Math.round(req.body.target) ||
        req.body.target < 0 ||
        req.body.target > sectionCount
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
            prisma.section.updateMany({
                where: {
                    chapterId: Number(req.query.chapterId),
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
            prisma.section.update({
                where: {
                    id: Number(req.query.sectionId),
                },
                data: {
                    index: req.body.target - 1,
                },
            }),
        ]);
    }

    if (req.body.target < req.body.origin) {
        await prisma.$transaction([
            prisma.section.updateMany({
                where: {
                    chapterId: Number(req.query.chapterId),
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
            prisma.section.updateMany({
                where: {
                    id: Number(req.query.sectionId),
                },
                data: {
                    index: req.body.target,
                },
            }),
        ]);
    }

    return res.status(200).json({ success: true });
};