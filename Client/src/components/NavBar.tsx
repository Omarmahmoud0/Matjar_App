import { useState } from "react";
import { Link } from "react-router-dom";
import Badge, { BadgeProps } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import SideBar from "./shared/SideBar";
import { styled } from "@mui/material/styles";
import Theme from "./shared/Theme";
import AuthForms from "@/_auth/AuthForms";
import { useAuthFormContext } from "@/context/AuthFromContext";
import { useSearchForProducts } from "@/lib/reactQuery/qusersAndMutation";
import useDebounce from "./useDebounce";
import { Spinner } from "flowbite-react";
import { AuthUserContext } from "@/context/UserContextProvider";
import { useCart } from "@/context/HandelCartContext";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const NavBar = () => {
  const [Nav, setNav] = useState(false);
  const { form, setForm } = useAuthFormContext();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data: searchProducts, isFetching: isSearchProduct } =
    useSearchForProducts(debouncedSearch);
  const { token } = AuthUserContext();
  const { localStorageCart, Cart } = useCart();

  const totalQty = localStorageCart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <nav
        className="flex items-center bg-white dark:bg-indigo-950  w-full h-[80px] border-b
      border-gray-200 dark:border-gray-600"
      >
        <div className="container flex items-center justify-between p-4 w-full">
          {/* SECTION LEFT SIDE */}

          <Link to="/">
            <div className="flex items-center gap-2">
              <img src="/assets/logo.png" width={50} alt="logo" />
              <span className="text-indigo-500 font-semibold tracking-widest text-2xl uppercase sm:text-3xl">
                Matjar
              </span>
            </div>
          </Link>

          {/* SECTION LEFT SIDE */}

          {/* SEARCH SECTION */}
          <div className="hidden md:flex items-center relative xl:w-80 w-64 focus:w-6/12 focus-within:w-6/12 ease-in-out duration-500">
            <Input
              value={search}
              className="outline-none rounded-xl bg-slate-200 w-full dark:bg-gray-700 dark:placeholder:text-white dark:text-white pl-10 pr-4 py-5 border-none"
              placeholder="Search Product"
              onChange={(e) => setSearch(e.target.value)}
            />
            {isSearchProduct ? (
              <div className="absolute left-2">
                <Spinner aria-label="Default status example" />
              </div>
            ) : (
              <SearchIcon
                className="absolute left-2 dark:text-white"
                color="action"
              />
            )}
          </div>
          {/* SEARCH SECTION */}

          {/* SECTION RIGHT SIDE */}
          <div className="flex items-center xl:gap-8 lg:gap-4 gap-2">
            <div className="hidden md:block">
              <Theme />
            </div>

            {/* ACCOUNT */}
            {!token ? (
              <div
                className=" items-center gap-2 cursor-pointer hover:text-orange-500 dark:text-white
              hover:dark:text-indigo-500 max-md:w-9 max-md:h-9 max-md:rounded-full justify-center
              max-md:hover:bg-slate-300 ease-in-out duration-200 max-md:dark:hover:bg-slate-50 hidden md:flex"
                onClick={() => setForm(true)}
              >
                <PersonIcon color="action" className="dark:text-white" />
                <p className="hidden md:block">Sign In</p>
              </div>
            ) : (
              <Link to="/account">
                <div
                  className=" items-center gap-2 cursor-pointer hover:text-orange-500 dark:text-white
              hover:dark:text-indigo-500 max-md:w-9 max-md:h-9 max-md:rounded-full justify-center
              max-md:hover:bg-slate-300 ease-in-out duration-200 max-md:dark:hover:bg-slate-50 hidden md:flex"
                >
                  <PersonIcon color="action" className="dark:text-white" />
                  <p className="hidden md:block">Account</p>
                </div>
              </Link>
            )}

            {/* ACCOUNT */}

            {/* ShoppingCart */}
            <Link to="/cart" className="md:block hidden">
              <IconButton aria-label="cart">
                <StyledBadge
                  badgeContent={token && Cart ? Cart?.length : totalQty}
                  color="secondary"
                >
                  <ShoppingCartIcon className="text-indigo-500 dark:text-stone-50" />
                </StyledBadge>
              </IconButton>
            </Link>
            {/* ShoppingCart */}

            <button
              type="button"
              onClick={() => setNav(true)}
              className="border border-indigo-500 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>

            <SideBar Nav={Nav} setNav={setNav} />
          </div>
          {/* SECTION RIGHT SIDE */}
        </div>
      </nav>

      {/* Section for search Products */}
      {search.trim() && (
        <div
          className="absolute top-16 left-[50%] translate-x-[-50%] z-30 w-[50%] max-h-[450px] overflow-y-scroll bg-gray-200
          dark:bg-gray-800 rounded-lg shadow-2xl p-2"
        >
          {searchProducts?.length === 0 && (
            <p className="text-center p-2 dark:text-gray-500 text-gray-400">
              No Result Found
            </p>
          )}
          {searchProducts?.map((product: any) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div
                className="flex items-center justify-between p-2 dark:text-white md:text-lg hover:bg-gray-300
              dark:hover:bg-gray-700 rounded-lg cursor-pointer transition ease-in-out duration-75"
                onClick={() => setSearch("")}
              >
                <div className="flex items-center">
                  <img
                    className="w-24 h-24 object-contain bg-indigo-500 dark:bg-gray-400 rounded-lg"
                    src={product.imageUrl[0]}
                    alt=""
                  />
                  <h2 className="pl-2 line-clamp-1">{product.name}</h2>
                </div>
                <p>
                  <span className="text-indigo-500">$</span>
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {/* Section for search Products */}

      {form && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex justify-center items-center">
          <AuthForms setForm={setForm} />
        </div>
      )}
    </>
  );
};

export default NavBar;
