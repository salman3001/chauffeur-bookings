import { MigrationInterface, QueryRunner } from "typeorm";

export class ChnageAvailabilityTable1720068679309 implements MigrationInterface {
    name = 'ChnageAvailabilityTable1720068679309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "sundayFrom" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "sundayTo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "mondayFrom" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "mondayTo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "tuesdayFrom" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "tuesdayTo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "wednesdayFrom" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "wednesdayTo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "thursdayFrom" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "thursdayTo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "fridayFrom" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "fridayTo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "saturdayFrom" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "saturdayTo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "saturdayTo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "saturdayFrom" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "fridayTo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "fridayFrom" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "thursdayTo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "thursdayFrom" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "wednesdayTo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "wednesdayFrom" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "tuesdayTo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "tuesdayFrom" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "mondayTo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "mondayFrom" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "sundayTo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "sundayFrom" SET NOT NULL`);
    }

}
