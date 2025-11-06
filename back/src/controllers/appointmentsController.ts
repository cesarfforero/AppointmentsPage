// src/controllers/appointmentsController.ts
import { Request, Response, NextFunction } from "express";
import {
  cancelAppointment,
  getAppointment,
  listAppointments,
  scheduleAppointment,
} from "../service/appointmentService";

type ScheduleBody = {
  userId: string;
  startsAt: string | Date;
  endsAt: string | Date;
};

export async function listAppointmentsCtrl(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await listAppointments();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getAppointmentCtrl(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = await getAppointment(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function scheduleAppointmentCtrl(
  req: Request<unknown, unknown, ScheduleBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, startsAt, endsAt } = req.body;
    const s = new Date(startsAt);
    const e = new Date(endsAt);
    const data = await scheduleAppointment(userId, s, e);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

export async function cancelAppointmentCtrl(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = await cancelAppointment(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

