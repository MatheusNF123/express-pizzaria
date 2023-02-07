import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie } from "nookies";

import { User, PurchaseItem } from "../Types";
import createOrAddItemToCart from "../services/createOrAddItemToCart";
import verifyCookie from "../services/verifyCookie";
import getCartData from "../services/getCartData";

type UserContextValues = {
  user: User | null;
  cartQuantity: number;
  menuOptions: { option: string, endPoint: string }[];
  handleUser: (user: User) => void;
  handleLogin: (user: User) => Promise<void>;
  handleLogout: () => void;
  handleCartQuantity: (quantity: number) => void;
  handlePurchase: (item: PurchaseItem) => void;
};

export const userContext = createContext({} as UserContextValues);

type UserProviderProps = {
  children: ReactNode;
};

const loggedInMenu = [
  { option: "Meu perfil", endPoint: "/user/perfil" },
  { option: "Meus pedidos", endPoint: "/user/meus_pedidos" },
  { option: "Sair", endPoint: "/pizzas" },
];

const loggedOutMenu = [{ option: "Login", endPoint: "/login" }];

const initialMenuOptions = verifyCookie() ? loggedInMenu : loggedOutMenu;

export default function UserProvider({ children }: UserProviderProps) {
  const [menuOptions, setMenuOptions] = useState(initialMenuOptions);
  const [user, setUser] = useState<User | null>(null);
  const [cartQuantity, setCartQuantity] = useState(0);
  const router = useRouter();

  useEffect(() => {
    getCartData()
      .then(({ quantity }) => {
        setCartQuantity(quantity);
      })
      .catch(() => setCartQuantity(0));
  }, []);

  const handleCartQuantity = (quantity: number) => {
    setCartQuantity(quantity);
  };

  const handleLogin = async (user: User) => {
    const { quantity } = await getCartData();

    setUser(user);
    setCartQuantity(quantity);
    setMenuOptions(loggedInMenu);
  };

  const handleLogout = () => {
    destroyCookie(undefined, "pizzeria.token");

    setUser(null);
    setCartQuantity(0);
    setMenuOptions(loggedOutMenu);
  };

  const handleUser = (user: User) => {
    setUser(user);
  };

  const handlePurchase = async (item: PurchaseItem) => {
    if (!verifyCookie()) return router.push("/login");
    await createOrAddItemToCart(item, router);

    const { quantity } = await getCartData();
    setCartQuantity(quantity);
  };

  return (
    <userContext.Provider
      value={{
        user,
        cartQuantity,
        menuOptions,
        handleUser,
        handleLogin,
        handleLogout,
        handleCartQuantity,
        handlePurchase,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
