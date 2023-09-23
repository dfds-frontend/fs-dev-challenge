import { PrismaClient } from "@prisma/client";
import { addDays, setHours, startOfHour } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  const crownSeaways = await prisma.vessel.create({
    data: {
      name: "Crown Seaways",
    },
  });

  const pearlSeaways = await prisma.vessel.create({
    data: {
      name: "Pearl Seaways",
    },
  });

  // Seeding voyages
  for (let i = 0; i < 10; i++) {
    const departingFromCopenhagenVessel =
      i % 2 === 0 ? pearlSeaways.id : crownSeaways.id;
    const departingFromOsloVessel =
      i % 2 === 0 ? crownSeaways.id : pearlSeaways.id;

    const scheduledDeparture = startOfHour(
      setHours(addDays(new Date(), i), 15)
    );
    const scheduledArrival = startOfHour(
      setHours(addDays(new Date(), i + 1), 9)
    );
    const registrationNumber = `2023444A${Math.random()}${i}`;

    await prisma.voyage.create({
      data: {
        portOfLoading: "Copenhagen",
        portOfDischarge: "Oslo",
        vesselId: departingFromCopenhagenVessel,
        scheduledDeparture,
        scheduledArrival,
        units: {
          create: {
            registrationNumber: registrationNumber,
            type: "Car",
            length: "100",
          },
        },
      },
      include: {
        units: true,
      },
    });

    await prisma.voyage.create({
      data: {
        portOfLoading: "Oslo",
        portOfDischarge: "Copenhagen",
        vesselId: departingFromOsloVessel,
        scheduledDeparture,
        scheduledArrival,
        units: {
          create: [
            {
              registrationNumber: registrationNumber,
              type: "Van",
              length: "50",
            },
            {
              registrationNumber: registrationNumber,
              type: "Truck",
              length: "200",
            },
          ],
        },
      },
      include: {
        units: true,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
