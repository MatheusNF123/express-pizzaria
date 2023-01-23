import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ICartPizzas } from "../../Interfaces/ICartPizzas";
import Cart from "./Cart";
import Pizza from "./Pizza";

@Entity("cart_pizzas")
export default class CartPizzas implements ICartPizzas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cart, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cart_id" })
  cart: Cart;

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
