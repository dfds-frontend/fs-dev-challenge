import { useForm } from "react-hook-form";
import * as z from "zod";
import { addDays, format, setHours, startOfHour } from "date-fns";
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
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import React from "react";
import { cn } from "~/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";

const FormSchema = z
  .object({
    departure: z.date(),
    arrival: z.date(),
    pol: z.string().min(2).max(100),
    pod: z.string().min(2).max(100),
    vessel: z.string().min(2).max(100),
  })
  .refine(
    (values) => {
      return values.departure.getTime() < values.arrival.getTime();
    },
    {
      message: "Arrival should be gretaer than Departure!",
      path: ["arrival"],
    }
  );

const CreateVoyageForm = ({ setOpen }: { setOpen: any }) => {
  const [payload, setPayload] = React.useState({});
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
  const handleCreate = (payload: {
    data: {
      portOfLoading: string;
      portOfDischarge: string;
      vesselId: string;
      scheduledDeparture: string;
      scheduledArrival: string;
    };
  }) => {
    mutation.mutate();
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  function onSubmit(formData: z.infer<typeof FormSchema>) {
    const payload1 = {
      data: {
        portOfLoading: formData.pol,
        portOfDischarge: formData.pod,
        vesselId: "clmueiyyv0000oi78snlmkcbv",
        scheduledDeparture: formData.departure.toISOString(),
        scheduledArrival: formData.arrival.toISOString(),
      },
    };
    console.log("payload1***", payload1);
    setPayload(payload1);
    handleCreate(payload1);
    // call create api now
    setOpen(false);
  }
  console.log("payload***", payload);
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="departure"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Departure</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrival"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Arrival</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Port of Loading</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Port of Loading" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Port of Discharge</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Port of Discharge " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vessel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vessel</FormLabel>
                <FormControl>
                  <Input placeholder="Vessel" {...field} />
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
export default CreateVoyageForm;
