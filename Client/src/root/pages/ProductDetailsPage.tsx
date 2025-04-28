import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Minus,
  Plus,
  Heart,
  Share2,
  Truck,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Products from "../../components/shared/Products";
import { motion } from "framer-motion";
import {
  useAddToDoc,
  useFilters,
  useDeleteFromDoc,
  useGetProduct,
} from "@/lib/reactQuery/qusersAndMutation";
import { useNavigate, useParams } from "react-router-dom";
import { TopPage } from "@/lib/firebase/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";
import CancelIcon from "@mui/icons-material/Cancel";
import { Skeleton } from "../../components/ui/skeleton";
import { Swiper as type } from "swiper/types";
import { AuthUserContext } from "@/context/UserContextProvider";
import { useCart } from "@/context/HandelCartContext";
import { useAuthFormContext } from "@/context/AuthFromContext";
import { useFavoriteContext } from "@/context/FavoriteContext";
import { Spinner } from "flowbite-react";
import { ToastStyel, ToastStyelFaild } from "../RootLayot";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/shared/BackButton";

export default function ProductDetailsPage() {
  const { handleCart, addToLocalStorge } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = AuthUserContext();
  const { setForm } = useAuthFormContext();
  const { data: ProductInfo, isPending } = useGetProduct(id!);
  const {
    data: SimilarProducts,
    isError,
    isFetching,
  } = useFilters(ProductInfo?.category);

  const [swiperInstance, setSwiperInstance] = useState<type | null>(null);
  const [onZoom, setOnZoom] = useState(false);
  const [Index, setIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("black");
  const [quantity, setQuantity] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [taps, setTaps] = useState("description");
  const [sliderOpen, setSliderOpen] = useState(false);
  const { addToFavoriteHandler, favoriteProducts, Saves } =
    useFavoriteContext();
  const { mutateAsync: addToFavorite, isPending: isAddToFavorites } =
    useAddToDoc();
  const { mutateAsync: deleteFromFavorite, isPending: isDeletedFromFavorites } =
    useDeleteFromDoc();
  const toast = useToast();

  const isFavoriteProduct = Saves?.find(
    (productId: any) => productId.ProductId === id
  );

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (token && id) {
      const result = addToFavoriteHandler(id);
      if (
        !favoriteProducts.has(id) &&
        isFavoriteProduct?.id === undefined &&
        result !== undefined
      ) {
        await addToFavorite({
          userId: user.id,
          ProductId: id,
          name: ProductInfo?.name,
          price: ProductInfo?.price,
          imageUrl: ProductInfo?.imageUrl[0],
          details: ProductInfo?.details,
          Collection: "saves",
        });

        toast.toast({
          title: "Added to favorites",
          description: "Product added to your favorites list.",
          duration: 2000,
          style: ToastStyel,
        });
      } else if (
        favoriteProducts.has(id) &&
        isFavoriteProduct?.id !== undefined &&
        result === undefined
      ) {
        await deleteFromFavorite({
          id: isFavoriteProduct?.id,
          Collection: "saves",
        });
        toast.toast({
          title: "Removed from favorites",
          description: "Product removed from your favorites list.",
          duration: 2000,
          style: ToastStyelFaild,
        });
      }
    } else if (!token) {
      setForm(true);
    }
  };

  const onSwiper = (swiper: type) => {
    setSwiperInstance(swiper);
  };

  useEffect(() => {
    TopPage();
    if (ProductInfo?.imageUrl) {
      setIndex(0);
    }
  }, [id]);

  const colors = [
    { name: "Midnight Black", value: "black" },
    { name: "Stellar Silver", value: "silver" },
    { name: "Rose Gold", value: "gold" },
  ];

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleZoom = (e: React.MouseEvent<HTMLImageElement>) => {
    const image = e.currentTarget;
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomPosition({ x, y });
    setOnZoom(true);
  };

  const nextImage = useCallback(() => {
    setIndex((prev) => (prev + 1) % ProductInfo?.imageUrl.length);
  }, [ProductInfo?.imageUrl.length]);

  const prevImage = useCallback(() => {
    setIndex(
      (prev) =>
        (prev - 1 + ProductInfo?.imageUrl.length) % ProductInfo?.imageUrl.length
    );
  }, [ProductInfo?.imageUrl.length]);

  return (
    <>
      <div className="md:container md:w-[85%] mx-auto mt-3 mb-32 px-4 pb-12 pt-7 dark:text-white bg-white dark:bg-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ZOOM FUNTCTION */}
          {onZoom && (
            <div className="hidden md:flex absolute top-52 z-10 right-[25%] max-w-3xl w-96 h-[500px]  items-center justify-center">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={ProductInfo?.imageUrl[Index]}
                  alt={`Zoomed product image ${Index + 1}`}
                  className="w-full h-full object-contain"
                  style={{
                    transform: `scale(2)`,
                    transformOrigin: `${zoomPosition.x * 100}% ${
                      zoomPosition.y * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          )}
          {/* ZOOM FUNTCTION */}

          {/* Product Image Gallery */}
          <div className="space-y-4 lg:flex xl:h-[80%] lg:h-[65%]">
            <div className="">
              <div className="flex items-center justify-end">
                <BackButton />
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative aspect-square cursor-zoom-in overflow-hidden  flex justify-center items-center">
                  {isPending ? (
                    <Skeleton className="w-full h-[70%] rounded-lg bg-gray-200"></Skeleton>
                  ) : (
                    <img
                      key={Index}
                      src={ProductInfo?.imageUrl[Index]}
                      alt={`Product image ${Index + 1}`}
                      className="object-contain aspect-square"
                      onMouseMove={handleZoom}
                      onMouseLeave={() => setOnZoom(false)}
                      onClick={() => setSliderOpen(true)}
                    />
                  )}
                  <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2">
                    <ZoomIn className="h-6 w-6" />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </DialogTrigger>
            </Dialog>
            <div className="flex md:-order-1 lg:flex-col lg:justify-start gap-1 justify-center space-x-2 pb-2">
              {ProductInfo?.imageUrl.map((image: string, index: number) => (
                <motion.button
                  key={index}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden border-2 object-cover flex-shrink-0 ${
                    Index === index ? "border-indigo-500" : "border-transparent"
                  }`}
                  onClick={() => setIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </motion.button>
              ))}
            </div>
          </div>
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2 bg-gray-900 text-indigo-500 hover:bg-gray-900">
                New Arrival
              </Badge>
              {isPending ? (
                <Skeleton className="w-full h-9 rounded-md bg-gray-200 mb-2"></Skeleton>
              ) : (
                <h1 className="lg:text-3xl md:text-2xl max-md:text-lg font-bold mb-2 ">
                  {ProductInfo?.name}
                </h1>
              )}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < ProductInfo?.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2 dark:text-white">
                  (128 reviews)
                </span>
              </div>
            </div>
            {isPending ? (
              <Skeleton className="w-48 h-9 rounded-md bg-gray-200"></Skeleton>
            ) : (
              <p className="text-2xl max-md:text-xl font-semibold">
                ${ProductInfo?.price}
              </p>
            )}

            <Separator />

            {/* Color Selection */}
            <div>
              <label
                htmlFor="color-select"
                className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
              >
                Color
              </label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger id="color-select" className="w-full">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-900 dark:text-white">
                  {colors.map((color) => (
                    <SelectItem
                      key={color.value}
                      value={color.value}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800 transition ease-in-out duration-200"
                    >
                      {color.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity Selection */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
              >
                Quantity
              </label>
              <div className="flex items-center space-x-2">
                <Button
                  className="bg-gray-200 dark:bg-gray-700"
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <input
                  type="number"
                  id="quantity"
                  disabled
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 text-center border rounded-md text-black"
                  min="1"
                />
                <Button
                  className="bg-gray-200 dark:bg-gray-700"
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4 items-center">
              <div className="grid grid-rows-2 w-full gap-4">
                <Button
                  className="flex-1 rounded-full text-white  bg-indigo-500 dark:text-white hover:bg-indigo-600"
                  size="lg"
                  onClick={() => {
                    if (id && token) {
                      handleCart({
                        name: ProductInfo?.name,
                        price: ProductInfo?.price,
                        imageUrl: ProductInfo?.imageUrl[0],
                        ProductId: id,
                        userId: user.id,
                        qty: quantity,
                        Collection: "cart",
                      });
                    } else if (id && !token) {
                      addToLocalStorge({
                        id: id,
                        quantity: quantity,
                        imageUrl: ProductInfo?.imageUrl[0],
                        name: ProductInfo?.name,
                        price: ProductInfo?.price,
                      });
                    }
                  }}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button
                  className="flex-1 rounded-full bg-inherit border-2 hover:text-indigo-500 border-indigo-500 text-gray-200
                  bg-gray-950 hover:bg-gray-950"
                  size="lg"
                  onClick={() => {
                    if (id && token) {
                      handleCart({
                        name: ProductInfo?.name,
                        price: ProductInfo?.price,
                        imageUrl: ProductInfo?.imageUrl[0],
                        ProductId: id,
                        userId: user.id,
                        qty: quantity,
                        Collection: "cart",
                      });
                    } else if (id && !token) {
                      addToLocalStorge({
                        id: id,
                        quantity: quantity,
                        imageUrl: ProductInfo?.imageUrl[0],
                        name: ProductInfo?.name,
                        price: ProductInfo?.price,
                      });
                    }
                    navigate("/cart");
                  }}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                {isAddToFavorites || isDeletedFromFavorites ? (
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full ${
                      favoriteProducts.has(id) && "bg-white"
                    }`}
                  >
                    <Spinner />
                  </Button>
                ) : (
                  <Button
                    onClick={handleFavorite}
                    variant="outline"
                    size="icon"
                    className={`rounded-full ${
                      favoriteProducts.has(id) && "bg-white"
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favoriteProducts.has(id) && "fill-red-500 text-red-500"
                      }`}
                    />
                  </Button>
                )}

                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Truck className="mr-2 h-5 w-5" />
              Free shipping on orders over $500
            </div>

            <Tabs
              defaultValue="description"
              className="w-full bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded-md max-md:text-sm"
            >
              <TabsList className="grid w-full grid-cols-3 ">
                <TabsTrigger
                  value="description"
                  onClick={() => setTaps("description")}
                  className={` ${
                    taps === "description" ? "dark:bg-gray-700" : ""
                  }`}
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="specifications"
                  onClick={() => setTaps("specifications")}
                  className={` ${
                    taps === "specifications" ? "dark:bg-gray-700" : ""
                  }`}
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  onClick={() => setTaps("reviews")}
                  className={` ${taps === "reviews" ? "dark:bg-gray-700" : ""}`}
                >
                  Reviews
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                {isPending ? (
                  <Skeleton className="w-full h-48 rounded-md bg-gray-200 mb-2"></Skeleton>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">
                    {ProductInfo?.details}
                  </p>
                )}
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <ul className="list-disc list-inside text-gray-600 space-y-2 dark:text-gray-300">
                  {ProductInfo?.Specifications.map(
                    (item: string, index: number) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Customer reviews will be displayed here. This section can be
                  expanded to show detailed reviews and ratings.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Swiper js */}
      {sliderOpen && ProductInfo?.imageUrl && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { duration: 0.5 } }}
          className="md:hidden fixed inset-0 flex flex-col gap-2 bg-slate-50 z-50 pb-2"
        >
          <CancelIcon
            onClick={() => setSliderOpen(false)}
            className="absolute top-5 right-5 z-20"
            fontSize="large"
          />
          <Swiper
            zoom={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: swiperInstance }}
            modules={[Zoom, FreeMode, Navigation, Thumbs]}
            className="w-full h-full"
          >
            {ProductInfo?.imageUrl.map((image: string, index: number) => (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container">
                  <img src={image} className="h-full object-contain" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={onSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full h-[100px] object-contain"
          >
            {ProductInfo?.imageUrl.map((image: string, index: number) => (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container">
                  <img src={image} className="h-full object-contain" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}
      {/* Swiper js */}

      {/* Related Products */}
      <Products
        isFetching={isFetching}
        isError={isError}
        NameSection="You May Also Like"
        ProductList={SimilarProducts}
        Button={false}
      />
    </>
  );
}
