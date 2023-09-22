import { useForm } from "react-hook-form";
import * as z from "zod";
import { addDays, setHours, startOfHour } from "date-fns";
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
import { SheetClose, SheetFooter } from "../ui/sheet";

const formSchema = z.object({
  departure: z.date(),
  Arrival: z.date(),
  pol: z.string().min(2).max(100),
  pod: z.string().min(2).max(100),
  vessel: z.string().min(2).max(100),
});

const CreateVoyageForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departure: startOfHour(setHours(addDays(new Date(), 0), 15)),
      Arrival: startOfHour(setHours(addDays(new Date(), 1), 15)),
      pol: "",
      pod: "",
      vessel: "",
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("submit Clicked", data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="departure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure</FormLabel>
              <FormControl>
                {/* <Input placeholder="departure" {...field} /> */}
              </FormControl>
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
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>POL</FormLabel>
              <FormControl>
                <Input placeholder="Vessel" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default CreateVoyageForm;
