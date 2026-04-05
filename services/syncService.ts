import { getPendingTodos, updateStatus } from "../repository/todoRepository";

export const syncTodos = async () => {
  const todos = await getPendingTodos();

  for (let todo of todos) {
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await updateStatus(todo.id, "synced");
    } catch (err) {
      console.log("Sync gagal:", err);
    }
  }
};
