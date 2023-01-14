import IPizza from "./IPizza";
import { ICart } from "./ICart";

export interface ICartPizzas {
  id?: string;
  cart: ICart;
  pizza: IPizza;
  size: string;
  border: boolean;
  quantity: number;
}
