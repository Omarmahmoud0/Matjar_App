import { useToast } from "@/hooks/use-toast";
import {
  useAddToDoc,
  useGetCart,
  useUpdateProductCartQty,
} from "@/lib/reactQuery/qusersAndMutation";
import { ToastStyel } from "@/root/RootLayot";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthUserContext } from "./UserContextProvider";
import { AddDoc, CartContextProps, ILocalStorgeItems } from "@/types/types";

const InitialhandelCart = async () => {};

const CartContext = createContext<CartContextProps>({
  handleCart: InitialhandelCart,
  localStorageCart: [],
  handleLOcalStorgeCart: () => {},
  addToLocalStorge: () => {},
  Cart: [],
  isFetching: false,
});

const HandelCartContext = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();
  const { isAuthenticated, user } = AuthUserContext();
  const { mutateAsync: addToCart } = useAddToDoc();
  const { data: Cart, isFetching } = useGetCart(user.id);
  const { mutateAsync: updateProductCartQty } = useUpdateProductCartQty();
  const [localStorageCart, setLocalStorageCart] = useState<ILocalStorgeItems[]>(
    []
  );

  const handleCart = async (product: AddDoc) => {
    const checkExistProcut: any = Cart?.find((item: any) =>
      item.ProductId === product.ProductId ? item : null
    );
    const Toast = toast.toast({
      title: "Product added to cart successfully",
      style: ToastStyel,
      open: false,
    });
    if (checkExistProcut) {
      const update = await updateProductCartQty({
        id: checkExistProcut.id,
        qty: product.qty
          ? checkExistProcut.qty + product.qty
          : checkExistProcut.qty + 1,
      });
      if (update) {
        Toast;
      }
    } else {
      const addCart = await addToCart({
        userId: user.id,
        ProductId: product.ProductId,
        qty: product.qty ? product.qty : 1,
        imageUrl: product.imageUrl,
        name: product.name,
        price: product.price,
        Collection: "cart",
      });
      if (addCart) {
        Toast;
      }
    }
  };

  const addToLocalStorge = (product: ILocalStorgeItems) => {
    const existingProduct = localStorageCart.find(
      (item) => item.id === product.id
    );

    if (!existingProduct) {
      setLocalStorageCart((prev) => [...prev, product]);
    } else {
      const updatedCart = localStorageCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + product.quantity,
            }
          : item
      );
      setLocalStorageCart(updatedCart);
    }
    if (product) {
      toast.toast({
        title: "Product added to cart successfully",
        style: ToastStyel,
        open: false,
      });
    }
  };

  const handleLOcalStorgeCart = (Id: string, type: string) => {
    if (type === "decrement") {
      setLocalStorageCart(
        localStorageCart.map((i) =>
          i.id === Id && i.quantity && i.quantity > 1
            ? {
                ...i,
                quantity: i.quantity - 1,
              }
            : i
        )
      );
    } else if (type === "increment") {
      setLocalStorageCart(
        localStorageCart.map((i) =>
          i.id === Id
            ? {
                ...i,
                quantity: i.quantity + 1,
              }
            : i
        )
      );
    } else if (type === "remove") {
      setLocalStorageCart(localStorageCart.filter((i) => i.id !== Id));
    }
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cartItems) {
      setLocalStorageCart([...cartItems]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(localStorageCart));
  }, [localStorageCart]);

  useEffect(() => {
    if (isAuthenticated && Cart && localStorageCart.length > 0) {
      localStorageCart.forEach(async (product) => {
        await handleCart({
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          ProductId: product.id,
          userId: user.id,
          qty: product.quantity,
          Collection: "cart",
        });
      });
      localStorage.removeItem("cart");
      setLocalStorageCart([]);
    }
  }, [isAuthenticated, Cart, localStorageCart]);

  return (
    <CartContext.Provider
      value={{
        handleCart,
        localStorageCart,
        handleLOcalStorgeCart,
        addToLocalStorge,
        Cart,
        isFetching,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default HandelCartContext;

export const useCart = () => {
  return useContext(CartContext);
};
