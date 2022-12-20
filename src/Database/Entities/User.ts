import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { IUser } from "../../Interfaces/IUser";
import Order from "./Order";

@Entity("users")
export default class User implements IUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  address: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text", unique: true })
  phone: string;

  // @OneToMany(() => Order, (Order) => Order.user)
  // @JoinColumn({ name: "order_id" })
  // orders: Order[];
}
