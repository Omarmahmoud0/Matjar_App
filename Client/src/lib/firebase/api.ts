import { AddDoc, AuthForm, INewAddress, IUpdateAddress } from "@/types/types";
import { loadStripe } from "@stripe/stripe-js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export function TopPage() {
  return window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

export async function Signup(user: AuthForm) {
  try {
    const createUser = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    if (!createUser) throw Error;
    const User = createUser.user;
    await setDoc(doc(db, "users", User.uid), {
      uid: User.uid,
      email: user.email,
      name: user.name,
      createdAt: new Date(),
    });

    return createUser;
  } catch (error) {
    console.log(error);
  }
}

export async function Login(user: AuthForm) {
  try {
    const login = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    if (!login) throw Error;
    return login;
  } catch (error) {
    console.log(error);
  }
}

export async function LogOut() {
  try {
    await signOut(auth);
    localStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
}

export async function getRecommendedProduct() {
  try {
    const q = query(
      collection(db, "products"),
      where("category", "==", "Electronics-phones")
    );
    const querySnapshot = await getDocs(q);
    const prods = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!querySnapshot) throw Error;

    return prods;
  } catch (error) {
    console.log(error);
  }
}

export async function getElectronicsProduct() {
  try {
    const q = query(
      collection(db, "products"),
      where("category", "==", "Electronics-laptops")
    );
    const querySnapshot = await getDocs(q);
    const prods = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!querySnapshot) throw Error;

    return prods;
  } catch (error) {
    console.log(error);
  }
}

