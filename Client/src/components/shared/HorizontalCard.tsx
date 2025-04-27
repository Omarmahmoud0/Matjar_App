import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "./rating";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProductCardProps } from "@/types/types";
import { useCart } from "@/context/HandelCartContext";
import { AuthUserContext } from "@/context/UserContextProvider";

export default function HorizontalCard({
  imageUrl,
  name,
  details,
  price,
  discountPercentage,
  rating,
  id,
}: ProductCardProps) {
  const { handleCart } = useCart();
  const { user } = AuthUserContext();
  const discountedPrice = discountPercentage
    ? price - price * (discountPercentage / 100)
    : price;
  const navigate = useNavigate();
  return (
    <Card className="overflow-hidden lg:px-4 lg:py-6 md:px-3 md:py-4 p-2 bg-white dark:bg-gray-800 rounded-md shadow-md ">
      <div
        onClick={() => navigate(`/product/${id}`)}
        className="cursor-pointer"
      >
        <div className="flex flex-row">
          <div className="relative flex-shrink-0 lg:h-64 lg:w-64 md:h-56 md:w-56 sm:h-48 sm:w-48 xs:h-40 xs:w-40 w-28 h-28 rounded-md bg-gray-200">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-contain"
            />
            {discountPercentage && (
              <Badge className="absolute left-2 top-2 bg-red-500">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>
          <div className="flex flex-col justify-between sm:p-4 pl-3 sm:w-2/3">
            <CardContent className="p-0">
              <h2 className="lg:text-2xl md:text-lg font-semibold mb-2 dark:text-white line-clamp-1">
                {name}
              </h2>
              <p className="md:text-base sm:text-sm text-xs text-gray-600 dark:text-gray-500 mb-1 line-clamp-1">
                {details}
              </p>
              <div className="mb-4">
                <Rating rating={rating} />
              </div>
              <div className="flex items-center">
                {discountPercentage && (
                  <span className="text-lg font-bold text-red-500 mr-2">
                    ${discountedPrice}
                  </span>
                )}
                <span
                  className={`md:text-lg ${
                    discountPercentage
                      ? "line-through text-gray-400"
                      : "font-bold"
                  } text-indigo-500`}
                >
                  ${price}
                </span>
              </div>
            </CardContent>
            <CardFooter className=" p-0 mt-4">
              <Button
                className="hidden md:flex w-[50%] max-xs:text-xs max-sm:py-1 lg:py-5 md:py-3 max-sm:px-3 max-xs:px-2 max-xs:py-[2px] rounded-full bg-inherit
                border-2 border-indigo-500 text-indigo-500 hover:text-white hover:bg-indigo-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCart({
                    Collection: "cart",
                    imageUrl: imageUrl,
                    name: name,
                    price: price,
                    ProductId: id,
                    qty: 1,
                    userId: user.id,
                  });
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </div>
        </div>
      </div>
    </Card>
  );
}
