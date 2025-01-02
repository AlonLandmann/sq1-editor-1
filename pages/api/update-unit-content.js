import prisma from "@/server/prisma";

export default async function handler(req, res) {
  await prisma.unit.update({
    where: {
      id: Number(req.query.unitId),
    },
    data: {
      content: req.body.content,
    },
  });

  return res.status(200).json({ success: true });
};