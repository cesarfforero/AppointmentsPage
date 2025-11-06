// src/service/appointmentService.ts
import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import { ConflictError, NotFoundError, ValidationError } from "../errors"; // <= errores tipados

const apptRepo = () => AppDataSource.getRepository(Appointment);

function ensureRange(
  startsAt: Date,
  endsAt: Date,
  minMinutes = 15,
  maxMinutes = 8 * 60
) {
  const s = startsAt.getTime();
  const e = endsAt.getTime();

  if (!(e > s)) {
    throw new ValidationError("`endsAt` debe ser mayor a `startsAt`");
  }

  const minutes = (e - s) / 60000;
  if (minutes < minMinutes) {
    throw new ValidationError(`Duración mínima: ${minMinutes}m`);
  }
  if (minutes > maxMinutes) {
    throw new ValidationError(`Duración máxima: ${maxMinutes}m`);
  }
}

export async function listAppointments() {
  return apptRepo().find({
    relations: { user: true },
    order: { startsAt: "DESC" },
  });
}

export async function getAppointment(id: string) {
  const appt = await apptRepo().findOne({
    where: { id },
    relations: { user: true },
  });
  if (!appt) throw new NotFoundError("Turno no encontrado");
  return appt;
}

export async function scheduleAppointment(
  userId: string,
  startsAt: Date,
  endsAt: Date
) {
  ensureRange(startsAt, endsAt);

  return AppDataSource.transaction(async (trx) => {
    // 1) Validar usuario
    const user = await trx.getRepository(User).findOne({ where: { id: userId } });
    if (!user) throw new NotFoundError("Usuario no existe");

    // 2) Chequear solapamiento por usuario (tstzrange && tstzrange)
    const overlap = await trx.query(
      `SELECT 1
         FROM appointments
        WHERE "userId" = $1
          AND tstzrange("starts_at","ends_at")
              && tstzrange($2::timestamptz, $3::timestamptz)
        LIMIT 1`,
      [userId, startsAt.toISOString(), endsAt.toISOString()]
    );

    if (overlap.length) {
      // => 409 CONFLICT (mapeado por el error handler)
      throw new ConflictError("Ya existe un turno en ese rango");
    }

    // 3) Crear turno
    const appt = trx.getRepository(Appointment).create({
      user,
      startsAt,
      endsAt,
      status: "active",
    });

    return trx.getRepository(Appointment).save(appt);
  });
}

export async function cancelAppointment(id: string) {
  const appt = await apptRepo().findOne({ where: { id } });
  if (!appt) throw new NotFoundError("Turno no encontrado");

  appt.status = "cancelled";
  return apptRepo().save(appt);
}

