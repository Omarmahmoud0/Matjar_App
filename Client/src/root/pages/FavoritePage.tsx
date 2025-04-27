import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteFromDoc } from "@/lib/reactQuery/qusersAndMutation";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { TopPage } from "@/lib/appwrite/api";
import { useCart } from "@/context/HandelCartContext";
import PageLoader from "@/components/shared/PageLoader";
import { useFavoriteContext } from "@/context/FavoriteContext";
import { AuthUserContext } from "@/context/UserContextProvider";
import BackButton from "@/components/shared/BackButton";

export default function FavoritePage() {
  const { mutate: deleteFromFavorite, isPending: isDeleteFavorite } =
    useDeleteFromDoc();
  const { handleCart } = useCart();
  const { Saves, isFetching } = useFavoriteContext();
  const { user } = AuthUserContext();

  useEffect(() => {
    TopPage();
  }, []);

  return (
    <div className="md:container relative min-h-screen rounded-lg bg-white dark:bg-gray-900 py-5 mt-2 w-full max-md:px-2">
      <div className="flex items-center md:h-28 h-12 mb-4 justify-between border-b border-indigo-500">
        <h1 className="md:text-3xl sm:text-2xl text-lg flex items-center gap-3 w-full pb-2 dark:text-white">
          Favorites
          <span className="text-sm text-gray-500">({Saves?.length} items)</span>
        </h1>
        <BackButton />
      </div>
      {isFetching && <PageLoader />}
      {isDeleteFavorite && <PageLoader />}
      {Saves?.length === 0 ? (
        <div className="text-center py-12">
          <p className="md:text-xl text-base text-gray-500 dark:text-white">
            Your favorites list is empty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 gap-3">
          <AnimatePresence>
            {Saves?.map((product: any) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="relative flex flex-col justify-between sm:h-full w-full border-2 bg-white
          dark:border-none rounded-xl p-2"
                >
                  <Link to={`/product/${product.ProductId}`}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-60 max-xs:h-48 object-contain rounded-md bg-gray-200"
                    />
                    <div className="sm:my-4 max-sm:my-2">
                      <h2 className="lg:text-lg md:text-[17px] max-md:text-[14px] max-xs:text-[13px] font-semibold capitalize line-clamp-2">
                        {product.name}
                      </h2>
                      <p className="lg:text-sm md:text-[13px] text-[11px] text-muted-foreground mt-1 capitalize line-clamp-2 max-md:line-clamp-1">
                        {product.details}
                      </p>
                      <div className="flex sm:items-center justify-between mt-2 max-sm:flex-col max-sm:gap-2">
                        <span className="lg:text-xl md:text-lg max-xs:text-sm text-indigo-500">
                          ${product.price}
                        </span>
                        <div className="flex items-center lg:gap-2 max-sm:justify-between">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 max-xs:h-3 max-xs:w-3  ${
                                  i < product.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          {product.rating && (
                            <span className="lg:text-sm md:text-[13px] text-xs">
                              ({product.rating})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="flex items-center gap-5">
                    <Button
                      className="hidden md:flex w-full max-xs:text-xs max-sm:py-1 max-sm:px-3 max-xs:px-2 max-xs:py-[2px] rounded-full bg-inherit
                      border-2 border-indigo-500 text-indigo-500 hover:text-white hover:bg-indigo-500"
                      onClick={() =>
                        handleCart({
                          Collection: "cart",
                          imageUrl: product.imageUrl,
                          name: product.name,
                          price: product.price,
                          ProductId: product.ProductId,
                          userId: user.id,
                          qty: 1,
                        })
                      }
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                    <Button
                      onClick={() =>
                        deleteFromFavorite({
                          Collection: "saves",
                          id: product.id,
                        })
                      }
                      variant="outline"
                      size={"icon"}
                      className="transition duration-150 ease-in-out hover:text-red-600"
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
