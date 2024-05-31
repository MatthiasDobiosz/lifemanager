import { z } from "zod";

export const addTodoSchema = z.object({
  name: z.string().min(1),
});
