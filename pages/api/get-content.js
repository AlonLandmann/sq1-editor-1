import prisma from "@/server/prisma";

export default async function (req, res) {
    const content = await prisma.chapter.findMany({
        include: {
            sections: {
                include: {
                    units: {
                        include: {
                            parts: {
                                orderBy: {
                                    index: "asc",
                                },
                            },
                        },
                        orderBy: {
                            index: "asc",
                        },
                    },
                },
                orderBy: {
                    index: "asc",
                },
            },
        },
        orderBy: {
            index: "asc",
        },
    });

    return res.status(200).json({ success: true, content: content });
};