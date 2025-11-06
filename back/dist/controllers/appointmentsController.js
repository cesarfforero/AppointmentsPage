"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAppointmentsCtrl = listAppointmentsCtrl;
exports.getAppointmentCtrl = getAppointmentCtrl;
exports.scheduleAppointmentCtrl = scheduleAppointmentCtrl;
exports.cancelAppointmentCtrl = cancelAppointmentCtrl;
const appointmentService_1 = require("../service/appointmentService");
async function listAppointmentsCtrl(_req, res) {
    const data = await (0, appointmentService_1.listAppointments)();
    res.json(data);
}
async function getAppointmentCtrl(req, res) {
    const { id } = req.params;
    const data = await (0, appointmentService_1.getAppointment)(id);
    res.json(data);
}
async function scheduleAppointmentCtrl(req, res) {
    const { userId, startsAt, endsAt } = req.body;
    const s = new Date(startsAt);
    const e = new Date(endsAt);
    const data = await (0, appointmentService_1.scheduleAppointment)(userId, s, e);
    res.status(201).json(data);
}
async function cancelAppointmentCtrl(req, res) {
    const { id } = req.params;
    const data = await (0, appointmentService_1.cancelAppointment)(id);
    res.json(data);
}
//# sourceMappingURL=appointmentsController.js.map