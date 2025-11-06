"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAppointments1700000000002 = void 0;
class AddAppointments1700000000002 {
    constructor() {
        this.name = "AddAppointments1700000000002";
    }
    async up(q) {
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
    async down(q) {
        await q.query(`DROP INDEX IF EXISTS "idx_appointments_timerange";`);
        await q.query(`DROP INDEX IF EXISTS "idx_appointments_starts_at";`);
        await q.query(`DROP INDEX IF EXISTS "idx_appointments_user_id";`);
        await q.query(`DROP TABLE IF EXISTS "appointments";`);
    }
}
exports.AddAppointments1700000000002 = AddAppointments1700000000002;
//# sourceMappingURL=1700000000002-AddAppointments.js.map