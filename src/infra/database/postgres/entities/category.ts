import { Product } from '@/infra/database/postgres/entities'

import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity('categories')
export class Category {
  @PrimaryColumn()
  id!: string

  @Column({ unique: true })
  name!: string

  @OneToMany(() => Product, product => product.category)
  products!: Product[]
}
