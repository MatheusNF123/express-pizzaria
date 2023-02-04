import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";

import { User, PurchaseItem } from "../Types";
import createOrAddItemToCart from "../services/createOrAddItemToCart";
import verifyCookie from "../services/verifyCookie";
import getCartData from "../services/getCartData";

type UserContextValues = {
  user: User | null;
  cartQuantity: number;
  handleUser: (user: User) => void;
  handleCartQuantity: (quantity: number) => void;
  handlePurchase: (item: PurchaseItem) => void;
};

export const userContext = createContext({} as UserContextValues);

type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
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
        handleUser,
        handleCartQuantity,
        handlePurchase,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
