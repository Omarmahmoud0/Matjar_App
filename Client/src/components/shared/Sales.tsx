import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SalesLinks } from "../Links";

const Sales = () => {
  return (
    <div className="md:container my-5">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={true}
        modules={[Pagination,Autoplay]}
        className="h-48 sm:h-64 xl:h-[350px] w-full rounded-2xl"
      >
        {
            SalesLinks.map((sale,index) => (
                <SwiperSlide key={index}>
                    <Link to={sale.path}>
                        <div
                        className="relative grid grid-cols-2 w-full  dark:bg-gradient-to-r dark:from-gray-950
                        dark:to-gray-800 bg-gradient-to-r from-indigo-500 to-indigo-800 rounded-2xl"
                        >
                            <div className="flex flex-col sm:pl-14 justify-center pl-2 sm:gap-7 gap-3 h-48 sm:h-64 xl:h-[350px]">

                            <h1 className="xl:text-2xl lg:text-xl md:text-lg text-sm uppercase border-spacing-2 w-fit border-b-2 text-white mt-2">
                                {sale.label}
                            </h1>
                            <p
                                className="text-indigo-300 z-20 font-semibold xl:text-2xl md:text-xl text-lg max-sm:text-base w-full capitalize
                            xl:leading-tight sm:leading-6  tracking-wide"
                            >
                                {sale.desc}
                            </p>
                            </div>
                            <div className="w-full h-full z-10">
                            <img
                                src={sale.img}
                                className="sm:w-96 sm:h-96 xs:w-72 xs:h-72 object-cover"
                                alt=""
                            />
                            </div>
                            <div className="absolute top-0 right-4 max-lg:left-[50%] max-lg:translate-x-[-50%] max-lg:w-fit bg-slate-900 lg:h-48 md:h-36 xs:h-28 h-16 px-2 rounded-br-lg rounded-bl-lg">
                              <h1 className="mt-5 lg:text-xl md:text-lg text-base max-xs:text-sm tracking-widest text-gray-100 uppercase">{sale.descount}</h1>
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  );
};

export default Sales;
