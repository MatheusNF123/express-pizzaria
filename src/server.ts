import "reflect-metadata";
import "dotenv/config";
import express from 'express';
// import connectToDatabase from "./Models/Connection";
import { AppDataSource } from "./data-source";
import app from "./App";

const PORT = process.env.PORT || 3001;


AppDataSource.initialize()
.then(() => {
    
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
      });
    console.log(`Data Source has been initialized`);
})
.catch((err) => {
    console.error(`Data Source initialization error`, err);
})



// import { seedPizzas } from "./utils/dataPizza";
// import MongoosePizzaRepository from "./Repository/implementations/MongoosePizza.repository";
// import App from "./App";

// const mongoosePizzaRepository = new MongoosePizzaRepository();

// const PORT = process.env.PORT || 3001;

// async function server() {
//   try {
//     await connectToDatabase();
//     const num = await mongoosePizzaRepository.model.countDocuments().exec();
//     if (num === 0) await mongoosePizzaRepository.model.insertMany(seedPizzas);
//     app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
//   } catch (error) {
//     console.log("Connection with database generated an error:\r\n");
//     console.error(error);
//     console.log("\r\nServer initialization cancelled");
//     process.exit(0);
//   }
// }

// server();

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
