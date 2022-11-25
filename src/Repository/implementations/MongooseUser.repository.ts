// import { IRepository } from "../IRepository";
// import { Schema } from "mongoose";
// import IUser from "../../Interfaces/IUser";
// import AbstractRepository from "./Abstract.repository";

// export default class MongooseUserRepository extends AbstractRepository<IUser> {
//   constructor() {
//     const schemaUser = new Schema<IUser>(
//       {
//         name: String,
//         address: String,
//         email: { type: String, unique: true },
//         password: { type: String, select: false },
//         phone: String,
//       },
//       { versionKey: false, strictQuery: false }
//     );
//     super(schemaUser, "User");
//   }

//   async findEmail(email: string): Promise<IUser | null> {
//     return this._model.findOne({ email });
//   }
// }

// import { model, Model, models, Schema, isValidObjectId, UpdateQuery } from "mongoose";
import { AppDataSource } from './../../data-source';
import { IRepository } from "../IRepository";
import CustomError from "../../Error/CustomError";
import { Repository } from "typeorm";
import Pizza from "../../Database/Entities/Pizza";

const INVALID_MONG_ID = "Invalid mongo id";
// AppDataSource.getRepository(Pizza)
export default class AbstractRepository<T> implements IRepository<T> {
  protected _model: Repository<T>;  

  constructor(model: Repository<T>) {
    this._model = model;    
  }

  async findAll(): Promise<T[]> {
    return this._model.find();
  }

  async findOne(id: number): Promise<T | null> {
    return this._model.findOne({ where: { id } } as T);
  }

  async create(obj: T): Promise<T> {
   return this._model.create({ ...obj });
  }

  async update(id: number, obj: T): Promise<T | null> {
    // if (!isValidObjectId(_id)) throw new CustomError(INVALID_MONG_ID, 422)
    const s = this._model.update(id, obj);
    return null
    // return this._model.update(id, obj);
  }

  async delete(_id: string): Promise<T | null> {
    return this._model.findByIdAndDelete({ _id });
  }
}
