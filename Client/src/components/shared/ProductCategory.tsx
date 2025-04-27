import { ProductCardProps } from "@/types/types";
import HorizontalCard from "./HorizontalCard";
import { AuthUserContext } from "@/context/UserContextProvider";
import ProductCard from "./ProductCard";

const ProductCategory = ({
  name,
  details,
  price,
  imageUrl,
  rating,
  id,
  grid,
  discountPercentage,
}: ProductCardProps) => {
  const { user } = AuthUserContext();

  return (
    <>
      <div className="">
        {grid === "grid" ? (
          <ProductCard
            id={id}
            discountPercentage={discountPercentage}
            details={details}
            imageUrl={imageUrl}
            price={price}
            rating={rating}
            name={name}
            userId={user.id}
            width={true}
            button={true}
          />
        ) : (
          <HorizontalCard
            discountPercentage={discountPercentage}
            details={details}
            imageUrl={imageUrl}
            price={price}
            rating={rating}
            name={name}
            id={id}
            userId={user.id}
          />
        )}
      </div>

      {/* <div className="md:hidden">
        <ProductCard
          id={id}
          discountPercentage={discountPercentage}
          description={description}
          imageUrl={imageUrl}
          price={price}
          rating={rating}
          name={name}
          userId={user.id}
          width={true}
        />
      </div> */}
    </>
  );
};

export default ProductCategory;
