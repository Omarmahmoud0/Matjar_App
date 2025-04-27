// components/BottomBar.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import SearchOverlay from "./SearchOverlay";
import { AuthUserContext } from "@/context/UserContextProvider";
import { useCart } from "@/context/HandelCartContext";
import { useFavoriteContext } from "@/context/FavoriteContext";
import { useAuthFormContext } from "@/context/AuthFromContext";

const navItems = [
  { id: "home", label: "home", icon: Home, link: "/" },
  { id: "search", label: "search", icon: Search, link: "#" },
  { id: "cart", label: "cart", icon: ShoppingBag, link: "/cart" },
  {
    id: "wishlist",
    label: "wishlist",
    icon: Heart,
    link: "/account/favorites",
  },
  { id: "account", label: "account", icon: User, link: "/account" },
];

export default function BottomNavBar() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [prevTab, setPrevTab] = useState<string | null>(null);
  const [ripple, setRipple] = useState<{
    x: number;
    y: number;
    id: string;
  } | null>(null);
  const rippleRef = useRef<any>(null);
  const { token } = AuthUserContext();
  const { localStorageCart, Cart } = useCart();
  const { favoriteProducts } = useFavoriteContext();
  const { setForm } = useAuthFormContext();

  const totalQty = localStorageCart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleTabClick = (id: string, e: any) => {
    if ((!token && id === "account") || (!token && id === "wishlist")) {
      setForm(true);
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ x, y, id });

    setPrevTab(activeTab);
    setActiveTab(id);

    if (window.navigator.vibrate) window.navigator.vibrate(50);

    if (id === "search") {
      setIsVisible(true);
      // Trigger animation in next frame to ensure DOM update
      requestAnimationFrame(() => {
        setIsAnimatingIn(true);
      });
    } else {
      setIsVisible(false);
      setIsAnimatingIn(false);
    }
  };

  useEffect(() => {
    if (ripple) {
      rippleRef.current = setTimeout(() => {
        setRipple(null);
      }, 500);
    }
    return () => clearTimeout(rippleRef.current!);
  }, [ripple]);

  return (
    <>
      <SearchOverlay
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        isAnimatingIn={isAnimatingIn}
        setIsAnimatingIn={setIsAnimatingIn}
      />

      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-full rounded-2xl bg-white/70 backdrop-blur-md shadow-xl px-3 py-2 border border-white/30"
        >
          <nav className="flex items-center justify-between">
            {navItems.map((item) => {
              const isActive = item.link === pathname;
              const wasActive = prevTab === item.id;
              const Icon = item.icon;

              return (
                <Link
                  to={item.link}
                  key={item.id}
                  onClick={(e) => handleTabClick(item.id, e)}
                  className="group relative flex flex-1 flex-col items-center justify-center overflow-hidden py-2 rounded-xl"
                >
                  {/* Ripple */}
                  {ripple && ripple.id === item.id && (
                    <span
                      className="absolute animate-ripple rounded-full bg-indigo-200"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: 100,
                        height: 100,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  )}

                  {/* Background hover */}
                  <span
                    className={clsx(
                      "absolute inset-0 w-12 mx-auto rounded-full bg-indigo-500  transition-opacity duration-200",
                      isActive
                        ? "opacity-100"
                        : "group-hover:opacity-60 opacity-0"
                    )}
                  />

                  {/* Icon */}
                  <motion.span
                    className="relative z-10"
                    animate={{
                      scale: isActive ? 1.2 : wasActive ? 0.9 : 1,
                      color: isActive ? "#e5edff" : "#6B7280",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Icon className="w-6 h-6" />
                    {1 > 0 && item.id === "cart" && (
                      <span className="absolute -top-1 -right-2 h-4 w-4 text-[10px] bg-gray-800 text-white flex items-center justify-center rounded-full font-bold">
                        {token && Cart ? Cart?.length : totalQty}
                      </span>
                    )}
                    {token && item.id === "wishlist" && (
                      <span className="absolute -top-1 -right-2 h-4 w-4 text-[10px] bg-gray-800 text-white flex items-center justify-center rounded-full font-bold">
                        {token && favoriteProducts && favoriteProducts.size}
                      </span>
                    )}
                  </motion.span>

                  {/* Label */}
                  <span
                    className={clsx(
                      "mt-1 text-[11px] font-medium transition-all capitalize dark:text-gray-800",
                      isActive
                        ? "text-indigo-600"
                        : "text-gray-500 group-hover:text-indigo-500"
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Active dot */}
                  <span
                    className={clsx(
                      "absolute bottom-1 z-10 h-1 w-1 rounded-full bg-indigo-100 transition-all duration-300",
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>
        </motion.div>
      </div>
    </>
  );
}
