import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('categories')
export class Category {
  @PrimaryColumn()
  id!: string

  @Column({ unique: true })
  name!: string
}
