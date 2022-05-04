import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateOrdersProducts1651704012672 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ordersProducts',
        columns: [
          {
            name: 'orderId',
            type: 'uuid'
          },
          {
            name: 'productId',
            type: 'uuid'
          }
        ],
        foreignKeys: [
          {
            name: 'FKOrderProduct',
            referencedTableName: 'orders',
            referencedColumnNames: ['id'],
            columnNames: ['orderId'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          },
          {
            name: 'FKProductOrder',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['productId'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ordersProducts')
  }
}
