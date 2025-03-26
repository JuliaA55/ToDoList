import { drizzleDb } from "./db";
import { sql } from "drizzle-orm";

interface Task {
    id: number;
    todo: string;
    completed: boolean;
  }

export async function getTasks(): Promise<Task[]> {
  const tasks = await drizzleDb.all<Task>(sql`SELECT * FROM tasks`);
  return tasks;
}

export async function addTask(todo: string) {
  await drizzleDb.run(sql`INSERT INTO tasks (todo, completed) VALUES (${todo}, 0)`);
}

export async function updateTaskStatus(id: number, completed: boolean) {
  await drizzleDb.run(sql`UPDATE tasks SET completed = ${completed ? 1 : 0} WHERE id = ${id}`);
}

export async function deleteTask(id: number) {
  await drizzleDb.run(sql`DELETE FROM tasks WHERE id = ${id}`);
}
