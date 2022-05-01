import { Category } from './category'

import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'

@Entity('products')
export class Product {
  @PrimaryColumn()
  id!: string

  @Column({ nullable: true })
  categoryId!: string

  @ManyToOne(() => Category)
  category!: Category

  @Column()
  name!: string

  @Column()
  description!: string

  @Column({ type: 'decimal' })
  price!: number

  @Column({ default: true })
  available!: string

  @Column({ nullable: true })
  picture?: string
}
