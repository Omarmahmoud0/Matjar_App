import NavBar from "@/components/NavBar";
import BottomNavBar from "@/components/shared/BottomNavBar";
import FooterPage from "@/components/shared/FooterPage";
import LinksBar from "@/components/shared/LinksBar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export const ToastStyel = {
  color: "white",
  backgroundColor: "#0e9f6e ",
  borderColor: "#0e9f6e ",
};
export const ToastStyelFaild = {
  color: "white",
  backgroundColor: "#f05252",
  borderColor: "#f05252",
};

const RootLayot = () => {
  return (
    <div className="w-full min-h-screen">
      <NavBar />
      <LinksBar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <FooterPage />
      <BottomNavBar />

      {/* TOASTER SHADCN */}
      <Toaster />
    </div>
  );
};

export default RootLayot;
