import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const port = process.env.DB_PORT as unknown as number | undefined;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "test",
  database: process.env.DB_NAME || 'postgres',
  entities: [`${__dirname}/**/Database/Entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/Database/Migrations/*.{ts,js}`],
});
