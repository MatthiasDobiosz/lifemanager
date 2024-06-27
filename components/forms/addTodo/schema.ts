import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const addTodoSchema = z.object({
  type: z.enum(["daily", "general"]),
  description: z
    .string()
    .min(1, { message: "The name must be at least 1 character long" }),
  startTime: z
    .string()
    .optional()
    .refine(
      (value) => {
        console.log(value);
        if (!value || value === "") {
          return true; // Allow empty string or null
        }
        return timeRegex.test(value);
      },
      {
        message: "Invalid time format. Expected HH:MM.",
      }
    ),
  endTime: z
    .string()
    .optional()
    .refine(
      (value) => {
        console.log(value);
        if (!value || value === "") {
          return true; // Allow empty string or null
        }
        return timeRegex.test(value);
      },
      {
        message: "Invalid time format. Expected HH:MM.",
      }
    ),
});
