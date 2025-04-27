import AddAddress from "@/components/shared/AddAddress";
import AddressCard from "@/components/shared/AddressCard";
import BackButton from "@/components/shared/BackButton";
import PageLoader from "@/components/shared/PageLoader";
import { AuthUserContext } from "@/context/UserContextProvider";
import { TopPage } from "@/lib/appwrite/api";
import { useGetAddress } from "@/lib/reactQuery/qusersAndMutation";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";

const AddressesPage = () => {
  const [showFormAddress, setShowFormAddress] = useState<boolean>(false);
  const { user } = AuthUserContext();
  const { data: address, isPending } = useGetAddress(user.id);

  useEffect(() => {
    TopPage();
  }, []);

  return (
    <div className="md:container min-h-screen rounded-lg bg-white dark:bg-gray-900 py-5 mt-2 w-full">
      {isPending && <PageLoader />}
      <div className="flex items-center justify-end mb-5">
        <BackButton />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        <div
          onClick={() => setShowFormAddress(true)}
          className="flex flex-col items-center justify-center h-64 p-5 rounded-xl border-dashed border-2 border-indigo-500
          cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
        >
          <AddIcon fontSize="large" className="text-indigo-500" />
          <h1 className="dark:text-white">New address</h1>
        </div>
        {address?.map((adrs: any, index: number) => (
          <AddressCard adrs={adrs} key={adrs.id} Index={index} />
        ))}
      </div>
      {/* <MapComponent /> */}
      {showFormAddress && (
        <div className="w-full overflow-y-scroll">
          <AddAddress setShowFormAddress={setShowFormAddress} />
        </div>
      )}
    </div>
  );
};

export default AddressesPage;
