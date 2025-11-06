import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  CreateDateColumn, UpdateDateColumn, Index
} from "typeorm";
import { User } from "./User";

export type AppointmentStatus = "active" | "cancelled" | "completed";

@Entity({ name: "appointments" })
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (u) => u.appointments, { nullable: false, onDelete: "CASCADE" })
  @Index("idx_appointments_user_id")
  user!: User;

  @Column({ type: "timestamptz", name: "starts_at" })
  @Index("idx_appointments_starts_at")
  startsAt!: Date;

  @Column({ type: "timestamptz", name: "ends_at" })
  endsAt!: Date;

  @Column({ type: "varchar", length: 16, default: "active" })
  status!: AppointmentStatus;

  @CreateDateColumn({ name: "created_at" }) createdAt!: Date;
  @UpdateDateColumn({ name: "updated_at" }) updatedAt!: Date;
}
