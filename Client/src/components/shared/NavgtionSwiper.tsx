import { useSwiper } from "swiper/react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const NavgtionSwiper = ({Color}:{Color?:string}) => {
  const Swiper = useSwiper();
  return (
    <>
      <div className="md:hidden flex items-center gap-6 max-xs:gap-3">
        <button onClick={() => Swiper.slidePrev()}>
          <KeyboardArrowDownIcon
            className={`rotate-90 w-5 h-5 rounded-full backdrop-blur-sm text-white ${Color} bg-[#ffffff4a]`}
            fontSize="large"
          />
        </button>
        <button onClick={() => Swiper.slideNext()}>
          <KeyboardArrowDownIcon
            className={`-rotate-90 w-5 h-5 rounded-full backdrop-blur-sm text-white ${Color} bg-[#ffffff4a]`}
            fontSize="large"
          />
        </button>
      </div>
      <div className="hidden md:flex items-center justify-between w-full">
        <button onClick={() => Swiper.slidePrev()}>
          <KeyboardArrowDownIcon
            className="rotate-90 w-10 h-10 rounded-full backdrop-blur-sm text-white dark:text-gray-900 bg-gray-800 dark:bg-[#ffffff4a]"
            fontSize="large"
          />
        </button>
        <button onClick={() => Swiper.slideNext()}>
          <KeyboardArrowDownIcon
            className="-rotate-90 w-10 h-10 rounded-full backdrop-blur-sm text-white dark:text-gray-900 bg-gray-800 dark:bg-[#ffffff4a]"
            fontSize="large"
          />
        </button>
      </div>
    </>
  );
};

export default NavgtionSwiper;
