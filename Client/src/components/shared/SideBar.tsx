import { Link } from "react-router-dom";
import { Links, MegaMenuLinks } from "../Links";
import Theme from "./Theme";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeModeContext } from "@/context/DarkMode";

type NavShow = {
  Nav: boolean;
  setNav: (FALSE: boolean) => void;
};

const SideBar = ({ Nav, setNav }: NavShow) => {
  const FN = ThemeModeContext();
  const theme = FN?.theme;

  return (
    <div
      className={`fixed md:hidden z-50 top-0 left-0 h-screen backdrop-blur-sm transition-transform overflow-x-hidden ${
        Nav ? " w-full translate-x-0" : "-translate-x-full"
      } ease-in-out duration-300`}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        setNav(false);
      }}
    >
      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen"
        aria-label="Sidebar"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        <div className="flex flex-col gap-11 h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div>
            <div
              onClick={() => setNav(false)}
              className="flex justify-end w-full mb-4"
            >
              <button
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden
                    hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400
                        dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                {theme === "light" ? (
                  <img
                    src="/assets/close.svg"
                    alt="close"
                    className="w-6 h-6"
                  />
                ) : (
                  <img
                    src="/assets/Dark-icons/close.svg"
                    alt="close"
                    className="w-[17px] h-5"
                  />
                )}
              </button>
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    setNav(false);
                  }}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <img
                    src={
                      theme === "light"
                        ? "/assets/Light-icons/home.svg"
                        : "/assets/Dark-icons/home.svg"
                    }
                    alt="home"
                    className="w-7 h-7"
                  />

                  <span className="ms-3">Home</span>
                </Link>
              </li>

              <li>
                <Accordion type="single" collapsible>
                  <AccordionItem
                    value="item-1"
                    className="border-none border-0"
                  >
                    <AccordionTrigger className="p-2 hover:no-underline transition duration-75 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                      <button
                        type="button"
                        className="flex items-center w-full text-base text-gray-900 "
                        aria-controls="dropdown-example"
                        data-collapse-toggle="dropdown-example"
                      >
                        <img
                          src={
                            theme === "light"
                              ? "/assets/Light-icons/category.svg"
                              : "/assets/Dark-icons/category.svg"
                          }
                          className="w-7 h-7"
                          alt="category"
                        />

                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap dark:text-white">
                          Category
                        </span>
                      </button>
                    </AccordionTrigger>
                    <AccordionContent className="p-0">
                      <ul className="py-2 space-y-2">
                        {MegaMenuLinks.map((link, index) => (
                          <div key={index} className="flex flex-col">
                            <h2 className="uppercase ms-2 tracking-wider text-gray-500 font-medium text-[13px] mb-2">
                              {link.name}
                            </h2>

                            {link.subLinks.map((subLink, index) => (
                              <li key={index}>
                                <Link
                                  to={`/category${subLink.path}`}
                                  onClick={() => setNav(false)}
                                  className="flex items-center w-full p-2 mt-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 capitalize"
                                >
                                  <img
                                    src={
                                      theme === "light"
                                        ? subLink.icon
                                        : subLink.DarkIcon
                                    }
                                    className="w-7 h-7"
                                    alt=""
                                  />
                                  <span className="flex-1 ms-3 whitespace-nowrap">
                                    {subLink.label}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </div>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>

              <hr className="text-gray-500 " />
              {Links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    {/* {theme === "light" ? (
                      <img
                        src={link.icon}
                        className="w-7 h-7"
                        alt={link.label}
                      />
                    ) : ( */}
                    <img
                      src={
                        theme === "light"
                          ? link.icon
                          : link.DarkIcon
                          ? link.DarkIcon
                          : link.icon
                      }
                      className="w-7 h-7"
                      alt={link.label}
                    />
                    {/* )} */}
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:hidden block ms-2">
            <Theme label={true} />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
