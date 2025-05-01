import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, User, Building, Phone, MapPin } from "lucide-react";
import { SessionData } from "@/types/types";
import DetailsAddress from "./DetailsAddress";
import { StripeCustomer } from "@/context/StripeCustomerContext";

export default function Order({
  sessionData,
}: {
  sessionData: SessionData | null;
}) {
  const customerId = StripeCustomer();
  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <Card className="w-full shadow-lg bg-white">
        <CardHeader className="text-center md:space-y-6 max-md:space-y-3 max-md:px-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
          >
            <svg
              className="w-16 h-16 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </svg>
          </motion.div>
          <CardTitle className="md:text-3xl sm:text-xl max-xs:text-lg font-bold text-gray-900">
            Payment Successful!
          </CardTitle>
          <CardDescription className="md:text-lg sm:text-base max-xs:text-sm text-gray-600">
            Thank you for your purchase,{" "}
            <span className="text-indigo-500 md:text-xl sm:text-lg max-xs:text-base">
              {sessionData?.session?.customer_details?.name}
            </span>
            . Your order has been confirmed.
          </CardDescription>
        </CardHeader>
        <CardContent className="md:space-y-8 max-md:space-y-4 max-md:px-3">
          <div className="rounded-lg bg-gradient-to-r from-green-100 to-blue-100 p-6 text-center shadow-inner">
            <h3 className="md:text-xl text-base font-semibold text-gray-900">
              Order Number:{" "}
              <span className="text-indigo-500">
                {sessionData?.session?.invoice}
              </span>
            </h3>
          </div>
          <div className="mt-5">
            <h1 className="text-xl -mb-4 ">Delivery details</h1>
          </div>
          <div className="rounded-lg bg-gradient-to-r from-green-100 to-blue-100 p-6 text-center shadow-inner">
            <div className="grid md:grid-cols-2 gap-6">
              <DetailsAddress
                Icon={User}
                details={sessionData?.session?.metadata?.fullName}
                label="Full Name"
                key={1}
              />
              <DetailsAddress
                Icon={Building}
                details={sessionData?.session?.metadata?.city}
                label="City"
                key={2}
              />
              <DetailsAddress
                Icon={Phone}
                details={sessionData?.session?.metadata?.phone}
                label="Phone Number"
                key={3}
              />
              <DetailsAddress
                Icon={MapPin}
                details={sessionData?.session?.metadata?.address}
                label="Street Address"
                key={4}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-5 md:mt-6 max-md:mt-3 max-xs:flex-col">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="hover:bg-gray-200"
          >
            <Link to="/" replace={true}>
              Return to Home
            </Link>
          </Button>
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-700 text-white"
            asChild
          >
            <Link to={`/account/orders/${customerId}`} replace={true}>
              View Order Details
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
