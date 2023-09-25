import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CreateVoyageForm from "./CreateVoyageForm";
import React from "react";

const CreateVoyage = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="self-start py-2">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Create Voyage</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create Voyage</SheetTitle>
          </SheetHeader>
          <CreateVoyageForm setOpen={setOpen} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default CreateVoyage;
