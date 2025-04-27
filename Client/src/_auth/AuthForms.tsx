import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  useCreateCustomerStripe,
  useLogInUser,
  useRegisterUser,
} from "@/lib/reactQuery/qusersAndMutation";
import Loader from "@/components/shared/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { loginSchema, registerSchema } from "@/lib/validation";
import { ToastStyel, ToastStyelFaild } from "@/root/RootLayot";
type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthForms({
  setForm,
}: {
  setForm: (BOOLEAN: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState("login");
  const { mutateAsync: createCustomerStripe } = useCreateCustomerStripe();
  const { mutateAsync: Login, isPending: isUserLoggedIn } = useLogInUser();
  const { mutateAsync: Register, isPending: isUserRegister } =
    useRegisterUser();
  const navigate = useNavigate();
  const toast = useToast();
  const { pathname } = useLocation();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    const session = await Login(data);
    if (!session) {
      return toast.toast({
        title: "Log in failed. Please try again.",
        style: ToastStyelFaild,
        open: false,
      });
    } else {
      loginForm.reset();
      toast.toast({
        title: "Log in has successfully",
        style: ToastStyel,
        open: false,
      });
      setForm(false);
      return navigate(pathname);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    const register = await Register(data);
    if (!register) {
      return toast.toast({
        title: "Register failed. Please try again.",
        style: ToastStyel,
        open: false,
      });
    }

    const customer = await createCustomerStripe({
      email: data.email,
      name: data.name,
    });

    if (!customer) {
      return toast.toast({
        title: "Customer Faild. Please try again.",
        style: ToastStyelFaild,
        open: false,
      });
    }

    const session = await Login({ email: data.email, password: data.password });
    if (!session) {
      return toast.toast({
        title: "Please try again.",
        open: false,
        style: ToastStyelFaild,
      });
    } else {
      registerForm.reset();
      toast.toast({
        title: "Register has successfully",
        style: ToastStyel,
        open: false,
      });
      setForm(false);
      return navigate(pathname);
    }
  };

  return (
    <Card className="relative w-[450px] bg-hero-form bg-cover bg-center bg-no-repeat ">
      <HighlightOffIcon
        className="absolute top-3 right-3 cursor-pointer"
        onClick={() => setForm(false)}
        fontSize="large"
      />
      <CardHeader>
        <CardTitle className="text-gray-700 text-lg">Authentication</CardTitle>
        <CardDescription className="text-white">
          Login or create a new account.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-200 h-12">
            <TabsTrigger
              value="login"
              className={`${
                activeTab === "login"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-500"
              } py-2`}
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className={`${
                activeTab !== "login"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-500"
              } py-2`}
            >
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form
              onSubmit={loginForm.handleSubmit(onLoginSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-white">
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  {...loginForm.register("email")}
                  className="backdrop-blur-md"
                />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-white">
                  Password
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  {...loginForm.register("password")}
                  className="backdrop-blur-md"
                />
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-indigo-500 text-white hover:bg-gray-900 hover:text-indigo-500
                transition ease-in-out duration-200"
              >
                {isUserLoggedIn ? <Loader /> : "Login"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form
              onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="register-name" className="text-white">
                  Name
                </Label>
                <Input
                  id="register-name"
                  type="text"
                  {...registerForm.register("name")}
                  className="backdrop-blur-md"
                />
                {registerForm.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {registerForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-white">
                  Email
                </Label>
                <Input
                  id="register-email"
                  type="email"
                  {...registerForm.register("email")}
                  className="backdrop-blur-md"
                />
                {registerForm.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-white">
                  Password
                </Label>
                <Input
                  id="register-password"
                  type="password"
                  {...registerForm.register("password")}
                  className="backdrop-blur-md"
                />
                {registerForm.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="register-confirm-password"
                  className="text-white"
                >
                  Confirm Password
                </Label>
                <Input
                  id="register-confirm-password"
                  type="password"
                  {...registerForm.register("confirmPassword")}
                  className="backdrop-blur-md"
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {registerForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-indigo-500 text-white hover:bg-gray-900 hover:text-indigo-500 transition
                ease-in-out duration-200 "
              >
                {isUserRegister ? <Loader /> : "Register"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
