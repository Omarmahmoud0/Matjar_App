import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import { Links, MegaMenuLinks } from "../Links";
import { useState } from "react";

const LinksBar = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="hidden md:block w-full bg-white dark:bg-gray-900 pb-2 shadow-lg">
      <div className="container">
        <ul className="flex items-center xl:gap-8 gap-6 w-full">
          {/* MGEA MENU */}
          <li
            className={`relative ${show && "group"}  py-2 dark:text-white`}
            onMouseOver={() => setShow(true)}
          >
            <button className=" cursor-pointer xl:text-lg text-base font-semibold hover:opacity-55">
              Category
            </button>
            <KeyboardArrowDownIcon className="group-hover:animate-wiggle group-hover:text-blue-600" />
            <div
              className="absolute top-8 -left-6 min-w-[580px] z-50 group-hover:opacity-100 group-hover:visible
                    invisible opacity-100 translate-y-0 group-hover:translate-y-1 transition ease-in-out duration-500"
            >
              <div className="relative top-[30px] bg-white dark:bg-gradient-to-tr from-indigo-600 to-indigo-700 w-full p-6 rounded-lg shadow-2xl">
                <div
                  className="absolute w-6 h-6 bg-white -z-10 rounded-sm transform rotate-45
                        -top-[1px] translate-x-[-20px] group-hover:translate-x-8 transition ease-in-out duration-500"
                ></div>

                <div className="grid grid-cols-2 gap-4">
                  {MegaMenuLinks.map((link, index) => (
                    <div key={index} className="flex flex-col gap-3 p-3">
                      <h2 className="uppercase tracking-wider text-gray-500 dark:text-gray-200 font-medium text-[13px] mb-2">
                        {link.name}
                      </h2>
                      {link.subLinks.map((subLink, index) => (
                        <Link
                          key={index}
                          to={`/category${subLink.path}`}
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            setShow(false);
                          }}
                        >
                          <div
                            className="flex items-center p-3 bg-slate-300 dark:bg-gray-900 rounded-lg hover:text-indigo-500
                                    cursor-pointer hover:scale-110 transition ease-in-out duration-300 "
                          >
                            <img
                              src={subLink.img}
                              className="w-20 h-20 object-cover"
                              alt="phone"
                            />
                            <span className="font-medium text-lg capitalize">
                              {subLink.label}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>
          {/* MGEA MENU */}

          {Links.map((link, index) => (
            <li
              key={index}
              className="hover:opacity-60 xl:text-[17px] dark:text-white font-medium py-1"
            >
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LinksBar;
