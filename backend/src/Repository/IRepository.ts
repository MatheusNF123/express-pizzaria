import User from "../Database/Entities/User";
import { IUser } from "../Interfaces/IUser";
import IPizza from "../Interfaces/IPizza";
import { IOrder } from "../Interfaces/IOrder";
import { ICart } from "../Interfaces/ICart";
import { IOrdersPizzas } from "../Interfaces/IOrdersPizzas";
import { ICartPizzas } from "../Interfaces/ICartPizzas";

export interface IRepository<T> {
  findAll(value?: object): Promise<T[]>;
  findOne(value: object | Array<any>): Promise<T | null>;
  create(obj: T): Promise<T>;
  update(obj: T, bodyObj: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<void>;
}

export interface ICancelOrderRepository {
  order: IRepository<IOrder>;
  user: IRepository<IUser>;
}

export interface IOrderRepository extends ICancelOrderRepository {
  cart: IRepository<ICart>;
  ordersPizzas: IRepository<IOrdersPizzas>;
  pizza: IRepository<IPizza>;
}

export interface IDeleteCartRepository {
  cart: IRepository<ICart>;
  user: IRepository<IUser>;
}

export interface ICartItemRepository extends IDeleteCartRepository {
  cartItem: IRepository<ICartPizzas>;
}

export interface ICartRepository extends IDeleteCartRepository {
  cartPizzas: IRepository<ICartPizzas>;
  pizza: IRepository<IPizza>;
}