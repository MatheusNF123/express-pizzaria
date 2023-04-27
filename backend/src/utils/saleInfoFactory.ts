import { ICart } from "../Interfaces/ICart";
import { ISaleInfo } from "../Interfaces/IOrder";
import IPizza from "../Interfaces/IPizza";

type factoryReturn = {
  saleInfo: ISaleInfo[];
  pizzas: IPizza[];
}

export default function saleInfoFactory(cart: ICart): factoryReturn {
  return cart.cartPizzas.reduce((acc, curr) => {
    const { size, border, quantity, pizza } = curr;

    acc.saleInfo.push({ size, border, quantity });
    acc.pizzas.push(pizza);

    return acc;
  }, { saleInfo: [], pizzas: [] });
}