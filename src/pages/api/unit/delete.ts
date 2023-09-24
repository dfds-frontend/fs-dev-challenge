import type { Vessel, Voyage, Unit } from "@prisma/client";
import type { NextApiHandler, NextApiResponse, NextApiRequest } from "next";
import { prisma } from "~/server/db";

export type ReturnType = (Voyage & { vessel: Vessel } & { units: Unit })[];

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<undefined>
) => {
  if (req.method === "DELETE") {
    // randomly fail the delete request
    const maybe = Math.round(Math.random());
    if (maybe) {
      res.status(400).end();
      return;
    }
    const deletedUnit = await prisma.unit.delete({
      where: {
        id: req.query.id as string,
      },
    });

    deletedUnit ? res.status(204) : res.status(404);
    res.end();
    return;
  }

  res.status(405).end();
};

export default handler;
