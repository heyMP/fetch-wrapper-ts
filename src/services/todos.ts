import { fetchWrapper } from '../lib/fetchWrapper.ts';
import { Todos, Todo, TodosSchema, TodoSchema } from '../types/Todos.ts';

export type FetchResponse<T> = 
  | { data: T }
  | { error: Response | Error }

export async function getTodos(): Promise<FetchResponse<Todos>> {
  const response = await fetchWrapper(fetch('https://jsonplaceholder.typicode.com/todos'));
  if ('error' in response) {
    return { error: response.error }
  }
  const parse = TodosSchema.safeParse(await response.response.json());
  if (!parse.success) {
    return { error: parse.error }
  }
  return { data: parse.data }
}

export async function getTodo(id: Todo['id']): Promise<FetchResponse<Todo>> {
  const response = await fetchWrapper(fetch(`https://jsonplaceholder.typicode.com/todos/${id}`));
  if ('error' in response) {
    return { error: response.error }
  }
  const parse = TodoSchema.safeParse(await response.response.json());
  if (!parse.success) {
    return { error: parse.error }
  }
  return { data: parse.data }
}
