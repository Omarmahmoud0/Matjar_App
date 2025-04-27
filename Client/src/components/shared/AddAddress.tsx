import { useGetAddress } from "@/lib/reactQuery/qusersAndMutation";
import ContactForm from "./ContactForm";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { AuthUserContext } from "@/context/UserContextProvider";

const Address = ({
  setShowFormAddress,
}: {
  setShowFormAddress: (value: boolean) => void;
}) => {
  const { token } = AuthUserContext();
  const { data: address } = useGetAddress(token);
  const findAddress = address?.find((adrs: any) => adrs.isDefault === true);
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm overflow-y-scroll z-50  min-h-screen flex items-center justify-center w-full md:px-8"
    >
      <div className="bg-gray-100 p-3 rounded-lg shadow-xl max-w-md w-full space-y-6">
        <div className="">
          <div className="md:flex hidden">
            <HighlightOffIcon
              className="cursor-pointer"
              onClick={() => setShowFormAddress(false)}
              fontSize="large"
            />
          </div>
          <h2 className="mt-6 text-center md:text-3xl xs:text-xl text-lg font-extrabold text-gray-900">
            Contact Information
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill out the form below
          </p>
        </div>
        <ContactForm
          setShowFormAddress={setShowFormAddress}
          findAddress={findAddress}
        />
      </div>
    </div>
  );
};

export default Address;
