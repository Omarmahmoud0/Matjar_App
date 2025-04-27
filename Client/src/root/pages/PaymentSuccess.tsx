import Order from "@/components/shared/Order";
import { useCart } from "@/context/HandelCartContext";
import { AuthUserContext } from "@/context/UserContextProvider";
import { useClearCart } from "@/lib/reactQuery/qusersAndMutation";
import { SessionData } from "@/types/types";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const { mutateAsync: clearCart } = useClearCart();
  const { token } = AuthUserContext();
  const { Cart } = useCart();

  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    if (sessionId) {
      const fetchSessionData = async () => {
        try {
          const response = await fetch(
            `http://localhost:4242/session/${sessionId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                session_id: searchParams.get("session_id"),
              }),
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);

          setSessionData(data);
        } catch (err: any) {
          console.log(err.message);
        }
      };
      fetchSessionData();
    }
  }, [sessionId]);

  const status = sessionData?.session.status;
  const paymentStatus = sessionData?.session.payment_status;

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
    if ((!sessionId && sessionData?.session.id !== sessionId) || !token) {
      navigate("/");
    }
    ClearFn();
  }, [token, status, paymentStatus, Cart, sessionId]);

  return (
    <div
      className="md:container w-full min-h-screen mt-3 rounded-lg  bg-gradient-to-br from-green-50 to-blue-50
      dark:bg-gray-900 dark:bg-none flex items-center "
    >
      <Order sessionData={sessionData} />
    </div>
  );
};

export default PaymentSuccess;
