import prisma from "@/server/prisma";

export default async function handler(req, res) {
    if (!req.body.renameValue) {
        return res.status(400).json({ success: false, message: "No name provided." });
    }

    await prisma.section.update({
        where: {
            id: Number(req.query.sectionId),
        },
        data: {
            name: req.body.renameValue,
        },
    });

    return res.status(200).json({ success: true });
}