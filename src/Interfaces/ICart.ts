import { IUser } from "./IUser";

export interface ICart {
  id?: string;
  user: IUser;
  totalPrice: number;
}

type ICartPizzasDTO = {
  pizzaId: string;
  size: string;
  border: boolean;
  quantity: number;
};

export interface ICartDTO {
  pizzas: ICartPizzasDTO[];
}