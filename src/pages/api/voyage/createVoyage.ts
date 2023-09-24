import type { Vessel, Voyage } from "@prisma/client";
import type { NextApiHandler, NextApiResponse, NextApiRequest } from "next";
import { prisma } from "~/server/db";
import { addDays, setHours, startOfHour } from "date-fns";

export type ReturnType = (Voyage & { vessel: Vessel })[];

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<undefined>
) => {
  if (req.method === "POST") {
    //const createVoyage = await prisma.voyage.create(JSON.parse(req.body));
    const createVoyage = await prisma.voyage.create({
      data: {
        portOfLoading: "Copenhagen",
        portOfDischarge: "Oslo",
        vesselId: "clmueiyyv0000oi78snlmkcbv",
        scheduledDeparture: startOfHour(setHours(addDays(new Date(), 1), 15)),
        scheduledArrival: startOfHour(setHours(addDays(new Date(), 2), 15)),
        units: {
          create: {
            registrationNumber: "registrationNumber",
            type: "Car",
            length: "100",
          },
        },
      },
      include: {
        units: true,
      },
    });
    createVoyage ? res.status(202) : res.status(404);
    res.end();
    return;
  }

  res.status(405).end();
};

export default handler;
