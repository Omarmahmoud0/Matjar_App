import { ICategory, ILinks, IMegaMenu, ISales } from "@/types/types";

export const Links: ILinks = [
  { label: "Sale's", path: "/", icon: "/assets/sales.svg" },
  {
    label: "What's New",
    path: "#",
    icon: "/assets/Light-icons/question.svg",
    DarkIcon: "/assets/Dark-icons/question.svg",
  },
  {
    label: "Delivery",
    path: "#",
    icon: "/assets/Light-icons/delivery.svg",
    DarkIcon: "/assets/Dark-icons/delivery.svg",
  },
];

export const MegaMenuLinks: IMegaMenu = [
  {
    name: "Electronic devices",
    subLinks: [
      {
        label: "phones",
        path: "/Electronics-phones",
        img: "/assets/phone.png",
        icon: "/assets/Light-icons/devices.svg",
        DarkIcon: "/assets/Dark-icons/devices.svg",
      },
      {
        label: "Laptops",
        path: "/Electronics-laptops",
        img: "/assets/laptop.png",
        icon: "/assets/Light-icons/laptopSvg.svg",
        DarkIcon: "/assets/Dark-icons/laptopSvg.svg",
      },
      {
        label: "headphone",
        path: "/Electronics-headphones",
        img: "/assets/headphone.png",
        icon: "/assets/Light-icons/head-set.svg",
        DarkIcon: "/assets/Dark-icons/head-set.svg",
      },
    ],
  },
  {
    name: "clothes",
    subLinks: [
      {
        label: "Men's",
        path: "/clothes-mens",
        img: "/assets/man.png",
        icon: "/assets/Light-icons/man-clothes.svg",
        DarkIcon: "/assets/Dark-icons/man-clothes.svg",
      },
      {
        label: "Women's",
        path: "/clothes-womens",
        img: "/assets/women.png",
        icon: "/assets/Light-icons/woman-clothes.svg",
        DarkIcon: "/assets/Dark-icons/woman-clothes.svg",
      },
      {
        label: "kids",
        path: "/clothes-kids",
        img: "/assets/children.png",
        icon: "/assets/Light-icons/baby-clothes.svg",
        DarkIcon: "/assets/Dark-icons/baby-clothes.svg",
      },
    ],
  },
];

export const CategoryLinks: ICategory = [
  {
    Clothes: [
      {
        label: "women's fashion",
        path: "/clothes-womens",
        img: "/assets/dress.png",
        bg:"bg-green-500"
      },
      { label: "men fashion", path: "/clothes-mens", img: "/assets/short.png",bg:"bg-gray-400" },
    ],

    Electronic:[
      {
        label: "phones",
        path: "/Electronics-phones",
        img: "/assets/phone.png",
        bg:"bg-blue-500"

      },
      {
        label: "laptop",
        path: "/Electronics-laptops",
        img: "/assets/laptop.png",
        bg:"bg-amber-500"

      },
      {
        label: "headphone",
        path: "/Electronics-headphones",
        img: "/assets/headphone.png",
        bg:"bg-red-600"

      },
      {
        label: "Kids",
        path: "/clothes-kids",
        img: "/assets/children.png",
        bg:"bg-pink-500"
      },
    ]
  },
];

export const SalesLinks: ISales = [
  {
    label: "laptop",
    path: "/laptop",
    img: "/assets/laptop.png",
    desc:"Enjoy watching movies with the best quality - and playing games with the best performance",
    descount:"30% OFF"

  },
  {
    label: "headphone",
    path: "/headphone",
    img: "/assets/headphone.png",
    desc:"Enjoy listening to your favorite songs with clarity",
    descount:"50% OFF"
  },
  {
    label: "Kids",
    path: "/Kids",
    img: "/assets/children.png",
    desc:"Get your children the best appearance",
    descount:"25% OFF"
  },
];
