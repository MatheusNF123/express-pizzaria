import IUser from "../Interfaces/IUser";

export interface IRepository<T> {
  findAll():Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  create(obj: T):Promise<T>;
  update(id: string, obj: T):Promise<T | null>;
  delete(id:string):Promise<T | null>;
}

export interface IUserRepository extends IRepository<IUser> {
  findEmail(email:string):Promise<IUser | null>;
}