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

// export interface IUserRepository<T> extends IRepository<T> {
//   findEmail(email: string): Promise<IUser | null>;
//   findByEmailOrPhone(email: string, phone: string): Promise<IUser | null>;
// }

// export interface IOrdersPizzasRepository<T> extends IRepository<T> {
//   findAllByUser(user: IUser): Promise<IOrdersPizzas[]>;
// }

export interface IOrderRepository {
  order: IRepository<IOrder>;
  ordersPizzas: IRepository<IOrdersPizzas>;
  user: IRepository<IUser>;
  pizza: IRepository<IPizza>;
}
