import prisma from "@/server/prisma";

export default async function handler(req, res) {
  const sectionCount = await prisma.section.count({
    where: {
      chapterId: Number(req.query.chapterId),
    },
  });

  await prisma.section.create({
    data: {
      index: sectionCount,
      chapterId: Number(req.query.chapterId),
    },
  });

  return res.status(200).json({ success: true });
};