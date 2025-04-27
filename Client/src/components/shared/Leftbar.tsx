import { CategoriesProps } from "@/types/types";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";

const Leftbar = ({
  section,
  Brands,
  Colors,
  ColorBrands,
  Urlbrand,
  priceRange,
  setPriceRange,
  screen,
  priceMax,
  priceMin,
}: CategoriesProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  let GetColor = searchParams.get("color");
  const navigate = useNavigate();

  const updateFilter = (key: string, value: any) => {
    const newParams = new URLSearchParams(searchParams);

    if (key === "price") {
      if (value && value.min && value.max) {
        newParams.set("priceMin", value.min);
        newParams.set("priceMax", value.max);
      } else {
        newParams.delete("priceMin");
        newParams.delete("priceMax");
      }
    } else {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    }
    setSearchParams(newParams);
  };

  return (
    <div
      className={`hidden md:block w-64 ${
        screen && "w-full shadow-none mb-6 max-md:block h-full"
      } bg-white shadow-lg md:rounded-lg md:p-5 dark:bg-gray-800`}
    >
      <h2 className="flex items-center justify-between text-xl font-bold my-5 text-amber-500 dark:text-white">
        <span>Filters</span>
        <div className="block">
          {section && Urlbrand && (
            <Button
              className="px-2 py-1 text-white bg-red-500"
              onClick={() => {
                setSearchParams("");
                navigate(`/category/${section}`);
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </h2>

      <div className="mb-6">
        <h3 className="flex items-center justify-between font-semibold text-lg mb-2 dark:text-indigo-600">
          <span>Price Range</span>
          <div className="block">
            {Number(priceMax) && Number(priceMin) !== 0 ? (
              <Button
                className="px-2 py-1 text-white bg-red-500"
                onClick={() => {
                  updateFilter("price", { min: null, max: null });
                }}
              >
                Cancel
              </Button>
            ) : null}
          </div>
        </h3>
        <input
          type="number"
          min={0}
          value={priceRange[0]}
          onKeyDown={(e) => {
            if (e.key === "-" || e.key === "e") {
              e.preventDefault();
            }
          }}
          onChange={(e) =>
            setPriceRange([Number(e.target.value) || null!, priceRange[1]])
          }
          className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Min Price"
        />
        <input
          type="number"
          min={0}
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value) || null!])
          }
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Max Price"
        />
        <Button
          className="capitalize mt-2 bg-gray-300 hover:bg-gray-200 text-indigo-500 dark:bg-indigo-500 dark:text-white
        dark:hover:bg-indigo-600 transition ease-in-out duration-100"
          onClick={() =>
            updateFilter("price", {
              min: priceRange[0].toString(),
              max: priceRange[1].toString(),
            })
          }
        >
          go
        </Button>
      </div>

      <div className="mb-6 flex flex-col">
        <h3 className="font-semibold text-lg mb-2 dark:text-indigo-600">
          Brand
        </h3>
        {Brands?.map(({ name, count }) => (
          <Link
            key={name}
            to={`/category/${section}/${name}`}
            className={`capitalize p-2 text-gray-500 hover:text-indigo-500 dark:hover:text-gray-400 
            transition ease-in-out duration-100 ${
              name === Urlbrand
                ? "text-indigo-500 dark:text-gray-500"
                : "dark:text-white"
            }`}
          >
            {name} ({count})
          </Link>
        ))}
      </div>

      <div>
        <h3 className="flex items-center justify-between font-semibold text-lg mb-2 dark:text-indigo-600">
          Color
          {GetColor && (
            <Button
              className="px-2 py-1 text-white bg-red-500"
              onClick={() => {
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.delete("color");
                setSearchParams(newParams);
              }}
            >
              Cancel
            </Button>
          )}
        </h3>
        {section && Urlbrand ? (
          <>
            {ColorBrands?.map(({ color, count }) => (
              <div key={color} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={color}
                  name="color"
                  value={color}
                  checked={searchParams.get("color") === color}
                  onChange={() => updateFilter("color", color)}
                  className="mr-2"
                />
                <label
                  htmlFor={color}
                  className={`capitalize  p-2 text-gray-500 hover:text-indigo-500 dark:hover:text-gray-400 
                  transition ease-in-out duration-100 cursor-pointer ${
                    color === GetColor
                      ? "text-indigo-500 dark:text-gray-500"
                      : "dark:text-white"
                  }`}
                >
                  {color} ({count})
                </label>
              </div>
            ))}
          </>
        ) : (
          <>
            {Colors?.map(({ color, count }) => (
              <div key={color} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={color}
                  name="color"
                  value={color}
                  checked={searchParams.get("color") === color}
                  onChange={() => updateFilter("color", color)}
                  className="mr-2"
                />
                <label
                  htmlFor={color}
                  className={`capitalize p-2 text-gray-500 hover:text-indigo-500 dark:hover:text-gray-400 
                  transition ease-in-out duration-100 cursor-pointer ${
                    color === GetColor
                      ? "dark:text-gray-500"
                      : "dark:text-white"
                  }`}
                >
                  {color} ({count})
                </label>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Leftbar;
