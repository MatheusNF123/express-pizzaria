import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671585312056 implements MigrationInterface {
    name = 'default1671585312056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('customer', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "address" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "phone" text NOT NULL, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "totalPrice" numeric(10,2) NOT NULL DEFAULT '0', "user_id" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_pizzas" ("id" SERIAL NOT NULL, "size" text NOT NULL, "border" boolean NOT NULL, "quantity" integer NOT NULL, "order_id" integer, "pizza_id" integer, CONSTRAINT "PK_a7c92b129edc46ccc93533a5ba8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pizzas" ("id" SERIAL NOT NULL, "flavor" text NOT NULL, "type" text NOT NULL, "price" numeric(5,2) NOT NULL DEFAULT '0', "ingredients" text array NOT NULL, "img" text NOT NULL, CONSTRAINT "PK_27f7ede7b9304d8372a336d1e5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_pizzas" ADD CONSTRAINT "FK_94e4c78b135471b297ec531c33b" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_pizzas" ADD CONSTRAINT "FK_2e600dd39b600c38d891d3f2adf" FOREIGN KEY ("pizza_id") REFERENCES "pizzas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_pizzas" DROP CONSTRAINT "FK_2e600dd39b600c38d891d3f2adf"`);
        await queryRunner.query(`ALTER TABLE "orders_pizzas" DROP CONSTRAINT "FK_94e4c78b135471b297ec531c33b"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`DROP TABLE "pizzas"`);
        await queryRunner.query(`DROP TABLE "orders_pizzas"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
