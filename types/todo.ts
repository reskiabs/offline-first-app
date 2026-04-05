export type Todo = {
  id: string;
  title: string;
  status: "pending" | "synced";
  created_at: string;
};
