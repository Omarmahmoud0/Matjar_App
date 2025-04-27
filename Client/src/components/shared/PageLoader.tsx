import Loader from "./Loader";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <Loader />
    </div>
  );
};

export default PageLoader;
