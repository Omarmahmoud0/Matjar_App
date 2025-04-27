import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formSchema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { useCreateNewAddress } from "@/lib/reactQuery/qusersAndMutation";
import { AuthUserContext } from "@/context/UserContextProvider";
import { ToastStyel, ToastStyelFaild } from "@/root/RootLayot";
type FormValues = z.infer<typeof formSchema>;

const cities: string[] = [
  "Alexandria",
  "Ismailia",
  "Suez",
  "alsharqia",
  "Kafr El-Sheikh",
  "Menoufia",
  "Qalyubia",
  "Giza",
];

function ContactForm({
  setShowFormAddress,
  findAddress,
}: {
  setShowFormAddress: (BOOLEAN: boolean) => void;
  findAddress: { id: string } | undefined;
}) {
  const toast = useToast();
  const { mutateAsync: CreataNewAddress, isPending } = useCreateNewAddress();
  const { user } = AuthUserContext();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      streetAddress: "",
      city: undefined,
      phoneNumber: undefined,
      isDefault: false,
    },
  });

  async function onSubmit(values: FormValues) {
    const newAddress = await CreataNewAddress({
      fullName: values.fullName,
      streetAddress: values.streetAddress,
      city: values.city,
      phoneNumber: values.phoneNumber,
      userId: user.id,
      isDefault: findAddress ? false : true,
    });

    if (!newAddress) {
      toast.toast({
        title: "Error creating new address",
        open: false,
        style: ToastStyelFaild,
      });
    }
    if (newAddress) {
      toast.toast({
        title: "The address has been added successfully",
        style: ToastStyel,
        open: false,
      });
      form.reset();
      setShowFormAddress(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} className="bg-white" />
              </FormControl>
              <FormDescription>Please enter your full name.</FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="123 Main St"
                  {...field}
                  className="bg-white"
                />
              </FormControl>
              <FormDescription>Enter your street address.</FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  {cities.map((city, index) => (
                    <SelectItem
                      value={city}
                      key={index}
                      className="capitalize hover:bg-gray-50"
                    >
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select your city from the list.</FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => {
                    if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                      e.preventDefault();
                    }
                  }}
                  type="tel"
                  placeholder="01012345678"
                  {...field}
                  className="bg-white"
                />
              </FormControl>
              <FormDescription>
                Enter your phone number (with country code).
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`bg-indigo-600 text-white hover:bg-indigo-500 ${
            isPending && "bg-indigo-500"
          }`}
        >
          {isPending ? "Saving..." : "Save address"}
        </Button>
        <Button
          type="button"
          className="bg-black text-white ml-4"
          onClick={() => setShowFormAddress(false)}
        >
          Cancel
        </Button>
      </form>
    </Form>
  );
}

export default ContactForm;
