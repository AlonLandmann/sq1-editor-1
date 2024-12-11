import prisma from "@/server/prisma";

export default async function handler(req, res) {
  const unitCount = await prisma.unit.count({
    where: {
      sectionId: Number(req.query.sectionId),
    },
  });

  await prisma.unit.create({
    data: {
      index: unitCount,
      sectionId: Number(req.query.sectionId),
    },
  });

  return res.status(200).json({ success: true });
}