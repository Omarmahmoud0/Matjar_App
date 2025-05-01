import Order from "@/components/shared/Order";
import PageLoader from "@/components/shared/PageLoader";
import { useCart } from "@/context/HandelCartContext";
import { AuthUserContext } from "@/context/UserContextProvider";
import {
  useClearCart,
  useGetSessionData,
} from "@/lib/reactQuery/qusersAndMutation";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { mutateAsync: clearCart } = useClearCart();
  const { token } = AuthUserContext();
  const { Cart } = useCart();
  const { sessionId } = useParams();
  const { data: sessionData, isFetching } = useGetSessionData(sessionId!);
  console.log("session", sessionData);

  const status = sessionData?.session?.status;
  const paymentStatus = sessionData?.session?.payment_status;

  useEffect(() => {
    const ClearFn = async () => {
      try {
        if (status === "complete" && paymentStatus === "paid" && token) {
          await clearCart(Cart?.map((item: any) => item.id)!);
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    };
    window.scrollTo({ top: 150, behavior: "smooth" });
    if (!token) {
      navigate("/");
    }
    ClearFn();
  }, [token, status, paymentStatus, Cart]);

  return (
    <div
      className="md:container w-full min-h-screen mt-3 rounded-lg  bg-gradient-to-br from-green-50 to-blue-50
      dark:bg-gray-900 dark:bg-none flex items-center "
    >
      {isFetching ? <PageLoader /> : <Order sessionData={sessionData} />}
    </div>
  );
};

export default PaymentSuccess;
