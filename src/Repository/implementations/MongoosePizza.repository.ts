import { AppDataSource } from './../../data-source';
import { IRepository } from "../IRepository";
// import { Schema } from "mongoose";
import IPizza from "../../Interfaces/IPizza";
import AbstractRepository from "./Abstract.repository";
import Pizza from '../../Database/Entities/Pizza';

// const mode = AppDataSource.getMongoRepository(Pizza)

export default class MongoosePizzaRepository extends AbstractRepository<Pizza> {
  constructor() {
    const mode = AppDataSource.getRepository(Pizza)
    super(mode);
  }

  // get model() {
  //   return this._model;
  // }
}






// // import { IRepository } from "../IRepository";
// // import { Schema } from "mongoose";
// // import IPizza from "../../Interfaces/IPizza";
// // import AbstractRepository from "./Abstract.repository";

// // export default class MongoosePizzaRepository extends AbstractRepository<IPizza> {
// //   constructor() {
// //     const schemaUser = new Schema<IPizza>(
// //       {
// //         id: String,
// //         flavor: String,
// //         type: String,
// //         price: Number,
// //         ingredients: Array<String>,
// //       },
// //       { versionKey: false }
// //     );
// //     super(schemaUser, "Pizza");
// //   }

// //   get model() {
// //     return this._model;
// //   }
// // }
