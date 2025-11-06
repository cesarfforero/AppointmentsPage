import { z } from "zod";

export const registerSchema = z.object({
  nombre: z.string().min(2),
  apellido: z.string().min(2),
  email: z.string().email(),
  birthday: z.coerce.date().optional().nullable(),
  nDni: z.number().int().positive(),
  username: z.string().min(4),
  password: z.string().min(8),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(8),
});
export type LoginInput = z.infer<typeof loginSchema>;
