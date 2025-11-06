"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitUsersCredentials1700000000001 = void 0;
class InitUsersCredentials1700000000001 {
    constructor() {
        this.name = "InitUsersCredentials1700000000001";
    }
    async up(q) {
        await q.query(`
      CREATE TABLE IF NOT EXISTS "credentials" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "username" varchar UNIQUE NOT NULL,
        "password" varchar NOT NULL,
        "created_at" timestamptz DEFAULT now(),
        "updated_at" timestamptz DEFAULT now()
      );
    `);
        await q.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" varchar NOT NULL,
        "email" varchar UNIQUE NOT NULL,
        "birthdate" date,
        "n_dni" integer UNIQUE NOT NULL,
        "credential_id" uuid UNIQUE,
        "created_at" timestamptz DEFAULT now(),
        "updated_at" timestamptz DEFAULT now(),
        CONSTRAINT "fk_user_credential" FOREIGN KEY ("credential_id")
          REFERENCES "credentials"("id") ON DELETE SET NULL
      );
    `);
    }
    async down(q) {
        await q.query(`DROP TABLE IF EXISTS "users";`);
        await q.query(`DROP TABLE IF EXISTS "credentials";`);
    }
}
exports.InitUsersCredentials1700000000001 = InitUsersCredentials1700000000001;
//# sourceMappingURL=1700000000001-InitUsersCredentials.js.map