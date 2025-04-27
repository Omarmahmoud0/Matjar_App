import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu, Grid, List } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  useFilters,
  useGetAllProducts,
} from "@/lib/reactQuery/qusersAndMutation";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import { TopPage } from "@/lib/appwrite/api";
import ProductCategory from "@/components/shared/ProductCategory";
import AnimatedSelect from "@/components/shared/AnimatedSelect";
import Leftbar from "@/components/shared/Leftbar";
import { AuthUserContext } from "@/context/UserContextProvider";
import BackButton from "@/components/shared/BackButton";

export default function CategoryPage() {
  const { user } = AuthUserContext();
  const [fliterPrice, setFliterPrice] = useState<string>("all");
  const [view, setView] = useState<string>("grid");
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
  const { section, brand } = useParams();
  const [searchParams] = useSearchParams();
  const {
    data: Products,
    isPending,
    isError,
  } = useFilters(section!, brand!, searchParams.get("color")!);
  const { data: allProducts } = useGetAllProducts(section!);

  const allBrands = [...new Set(allProducts?.map((p: any) => p.brand))];
  const Brands = useMemo(
    () =>
      allBrands?.map((brand) => ({
        name: brand,
        count: allProducts?.filter((count: any) => count.brand === brand)
          .length,
      })),
    [allProducts]
  );

  const allColors = [...new Set(allProducts?.map((color: any) => color.color))];
  const Colors = useMemo(
    () =>
      allColors.map((color) => ({
        color: color,
        count: allProducts?.filter((c: any) => c.color === color).length,
      })),
    [allProducts]
  );

  const AllColorBrands = allProducts?.filter((b: any) => b.brand === brand);
  const colorBrands = [
    ...new Set(AllColorBrands?.map((color: any) => color.color)),
  ];
  const ColorBrands = useMemo(
    () =>
      colorBrands.map((color: any) => ({
        color: color,
        count: AllColorBrands?.filter((c: any) => c.color === color).length,
      })),
    [Products]
  );

  const SortBy = (param: string) => {
    setFliterPrice(param);
  };

  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");
  const handleSortingProducts = useMemo(() => {
    const newfilter = Products ? [...Products] : [];
    const newProduct =
      Number(priceMin) && Number(priceMin) !== 0
        ? newfilter.filter(
            (price: any) =>
              price.price >= Number(priceMin) && price.price <= Number(priceMax)
          )
        : newfilter;

    return [...newProduct].sort((a: any, b: any) => {
      if (fliterPrice === "price-low") return a?.price - b?.price;
      if (fliterPrice === "price-high") return b?.price - a?.price;
      if (fliterPrice === "top-rated") return b?.rating - a?.rating;
      return 0;
    });
  }, [Products, fliterPrice, priceMin, priceMax]);

  useEffect(() => {
    TopPage();
  }, [brand, searchParams.get("color")]);

  const options = [
    { value: "all", label: "All" },
    { value: "price-low", label: "Price:  Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "top-rated", label: "Top Rated" },
  ];

  return (
    <div className="flex py-2 w-full min-h-screen gap-3">
      <Leftbar
        section={section}
        Brands={Brands}
        Colors={Colors}
        ColorBrands={ColorBrands}
        Urlbrand={brand}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        priceMin={priceMin}
        priceMax={priceMax}
      />
      <div className="rounded-lg bg-white dark:bg-gray-900 px-2 py-5 w-full ">
        <div className="flex items-center justify-end ">
          <BackButton />
        </div>
        <div className="mb-6 space-y-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 max-md:text-xs">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to="#" className="text-gray-700 hover:text-blue-600">
                    Categories
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">{section}</span>
                </div>
              </li>
            </ol>
          </nav>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-2xl font-bold dark:text-white capitalize max-md:text-sm">
              {section} ({handleSortingProducts?.length})
            </h1>
            <div className="flex items-center space-x-2">
              <AnimatedSelect
                onChange={SortBy}
                options={options}
                placeholder="Sort by"
              />
              <div className="flex border rounded-md">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setView("grid")}
                  className={`${
                    view === "grid"
                      ? "bg-gray-200 hover:bg-gray-200 dark:bg-white"
                      : "bg-white hover:bg-white dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setView("vertical")}
                  className={`${
                    view === "vertical"
                      ? "bg-gray-200 hover:bg-gray-200 dark:bg-white"
                      : "bg-white hover:bg-white dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild className="dark:bg-gray-700">
                <Button variant="outline" className="w-full dark:text-white">
                  <Menu className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] px-3 py-6 overflow-y-scroll dark:text-indigo-600 bg-white dark:bg-gray-800"
              >
                <Leftbar
                  section={section}
                  Brands={Brands}
                  Colors={Colors}
                  ColorBrands={ColorBrands}
                  Urlbrand={brand}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  screen="mobile"
                  priceMax={priceMax}
                  priceMin={priceMin}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {isPending ? (
          <div className="w-full flex justify-center mt-28">
            <Loader />
          </div>
        ) : isError ? (
          <div className="mt-28">
            <h1 className="text-center text-5xl dark:text-white">
              Error happend<span className="text-red-600">!</span>
            </h1>
          </div>
        ) : handleSortingProducts?.length === 0 ? (
          <p className="md:text-xl text-center mt-28 dark:text-gray-500 text-gray-400">
            No Results Found
          </p>
        ) : (
          <div
            className={`grid md:gap-4 max-md:gap-2   ${
              view === "grid"
                ? "xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 max-xs:grid-cols-2 max-md:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {handleSortingProducts?.map((product: any) => (
              <ProductCategory
                discountPercentage={product.discount}
                grid={view}
                id={product.id}
                key={product.id}
                button={true}
                details={product.details}
                imageUrl={product.imageUrl[0]}
                name={product.name}
                price={product.price}
                rating={product.rating}
                userId={user.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
