import { seedPizzas } from "./utils/dataPizza";
import "dotenv/config";
import app from "./App";
import connectToDatabase from "./Models/Connection";
import MongoosePizzaRepository from "./Repository/implementations/MongoosePizza.repository";
import mongoose from "mongoose";

const mongoosePizzaRepository = new MongoosePizzaRepository();

const PORT = process.env.PORT || 3001;

async function server() {
  try {
    await connectToDatabase();
    const num = await mongoosePizzaRepository.model.countDocuments().exec();
    if (num === 0) await mongoosePizzaRepository.model.insertMany(seedPizzas);   
    app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
  } catch (error) {
    console.log("Connection with database generated an error:\r\n");
    console.error(error);
    console.log("\r\nServer initialization cancelled");
    process.exit(0);
  }
}

server();

// connectToDatabase()
//   .then(() => {
//     app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
//   })
//   .catch((error) => {
//     console.log("Connection with database generated an error:\r\n");
//     console.error(error);
//     console.log("\r\nServer initialization cancelled");
//     process.exit(0);
//   });

// const seedPizza = async () => {
//   await mongoosePizzaRepository.model.deleteMany({})
//   await mongoosePizzaRepository.model.insertMany(seedPizzas)
// }

// seedPizza()
