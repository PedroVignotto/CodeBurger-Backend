import { Account, Product } from '@/infra/database/postgres/entities'

import { Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'

@Entity('orders')
export class Order {
  @PrimaryColumn()
  id!: string

  @Column({ select: false })
  accountId!: string

  @ManyToOne(() => Account)
  account!: Account

  @ManyToMany(() => Product)
  @JoinTable({ name: 'ordersProducts', joinColumns: [{ name: 'orderId' }], inverseJoinColumns: [{ name: 'productId' }] })
  products!: Product[]

  @Column({ nullable: true })
  note!: string

  @Column({ type: 'decimal' })
  total!: number

  @Column()
  paymentMode!: string

  @Column({ default: 'opened' })
  status!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
