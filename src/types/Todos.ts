import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  userId: z.number(),
  completed: z.boolean(),
});
export type Todo = z.infer<typeof TodoSchema>;

export const TodosSchema = z.array(TodoSchema);
export type Todos = z.infer<typeof TodosSchema>;

