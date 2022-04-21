import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm'

@Entity('accounts')
export class Account {
  @PrimaryColumn()
  id!: string

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @CreateDateColumn()
  createdAt!: Date
}
