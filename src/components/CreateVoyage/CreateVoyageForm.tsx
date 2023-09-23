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

const FormSchema = z.object({
  //   departure: z.date(),
  //   Arrival: z.date(),
  //   pol: z.string().min(2).max(100),
  //   pod: z.string().min(2).max(100),
  vessel: z.string().min(2).max(100),
});

const CreateVoyageForm = ({ setOpen }: { setOpen: any }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      //   departure: startOfHour(setHours(addDays(new Date(), 0), 15)),
      //   Arrival: startOfHour(setHours(addDays(new Date(), 1), 15)),
      //   pol: "",
      //   pod: "",
      vessel: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("helloooo");
    setOpen(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
  );
};
export default CreateVoyageForm;
