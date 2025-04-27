import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

export default function CartButton({
  addTocart,
}: {
  addTocart: () => Promise<void>;
}) {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleClick = () => {
    if (isAdding || isAdded) return;

    setIsAdding(true);

    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);

      setTimeout(() => {
        setIsAdded(false);
      }, 1500);
    }, 600);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => {
          addTocart();
          handleClick();
        }}
        disabled={isAdding}
        className={`
          relative flex items-center justify-center w-10 h-10 rounded-full
          transition-all duration-300 ease-out transform
          shadow-md hover:shadow-lg
          ${
            isAdding
              ? "bg-indigo-400 scale-95"
              : isAdded
              ? "bg-green-500 scale-110"
              : "bg-indigo-500 hover:bg-indigo-400"
          }
          focus:outline-none focus:ring-2 focus:ring-yellow-300
        `}
        aria-label="Add to cart"
      >
        {/* Default state */}
        <span
          className={`
            absolute inset-0 flex items-center justify-center
            transition-all duration-200 
            ${
              isAdding || isAdded
                ? "opacity-0 scale-50"
                : "opacity-100 scale-100"
            }
          `}
        >
          <ShoppingCart className="w-5 h-5 text-white" />
        </span>

        {/* Loading state */}
        <span
          className={`
            absolute inset-0 flex items-center justify-center
            transition-all duration-200 
            ${isAdding ? "opacity-100 scale-100" : "opacity-0 scale-50"}
          `}
        >
          <ShoppingCart
            className="w-4 h-4 text-white animate-bounce"
            strokeWidth={3}
          />
        </span>

        {/* Success state */}
        <span
          className={`
            absolute inset-0 flex items-center justify-center
            transition-all duration-200 
            ${isAdded ? "opacity-100 scale-100" : "opacity-0 scale-50"}
          `}
        >
          <Check className="w-5 h-5 text-white" strokeWidth={3} />
        </span>
      </button>
    </div>
  );
}
