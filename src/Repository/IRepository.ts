import User from "../Database/Entities/User";
import { IUser } from "../Interfaces/IUser";
import IPizza from "../Interfaces/IPizza";
import { IOrder } from "../Interfaces/IOrder";
import { IOrdersPizzas } from "../Interfaces/IOrdersPizzas";

export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(obj: T): Promise<T>;
  update(obj: T, bodyObj: T): Promise<T | null>;
  delete(id: string): Promise<void>;
}

export interface IUserRepository<T> extends IRepository<T> {
  findEmail(email: string): Promise<IUser | null>;
  findByEmailOrPhone(email: string, phone: string): Promise<IUser | null>;
}

export interface IOrderRepository {
  order: IRepository<IOrder>;
  ordersPizzas: IRepository<IOrdersPizzas>;
  user: IUserRepository<IUser>;
  pizza: IRepository<IPizza>;
}
