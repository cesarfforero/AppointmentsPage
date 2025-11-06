"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAppointments = listAppointments;
exports.getAppointment = getAppointment;
exports.scheduleAppointment = scheduleAppointment;
exports.cancelAppointment = cancelAppointment;
const data_source_1 = require("../config/data-source");
const Appointment_1 = require("../entities/Appointment");
const User_1 = require("../entities/User");
const error_1 = require("../middlewares/error");
const apptRepo = () => data_source_1.AppDataSource.getRepository(Appointment_1.Appointment);
function ensureRange(startsAt, endsAt, minMinutes = 15, maxMinutes = 8 * 60) {
    const s = startsAt.getTime(), e = endsAt.getTime();
    if (!(e > s))
        throw new error_1.HttpError(400, "endsAt debe ser mayor a startsAt");
    const minutes = (e - s) / 60000;
    if (minutes < minMinutes)
        throw new error_1.HttpError(400, `Duración mínima: ${minMinutes}m`);
    if (minutes > maxMinutes)
        throw new error_1.HttpError(400, `Duración máxima: ${maxMinutes}m`);
}
async function listAppointments() {
    return apptRepo().find({ relations: { user: true }, order: { startsAt: "DESC" } });
}
async function getAppointment(id) {
    const a = await apptRepo().findOne({ where: { id }, relations: { user: true } });
    if (!a)
        throw new error_1.HttpError(404, "Turno no encontrado");
    return a;
}
async function scheduleAppointment(userId, startsAt, endsAt) {
    ensureRange(startsAt, endsAt);
    return data_source_1.AppDataSource.transaction(async (trx) => {
        const u = await trx.getRepository(User_1.User).findOne({ where: { id: userId } });
        if (!u)
            throw new error_1.HttpError(400, "Usuario no existe");
        // solape por usuario con tstzrange
        const overlap = await trx.query(`SELECT 1
       FROM appointments
       WHERE "userId" = $1
         AND tstzrange("starts_at","ends_at") && tstzrange($2::timestamptz, $3::timestamptz)
       LIMIT 1`, [userId, startsAt.toISOString(), endsAt.toISOString()]);
        if (overlap.length)
            throw new error_1.HttpError(409, "Ya existe un turno en ese rango");
        const appt = trx.getRepository(Appointment_1.Appointment).create({ user: u, startsAt, endsAt, status: "active" });
        return trx.getRepository(Appointment_1.Appointment).save(appt);
    });
}
async function cancelAppointment(id) {
    const a = await apptRepo().findOne({ where: { id } });
    if (!a)
        throw new error_1.HttpError(404, "Turno no encontrado");
    a.status = "cancelled";
    return apptRepo().save(a);
}
//# sourceMappingURL=appointmentService.js.map