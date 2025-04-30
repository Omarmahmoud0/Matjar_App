import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToDoc,
  clearCart,
  createCustomerStripe,
  createNewAddress,
  deleteFromDoc,
  filterProducts,
  getAddress,
  getAddressById,
  getAllProducts,
  getCart,
  getClothesProduct,
  getCustomerStripe,
  getElectronicsProduct,
  getFavoriteProducts,
  getOrdersCustomer,
  getProductByID,
  getRecommendedProduct,
  getSessionData,
  handelCheckout,
  Login,
  LogOut,
  searchForProducts,
  Signup,
  updateAddress,
  updateProductCartQty,
} from "../firebase/api";
import { AddDoc, AuthForm, INewAddress, IUpdateAddress } from "@/types/types";

export function useRegisterUser() {
  return useMutation({
    mutationFn: (user: AuthForm) => Signup(user),
  });
}

export function useLogInUser() {
  return useMutation({
    mutationFn: (user: AuthForm) => Login(user),
  });
}

export function useLogOutUser() {
  return useMutation({
    mutationFn: () => LogOut(),
    onSuccess: () => {
      window.location.reload();
    },
  });
}

export function useGetRecProduct() {
  return useQuery({
    queryKey: ["GetRecProduct"],
    queryFn: () => getRecommendedProduct(),
  });
}

export function useGetElecProduct() {
  return useQuery({
    queryKey: ["GetElecProduct"],
    queryFn: () => getElectronicsProduct(),
  });
}

export function useGetclothesProduct() {
  return useQuery({
    queryKey: ["GetClothesProduct"],
    queryFn: () => getClothesProduct(),
  });
}

export function useGetAllProducts(category: string) {
  return useQuery({
    queryKey: ["allProducts", category],
    queryFn: () => getAllProducts(category),
  });
}

export function useFilters(category: string, brand?: string, color?: string) {
  return useQuery({
    queryKey: ["Category", category, brand, color],
    queryFn: () => filterProducts(category, brand, color),
    enabled: !!category,
  });
}

export function useGetProduct(id: string) {
  return useQuery({
    queryKey: ["GetProduct", id],
    queryFn: () => getProductByID(id),
    enabled: !!id,
  });
}

export function useGetCart(userId: string) {
  return useQuery({
    queryKey: ["GetCart", userId],
    queryFn: () => getCart(userId),
    enabled: !!userId,
  });
}

export function useGetFavoriteProducts(userId: string) {
  return useQuery({
    queryKey: ["GetFavoriteProducts", userId],
    queryFn: () => getFavoriteProducts(userId),
    enabled: !!userId,
  });
}

export function useAddToDoc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: AddDoc) => addToDoc(product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetFavoriteProducts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GetCart"],
      });
    },
  });
}

export function useDeleteFromDoc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, Collection }: { id: string; Collection: string }) =>
      deleteFromDoc(id, Collection),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetFavoriteProducts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GetCart"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GetAddress"],
      });
    },
  });
}

export function useGetAddressById(id: string) {
  return useQuery({
    queryKey: ["GetAddressById", id],
    queryFn: () => getAddressById(id),
    enabled: !!id,
  });
}

export function useGetAddress(userId: string) {
  return useQuery({
    queryKey: ["GetAddress", userId],
    queryFn: () => getAddress(userId),
    enabled: !!userId,
  });
}

export function useCreateNewAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: INewAddress) => createNewAddress(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetAddress"],
      });
    },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUpdateAddress) => updateAddress(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetAddress"],
      });
    },
  });
}

export function useUpdateProductCartQty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: { id: string; qty: number }) =>
      updateProductCartQty(product.id, product.qty),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetCart"],
      });
    },
  });
}

export function useSearchForProducts(search: string) {
  return useQuery({
    queryKey: ["searchForProducts", search],
    queryFn: () => searchForProducts(search),
    enabled: !!search,
  });
}

// Stripe functions //
export function useCreateCustomerStripe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (customer: { email: string; name: string }) =>
      createCustomerStripe(customer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerStripe"] });
    },
  });
}

export function useGetCustomerStripe(email: string) {
  return useQuery({
    queryKey: ["customerStripe", email],
    queryFn: () => getCustomerStripe(email),
    enabled: !!email,
  });
}

export function useGetOrdersCustomer(customerId: string) {
  return useQuery({
    queryKey: ["OrdersCustomer", customerId],
    queryFn: () => getOrdersCustomer(customerId),
    enabled: !!customerId,
  });
}

export function useGetSessionData(sessionId: string) {
  return useQuery({
    queryKey: ["sessionData", sessionId],
    queryFn: () => getSessionData(sessionId),
    enabled: !!sessionId,
  });
}
// Stripe functions //

export function useHandelCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      cart,
      customerId,
      address,
    }: {
      cart: { id: string }[] | undefined;
      customerId: string;
      address: INewAddress;
    }) => handelCheckout({ cart, customerId, address }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["OrdersCustomer"],
      });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (prodcutId: string[]) => clearCart(prodcutId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["OrdersCustomer"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GetCart"],
      });
    },
  });
}
