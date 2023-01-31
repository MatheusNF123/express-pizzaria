import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import createOrAddItemToCart from "../services/createOrAddItemToCart";
import { User, CartPizzas, PurchaseItem } from "../Types";

type UserContextValues = {
  user: User | null;
  cartQuantity: number;
  handleUser: (user: User) => void;
  handleCartQuantity: (cartItems: CartPizzas[]) => void;
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

  const handleCartQuantity = (cartItems: CartPizzas[]) => {
    setCartQuantity(cartItems.length);
  };

  const handleUser = (user: User) => {
    setUser(user);
  };

  const handlePurchase = async (item: PurchaseItem) => {
    // verificar se tem cookie se não vai para o login
    await createOrAddItemToCart(item, router);
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
