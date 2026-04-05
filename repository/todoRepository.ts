import { getDB } from "../db/database";

export const insertTodo = async (todo: any) => {
  const db = getDB();

  await db.runAsync(
    `INSERT INTO todos (id, title, status, created_at) VALUES (?, ?, ?, ?)`,
    [todo.id, todo.title, "pending", todo.created_at],
  );
};

export const getTodos = async () => {
  const db = getDB();

  const result = await db.getAllAsync(
    `SELECT * FROM todos ORDER BY created_at DESC`,
  );

  return result;
};

export const getPendingTodos = async () => {
  const db = getDB();

  return await db.getAllAsync(`SELECT * FROM todos WHERE status = 'pending'`);
};

export const updateStatus = async (id: string, status: string) => {
  const db = getDB();

  await db.runAsync(`UPDATE todos SET status = ? WHERE id = ?`, [status, id]);
};
