import BackButton from "@/components/shared/BackButton";
import PageLoader from "@/components/shared/PageLoader";
import YourOrdersCard from "@/components/shared/YourOrdersCard";
import { StripeCustomer } from "@/context/StripeCustomerContext";
import { TopPage } from "@/lib/firebase/api";
import { useGetOrdersCustomer } from "@/lib/reactQuery/qusersAndMutation";
import { useEffect } from "react";
const OrdersPage = () => {
  const customerId = StripeCustomer();
  const { data: Orders, isFetching: isOrdersFetching } = useGetOrdersCustomer(
    customerId!
  );

  useEffect(() => {
    TopPage();
  }, []);

  return (
    <div className="md:container w-full min-h-screen mt-2 rounded-lg dark:text-white py-2 max-md:px-2 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between  md:h-28 h-12 border-b border-indigo-500">
        <h1 className="md:text-3xl sm:text-2xl text-lg flex items-center  gap-3 w-full dark:text-white">
          Orders
        </h1>
        <BackButton />
      </div>
      {isOrdersFetching && <PageLoader />}
      {Orders?.data?.length !== 0 ? (
        Orders?.data?.map((order: any) => (
          <YourOrdersCard key={order?.id} order={order} />
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-full mt-10">
          <h1 className="text-2xl font-bold text-gray-500 dark:text-gray-400">
            No Orders Found
          </h1>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
