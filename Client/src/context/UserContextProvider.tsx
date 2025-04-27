import { auth, db } from "@/lib/appwrite/firebase";
import { IContextType, IUser } from "@/types/types";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const USER = {
  id: "",
  name: "",
  email: "",
};

const INITIALSTATE = {
  user: USER,
  isAuthenticated: false,
  token: "",
  isLoading: false,
  setUser: () => {},
  setToken: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const UserContext = createContext<IContextType>(INITIALSTATE);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        if (userData) {
          setUser({
            id: user.uid,
            name: userData.name,
            email: userData.email,
          });
          setIsAuthenticated(true);
          setToken(user.uid);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setToken(parsedUser);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    setUser,
    setIsAuthenticated,
    token,
    setToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;

export const AuthUserContext = () => {
  return useContext(UserContext);
};
