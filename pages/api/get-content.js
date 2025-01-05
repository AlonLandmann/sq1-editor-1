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

    let number = 0;

    content.forEach(chapter => {
        chapter.sections.forEach(section => {
            section.units.forEach(unit => {
                if (unit.type !== "paragraph") {
                    number += 1;
                    unit.number = number;
                }
            });
        });
    });

    return res.status(200).json({ success: true, content: content });
};