import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const PORT = process.env.DB_PORT as unknown as number | undefined;
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

console.log('PORT', PORT);
console.log('DB_HOST', DB_HOST);
console.log('DB_USER', DB_USER);
console.log('DB_PASS', DB_PASS);
console.log('DB_NAME', DB_NAME);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: PORT,
  username: DB_USER || "postgres",
  password: DB_PASS || "test",
  database: DB_NAME || 'postgres',
  entities: [`${__dirname}/**/Database/Entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/Database/Migrations/*.{ts,js}`],
});
