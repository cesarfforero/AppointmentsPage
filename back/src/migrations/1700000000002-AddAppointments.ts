import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAppointments1700000000002 implements MigrationInterface {
  name = "AddAppointments1700000000002";

  public async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE IF NOT EXISTS "appointments" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "userId" uuid NOT NULL,
        "starts_at" timestamptz NOT NULL,
        "ends_at" timestamptz NOT NULL,
        "status" varchar(16) NOT NULL DEFAULT 'active',
        "created_at" timestamptz DEFAULT now(),
        "updated_at" timestamptz DEFAULT now(),
        CONSTRAINT "fk_appointments_user" FOREIGN KEY ("userId")
          REFERENCES "users"("id") ON DELETE CASCADE
      );
    `);
    
    await q.query(`CREATE INDEX IF NOT EXISTS "idx_appointments_user_id" ON "appointments"("userId");`);
    await q.query(`CREATE INDEX IF NOT EXISTS "idx_appointments_starts_at" ON "appointments"("starts_at");`);

    await q.query(`CREATE EXTENSION IF NOT EXISTS btree_gist;`);
    await q.query(`
      CREATE INDEX IF NOT EXISTS "idx_appointments_timerange" ON "appointments"
      USING gist ( "userId", tstzrange("starts_at","ends_at") );
    `);
  }

  public async down(q: QueryRunner): Promise<void> {
    await q.query(`DROP INDEX IF EXISTS "idx_appointments_timerange";`);
    await q.query(`DROP INDEX IF EXISTS "idx_appointments_starts_at";`);
    await q.query(`DROP INDEX IF EXISTS "idx_appointments_user_id";`);
    await q.query(`DROP TABLE IF EXISTS "appointments";`);
  }
}
