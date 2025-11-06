import { Router } from "express";
import {
  cancelAppointmentCtrl,
  getAppointmentCtrl,
  listAppointmentsCtrl,
  scheduleAppointmentCtrl
} from "../controllers/appointmentsController";
import { validate } from "../middlewares/validate";
import { cancelSchema, scheduleSchema } from "../schemas/appointmentSchemas";
import { requireAuth } from "../middlewares/auth";

export const appointmentsRouter = Router();

appointmentsRouter.get("/", requireAuth, listAppointmentsCtrl);
appointmentsRouter.get("/:id", requireAuth, getAppointmentCtrl);
appointmentsRouter.post("/schedule", requireAuth, validate(scheduleSchema), scheduleAppointmentCtrl);
appointmentsRouter.put("/cancel/:id", requireAuth, validate(cancelSchema, "params"), cancelAppointmentCtrl);
