import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUserTableColumn1719837143955 implements MigrationInterface {
    name = 'RenameUserTableColumn1719837143955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "emailVerfied" TO "emailVerified"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "emailVerified" TO "emailVerfied"`);
    }

}
