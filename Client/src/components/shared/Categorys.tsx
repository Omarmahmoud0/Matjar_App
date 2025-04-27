import { Link } from "react-router-dom";
import { CategoryLinks } from "../Links";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import NavgtionSwiper from "./NavgtionSwiper";

const Categorys = () => {
  return (
    <div className="md:container w-full mt-12">
      {CategoryLinks.map((categorys, index) => (
        <div key={index}>
          <div className="grid grid-cols-2 gap-7 mb-6">
            {categorys.Clothes.map((category, index) => (
              <Link to={`/category${category.path}`} key={index}>
                <div
                  className={`relative group ${category.bg} rounded-lg p-2 h-60 overflow-hidden mb-5 `}
                >
                  <p className="capitalize font-semibold text-lg text-gray-200">
                    {category.label}
                  </p>
                  <div
                    className="w-20 h-1 rounded-sm bg-white -translate-x-20 opacity-0 invisible group-hover:opacity-100
                  group-hover:visible group-hover:translate-x-0 transition ease-in-out duration-300"
                  ></div>
                  <p className="absolute font-semibold text-gray-200 top-[30%] left-[35%] text-7xl -tracking-wide">
                    Shop
                    <br />
                    <span className="text-gray-900 -tracking-wide -ml-8">
                      Now
                    </span>
                  </p>
                  <img
                    src={category.img}
                    className="absolute left-[53%] top-0 w-64 h-64 group-hover:scale-105 transition ease-in-out duration-300"
                    alt=""
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className="hidden md:grid grid-cols-4 lg:gap-7 md:gap-5">
            {categorys.Electronic.map((category, index) => (
              <Link to={`/category${category.path}`} key={index}>
                <div
                  className={`relative group ${category.bg} rounded-2xl p-2 h-60   overflow-hidden mb-4`}
                >
                  <p className="capitalize font-semibold lg:text-lg md:text-base text-gray-200">
                    {category.label}
                  </p>
                  <div
                    className="w-20 h-1 rounded-sm bg-white -translate-x-20 opacity-0 invisible group-hover:opacity-100
                  group-hover:visible group-hover:translate-x-0 transition ease-in-out duration-300"
                  ></div>
                  <p className="absolute font-semibold text-gray-200 top-[30%] left-[15%] lg:text-6xl md:text-5xl -tracking-wide">
                    Shop
                    <br />
                    <span className="text-gray-900 -tracking-wide -ml-8">
                      Now
                    </span>
                  </p>
                  <img
                    src={category.img}
                    className="absolute lg:left-[43%] top-[50%] translate-y-[-50%] lg:w-52 lg:h-52 md:w-44 md:h-44 md:left-[40%]
                    group-hover:scale-105 transition ease-in-out duration-300"
                    alt=""
                  />
                </div>
              </Link>
            ))}
          </div>

          <Swiper
            breakpoints={{
              340: { slidesPerView: 1, spaceBetween: 15 },
              480: { slidesPerView: 3, spaceBetween: 15 },
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            freeMode={true}
            modules={[Autoplay]}
            className="md:hidden rounded-xl relative"
          >
            <>
              {categorys.Electronic.map((category, index) => (
                <SwiperSlide key={index}>
                  <Link to={`/category${category.path}`} key={index}>
                    <div
                      className={`relative group ${category.bg} rounded-2xl p-2 xs:h-56 max-xs:h-48 overflow-hidden mb-4`}
                    >
                      <p className="capitalize font-semibold text-base text-gray-200">
                        {category.label}
                      </p>
                      <div
                        className="w-20 h-1 rounded-sm bg-white -translate-x-20 opacity-0 invisible group-hover:opacity-100
                      group-hover:visible group-hover:translate-x-0 transition ease-in-out duration-300"
                      ></div>
                      <p className="absolute font-semibold text-gray-200 top-[30%] left-[15%] text-6xl -tracking-wide">
                        Shop
                        <br />
                        <span className="text-gray-900 -tracking-wide -ml-8">
                          Now
                        </span>
                      </p>
                      <img
                        src={category.img}
                        className="absolute left-[43%] xs:w-44 xs:h-44 top-[50%]
                        translate-y-[-50%] xs:left-[40%] group-hover:scale-105 transition ease-in-out duration-300"
                        alt=""
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </>
            <div className="absolute top-2 right-2 z-20">
              <NavgtionSwiper />
            </div>
          </Swiper>
        </div>
      ))}
    </div>
  );
};

export default Categorys;
