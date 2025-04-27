import Categorys from "@/components/shared/Categorys";
import Hero from "@/components/shared/Hero";
import Products from "@/components/shared/Products";
import Sales from "@/components/shared/Sales";
import {
  useGetclothesProduct,
  useGetElecProduct,
  useGetRecProduct,
} from "@/lib/reactQuery/qusersAndMutation";
import { useEffect } from "react";

const Home = () => {
  const { data: RecProduct, isError: isRecProduct ,isFetching: isRecProductFetching} = useGetRecProduct();
  const { data: ElecProduct, isError: isElecProduct ,isFetching: isElecProductFetching} = useGetElecProduct();
  const {
    data: ClothesProduct,
    isFetching,
    isError: isClothesProduct,
  } = useGetclothesProduct();

  function shuffleArray(array: any) {
    for (let i = array?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  useEffect(() => {
    shuffleArray(ClothesProduct);
  }, [isFetching]);

  return (
    <div className="w-full h-full">
      <Hero />
      <Categorys />
      <Products
        isError={isRecProduct}
        isFetching={isRecProductFetching}
        NameSection="Recommended for you"
        ProductList={RecProduct}
        Button={true}
        key={1}
      />
      <Sales />
      <Products
        isError={isElecProduct}
        isFetching={isElecProductFetching}
        NameSection="Top deals Laptop"
        ProductList={ElecProduct}
        Button={true}
        key={2}
      />
      <Products
        isError={isClothesProduct}
        isFetching={isFetching}
        NameSection="Fashion (mens,womens,kids)"
        ProductList={ClothesProduct}
        Button={true}
        key={3}
      />
    </div>
  );
};

export default Home;
