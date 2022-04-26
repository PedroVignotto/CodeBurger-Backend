import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAddresses1650925166013 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
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
            name: 'surname',
            type: 'varchar'
          },
          {
            name: 'zipCode',
            type: 'varchar'
          },
          {
            name: 'district',
            type: 'varchar'
          },
          {
            name: 'street',
            type: 'varchar'
          },
          {
            name: 'number',
            type: 'numeric'
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true
          }
        ],
        foreignKeys: [
          {
            name: 'FKAccountAddress',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['accountId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('addresses')
  }
}
