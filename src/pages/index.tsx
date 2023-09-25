import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import Head from "next/head";
import Layout from "~/components/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { fetchData } from "~/utils";
import type { ReturnType } from "./api/voyage/getAll";
import { Button } from "~/components/ui/button";
import { TABLE_DATE_FORMAT } from "~/constants";
import { toast } from "~/components/ui/use-toast";
import CreateVoyage from "~/components/CreateVoyage";
import React from "react";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  Sheet,
} from "~/components/ui/sheet";
import VoyageDetails from "~/components/VoyageDetails";
import { IVoyage } from "~/types";

export default function Home() {
  const [openVoyageDetail, setOpenVoyageDetail] = React.useState(false);
  const [voyageData, setVoyageData] = React.useState<IVoyage | undefined>();

  const { data: voyages } = useQuery<ReturnType>(["voyages"], () =>
    fetchData("voyage/getAll")
  );

  console.log("voyages***", voyages);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (voyageId: string) => {
      const response = await fetch(`/api/voyage/delete?id=${voyageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `Failed to delete the voyage ${voyageId}`,
        });
        throw new Error("Failed to delete the voyage");
      }
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["voyages"]);
        toast({
          title: "Delete Success",
          description: `Voayge Deleted Successfully`,
        });
      },
    }
  );

  const handleDelete = (voyageId: string) => {
    mutation.mutate(voyageId);
  };

  return (
    <>
      <Head>
        <title>Voyages | DFDS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <CreateVoyage />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Port of loading</TableHead>
              <TableHead>Port of discharge</TableHead>
              <TableHead>Vessel</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {voyages?.map((voyage) => (
              <TableRow key={voyage.id}>
                <TableCell>
                  {format(
                    new Date(voyage.scheduledDeparture),
                    TABLE_DATE_FORMAT
                  )}
                </TableCell>
                <TableCell>
                  {format(new Date(voyage.scheduledArrival), TABLE_DATE_FORMAT)}
                </TableCell>
                <TableCell>{voyage.portOfLoading}</TableCell>
                <TableCell>{voyage.portOfDischarge}</TableCell>
                <TableCell
                  className="cursor-pointer underline"
                  onClick={() => {
                    setVoyageData(voyage);
                    setOpenVoyageDetail(true);
                  }}
                >
                  {voyage.vessel.name}
                </TableCell>
                <TableCell>{voyage.units.length}</TableCell>
                <TableCell>
                  <Button
                    onClick={(e) => {
                      handleDelete(voyage.id);
                    }}
                  >
                    X
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Sheet open={openVoyageDetail} onOpenChange={setOpenVoyageDetail}>
          <SheetTrigger asChild></SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <VoyageDetails
                voyageData={voyageData}
                setOpenVoyageDetail={setOpenVoyageDetail}
              />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Layout>
    </>
  );
}
