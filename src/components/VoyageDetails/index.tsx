import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { format } from "date-fns";
import { TABLE_DATE_FORMAT } from "~/constants";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import { CreateUnit } from "../CreateUnit";

const VoyageDetails = ({
  voyageData,
  setOpenVoyageDetail,
}: {
  voyageData: any | undefined;
  setOpenVoyageDetail: any;
}) => {
  const { id, vessel, units } = voyageData;

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (unitId: string) => {
      const response = await fetch(`/api/unit/delete?id=${unitId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `Failed to delete the unit ${unitId}`,
        });
        throw new Error("Failed to delete the unit");
      }
    },
    {
      onSuccess: async () => {
        // await queryClient.invalidateQueries(["unit"]);
        setOpenVoyageDetail(false);
        toast({
          title: "Success",
          description: `Unit deleted succesfully`,
        });
      },
    }
  );

  const handleDelete = (unitId: string) => {
    mutation.mutate(unitId);
  };
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center px-2">
      <div className="py-2.5 text-2xl">Vessel Details</div>
      <div className="flex w-3/5 flex-row py-2.5">
        <div className="px-3.5 text-lg">
          Route : {voyageData?.portOfLoading} - {voyageData?.portOfDischarge}
        </div>
        <div className="px-3.5 text-lg">Vessel : {vessel?.name}</div>
        <div className="px-3.5 text-lg">
          Departure :
          {format(new Date(voyageData?.scheduledDeparture), TABLE_DATE_FORMAT)}
        </div>
      </div>
      <div className="w-3/5 px-3.5">
        <CreateUnit voyageId={id} />
      </div>
      <div className="w-3/5 px-3.5">
        {units?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Length</TableHead>
                <TableHead>Registration Number</TableHead>
                <TableHead>&nbsp;</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {units?.map((unit: any, index: any) => (
                <TableRow key={unit.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{unit.type}</TableCell>
                  <TableCell>{unit.length}</TableCell>
                  <TableCell>{unit.registrationNumber}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(unit.id)}>X</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex items-center justify-center">
            No Units Available
          </div>
        )}
      </div>
    </div>
  );
};
export default VoyageDetails;
