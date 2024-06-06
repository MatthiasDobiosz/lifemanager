import { z } from "zod";

export const addTodoSchema = z.object({
  name: z
    .string()
    .min(1, { message: "The name must be at least 1 character long" }),
  description: z.string(),
});
