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
import {
  useGetAddress,
  useGetAddressById,
  useUpdateAddress,
} from "@/lib/reactQuery/qusersAndMutation";
import { useNavigate, useParams } from "react-router-dom";
import { ToastStyel } from "../RootLayot";
import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import { AuthUserContext } from "@/context/UserContextProvider";
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

const UpdateAddressPage = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { mutateAsync: UpdateAddress, isPending, isError } = useUpdateAddress();
  const { token } = AuthUserContext();
  const { data: address } = useGetAddress(token);
  const findAddressPrimary: any = address?.find(
    (adrs: any) => adrs.isDefault === true
  );
  const { data: OldAddress } = useGetAddressById(id!);
  const [isDefulat, setisDefulat] = useState(OldAddress?.isDefault);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      streetAddress: "",
      city: undefined,
      phoneNumber: "",
      isDefault: false,
    },
  });

  async function onSubmit(values: FormValues) {
    if (findAddressPrimary) {
      setTimeout(async () => {
        await UpdateAddress({
          fullName: findAddressPrimary.fullName,
          streetAddress: findAddressPrimary.streetAddress,
          city: findAddressPrimary.city,
          phoneNumber: findAddressPrimary.phoneNumber,
          id: findAddressPrimary.id,
          isDefault: false,
        });
      }, 1000);

      await UpdateAddress({
        fullName: values.fullName,
        streetAddress: values.streetAddress,
        city: values.city,
        phoneNumber: values.phoneNumber,
        id: id!,
        isDefault: isDefulat,
      });
    }

    if (isError) {
      toast.toast({
        title: "Error updating address",
        open: false,
        style: {
          color: "white",
          backgroundColor: "#f05252",
          borderColor: "#f05252",
        },
      });
    }
    if (!isError) {
      toast.toast({
        title: "Updated successfully",
        style: ToastStyel,
        open: false,
      });
      form.reset();
      setTimeout(() => {
        navigate(-1);
      }, 500);
    }

    return;
  }

  useEffect(() => {
    if (OldAddress) {
      form.reset({
        fullName: OldAddress?.fullName,
        streetAddress: OldAddress?.streetAddress,
        city: OldAddress?.city,
        phoneNumber: OldAddress?.phoneNumber,
      });
      setisDefulat(OldAddress?.isDefault);
    }
  }, [OldAddress, form]);

  useEffect(() => {
    const handleBeforeUnload = (e: any) => {
      e.preventDefault();
      e.returnValue = ""; // For Chrome
      return ""; // For Firefox
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="md:container min-h-screen rounded-lg bg-white dark:bg-gray-900 py-5 mt-2 w-full">
      <h1 className="dark:text-white md:text-3xl xs:text-xl text-lg mb-5 text-center">
        Update Address
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:w-[70%] md:mx-auto px-2 md:space-y-10 space-y-7 mt-10"
        >
          <FormField
            control={form.control}
            name="isDefault"
            render={() => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-gray-200 border-indigo-500 dark:bg-white">
                <div className="space-y-0.5">
                  <FormLabel className="text-indigo-600 md:text-base">
                    Primary
                  </FormLabel>
                  <FormDescription className="dark:text-gray-500 md:text-sm">
                    Set as primary address.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={isDefulat}
                    onChange={() => setisDefulat(!isDefulat)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-indigo-600 md:text-base">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    className="bg-gray-200 border-gray-400 dark:bg-white"
                  />
                </FormControl>
                <FormDescription className="dark:text-gray-500 md:text-sm text-orange-400">
                  Please enter your full name.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-indigo-600 md:text-base">
                  Street Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Main St"
                    {...field}
                    className="bg-gray-200 border-gray-400 dark:bg-white"
                  />
                </FormControl>
                <FormDescription className="dark:text-gray-500 md:text-sm text-orange-400">
                  Enter your street address.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-indigo-600 md:text-base">
                  City
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-gray-200 border-gray-400 dark:bg-white">
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
                <FormDescription className="dark:text-gray-500 md:text-sm text-orange-400">
                  Select your city from the list.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-indigo-600 md:text-base">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+201089479977"
                    {...field}
                    className="bg-gray-200 border-gray-400 dark:bg-white"
                  />
                </FormControl>
                <FormDescription className="dark:text-gray-500 md:text-sm text-orange-400">
                  Enter your phone number (with country code).
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="w-full flex items-center gap-4 justify-end">
            <Button
              type="submit"
              className={`bg-indigo-600 text-white hover:bg-indigo-500 ${
                isPending && "bg-indigo-500"
              }`}
            >
              {isPending ? "Updating..." : "Update address"}
            </Button>
            <Button
              type="button"
              onClick={() => navigate(-1)}
              className="capitalize bg-gray-950 text-white"
            >
              cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateAddressPage;
