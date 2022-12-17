import User from "../Database/Entities/User";
import { IUser } from "../Interfaces/IUser";

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
