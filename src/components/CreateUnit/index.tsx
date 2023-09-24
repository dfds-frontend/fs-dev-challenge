import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
// import CreateVoyageForm from "./CreateVoyageForm";
import React from "react";
import CreateUnitForm from "./CreateUnitForm";

export const CreateUnit = ({ voyageId }: { voyageId: string }) => {
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
