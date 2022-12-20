import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { MainSeeder } from "./Database/seeds/MainSeeder";

const port = process.env.DB_PORT as unknown as number | undefined;

const op: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ["./src/Database/Entities/**/*.ts"],
  migrations: [`${__dirname}/**/Database/Migrations/*.{ts,js}`],
  seeds: [MainSeeder] 
}

export const AppDataSource = new DataSource(op);
