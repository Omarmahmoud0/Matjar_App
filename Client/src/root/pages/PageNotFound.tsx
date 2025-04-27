import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    window.scrollTo({ top: 150, behavior: "smooth" });
  }, []);

  return (
    <div className="md:container w-full min-h-screen mt-3 rounded-lg  bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center  bg-background px-4 text-center">
        <div className="space-y-6 flex items-center justify-center max-md:flex-col">
          <div className="space-y-8 md:border-r-2 border-gray-200 md:pr-8">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-indigo-500">
              404
            </h1>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight lg:text-3xl dark:text-white">
                Page not found
              </h2>
              <p className="text-muted-foreground dark:text-gray-300">
                Sorry, we couldn't find the page you're looking for.
              </p>
            </div>
            <Button
              asChild
              className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              <Link to="/">Go back home</Link>
            </Button>
          </div>
          <img
            className="max-md:w-[200px] max-md:h-[200px]"
            src="/assets/NotFound.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
