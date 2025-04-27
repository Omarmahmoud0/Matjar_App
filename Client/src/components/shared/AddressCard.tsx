import { User, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddressActions from "./AddressAction";

export default function AddressCard({
  adrs,
  Index,
}: {
  adrs: any;
  Index: number;
}) {
  return (
    <Card className="relative hover:shadow-xl dark:shadow-indigo-800 hover:scale-105 transition-all bg-gray-100 dark:bg-gray-800">
      <CardHeader className="md:p-6 p-2">
        <CardTitle className="md:text-xl text-base font-bold dark:text-white flex items-center gap-4">
          Address Information ({Index + 1}){" "}
          {adrs.isDefault === true && (
            <img
              src="/assets/isLocation.svg"
              alt="isDefault location"
              className="md:w-12 md:h-12 w-9 h-9"
            />
          )}
        </CardTitle>
        <div className="absolute top-2 right-2 rounded-full dark:hover:bg-gray-900 hover:bg-gray-200">
          <AddressActions adrsId={adrs.id} />
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 md:p-6 p-2">
        <div className="flex items-center space-x-4">
          <User className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-xs font-medium text-gray-500">Full Name</p>
            <p className="md:text-base text-sm font-semibold dark:text-white">
              {adrs.fullName}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MapPin className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-xs font-medium text-gray-500">Address</p>
            <p className="md:text-base text-sm font-semibold dark:text-white">
              {adrs.streetAddress}
            </p>
            <p className="md:text-base text-sm font-semibold dark:text-white">
              {adrs.city}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Phone className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-xs font-medium text-gray-500">Phone Number</p>
            <p className="md:text-base text-sm font-semibold dark:text-white">
              {adrs.phoneNumber}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
