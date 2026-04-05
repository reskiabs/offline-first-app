import { getPendingTodos, updateStatus } from "@/repository/todoRepository";
import { emit } from "../utils/eventBus";

export const syncTodos = async () => {
  const todos = await getPendingTodos();

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

  emit();
};
