export type ILinks = {
  label: string;
  path: string;
  icon?: string;
  DarkIcon?: string;
}[];

export type IMegaMenu = {
  name: string;
  subLinks: {
    label: string;
    path: string;
    img: string;
    icon: string;
    DarkIcon?: string;
  }[];
}[];

export type ISlider = {
  title: string;
  desc: string;
  img: string;
  link: string;
}[];

export type ICategory = {
  Clothes: {
    label: string;
    path: string;
    img: string;
    bg: string;
  }[];
  Electronic: {
    label: string;
    path: string;
    img: string;
    bg: string;
  }[];
}[];

export type ISales = {
  label: string;
  path: string;
  img: string;
  desc: string;
  descount: string;
}[];

export interface IProducts {
  NameSection: string;
  ProductList: any | undefined;
  Button: boolean;
  isError: boolean;
  isFetching: boolean;
  grid?: string;
}

export interface ProductCardProps {
  name: string;
  details: string;
  price: number;
  imageUrl: string;
  rating: number;
  button?: boolean;
  id: string;
  grid?: string;
  discountPercentage?: number;
  userId: string;
  width?: boolean;
}

export interface CategoriesProps {
  section: string | undefined;
  Urlbrand: string | undefined;
  screen?: string;
  Brands: any[] | undefined;
  Colors: any[] | undefined;
  ColorBrands: any[] | undefined;
  priceRange: number[];
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
  priceMin: string | null;
  priceMax: string | null;
}

export interface AuthForm {
  email: string;
  password: string;
  confirmpassword?: string;
  name?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IContextType {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface IContextForm {
  form: boolean;
  setForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface INewAddress {
  userId?: string;
  fullName: string;
  streetAddress: string;
  phoneNumber: string;
  city: string;
  isDefault?: boolean;
}

export interface IUpdateAddress {
  id: string;
  fullName: string;
  streetAddress: string;
  phoneNumber: string;
  city: string;
  isDefault?: boolean;
}

export interface IAddToCart {
  userId: string;
  productId: string;
  quantity: number;
}

export interface SessionData {
  session: {
    payment_intent: string;
    customer_details: {
      name: string;
    };
    status: string;
    payment_status: string;
    id: string;
    metadata: {
      fullName: string;
      address: string;
      phone: string;
      city: string;
    };
  };
}

export interface ILocalStorgeItems {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface CartContextProps {
  handleCart: (product: AddDoc) => Promise<void>;
  localStorageCart: ILocalStorgeItems[];
  handleLOcalStorgeCart: (Id: string, type: string) => void;
  addToLocalStorge: (product: ILocalStorgeItems) => void;
  Cart: { id: string }[] | undefined;
  isFetching: boolean;
}

export interface FavoriteContextProps {
  favoriteProducts: Set<unknown>;
  addToFavoriteHandler: (productId: string) => string | undefined;
  Saves: { id: string }[] | undefined;
  isFetching: boolean;
}

export interface AddDoc {
  userId: string;
  ProductId: string;
  name: string;
  imageUrl: string;
  price: number;
  details?: string;
  Collection: string;
  qty?: number;
}
