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
  const registrationNumbers1 = [];
  const registrationNumbers2 = [];
  const registrationNumbers3 = [];
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

    const registrationNumber1 = `2023444A${Math.random()}${i}`;
    const registrationNumber2 = `2023444B${Math.random()}${i}`;
    const registrationNumber3 = `2023444C${Math.random()}${i}`;
    registrationNumbers1.push(registrationNumber1);
    registrationNumbers2.push(registrationNumber2);
    registrationNumbers3.push(registrationNumber3);

    await prisma.voyage.create({
      data: {
        portOfLoading: "Copenhagen",
        portOfDischarge: "Oslo",
        vesselId: departingFromCopenhagenVessel,
        scheduledDeparture,
        scheduledArrival,
        units: {
          create: {
            registrationNumber: registrationNumbers1[i] as string,
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
              registrationNumber: registrationNumbers2[i]?.toString() as string,
              type: "Van",
              length: "50",
            },
            {
              registrationNumber: registrationNumbers3[i]?.toString() as string,
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
