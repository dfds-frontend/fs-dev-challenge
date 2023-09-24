import type { Vessel, Voyage, Unit } from "@prisma/client";
import type { NextApiHandler, NextApiResponse, NextApiRequest } from "next";
import { prisma } from "~/server/db";

export type ReturnType = Unit[];

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<undefined>
) => {
  if (req.method === "POST") {
    //const createVoyage = await prisma.voyage.create(JSON.parse(req.body));
    const createUnit = await prisma.unit.create(JSON.parse(req.body));
    createUnit ? res.status(202) : res.status(404);
    res.end();
    return;
  }

  res.status(405).end();
};

export default handler;
