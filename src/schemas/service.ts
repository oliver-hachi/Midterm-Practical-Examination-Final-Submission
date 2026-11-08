import { z } from "zod";

export const serviceSchema = z
  .object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    hourly_rate: z.number().nonnegative("Hourly rate cannot be negative"),
    duration_minutes: z
      .number()
      .int("Duration must be a whole number")
      .min(15, "Duration must be at least 15 minutes"),
    coverage_radius_miles: z
      .number()
      .int("Coverage radius must be a whole number")
      .positive("Coverage radius must be greater than zero"),
  })
  .strict();

export type ServiceInput = z.infer<typeof serviceSchema>;
