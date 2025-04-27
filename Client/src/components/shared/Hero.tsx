import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import { ISlider } from "@/types/types";
import { motion } from "framer-motion";

const Slider: ISlider = [
  {
    title: "men fashion",
    desc: "Shop and get a great look among your friends",
    img: "/assets/man.png",
    link: "category/clothes-mens",
  },
  {
    title: "iphone 15 pro max",
    desc: "All-new 48MP Main camera. For breathtaking, smile making picture taking.",
    img: "/assets/Slider-image/iphone15.png",
    link: "category/Electronics-phones",
  },
  {
    title: "women fashion",
    desc: "Discounts up to 50% for a limited time",
    img: "/assets/Slider-image/women.png",
    link: "category/clothes-womens",
  },
];

const customTheme = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      "absolute left-0 top-0 max-xs:-top-20 max-xs:-right-52 flex h-full items-center justify-center px-4 focus:outline-none",
    rightControl:
      "absolute right-0 top-0 max-xs:-top-20 flex h-full items-center justify-center px-4 focus:outline-none",
  },
  item: {
    base: "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    wrapper: {
      off: "w-full flex-shrink-0 transform cursor-default snap-center",
      on: "w-full flex-shrink-0 transform cursor-default snap-center",
    },
  },
  control: {
    base: "inline-flex h-8 w-8 items-center justify-center rounded-full dark:bg-white/30 dark:group-hover:bg-white/50 dark:group-focus:outline-none dark:group-focus:ring-4 dark:group-focus:ring-white bg-gray-800 group-hover:bg-gray-800/60 group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    icon: "h-5 w-5 text-white  sm:h-6 sm:w-6",
  },
};

const Hero = () => {
  return (
    <div className="md:container h-56 sm:h-80 xl:h-[450px] overflow-hidden sm:mt-5 mt-1 relative">
      <Carousel slideInterval={5000} theme={customTheme}>
        {Slider.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-2 w-full max-xs:h-full dark:bg-gradient-to-r dark:from-gray-950
          dark:to-gray-800 bg-gradient-to-r from-indigo-500 to-indigo-800"
          >
            <div className="flex flex-col sm:pl-14 pl-2 sm:gap-7 gap-3 justify-center">
              <motion.h1
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="xl:text-5xl md:text-3xl text-2xl uppercase max-sm:text-base text-white"
              >
                {item.title}
              </motion.h1>
              <motion.p
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: "easeOut",
                }}
                className="text-indigo-300 font-semibold xl:text-2xl lg:text-xl md:text-lg text-sm w-full capitalize
              xl:leading-10 sm:leading-6 xl:w-[80%] tracking-wide"
              >
                {item.desc}
              </motion.p>
              <Link to={item.link}>
                <motion.button
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  whileHover={{
                    scale: 0.9,
                    rotate: "-2deg",
                    transition: { duration: 0.3 },
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: "easeInOut",
                  }}
                  className="md:text-lg max-md:text-sm capitalize text-white py-3 md:px-14 max-md:px-8 max-md:py-2 rounded-full hover:bg-indigo-500 bg-black
                    hover:border-indigo-700 hover:border-2 dark:bg-gray-800"
                >
                  buy now
                </motion.button>
              </Link>
            </div>
            <div className="w-full">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  ease: "easeOut",
                }}
                src={item.img}
                className="w-full h-full md:object-contain object-cover"
                alt=""
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
