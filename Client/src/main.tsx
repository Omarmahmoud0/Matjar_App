import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DarkMode } from "./context/DarkMode.tsx";
import { QueryProvider } from "./lib/reactQuery/QueryProvider.tsx";
import UserContextProvider from "./context/UserContextProvider.tsx";
import AuthFromContext from "./context/AuthFromContext.tsx";
import HandelCartContext from "./context/HandelCartContext.tsx";
import StripeCustomerContext from "./context/StripeCustomerContext.tsx";
import FavoriteProvider from "./context/FavoriteContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <DarkMode>
        <UserContextProvider>
          <AuthFromContext>
            <HandelCartContext>
              <StripeCustomerContext>
                <FavoriteProvider>
                  <App />
                </FavoriteProvider>
              </StripeCustomerContext>
            </HandelCartContext>
          </AuthFromContext>
        </UserContextProvider>
      </DarkMode>
    </QueryProvider>
  </BrowserRouter>
);
