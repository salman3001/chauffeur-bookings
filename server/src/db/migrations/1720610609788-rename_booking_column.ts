import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameBookingColumn1720610609788 implements MigrationInterface {
    name = 'RenameBookingColumn1720610609788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_booking" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "pickupAddress" varchar NOT NULL, "pickupCords" json NOT NULL, "dropoffAddress" varchar NOT NULL, "dropoffCords" json NOT NULL, "bookedForHours" integer NOT NULL, "pricePerHour" decimal(10,2) NOT NULL, "total" decimal(10,2) NOT NULL, "status" text NOT NULL, "paymentMode" text, "history" json NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "paymentId" integer, "customerProfileId" integer, "chauffeurProfileId" integer, CONSTRAINT "REL_14223cf3883f8f74019bf60ded" UNIQUE ("paymentId"), CONSTRAINT "FK_297fe28c8a370e0b55e0a161f40" FOREIGN KEY ("chauffeurProfileId") REFERENCES "chauffeur_profile" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_8c9e8ef7097d13aa1a005aa8a64" FOREIGN KEY ("customerProfileId") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_14223cf3883f8f74019bf60ded5" FOREIGN KEY ("paymentId") REFERENCES "payment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_booking"("id", "pickupAddress", "pickupCords", "dropoffAddress", "dropoffCords", "bookedForHours", "pricePerHour", "total", "status", "paymentMode", "history", "createdAt", "updatedAt", "paymentId", "customerProfileId", "chauffeurProfileId") SELECT "id", "pickupAddress", "pickupCords", "dropoffAddress", "dropoffCords", "bookedForHours", "pricePerHour", "total", "status", "paymentMode", "history", "cretaedAt", "updatedAt", "paymentId", "customerProfileId", "chauffeurProfileId" FROM "booking"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`ALTER TABLE "temporary_booking" RENAME TO "booking"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" RENAME TO "temporary_booking"`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "pickupAddress" varchar NOT NULL, "pickupCords" json NOT NULL, "dropoffAddress" varchar NOT NULL, "dropoffCords" json NOT NULL, "bookedForHours" integer NOT NULL, "pricePerHour" decimal(10,2) NOT NULL, "total" decimal(10,2) NOT NULL, "status" text NOT NULL, "paymentMode" text, "history" json NOT NULL, "cretaedAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "paymentId" integer, "customerProfileId" integer, "chauffeurProfileId" integer, CONSTRAINT "REL_14223cf3883f8f74019bf60ded" UNIQUE ("paymentId"), CONSTRAINT "FK_297fe28c8a370e0b55e0a161f40" FOREIGN KEY ("chauffeurProfileId") REFERENCES "chauffeur_profile" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_8c9e8ef7097d13aa1a005aa8a64" FOREIGN KEY ("customerProfileId") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_14223cf3883f8f74019bf60ded5" FOREIGN KEY ("paymentId") REFERENCES "payment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "booking"("id", "pickupAddress", "pickupCords", "dropoffAddress", "dropoffCords", "bookedForHours", "pricePerHour", "total", "status", "paymentMode", "history", "cretaedAt", "updatedAt", "paymentId", "customerProfileId", "chauffeurProfileId") SELECT "id", "pickupAddress", "pickupCords", "dropoffAddress", "dropoffCords", "bookedForHours", "pricePerHour", "total", "status", "paymentMode", "history", "createdAt", "updatedAt", "paymentId", "customerProfileId", "chauffeurProfileId" FROM "temporary_booking"`);
        await queryRunner.query(`DROP TABLE "temporary_booking"`);
    }

}
