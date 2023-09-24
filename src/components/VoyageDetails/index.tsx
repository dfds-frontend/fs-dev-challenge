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

const VoyageDetails = ({ voyageData }: { voyageData: any | undefined }) => {
  const { vessel, units } = voyageData;

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
                  <Button>X</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default VoyageDetails;
