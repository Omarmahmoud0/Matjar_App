import BackButton from "@/components/shared/BackButton";
import Loader from "@/components/shared/Loader";
import { Skeleton } from "@/components/ui/skeleton";
import { StripeCustomer } from "@/context/StripeCustomerContext";
import { AuthUserContext } from "@/context/UserContextProvider";
import { TopPage } from "@/lib/firebase/api";
import { useLogOutUser } from "@/lib/reactQuery/qusersAndMutation";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const { user, setToken } = AuthUserContext();
  const { mutateAsync: LogOut, isSuccess } = useLogOutUser();
  const customerId = StripeCustomer();
  const Sections = [
    {
      name: "orders",
      path: `/account/orders/${customerId}`,
      icon: "/assets/order.png",
    },
    {
      name: "favorites",
      path: "/account/favorites",
      icon: "/assets/heart.png",
    },
    {
      name: "addresses",
      path: "/account/address",
      icon: "/assets/location.png",
    },
  ];
  useEffect(() => {
    TopPage();
  }, []);

  return (
    <div className="md:container h-screen rounded-lg bg-white dark:bg-gray-900 py-5 mt-2">
      <div className="flex flex-col h-full w-full gap-6">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={() => {
                LogOut();
                setToken("");
              }}
              className="max-md:m-2 group flex items-center justify-start w-11 h-11 bg-gray-900 dark:bg-indigo-500 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 max-md:hover:w-24 hover:rounded-lg active:translate-x-1 active:translate-y-1"
            >
              <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                <svg
                  className="w-4 h-4 max-md:w-3 max-md:h-3"
                  viewBox="0 0 512 512"
                  fill="white"
                >
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div className="absolute right-5 max-md:right-3 transform translate-x-full opacity-0 text-white text-lg max-md:text-sm font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                {isSuccess ? <Loader /> : "Logout"}
              </div>
            </button>
            <BackButton />
          </div>
          <div className="flex flex-col items-center">
            <img
              className="xl:w-52 xl:h-52 lg:w-44 lg:h-44 md:w-40 md:h-40 w-32 h-32 rounded-full object-cover bg-gray-900 dark:bg-white "
              src={"/assets/user.jpg"}
              alt="profile image"
            />
            {user.email ? (
              <p className="text-gray-400 my-2 max-xs:text-sm">{user.email}</p>
            ) : (
              <Skeleton className="w-60 h-4 dark:bg-gray-600 my-2" />
            )}
            {user.name ? (
              <h1 className="xl:text-5xl lg:text-4xl text-3xl  text-gray-900 dark:text-white">
                {user.name}
              </h1>
            ) : (
              <Skeleton className="w-80 h-10 dark:bg-gray-600" />
            )}
          </div>
        </div>

        <div className="h-full grid xl:grid-cols-3 grid-cols-2 gap-4 max-xs:gap-2 max-md:px-1">
          {Sections.map((section, index) => (
            <Link
              key={index}
              to={section.path}
              className="bg-gray-900 text-white xl:text-5xl lg:text-4xl md:text-3xl hover:bg-indigo-600 transition ease-in-out
              duration-150 dark:bg-indigo-600 rounded-lg shadow-lg capitalize flex flex-col items-center justify-center
            dark:hover:bg-gray-400"
            >
              <img
                className="xl:w-20 xl:h-20 lg:w-16 lg-h-16 md:w-14 md:h-14 w-11 h-11 object-cover"
                src={section.icon}
                alt={section.name}
              />
              {section.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
