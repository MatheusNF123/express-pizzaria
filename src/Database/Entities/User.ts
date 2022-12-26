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

  @Column({ type: "enum", enum: ["customer", "admin"] })
  role: string;

  @Column({ type: "text", default: "" })
  img: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
