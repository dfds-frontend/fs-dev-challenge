// import type { Vessel, Voyage } from "@prisma/client";
// import type { NextApiHandler, NextApiResponse, NextApiRequest } from "next";
// import { prisma } from "~/server/db";

// export type ReturnType = (Voyage & { vessel: Vessel })[];

// const handler: NextApiHandler = async (
//   req: NextApiRequest,
//   res: NextApiResponse<undefined>
// ) => {
//   if (req.method === "POST") {
//     const createVoyage = await prisma.voyage.create({
//       data: {
//         id: "clmueiyzt0005oi78vt4viakk00",
//         portOfLoading: "Oslo",
//         portOfDischarge: "Copenhagen",
//         vesselId: "clmueiyyv0000oi78snlmkcbv",
//         scheduledDeparture: "2023-09-22T13:00:00.000Z",
//         scheduledArrival: "2023-09-23T07:00:00.000Z",
//         createdAt: "2023-09-22T09:30:42.473Z",
//         updatedAt: "2023-09-22T09:30:42.473Z",
//         vessel: {
//           name: "Crown Seaways",
//           createdAt: "2023-09-22T09:30:42.440Z",
//           updatedAt: "2023-09-22T09:30:42.440Z",
//         },
//       },
//     });

//     createVoyage ? res.status(204) : res.status(404);
//     res.end();
//     return;
//   }

//   res.status(405).end();
// };

// export default handler;
