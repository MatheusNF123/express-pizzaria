import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "./data-source";
import app from "./App";

const PORT = process.env.PORT || 3001;


AppDataSource.initialize()
.then(() => {
    
    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}`);
      });
    console.log(`Data Source has been initialized`);
})
.catch((err) => {
    console.error(`Data Source initialization error`, err);
})

