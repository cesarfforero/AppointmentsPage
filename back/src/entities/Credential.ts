import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne,
  CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { User } from "./User";

@Entity({ name: "credentials" })
export class Credential {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  username!: string;

  @Column({ type: "varchar" })
  password!: string; // argon2 hash

  @OneToOne(() => User, (u) => u.credential)
  user!: User;

  @CreateDateColumn({ name: "created_at" }) createdAt!: Date;
  @UpdateDateColumn({ name: "updated_at" }) updatedAt!: Date;
}
