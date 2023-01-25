import { createContext, useState } from "react";
import { ReactNode } from "react";

type UserContextValues = {
  cartQuantity: number;
  cartData: any;
  handleCart: any;
};

export const userContext = createContext({} as UserContextValues);

type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);

  return (
    <userContext.Provider
      value={{
        cartQuantity: 14,
        cartData: cart,
        handleCart: setCart,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
