import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateOrders1651703617088 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'accountId',
            type: 'uuid'
          },
          {
            name: 'note',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'total',
            type: 'numeric'
          },
          {
            name: 'paymentMode',
            type: 'varchar'
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'opened'"
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKAccountOrder',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['accountId'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders')
  }
}
