import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import React from "react";
import CreateUnitForm from "./CreateUnitForm";

const CreateUnit = ({ voyageId }: { voyageId: string }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="self-start py-2">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Create Unit</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create Unit</SheetTitle>
          </SheetHeader>
          <CreateUnitForm setOpen={setOpen} voyageId={voyageId} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default CreateUnit;
