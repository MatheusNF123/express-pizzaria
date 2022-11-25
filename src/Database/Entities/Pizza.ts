import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("pizzas")
export default class Pizza {
  @PrimaryGeneratedColumn({name: "id"})
  id: string;

  @Column({ type: "text" })
  flavor: string;

  @Column({ type: "text" })
  type: string;

  @Column({ type: "text" })
  price: string;

  @Column({ type: "text" })
  ingredients: string[];
}
