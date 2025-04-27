import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import useDebounce from "../useDebounce";
import { useSearchForProducts } from "@/lib/reactQuery/qusersAndMutation";
import { Link } from "react-router-dom";

export default function SearchOverlay({
  isVisible,
  setIsVisible,
  isAnimatingIn,
  setIsAnimatingIn,
}: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const { data: searchProducts, isFetching } =
    useSearchForProducts(debouncedSearch);

  // Animation duration in ms (must match CSS)
  const animationDuration = 300;

  // Handle closing the search with animation
  const closeSearch = () => {
    setIsAnimatingIn(false);
    // Wait for animation to complete before removing from DOM
    setTimeout(() => {
      setIsVisible(false);
      setSearchQuery("");
    }, animationDuration);
  };

  // Prevent body scroll when search is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  // Focus input when search is opened
  useEffect(() => {
    if (isVisible && isAnimatingIn && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, animationDuration); // Wait for animation to complete
    }
  }, [isVisible, isAnimatingIn]);

  // Handle escape key to close search
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isVisible]);

  return (
    <>
      {/* Search trigger button */}

      {/* Full screen search overlay with animation */}
      {isVisible && (
        <>
          {/* Backdrop overlay */}
          <div
            className={`fixed inset-0 z-50  backdrop-blur-sm transition-opacity duration-300 bg-white dark:bg-indigo-950 ${
              isAnimatingIn ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeSearch}
          />

          {/* Search container with slide animation */}
          <div
            className={`fixed inset-0 z-50 flex flex-col bg-background transition-transform duration-300 ease-in-out dark:text-white ${
              isAnimatingIn ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {/* Search header */}
            <div className="flex items-center gap-2 border-b p-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={closeSearch}
                className="mr-1 "
              >
                <ArrowLeft className="h-5 w-5 dark:text-white text-gray-800 active:text-gray-400 dark:active:text-gray-300" />
                <span className="sr-only">Back</span>
              </Button>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground text-gray-500" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for products..."
                  className="pl-9 pr-9 dark:bg-white dark:text-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full p-0 bg-gray-400"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Search content */}
            <div className="flex-1 overflow-hidden">
              {/* Loading state */}
              {isFetching && (
                <div className="flex h-full items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 dark:border-white border-indigo-500 border-t-transparent"></div>
                </div>
              )}

              {/* Search results */}
              <>
                {searchProducts && searchProducts.length > 0 ? (
                  <ScrollArea className="h-full">
                    <div className="divide-y">
                      {searchProducts.map((product: any) => (
                        <Link
                          to={`/product/${product.id}`}
                          key={product.id}
                          onClick={() => closeSearch()}
                          className="flex cursor-pointer items-center gap-4 p-4 hover:bg-muted active:bg-muted/80"
                        >
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                            <img
                              src={product.imageUrl[0] || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-contain object-center bg-gray-200"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-medium line-clamp-2">
                              {product.name}
                            </h3>
                            <div className="mt-1 flex items-center gap-3">
                              <Badge variant="outline">
                                {product.category}
                              </Badge>
                              <p className="font-medium">
                                ${product.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  searchQuery &&
                  searchProducts?.length === 0 && (
                    <div className="flex h-full flex-col items-center justify-center p-4">
                      <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
                      <h3 className="text-xl font-medium">No products found</h3>
                      <p className="mt-2 text-center text-muted-foreground">
                        We couldn't find any products matching "{searchQuery}"
                      </p>
                    </div>
                  )
                )}
              </>
            </div>
          </div>
        </>
      )}
    </>
  );
}
