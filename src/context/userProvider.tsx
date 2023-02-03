import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { User, CartPizzas, PurchaseItem } from "../Types";
import createOrAddItemToCart from "../services/createOrAddItemToCart";
import verifyCookie from "../services/verifyCookie";
import getCartQuantity from "../services/getCartQuantity";

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
    getCartQuantity().then((quantity) => {
      console.log('quantity', quantity);
      setCartQuantity(quantity);
    })
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

    const quantity = await getCartQuantity();
    setCartQuantity(quantity);
  };

  // const handleCartItemDeletion = async (cartId: string, itemId: string) => {
  //   await deleteRequest(`/cart/${cartId}/item/${itemId}`);

  //   const quantity = await getCartQuantity();
  //   setCartQuantity(quantity);
  // }

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
