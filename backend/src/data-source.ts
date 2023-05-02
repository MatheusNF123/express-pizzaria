import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { MainSeeder } from "./Database/seeds/MainSeeder";

const PORT = process.env.DB_PORT as unknown as number | undefined;

const op: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/**/Database/Entities/**/*.{ts,js}`],
  migrations: [`${__dirname}/**/Database/Migrations/*.{ts,js}`],
  seeds: [MainSeeder],
}

export const AppDataSource = new DataSource(op);
