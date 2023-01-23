import { MigrationInterface, QueryRunner } from "typeorm";

export class default1674432520149 implements MigrationInterface {
    name = 'default1674432520149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('customer', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "address" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "phone" text NOT NULL, "role" "public"."users_role_enum" NOT NULL, "img" text NOT NULL DEFAULT '', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('Comprado', 'Cancelado')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."orders_status_enum" NOT NULL DEFAULT 'Comprado', "date" TIMESTAMP NOT NULL, "totalPrice" numeric(10,2) NOT NULL DEFAULT '0', "user_id" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_pizzas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "size" text NOT NULL, "border" boolean NOT NULL, "quantity" integer NOT NULL, "order_id" uuid, "pizza_id" uuid, CONSTRAINT "PK_a7c92b129edc46ccc93533a5ba8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pizzas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "flavor" text NOT NULL, "type" text NOT NULL, "price" numeric(5,2) NOT NULL DEFAULT '0', "ingredients" text array NOT NULL, "img" text NOT NULL, CONSTRAINT "PK_27f7ede7b9304d8372a336d1e5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_pizzas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "size" text NOT NULL, "border" boolean NOT NULL, "quantity" integer NOT NULL, "cart_id" uuid, "pizza_id" uuid, CONSTRAINT "PK_1e8b26b0e568558a9c9b23aa97a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "totalPrice" numeric(10,2) NOT NULL DEFAULT '0', "user_id" uuid, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_pizzas" ADD CONSTRAINT "FK_94e4c78b135471b297ec531c33b" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_pizzas" ADD CONSTRAINT "FK_2e600dd39b600c38d891d3f2adf" FOREIGN KEY ("pizza_id") REFERENCES "pizzas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_pizzas" ADD CONSTRAINT "FK_6a54810a2942d53755ce765c3a7" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_pizzas" ADD CONSTRAINT "FK_8a8335ecdb501a77e5140966877" FOREIGN KEY ("pizza_id") REFERENCES "pizzas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea"`);
        await queryRunner.query(`ALTER TABLE "cart_pizzas" DROP CONSTRAINT "FK_8a8335ecdb501a77e5140966877"`);
        await queryRunner.query(`ALTER TABLE "cart_pizzas" DROP CONSTRAINT "FK_6a54810a2942d53755ce765c3a7"`);
        await queryRunner.query(`ALTER TABLE "orders_pizzas" DROP CONSTRAINT "FK_2e600dd39b600c38d891d3f2adf"`);
        await queryRunner.query(`ALTER TABLE "orders_pizzas" DROP CONSTRAINT "FK_94e4c78b135471b297ec531c33b"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "cart_pizzas"`);
        await queryRunner.query(`DROP TABLE "pizzas"`);
        await queryRunner.query(`DROP TABLE "orders_pizzas"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
