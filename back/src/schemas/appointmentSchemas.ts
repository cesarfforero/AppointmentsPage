import { z } from "zod";

export const scheduleSchema = z.object({
  userId: z.string().uuid(),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),
});
export type ScheduleInput = z.infer<typeof scheduleSchema>;

export const cancelSchema = z.object({
  id: z.string().uuid(),
});
