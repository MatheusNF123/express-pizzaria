import User from "../Database/Entities/User";
import { IUser } from "../Interfaces/IUser";
import IPizza from "../Interfaces/IPizza";
import { IOrder } from "../Interfaces/IOrder";
import { IOrdersPizzas } from "../Interfaces/IOrdersPizzas";

export interface IRepository<T> {
  findAll(value?: object): Promise<T[]>;
  findOne(value: object | Array<any>): Promise<T | null>;
  create(obj: T): Promise<T>;
  update(obj: T, bodyObj: T): Promise<T | null>;
  delete(id: string): Promise<void>;
}

export interface IDeleteOrderRepository {
  order: IRepository<IOrder>;
  user: IRepository<IUser>;
}

export interface IOrderRepository extends IDeleteOrderRepository {
  ordersPizzas: IRepository<IOrdersPizzas>;
  pizza: IRepository<IPizza>;
}
