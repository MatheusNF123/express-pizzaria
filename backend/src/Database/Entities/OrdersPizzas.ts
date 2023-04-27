import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { IOrdersPizzas } from "../../Interfaces/IOrdersPizzas";
import Order from "./Order";
import Pizza from "./Pizza";

@Entity("orders_pizzas")
export default class OrdersPizzas implements IOrdersPizzas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order: Order;

  @ManyToOne(() => Pizza, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "pizza_id" })
  pizza: Pizza;

  @Column({ type: "text" })
  size: string;

  @Column({ type: "boolean" })
  border: boolean;

  @Column({ type: "int" })
  quantity: number;
}
