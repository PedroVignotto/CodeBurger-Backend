import { Account } from './account'
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'

@Entity('addresses')
export class Address {
  @PrimaryColumn()
  id!: string

  @Column({ select: false })
  accountId!: string

  @ManyToOne(() => Account)
  account!: Account

  @Column()
  surname!: string

  @Column()
  zipCode!: string

  @Column()
  district!: string

  @Column()
  street!: string

  @Column()
  number!: number

  @Column({ nullable: true })
  complement?: string
}
