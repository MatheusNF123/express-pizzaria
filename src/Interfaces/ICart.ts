import { ICartPizzas } from "./ICartPizzas";
import { ISaleInfo, ISaleInfoDTO } from "./IOrder";
import { IUser } from "./IUser";

export interface ICart {
  id?: string;
  user: IUser;
  cartPizzas?: ICartPizzas[];
  totalPrice: number;
}

export interface ICartDTO {
  pizzas: ISaleInfoDTO[];
}

export interface ICartItemDTO {
  cartId: string;
  item: ISaleInfoDTO;
}
