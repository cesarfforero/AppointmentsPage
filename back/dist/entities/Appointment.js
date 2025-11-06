"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Appointment = class Appointment {
};
exports.Appointment = Appointment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (u) => u.appointments, { nullable: false, onDelete: "CASCADE" }),
    (0, typeorm_1.Index)("idx_appointments_user_id"),
    __metadata("design:type", User_1.User)
], Appointment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz", name: "starts_at" }),
    (0, typeorm_1.Index)("idx_appointments_starts_at"),
    __metadata("design:type", Date)
], Appointment.prototype, "startsAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz", name: "ends_at" }),
    __metadata("design:type", Date)
], Appointment.prototype, "endsAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 16, default: "active" }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Appointment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Appointment.prototype, "updatedAt", void 0);
exports.Appointment = Appointment = __decorate([
    (0, typeorm_1.Entity)({ name: "appointments" })
], Appointment);
//# sourceMappingURL=Appointment.js.map