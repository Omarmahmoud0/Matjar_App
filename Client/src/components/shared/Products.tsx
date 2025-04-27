import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { FreeMode, Scrollbar } from "swiper/modules";
import NavgtionSwiper from "./NavgtionSwiper";
import ProductCard from "./ProductCard";
import { AuthUserContext } from "@/context/UserContextProvider";
import { Skeleton } from "../ui/skeleton";
import { IProducts, ProductCardProps } from "@/types/types";

const Sekelton = [
  { id: 2 },
  { id: 1 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

const Products = ({
  NameSection,
  isFetching,
  ProductList,
  Button,
  isError,
  grid,
}: IProducts) => {
  const { user } = AuthUserContext();

  return (
    <div className="md:container my-5">
      <h1 className="md:text-2xl xs:text-xl font-semibold mb-4 max-md:ml-2 dark:text-white">
        {NameSection}
      </h1>
      <div className="bg-indigo-100 px-2 rounded-md dark:bg-gray-900">
        <Swiper
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 8 },
            350: { slidesPerView: 2.2, spaceBetween: 10 },
            480: { slidesPerView: 3, spaceBetween: 16 },
            640: { slidesPerView: 3.4, spaceBetween: 40 },
            768: { slidesPerView: 3, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 15 },
            1280: { slidesPerView: 5, spaceBetween: 15 },
            1534: { slidesPerView: 6, spaceBetween: 10 },
          }}
          scrollbar={{
            hide: true,
          }}
          freeMode={true}
          modules={[FreeMode, Scrollbar]}
          className="relative py-2 md:h-[480px] h-full"
        >
          {isError ? (
            <div className="mt-28">
              <h1 className="text-center text-5xl dark:text-white">
                Error happend<span className="text-red-600">!</span>
              </h1>
            </div>
          ) : isFetching ? (
            Sekelton.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="flex flex-col  space-y-4 w-full h-full bg-white rounded-xl p-2">
                  <Skeleton className="w-full h-60 max-xs:h-48 object-contain rounded-md bg-gray-200" />
                  <div className="sm:my-4 max-sm:my-2 space-y-3">
                    <Skeleton className="h-5 w-full bg-gray-200" />
                    <Skeleton className="h-5 w-[50%] bg-gray-200" />
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-full bg-gray-200" />
                  </div>
                  <Skeleton className="h-7 w-[40%] bg-gray-200" />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <>
              {ProductList?.map((product: ProductCardProps) => (
                <SwiperSlide key={product.id} className="h-auto">
                  <ProductCard
                    grid={grid}
                    id={product.id}
                    name={product.name}
                    imageUrl={product.imageUrl[0]}
                    details={product.details}
                    price={product.price}
                    rating={product.rating}
                    button={Button}
                    key={product.id}
                    userId={user.id}
                  />
                </SwiperSlide>
              ))}
            </>
          )}
          <div className="absolute md:w-full md:top-[50%] md:translate-y-[-50%] top-2 max-md:right-2 px-1 z-50">
            <NavgtionSwiper Color="dark:text-gray-900" />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Products;
