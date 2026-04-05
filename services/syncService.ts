import { getPendingTodos, updateStatus } from "@/repository/todoRepository";

export const syncTodos = async () => {
  const todos = await getPendingTodos();

  console.log("📦 Pending todos:", todos.length);

  for (let todo of todos) {
    try {
      console.log("🚀 Syncing:", todo.id);

      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await updateStatus(todo.id, "synced");

      console.log("✅ Synced:", todo.id);
    } catch (err) {
      console.log("❌ Sync gagal:", err);
    }
  }
};
