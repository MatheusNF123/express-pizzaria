import { IRepository } from "../IRepository";
import { Schema } from "mongoose"
import IPizza from "../../Interfaces/IPizza";
import AbstractRepository from "./Abstract.repository";

export default class MongooseUserRepository extends AbstractRepository<IPizza>{
  constructor() {
    const schemaUser = new Schema<IPizza>({
      id: String,
      flavor: String,
      type: String,
      price: Number,
      ingredients: Array<String>
    }, { versionKey: false })
    super(schemaUser, "Pizza")
  }

  
}