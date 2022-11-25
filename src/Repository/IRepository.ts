import IUser from "../Interfaces/IUser";

export interface IRepository<T> {
  findAll():Promise<T[]>;
  findOne(id: number): Promise<T | null>;
  create(obj: T):Promise<T>;
  update(id: number, obj: T):Promise<T | null>;
  delete(id:string):Promise<T | null>;
}

export interface IUserRepository extends IRepository<IUser> {
  findEmail(email:string):Promise<IUser | null>;
}