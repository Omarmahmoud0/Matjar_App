import { lazy, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import RootLayot from "./root/RootLayot";
import { Home } from "./root/pages";
import PageLoader from "./components/shared/PageLoader";
import { AuthUserContext } from "./context/UserContextProvider";
const CategoryPage = lazy(() => import("./root/pages/CategoryPage"));
const AccountPage = lazy(() => import("./root/pages/AccountPage"));
const ProductDetailsPage = lazy(
  () => import("./root/pages/ProductDetailsPage")
);
const AddressPage = lazy(() => import("./root/pages/AddressesPage"));
const OrdersPage = lazy(() => import("./root/pages/OrdersPage"));
const FavoritePage = lazy(() => import("./root/pages/FavoritePage"));
const UpdateAddressPage = lazy(() => import("./root/pages/UpdateAddressPage"));
const ShoppingCart = lazy(() => import("./root/pages/ShoppingCart"));
const PaymentSuccess = lazy(() => import("./root/pages/PaymentSuccess"));
const PageNotFound = lazy(() => import("./root/pages/PageNotFound"));

export const cookieFallback = localStorage.getItem("cookieFallback");

const App = () => {
  const { token } = AuthUserContext();
  const navigate = useNavigate();

  const PathProtection = ({ children }: { children: React.ReactNode }) => {
    if (
      token === undefined ||
      token === null ||
      token === "" ||
      token === "null" ||
      token === "false"
    ) {
      navigate("/");
      return children;
    }
    return children;
  };

  return (
    <div className="h-screen">
      <Routes>
        {/* PRIVATE ROUTE */}
        <Route element={<RootLayot />}>
          <Route index element={<Home />} />
          <Route
            path="/account"
            element={
              <Suspense fallback={<PageLoader />}>
                <PathProtection>
                  <AccountPage />
                </PathProtection>
              </Suspense>
            }
          />
          <Route
            path="/category/:section/:brand?"
            element={
              <Suspense fallback={<PageLoader />}>
                <CategoryPage />
              </Suspense>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProductDetailsPage />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<PageLoader />}>
                <ShoppingCart />
              </Suspense>
            }
          />
          <Route
            path="/account/address"
            element={
              <Suspense fallback={<PageLoader />}>
                <PathProtection>
                  <AddressPage />
                </PathProtection>
              </Suspense>
            }
          />
          <Route
            path="/account/orders/:customerId"
            element={
              <Suspense fallback={<PageLoader />}>
                <PathProtection>
                  <OrdersPage />
                </PathProtection>
              </Suspense>
            }
          />
          <Route
            path="/account/favorites"
            element={
              <Suspense fallback={<PageLoader />}>
                <PathProtection>
                  <FavoritePage />
                </PathProtection>
              </Suspense>
            }
          />
          <Route
            path="/update-address/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <PathProtection>
                  <UpdateAddressPage />
                </PathProtection>
              </Suspense>
            }
          />
          <Route
            path="/success/:sessionId"
            element={
              <Suspense fallback={<PageLoader />}>
                <PathProtection>
                  <PaymentSuccess />
                </PathProtection>
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageNotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
