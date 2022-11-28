import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import IUser from "../../Interfaces/IUser";

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
}
