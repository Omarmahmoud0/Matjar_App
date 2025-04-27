import { IContextForm } from "@/types/types";
import { createContext, useContext, useState } from "react";

const InitailFrom = {
  form: false,
  setForm: () => {},
  CheckAuth: async () => false as boolean,
};

const AuthForm = createContext<IContextForm>(InitailFrom);

const AuthFromContext = ({ children }: { children: React.ReactNode }) => {
  const [form, setForm] = useState(false);

  return (
    <AuthForm.Provider value={{ form, setForm }}>{children}</AuthForm.Provider>
  );
};

export default AuthFromContext;

export const useAuthFormContext = () => {
  return useContext(AuthForm);
};
