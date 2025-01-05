import prisma from "@/server/prisma";

export default async function handler(req, res) {
    if (!["n", "d", "a", "t", "tx", "e", "p"].includes(req.query.type)) {
        return res.status(400).json({ success: false, message: "Invalid unit type." });
    }

    const unitCount = await prisma.unit.count({
        where: {
            sectionId: Number(req.query.sectionId),
        },
    });

    const data = {
        index: unitCount,
        sectionId: Number(req.query.sectionId),
    };

    if (req.query.type === "n") {
        data.type = "notion";
        data.name = "Name";
        data.content = "---";
    }

    if (req.query.type === "d") {
        data.type = "definition";
        data.name = "Name";
        data.content = "---";
    }

    if (req.query.type === "a") {
        data.type = "axiom";
        data.name = "Name";
        data.content = "---";
    }

    if (req.query.type === "t") {
        data.type = "theorem";
        data.name = "Name";
        data.content = "---";
        data.proof = "---";
    }

    if (req.query.type === "tx") {
        data.type = "theorem";
        data.name = "Name";
        data.content = "---";
        data.parts = {
            create: [
                {
                    index: 0,
                    content: "---",
                    proof: "---",
                },
                {
                    index: 1,
                    content: "---",
                    proof: "---",
                },
            ],
        };
    }

    if (req.query.type === "e") {
        data.type = "example";
        data.name = "Name";
        data.content = "---";
    }

    if (req.query.type === "p") {
        data.type = "paragraph";
        data.content = "---";
    }

    await prisma.unit.create({
        data: data,
    });

    return res.status(200).json({ success: true });
};