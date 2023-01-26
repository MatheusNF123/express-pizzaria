import { createContext, ReactNode, Dispatch, SetStateAction, useState } from "react";
import { User } from "../Types";

type UserContextValues = {
  user: User | null;
  cartQuantity: number;
  handleUser: (user: User) => void;
  handleCartQuantity: (cartItems: any[]) => void;
};

export const userContext = createContext({} as UserContextValues);

type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [cartQuantity, setCartQuantity] = useState(0);

  const handleCartQuantity = (cartItems: any[]) => {
    setCartQuantity(cartItems.length);
  }

  const handleUser = (user: User) => {
    setUser(user);
  }

  return (
    <userContext.Provider
      value={{
        user,
        cartQuantity,
        handleUser,
        handleCartQuantity,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