export async function getClothesProduct() {
  try {
    const q = query(
      collection(db, "products"),
      where("category", "==", "clothes-womens")
    );
    const querySnapshot = await getDocs(q);
    const prods = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!querySnapshot) throw Error;

    return prods;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts(category: string) {
  if (!category) return;
  try {
    const q = query(
      collection(db, "products"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    const prods = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!querySnapshot) throw Error;

    return prods;
  } catch (error) {
    console.log(error);
  }
}

export async function filterProducts(
  category: string,
  brand?: string,
  color?: string
) {
  try {
    const Products = collection(db, "products");
    if (category && brand && color) {
      const q = query(
        Products,
        where("category", "==", category),
        where("brand", "==", brand),
        where("color", "==", color)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot) throw Error;

      const prods = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(prods);
      return prods;
    } else if (category && brand) {
      // Filter By Brand
      const q = query(
        Products,
        where("category", "==", category),
        where("brand", "==", brand)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot) throw Error;

      const prods = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(prods);
      return prods;
    } else if (category && color) {
      // Filter By Color
      const q = query(
        Products,
        where("category", "==", category),
        where("color", "==", color)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot) throw Error;

      const prods = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return prods;
    } else if (category) {
      // Filter By Category
      const q = query(Products, where("category", "==", category));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot) throw Error;

      const prods = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return prods;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProductByID(id: string) {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getCart(userId: string) {
  const token = localStorage.getItem("token");
  const user = userId ? userId : token && JSON.parse(token);
  if (!user) return;
  try {
    const q = query(collection(db, "cart"), where("userId", "==", user));
    const querySnapshot = await getDocs(q);
    const prods = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!querySnapshot) throw Error;
    return prods;
  } catch (error) {
    console.log(error);
  }
}

export async function getFavoriteProducts(userId: string) {
  const token = localStorage.getItem("token");
  const user = userId ? userId : token && JSON.parse(token);
  if (!user) return;
  try {
    const q = query(collection(db, "saves"), where("userId", "==", user));
    const querySnapshot = await getDocs(q);
    const prods = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!querySnapshot) throw Error;
    return prods;
  } catch (error) {
    console.log(error);
  }
}

export async function getAddress(userId: string) {
  const token = localStorage.getItem("token");
  const user = userId ? userId : token && JSON.parse(token);
  if (!user) return;
  try {
    const q = query(collection(db, "addresses"), where("userId", "==", user));
    const querySnapshot = await getDocs(q);
    const prods = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!querySnapshot) throw Error;
    return prods;
  } catch (error) {
    console.log(error);
  }
}

export async function addToDoc(product: AddDoc) {
  try {
    const Collec = collection(db, product.Collection);
    if (product.Collection === "saves") {
      const docRef = await addDoc(Collec, {
        userId: product.userId,
        ProductId: product.ProductId,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        details: product.details,
      });
      return docRef;
    } else {
      const docRef = await addDoc(Collec, {
        userId: product.userId,
        ProductId: product.ProductId,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        qty: product.qty,
      });
      return docRef;
    }

    if (!Collec) throw Error;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductCartQty(id: string, qty: number) {
  if (!id) return;
  try {
    await updateDoc(doc(db, "cart", id), {
      qty: qty,
    });

    return "updated";
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFromDoc(id: string, Collection: string) {
  try {
    const docRef = await deleteDoc(doc(db, Collection, id));

    return docRef;
  } catch (error) {
    console.log(error);
  }
}

export async function createNewAddress(user: INewAddress) {
  try {
    const Collec = collection(db, "addresses");
    const docRef = await addDoc(Collec, {
      userId: user.userId,
      fullName: user.fullName,
      streetAddress: user.streetAddress,
      phoneNumber: user.phoneNumber,
      city: user.city,
      isDefault: user.isDefault,
    });
    if (!Collec) throw Error;
    return docRef;
  } catch (error) {
    console.log(error);
  }
}

export async function updateAddress(address: IUpdateAddress) {
  try {
    const update = await updateDoc(doc(db, "addresses", address.id), {
      fullName: address.fullName,
      streetAddress: address.streetAddress,
      phoneNumber: address.phoneNumber,
      city: address.city,
      isDefault: address.isDefault,
    });

    return update;
  } catch (error) {
    console.log(error);
  }
}

export async function getAddressById(id: string) {
  try {
    const docRef = doc(db, "addresses", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function searchForProducts(search: string) {
  try {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    const prods = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((product: any) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 12);

    if (!querySnapshot) throw Error;
    return prods;
  } catch (error) {
    console.log(error);
  }
}

// Stripe functions //
export async function createCustomerStripe(customer: {
  email: string;
  name: string;
}) {
  try {
    const res = await fetch(
      "https://matjarapp-production.up.railway.app/create-customer",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: customer.email, name: customer.name }),
      }
    );
    const data = await res.json();
    const customerId = data.customerId;
    console.log(customerId);
    return customerId;
  } catch (error) {
    console.log("Customer Stripe Error", error);
  }
}

export async function getCustomerStripe(email: string) {
  try {
    const res = await fetch(
      "https://matjarapp-production.up.railway.app/find-customer",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      }
    );
    const data = await res.json();
    const customerId = data.customerId;
    if (!customerId) throw Error("not found Customer id");
    return customerId;
  } catch (error) {
    console.log(error);
  }
}

export async function getOrdersCustomer(customerId: string) {
  try {
    const res = await fetch(
      `https://matjarapp-production.up.railway.app/account/orders/${customerId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.status === 404) throw Error("not fount Payments");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Payment Error", error);
  }
}

export async function getSessionData(sessionId: string) {
  try {
    const res = await fetch(
      `https://matjarapp-production.up.railway.app/session/${sessionId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.status === 404) throw Error("not found session id");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Session Error", error);
  }
}
// Stripe functions //

export async function handelCheckout({
  cart,
  customerId,
  address,
}: {
  cart: { id: string }[] | undefined;
  customerId: string;
  address: INewAddress;
}) {
  try {
    if (cart) {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLIC_PUBLISHABLE_KEY
      );
      const res = await fetch(
        "https://matjarapp-production.up.railway.app/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart: cart, customerId, address: address }),
        }
      );

      if (res.status === 500) return;

      const data = await res.json();

      if (data.url && stripe) {
        stripe.redirectToCheckout({ sessionId: data.url });
      } else {
        console.error("No session ID returned");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function clearCart(productId: string[]) {
  try {
    for (let i = 0; i < productId.length; i++) {
      const cart = await deleteDoc(doc(db, "cart", productId[i]));
      return cart;
    }
  } catch (error) {
    console.log("Error happend Clear cart", error);
  }
}
