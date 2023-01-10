import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { IOrder } from "../../Interfaces/IOrder";
import OrdersPizzas from "./OrdersPizzas";
import User from "./User";

@Entity("orders")
export default class Order implements IOrder {
  @PrimaryGeneratedColumn({ name: "id" })
  id: string;

  @ManyToOne(() => User, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => OrdersPizzas, (OrdersPizzas) => OrdersPizzas.order, { eager: true })
  @JoinColumn({ name: "orders_pizzas_id" })
  ordersPizzas: OrdersPizzas[];

  @Column({ type: "enum", enum: ["pending", "purchased"], default: "pending" })
  status: string;

  @Column({ type: "timestamptz", nullable: true, default: null })
  date: Date | null;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalPrice: number;
}
