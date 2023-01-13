import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ICart } from "../../Interfaces/ICart";
import CartPizzas from "./CartPizzas";
import User from "./User";

@Entity("carts")
export default class Cart implements ICart {
  @PrimaryGeneratedColumn({ name: "id" })
  id: string;

  @ManyToOne(() => User, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => CartPizzas, (CartPizzas) => CartPizzas.cart, { eager: true })
  @JoinColumn({ name: "cart_pizzas_id" })
  cartPizzas: CartPizzas[];

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalPrice: number;
}
