import { IUser } from "./IUser";

export interface IOrder {
  id?: string;
  user: IUser;
  status?: string;
  date?: Date | null;
  totalPrice: number;
}

export interface ISaleInfo {
  size: string;
  border: boolean;
  quantity: number;
}

export interface ISaleInfoDTO extends ISaleInfo {
  pizzaId: string;
};

export interface IOrderDTO {
  cartId: string;
  pizzas: ISaleInfoDTO[];
}
