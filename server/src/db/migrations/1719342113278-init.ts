import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1719342113278 implements MigrationInterface {
    name = 'Init1719342113278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin_profile" ("id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "REL_1a272d44c2214c1e8b22a886d6" UNIQUE ("userId"), CONSTRAINT "PK_bc784ca31eb1821ba53980ca23d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "make" character varying NOT NULL, "year" integer NOT NULL, "image" jsonb, "ownerId" integer, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chauffeur_profile" ("id" SERIAL NOT NULL, "pricePerHour" numeric(10,2), "availability" jsonb NOT NULL DEFAULT '{"sunday":{"available":false,"fullDay":false,"from":null,"to":null},"monday":{"available":false,"fullDay":false,"from":null,"to":null},"tuesday":{"available":false,"fullDay":false,"from":null,"to":null},"wednesday":{"available":false,"fullDay":false,"from":null,"to":null},"thursday":{"available":false,"fullDay":false,"from":null,"to":null},"friday":{"available":false,"fullDay":false,"from":null,"to":null},"saturday":{"available":false,"fullDay":false,"from":null,"to":null}}', "carId" integer, "userId" integer, CONSTRAINT "REL_cf59a553b40394f74a17ebdd5f" UNIQUE ("carId"), CONSTRAINT "REL_2ab246e58babda38b61a2db4e3" UNIQUE ("userId"), CONSTRAINT "PK_90531781ee8117c4635675495ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booked_slot" ("id" SERIAL NOT NULL, "dateTimeFrom" TIMESTAMP NOT NULL, "dateTimeTo" TIMESTAMP NOT NULL, "bookingId" integer, "chauffeurProfileId" integer, CONSTRAINT "REL_42bf977651f54c8bbf0e7551cc" UNIQUE ("bookingId"), CONSTRAINT "PK_b665f1574186814ad1e7946babe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "cretaedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."booking_status_enum" AS ENUM('booked', 'rejected', 'accepted', 'cancled', 'trip started', 'completed')`);
        await queryRunner.query(`CREATE TYPE "public"."booking_paymentmode_enum" AS ENUM('online', 'cash')`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" SERIAL NOT NULL, "pickupAddress" character varying NOT NULL, "pickupCords" jsonb NOT NULL, "dropoffAddress" character varying NOT NULL, "dropoffCords" jsonb NOT NULL, "bookedForHours" integer NOT NULL, "pricePerHour" numeric(10,2) NOT NULL, "total" numeric(10,2) NOT NULL, "status" "public"."booking_status_enum" NOT NULL, "paymentMode" "public"."booking_paymentmode_enum", "history" json NOT NULL, "cretaedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "paymentId" integer, "customerProfileId" integer, "chauffeurProfileId" integer, CONSTRAINT "REL_14223cf3883f8f74019bf60ded" UNIQUE ("paymentId"), CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "avatar" jsonb, "userId" integer, CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "data" jsonb NOT NULL, "readAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_usertype_enum" AS ENUM('admin', 'chauffeur', 'customer')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(256) NOT NULL, "phone" character varying(15), "userType" "public"."user_usertype_enum" NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "emailVerfied" boolean NOT NULL DEFAULT false, "cretaedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "admin_profile" ADD CONSTRAINT "FK_1a272d44c2214c1e8b22a886d61" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_cce467b67e5d4a0012473f985ea" FOREIGN KEY ("ownerId") REFERENCES "admin_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chauffeur_profile" ADD CONSTRAINT "FK_cf59a553b40394f74a17ebdd5f4" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chauffeur_profile" ADD CONSTRAINT "FK_2ab246e58babda38b61a2db4e34" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booked_slot" ADD CONSTRAINT "FK_42bf977651f54c8bbf0e7551cc0" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booked_slot" ADD CONSTRAINT "FK_a93d2f2372b44e472ad899785df" FOREIGN KEY ("chauffeurProfileId") REFERENCES "chauffeur_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_14223cf3883f8f74019bf60ded5" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_8c9e8ef7097d13aa1a005aa8a64" FOREIGN KEY ("customerProfileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_297fe28c8a370e0b55e0a161f40" FOREIGN KEY ("chauffeurProfileId") REFERENCES "chauffeur_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_297fe28c8a370e0b55e0a161f40"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_8c9e8ef7097d13aa1a005aa8a64"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_14223cf3883f8f74019bf60ded5"`);
        await queryRunner.query(`ALTER TABLE "booked_slot" DROP CONSTRAINT "FK_a93d2f2372b44e472ad899785df"`);
        await queryRunner.query(`ALTER TABLE "booked_slot" DROP CONSTRAINT "FK_42bf977651f54c8bbf0e7551cc0"`);
        await queryRunner.query(`ALTER TABLE "chauffeur_profile" DROP CONSTRAINT "FK_2ab246e58babda38b61a2db4e34"`);
        await queryRunner.query(`ALTER TABLE "chauffeur_profile" DROP CONSTRAINT "FK_cf59a553b40394f74a17ebdd5f4"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_cce467b67e5d4a0012473f985ea"`);
        await queryRunner.query(`ALTER TABLE "admin_profile" DROP CONSTRAINT "FK_1a272d44c2214c1e8b22a886d61"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_usertype_enum"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TYPE "public"."booking_paymentmode_enum"`);
        await queryRunner.query(`DROP TYPE "public"."booking_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "booked_slot"`);
        await queryRunner.query(`DROP TABLE "chauffeur_profile"`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP TABLE "admin_profile"`);
    }

}
