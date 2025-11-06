import { MigrationInterface, QueryRunner } from "typeorm";

export class InitUsersCredentials1700000000001 implements MigrationInterface {
  name = "InitUsersCredentials1700000000001";

  public async up(q: QueryRunner): Promise<void> {
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

  public async down(q: QueryRunner): Promise<void> {
    await q.query(`DROP TABLE IF EXISTS "users";`);
    await q.query(`DROP TABLE IF EXISTS "credentials";`);
  }
}
