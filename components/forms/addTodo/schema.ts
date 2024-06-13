import { z } from "zod";

export const addTodoSchema = z.object({
  type: z.enum(["daily", "general"]),
  description: z
    .string()
    .min(1, { message: "The name must be at least 1 character long" }),
});
