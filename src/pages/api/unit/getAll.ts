import type { Unit } from "@prisma/client";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export type ReturnType = Unit[];

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ReturnType>
) => {
  const units = await prisma.unit.findMany({
    where: {
      voyageId: req.query.id as string as string,
    },
  });

  res.status(200).json(units);
};

export default handler;
