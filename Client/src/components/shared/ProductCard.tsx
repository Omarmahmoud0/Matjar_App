import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ProductCardProps } from "@/types/types";
import {
  useAddToDoc,
  useDeleteFromDoc,
} from "@/lib/reactQuery/qusersAndMutation";
import { useCart } from "@/context/HandelCartContext";
import { Spinner } from "flowbite-react";
import { useAuthFormContext } from "@/context/AuthFromContext";
import { AuthUserContext } from "@/context/UserContextProvider";
import { useFavoriteContext } from "@/context/FavoriteContext";
import { useToast } from "@/hooks/use-toast";
import { ToastStyel, ToastStyelFaild } from "@/root/RootLayot";
import CartButton from "./CartButton";

export default function ProductCard({
  name,
  details,
  price,
  imageUrl,
  rating,
  button,
  id,
  userId,
  width,
}: ProductCardProps) {
  const { handleCart, addToLocalStorge } = useCart();
  const { setForm } = useAuthFormContext();
  const { isAuthenticated } = AuthUserContext();
  const { addToFavoriteHandler, favoriteProducts, Saves } =
    useFavoriteContext();
  const { mutateAsync: addToFavorite, isPending: isAddToFavorites } =
    useAddToDoc();
  const { mutateAsync: deleteFromFavorite, isPending: isDeletedFromFavorites } =
    useDeleteFromDoc();
  const toast = useToast();

  const isFavoriteProduct = Saves?.find(
    (productId: any) => productId.ProductId === id
  );

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAuthenticated) {
      const result = addToFavoriteHandler(id);
      if (
        !favoriteProducts.has(id) &&
        isFavoriteProduct?.id === undefined &&
        result !== undefined
      ) {
        await addToFavorite({
          userId: userId,
          ProductId: id,
          name: name,
          price: price,
          imageUrl: imageUrl,
          details: details,
          Collection: "saves",
        });
        toast.toast({
          title: "Added to favorites",
          description: "Product added to your favorites list.",
          duration: 2000,
          style: ToastStyel,
        });
      } else if (
        favoriteProducts.has(id) &&
        isFavoriteProduct?.id !== undefined &&
        result === undefined
      ) {
        await deleteFromFavorite({
          id: isFavoriteProduct?.id,
          Collection: "saves",
        });

        toast.toast({
          title: "Removed from favorites",
          description: "Product removed from your favorites list.",
          duration: 2000,
          style: ToastStyelFaild,
        });
      }
    } else if (!isAuthenticated) {
      setForm(true);
    }
  };
  const addTocart = async () => {
    if (isAuthenticated) {
      await handleCart({
        name: name,
        price: price,
        imageUrl: imageUrl,
        ProductId: id,
        userId: userId,
        qty: 1,
        Collection: "cart",
      });
    } else {
      addToLocalStorge(product);
    }
  };

  const product = {
    id,
    name,
    price,
    imageUrl: imageUrl,
    quantity: 1,
  };

  return (
    <div className="h-full">
      <div
        className={`relative flex flex-col justify-between md:w-full md:h-full ${
          width ? "" : "sm:w-48"
        }   border-2 bg-white
          dark:border-none rounded-xl p-2 `}
      >
        <>
          {isAddToFavorites || isDeletedFromFavorites ? (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 text-primary-foreground p-2 bg-white rounded-full"
            >
              <Spinner />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 text-primary-foreground p-2 bg-white rounded-full"
              onClick={handleFavorite}
            >
              <Heart
                className={
                  favoriteProducts.has(id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500"
                }
              />
            </Button>
          )}
        </>

        {/* addToCart(product); // Function to add product to cart */}
        <div className="md:hidden block absolute top-3 left-3">
          <CartButton addTocart={addTocart} />
        </div>
        {/* addToCart(product); */}

        <Link to={`/product/${id}`}>
          <img
            src={imageUrl}
            alt={name}
            className="aspect-square object-contain rounded-md bg-gray-200"
          />
          <div className="sm:my-4 max-sm:my-2">
            <h2 className="lg:text-lg md:text-[17px] max-md:text-[14px] max-xs:text-[13px] font-semibold capitalize line-clamp-2">
              {name}
            </h2>
            <p className="lg:text-sm md:text-[13px] text-[11px] text-muted-foreground mt-1 capitalize line-clamp-2 max-md:line-clamp-1">
              {details}
            </p>
            <div className="flex sm:items-center justify-between mt-2 max-sm:flex-col max-sm:gap-2">
              <span className="lg:text-xl md:text-lg max-xs:text-sm font-bold text-indigo-500">
                ${price?.toFixed(2)}
              </span>
              <div className="flex items-center lg:gap-2 max-sm:justify-between">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 max-xs:h-3 max-xs:w-3  ${
                        i < rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                {rating !== 0 && (
                  <span className="lg:text-sm md:text-[13px] text-xs">
                    ({rating})
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
        {button && (
          <Button
            className="hidden md:flex w-full max-xs:text-xs max-sm:py-1 max-sm:px-3 max-xs:px-2 max-xs:py-[2px] rounded-full bg-inherit
            border-2 border-indigo-500 text-indigo-500 hover:text-white hover:bg-indigo-500"
            onClick={addTocart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
}
