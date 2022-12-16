import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import IPizza from "../../Interfaces/IPizza";

@Entity("pizzas")
export default class Pizza implements IPizza {
  @PrimaryGeneratedColumn({ name: "id" })
  id: string;

  @Column({ type: "text" })
  flavor: string;

  @Column({ type: "text" })
  type: string;

  @Column({ type: "decimal" })
  price: number;

  @Column({ type: "text" })
  ingredients: string[];
}
