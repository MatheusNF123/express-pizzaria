import { IRepository } from "../IRepository";
import { Schema } from "mongoose";
import IUser from "../../Interfaces/IUser";
import AbstractRepository from "./Abstract.repository";

export default class MongooseUserRepository extends AbstractRepository<IUser> {
  constructor() {
    const schemaUser = new Schema<IUser>(
      {
        name: String,
        address: String,
        email: { type: String, unique: true },
        password: { type: String, select: false },
        phone: String,
      },
      { versionKey: false, strictQuery: false }
    );
    super(schemaUser, "User");
  }

  async findEmail(email: string): Promise<IUser | null> {
    return this._model.findOne({ email });
  }
}
