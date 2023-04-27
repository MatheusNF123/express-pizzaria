import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import IPizza from "../../Interfaces/IPizza";
import OrdersPizzas from "./OrdersPizzas";

@Entity("pizzas")
export default class Pizza implements IPizza {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: "text" })
  flavor: string;

  @Column({ type: "text" })
  type: string;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  price: number;

  @Column({ type: "text", array: true })
  ingredients: string[];

  @Column({ type: "text" })
  img: string;

  @OneToMany(() => OrdersPizzas, (OrdersPizzas) => OrdersPizzas.pizza)
  @JoinColumn({ name: "orders_pizzas_id" })
  ordersPizzas: OrdersPizzas[];
}
