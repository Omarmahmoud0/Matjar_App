import { useGetFavoriteProducts } from "@/lib/reactQuery/qusersAndMutation";
import { FavoriteContextProps } from "@/types/types";
import { createContext, useState, useEffect, useContext } from "react";
import { AuthUserContext } from "./UserContextProvider";

const InitialState = {
  favoriteProducts: new Set(),
  addToFavoriteHandler: () => "",
  Saves: [],
  isFetching: false,
};

const FavoriteContext = createContext<FavoriteContextProps>(InitialState);

const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoriteProducts, setFavoriteProducts] = useState(new Set());
  const { user } = AuthUserContext();

  const { data: Saves, isFetching } = useGetFavoriteProducts(user.id);

  useEffect(() => {
    if (Saves) {
      const saves = Saves.map((product: any) => product.ProductId);
      setFavoriteProducts(new Set([...saves]));
    }
  }, [Saves]);

  const addToFavoriteHandler = (productId: string) => {
    if (!favoriteProducts.has(productId)) {
      setFavoriteProducts((prev) => {
        const newSet = new Set(prev);
        newSet.add(productId);
        return newSet;
      });
      return productId;
    } else {
      setFavoriteProducts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  return (
    <FavoriteContext.Provider
      value={{ addToFavoriteHandler, favoriteProducts, Saves, isFetching }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
export default FavoriteProvider;

export const useFavoriteContext = () => {
  return useContext(FavoriteContext);
};
