import IPizza from "./IPizza";
import { IOrder } from "./IOrder";

export interface ICartPizzas {
  id?: string;
  cart: IOrder;
  pizza: IPizza;
  size: string;
  border: boolean;
  quantity: number;
}
