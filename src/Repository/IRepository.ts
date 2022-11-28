import User from "../Database/Entities/User";
import IUser from "../Interfaces/IUser";

export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  create(obj: T): Promise<T>;
  update(obj: T, bodyObj: T): Promise<T | null>;
  delete(id: string): Promise<void>;
}

export interface IUserRepository extends IRepository<User> {
  findEmail(email: string): Promise<IUser | null>;
}
