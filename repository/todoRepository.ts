import { getDB } from "../db/database";
import { Todo } from "../types/todo";

export const insertTodo = async (todo: Omit<Todo, "status">) => {
  const db = await getDB();

  await db.runAsync(
    `INSERT INTO todos (id, title, status, created_at) VALUES (?, ?, ?, ?)`,
    [todo.id, todo.title, "pending", todo.created_at],
  );
};

export const getTodos = async (): Promise<Todo[]> => {
  const db = await getDB();

  const result = await db.getAllAsync(
    `SELECT * FROM todos ORDER BY created_at DESC`,
  );

  return result as Todo[];
};

export const getPendingTodos = async (): Promise<Todo[]> => {
  const db = await getDB();

  const result = await db.getAllAsync(
    `SELECT * FROM todos WHERE status = 'pending'`,
  );

  return result as Todo[];
};

export const updateStatus = async (id: string, status: Todo["status"]) => {
  const db = await getDB();

  await db.runAsync(`UPDATE todos SET status = ? WHERE id = ?`, [status, id]);
};
