import prisma from "@/server/prisma";

export default async function handler(req, res) {
  await prisma.part.update({
    where: {
      id: Number(req.query.partId),
    },
    data: {
      content: req.body.content,
    },
  });

  return res.status(200).json({ success: true });
};