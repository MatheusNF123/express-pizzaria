import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export default class User{
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'text'})
  name: string

  @Column({type: 'text'})
  address: string

  @Column({type: 'text', unique: true})
  email: string 

  @Column({type: 'text'})
  password: string

  @Column({type: 'text', unique: true})
  phone: string
} 


