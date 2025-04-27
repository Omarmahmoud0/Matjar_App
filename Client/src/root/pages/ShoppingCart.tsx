import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  useDeleteFromDoc,
  useGetAddress,
  useHandelCheckout,
  useUpdateProductCartQty,
} from "@/lib/reactQuery/qusersAndMutation";
import { ToastStyel, ToastStyelFaild } from "../RootLayot";
import { Link, useNavigate } from "react-router-dom";
import { StripeCustomer } from "@/context/StripeCustomerContext";
import PageLoader from "@/components/shared/PageLoader";
import { TopPage } from "@/lib/appwrite/api";
import { AuthUserContext } from "@/context/UserContextProvider";
import { ILocalStorgeItems } from "@/types/types";
import { useAuthFormContext } from "@/context/AuthFromContext";
import { useCart } from "@/context/HandelCartContext";
import BackButton from "@/components/shared/BackButton";

export default function ProfessionalShoppingCart() {
  const toast = useToast();
  const navigate = useNavigate();
  const { token } = AuthUserContext();
  const customerId = StripeCustomer();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const { mutateAsync: updateQuantity, isPending: isUpdateQuantity } =
    useUpdateProductCartQty();
  const { mutateAsync: RemoveItem, isPending: isRemovedItem } =
    useDeleteFromDoc();
  const { mutateAsync: CreateCheckout } = useHandelCheckout();
  const { setForm } = useAuthFormContext();
  const { localStorageCart, handleLOcalStorgeCart, Cart, isFetching } =
    useCart();
  const { data: address } = useGetAddress(token);
  const findAddressPrimary: any = address?.find(
    (adrs: any) => adrs.isDefault === true
  );

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "discount10") {
      setDiscount(10);
      toast.toast({
        title: "Coupon applied",
        description: "A $10 discount has been applied to your order.",
        variant: "default",
        style: ToastStyel,
        open: false,
      });
    } else {
      setDiscount(0);
      toast.toast({
        title: "Invalid coupon",
        description: "The entered coupon code is not valid.",
        variant: "destructive",
        style: ToastStyelFaild,
        open: false,
      });
    }
  };

  const handleRemoveItem = (item: any) => {
    if (item.qty === 1) {
      RemoveItem({ Collection: "cart", id: item.id });
    } else {
      updateQuantity({
        id: item.id,
        qty: item.qty - 1,
      });
    }
  };

  const subtotal = Cart?.reduce(
    (sum: number, item: any) => sum + item.price * item.qty,
    0
  );

  const localStorageSubtotal = localStorageCart.reduce(
    (sum: number, item: ILocalStorgeItems) =>
      sum + item.price * (item.quantity ? item.quantity : 1),
    0
  );

  const shipping = 20; // Fixed shipping cost
  const totalLocalStorage = localStorageSubtotal + shipping - discount;
  const total = subtotal && subtotal + shipping - discount;

  const handelCheckout = async () => {
    try {
      if (token) {
        if (address?.length === 0) {
          setTimeout(() => {
            navigate("/account/address");
          }, 3000);
          toast.toast({
            title: "Please add an address",
            description:
              "You need to add an address before checkout. we will redirect you to the address page.",
            variant: "destructive",
            style: ToastStyelFaild,
            open: false,
          });
          return;
        }
        if (Cart && customerId) {
          await CreateCheckout({
            cart: Cart,
            customerId: customerId,
            address: findAddressPrimary,
          });
          toast.toast({
            title: "Redirecting to checkout...",
            style: ToastStyel,
            open: false,
          });
        }
      } else {
        setForm(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    TopPage();
  }, []);

  return (
    <div className="md:container w-full min-h-screen mt-3 rounded-lg dark:text-white bg-white dark:bg-gray-900">
      {isFetching && <PageLoader />}
      {isUpdateQuantity && <PageLoader />}
      {isRemovedItem && <PageLoader />}
      <Card className="border-none outline-none shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="sm:text-2xl text-lg flex items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
              Your Shopping Cart
            </CardTitle>
            <BackButton />
          </div>
        </CardHeader>
        <CardContent>
          {token && (
            <>
              <div className="space-y-6">
                {Cart?.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg"
                  >
                    <Link to={`/product/${item.ProductId}`}>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="md:w-24 md:h-24 sm:w-20 sm:h-20 max-sm:w-16 max-sm:h-16 object-contain rounded-md"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <h3 className="md:text-lg sm:text-base max-xs:text-sm font-semibold truncate ">
                        {item.name}
                      </h3>
                      <p className="sm:text-sm max-xs:text-xs text-muted-foreground">
                        $ {item.price}
                      </p>
                      <div className="flex items-center md:gap-2 gap-1 mt-2">
                        <Button
                          className="border-2 border-white hover:bg-indigo-500 hover:text-white max-md:w-6 max-md:h-6"
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveItem(item)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="md:w-8 w-5 text-center">
                          {item.qty}
                        </span>
                        <Button
                          className="border-2 border-white hover:bg-indigo-500 hover:text-white max-md:w-6 max-md:h-6"
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity({
                              id: item.id,
                              qty: item.qty + 1,
                            })
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        $ {(item.price * item.qty).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mt-2 bg-indigo-500 hover:bg-red-500 text-white max-md:w-6 max-md:h-6 max-md:mt-4"
                        onClick={() => {
                          RemoveItem({ Collection: "cart", id: item.id });
                          toast.toast({
                            title: "Item removed successfully",
                            style: ToastStyel,
                            open: false,
                          });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {!token && (
            <div className="space-y-6">
              {localStorageCart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg"
                >
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="md:w-24 md:h-24 sm:w-20 sm:h-20 max-sm:w-16 max-sm:h-16 object-contain rounded-md"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <h3 className="md:text-lg sm:text-base max-xs:text-sm font-semibold truncate ">
                      {item.name}
                    </h3>
                    <p className="sm:text-sm max-xs:text-xs text-muted-foreground">
                      $ {item.price}
                    </p>
                    <div className="flex items-center md:gap-2 gap-1 mt-2">
                      <Button
                        className="border-2 border-white hover:bg-indigo-500 hover:text-white max-md:w-6 max-md:h-6"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleLOcalStorgeCart(item.id, "decrement")
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="md:w-8 w-5 text-center">
                        {item.quantity ? item.quantity : 1}
                      </span>
                      <Button
                        className="border-2 border-white hover:bg-indigo-500 hover:text-white max-md:w-6 max-md:h-6"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleLOcalStorgeCart(item.id, "increment")
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${" "}
                      {(item.quantity
                        ? item.price * item.quantity
                        : item.price
                      ).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-2 bg-indigo-500 hover:bg-red-500 text-white max-md:w-6 max-md:h-6 max-md:mt-4"
                      onClick={() => {
                        handleLOcalStorgeCart(item.id, "remove");
                        toast.toast({
                          title: "Item removed successfully",
                          style: ToastStyel,
                          open: false,
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <Separator className="my-4" />
        {(token && Cart?.length !== 0) || localStorageCart.length !== 0 ? (
          <CardFooter className="max-w-2xl mx-auto">
            <div className="w-full space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={applyCoupon}
                >
                  Apply Coupon
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    ${" "}
                    {token && subtotal
                      ? subtotal?.toFixed(2)
                      : localStorageSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$ {shipping}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-$ {discount?.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>
                    ${" "}
                    {token && total
                      ? total.toFixed(2)
                      : totalLocalStorage.toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                size="lg"
                onClick={handelCheckout}
              >
                Checkout
              </Button>
            </div>
          </CardFooter>
        ) : (
          EmptyCart()
        )}
      </Card>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center py-8">
      <img
        src="/assets/shopping-cart.png"
        className="p-2 rounded-full bg-indigo-500 sm:w-80 sm:h-80 max-sm:w-60 max-sm:h-60"
        alt=""
      />
      <h3 className="md:text-2xl text-lg font-semibold my-2">
        Your cart is empty
      </h3>
      <p className="text-muted-foreground text-gray-500 text-center max-sm:text-sm">
        Look likes you haven't added anything to your cart yet. Go <br /> ahead
        and add some products.
      </p>
      <Link to="/" className="mt-4 text-indigo-500 hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
}
