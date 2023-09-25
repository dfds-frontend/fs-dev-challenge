import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React from "react";
import { cn } from "~/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

const FormSchema = z.object({
  type: z.string(),
  length: z.string().min(1).max(5),
  registrationNumber: z.string().min(5).max(100),
});

const CreateUnitForm = ({
  setOpen,
  voyageId,
}: {
  setOpen: any;
  voyageId: string;
}) => {
  const [payload, setPayload] = React.useState({});
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (payload: {
      data: {
        type: string;
        length: string;
        registrationNumber: string;
        voyageId: string;
      };
    }) => {
      const response = await fetch(`/api/unit/createUnit`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `Failed to create the unit`,
        });
        throw new Error("Failed to create the unit");
      }
    },
    {
      onSuccess: async () => {
        // toaster for success
        toast({
          title: "Success",
          description: `Unit Created Successfully`,
        });
        await queryClient.invalidateQueries(["units"]);
      },
    }
  );

  const handleCreate = (payload: {
    data: {
      type: string;
      length: string;
      registrationNumber: string;
      voyageId: string;
    };
  }) => {
    mutation.mutate(payload);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    const createUnitPayload = {
      data: {
        type: formData.type,
        length: formData.length,
        registrationNumber: formData.registrationNumber,
        voyageId: voyageId,
      },
    };
    setPayload(createUnitPayload);
    handleCreate(createUnitPayload);
    setOpen(false);
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Truck">Truck</SelectItem>
                    <SelectItem value="Car">Car</SelectItem>
                    <SelectItem value="Van">Van</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="length"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Length</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Length of Unit in cm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Registration Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
export default CreateUnitForm;
