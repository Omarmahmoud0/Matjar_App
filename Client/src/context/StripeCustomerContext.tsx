import { useGetCustomerStripe } from "@/lib/reactQuery/qusersAndMutation";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthUserContext } from "./UserContextProvider";

const CustomerContext = createContext<string | undefined>(undefined);

const StripeCustomerContext = ({ children }: { children: React.ReactNode }) => {
  const [customerId, setCustomerId] = useState<string>("");
  const { user } = AuthUserContext();
  const { data: customer } = useGetCustomerStripe(user.email);
  useEffect(() => {
    if (customer) {
      setCustomerId(customer);
    }
  }, [customer]);

  return (
    <CustomerContext.Provider value={customerId}>
      {children}
    </CustomerContext.Provider>
  );
};

export default StripeCustomerContext;

export const StripeCustomer = () => {
  return useContext(CustomerContext);
};
