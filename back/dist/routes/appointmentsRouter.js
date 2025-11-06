"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentsRouter = void 0;
const express_1 = require("express");
const appointmentsController_1 = require("../controllers/appointmentsController");
const validate_1 = require("../middlewares/validate");
const appointmentSchemas_1 = require("../schemas/appointmentSchemas");
const auth_1 = require("../middlewares/auth");
exports.appointmentsRouter = (0, express_1.Router)();
exports.appointmentsRouter.get("/", auth_1.requireAuth, appointmentsController_1.listAppointmentsCtrl);
exports.appointmentsRouter.get("/:id", auth_1.requireAuth, appointmentsController_1.getAppointmentCtrl);
exports.appointmentsRouter.post("/schedule", auth_1.requireAuth, (0, validate_1.validate)(appointmentSchemas_1.scheduleSchema), appointmentsController_1.scheduleAppointmentCtrl);
exports.appointmentsRouter.put("/cancel/:id", auth_1.requireAuth, (0, validate_1.validate)(appointmentSchemas_1.cancelSchema, "params"), appointmentsController_1.cancelAppointmentCtrl);
//# sourceMappingURL=appointmentsRouter.js.map