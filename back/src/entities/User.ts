import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,
  CreateDateColumn, UpdateDateColumn, OneToMany
} from "typeorm";
import { Credential } from "./Credential";
import { Appointment } from "./Appointment";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "date", nullable: true })
  birthdate!: Date | null;

  @Column({ type: "integer", name: "n_dni", unique: true })
  nDni!: number;

  @OneToOne(() => Credential, (c) => c.user, { cascade: true, eager: true })
  @JoinColumn({ name: "credential_id" })
  credential!: Credential;

  @OneToMany(() => Appointment, (a) => a.user)
  appointments!: Appointment[];

  @CreateDateColumn({ name: "created_at" }) createdAt!: Date;
  @UpdateDateColumn({ name: "updated_at" }) updatedAt!: Date;
}
