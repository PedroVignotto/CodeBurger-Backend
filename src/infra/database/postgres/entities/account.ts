import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm'

@Entity('accounts')
export class Account {
  @PrimaryColumn()
  id!: string

  @Column()
  name!: string

  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @Column({ nullable: true })
  role?: string

  @CreateDateColumn()
  createdAt!: Date
}
