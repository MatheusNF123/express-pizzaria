import IPizza from "./IPizza";
import { IOrder } from "./IOrder";

export interface IOrdersPizzas {
  id?: string;
  order: IOrder;
  pizza: IPizza;
  size: string;
  border: boolean;
  quantity: number;
}
