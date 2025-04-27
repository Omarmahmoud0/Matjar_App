import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const YourOrdersCard = ({ order }: { order: any }) => {
  const [showOrder, setShowOrder] = useState(false);

  const variants = {
    hidden: { opacity: 0, x: "100%" }, // Start from the right
    visible: {
      opacity: 1,
      x: 0, // Move to original position
      width: "100%", // Expand to full width
      transition: { duration: 0.5 }, // Animation duration
    },
    exit: {
      opacity: 0,
      x: "100%", // Move back to the right
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="py-2">
      {showOrder && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          className="fixed inset-0 backdrop-blur-sm flex items-center overflow-x-hidden overflow-y-scroll z-50"
        >
          <Card className="w-full max-w-2xl mx-auto bg-white">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-2xl font-bold text-indigo-500">
                  Order Details
                </CardTitle>
                <p className="text-sm text-muted-foreground text-gray-500">
                  <span className="mr-1">Order</span> #{order.number}
                </p>
              </div>
              <Badge
                variant="outline"
                className="text-sm font-medium text-green-500"
              >
                {order.status}
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-1 text-black">Order Date</h3>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-black">
                    Expected Delivery
                  </h3>
                  <p className="text-sm text-muted-foreground text-gray-500">
                    3-5 business days
                  </p>
                </div>
              </div>
              <Separator className="bg-indigo-500" />
              <div>
                <h3 className="font-semibold mb-3 text-black ">Items</h3>
                <ul className="space-y-3">
                  {order?.lines.data.map((item: any) => (
                    <li key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium capitalize text-black text-sm">
                          {item.description}
                        </p>
                        <p className="text-sm text-muted-foreground text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-black">
                        ${item.amount / Number(100)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <Separator className="bg-indigo-500" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground text-gray-500">
                    Subtotal
                  </p>
                  <p className="font-medium text-gray-500">
                    ${order.subtotal / Number(100)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground text-gray-500">
                    Shipping
                  </p>
                  <p className="font-medium text-gray-500">
                    {order.amount_shipping === 0
                      ? "FREE SHIPPING"
                      : "$" + order.amount_shipping / Number(100)}
                  </p>
                </div>
                <div className="flex justify-between font-bold text-indigo-500">
                  <p>Total</p>
                  <p>${order.total / Number(100)}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Link to={order.hosted_invoice_url}>
                <Button
                  className="w-full text-black sm:w-auto flex items-center gap-2 border border-indigo-500 bg-white
                            hover:bg-indigo-500 hover:text-white"
                >
                  <Truck size={16} />
                  View Shipping Details
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-gray-100 text-black shadow-md hover:text-indigo-500"
                onClick={() => setShowOrder(false)}
              >
                Done
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
      <>
        {order?.status !== "draft" && (
          <Card
            key={order?.id}
            className="mt-3 bg-gray-200 dark:bg-gray-800  dark:border-gray-600"
          >
            <CardHeader className="max-md:p-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="max-md:flex flex-col gap-3">
                    <span className="mr-2 text-indigo-500">Order number</span>
                    <span className="max-md:text-sm">#{order?.number}</span>
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Placed on {order.date}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="max-md:flex flex-col gap-2 font-semibold">
                    <span className="mr-2 text-indigo-500">Total</span>
                    <span className="max-md:text-sm">
                      ${order?.total / Number(100)}
                    </span>
                  </p>
                  <p className={`text-sm ${getStatusColor(order?.status)}`}>
                    {order?.status}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="max-md:p-3">
              <div
                className="flex items-center justify-between border border-indigo-500 transition ease-in-out duration-150 p-3 max-md:px-3 max-md:py-2 rounded-lg hover:bg-indigo-500
              hover:text-white cursor-pointer "
                onClick={() => setShowOrder(true)}
              >
                <p className="text-sm max-md:text-xs">Show order details</p>
                <ArrowForwardIosIcon className="max-md:p-[3px]" />
              </div>
            </CardContent>
          </Card>
        )}
      </>
    </div>
  );
};
export default YourOrdersCard;

function getStatusColor(status: any) {
  switch (status) {
    case "paid":
      return "text-green-500";
    case "draft":
      return "text-red-500";
  }
}
