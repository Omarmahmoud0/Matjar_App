import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(-1)}
      variant="ghost"
      className="md:hidden block p-2 dark:hover:bg-gray-800 dark:text-white text-gray-900 hover:bg-gray-100"
    >
      <ChevronRight className="h-6 w-6" />
    </Button>
  );
};

export default BackButton;
