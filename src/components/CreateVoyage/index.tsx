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
import CreateVoyageForm from "./CreateVoyageForm";

export const CreateVoyage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async () => {
      const response = await fetch(`/api/voyage/createVoyage`, {
        method: "POST",
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `Failed to create the voyage`,
        });
        throw new Error("Failed to create the voyage");
      }
    },
    {
      onSuccess: async () => {
        // toaster for success
        toast({
          title: "Success",
          description: `Voyage Created Successfully`,
        });
        await queryClient.invalidateQueries(["voyages"]);
      },
    }
  );
  const handleCreate = () => {
    mutation.mutate();
  };
  return (
    <div className="self-start py-2">
      <Button title="Create Voyage" onClick={handleCreate}>
        Create Voyage
      </Button>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create Voyage</SheetTitle>
          </SheetHeader>
          <CreateVoyageForm />
          {/* <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Create</Button>
            </SheetClose>
          </SheetFooter> */}
        </SheetContent>
      </Sheet>
    </div>
  );
};
