import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateProducts1651440183333 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'categoryId',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'price',
            type: 'numeric'
          },
          {
            name: 'available',
            type: 'boolean',
            default: true
          },
          {
            name: 'picture',
            type: 'varchar',
            isNullable: true
          }
        ],
        foreignKeys: [
          {
            name: 'FKCategoryProduct',
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            columnNames: ['categoryId'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }
}
