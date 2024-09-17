import * as SQLite from "expo-sqlite";
import { Task } from "@/domain/entities/Task";
import { TaskRepository } from "@/domain/repositories/TaskRepository";
import { injectable } from "inversify";

// Abre la conexión a la base de datos SQLite
const db = SQLite.openDatabaseSync("tasks.db");

@injectable()
export class SQLiteTaskRepository implements TaskRepository {
  constructor() {
    this.createTable();
  }

  // Crear la tabla si no existe
  private async createTable() {
    try {
      await db.execAsync(
        "CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY NOT NULL, title TEXT, completed INTEGER);"
      );
      console.log("Tasks table created successfully");
    } catch (error) {
      console.error("Error creating tasks table:", error);
    }
  }

  async addTask(task: Task): Promise<void> {
    try {
      db.runAsync(
        "INSERT INTO tasks (id, title, completed) VALUES (?, ?, ?);",
        [task.id, task.title, task.completed ? 1 : 0]
      );
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  async getTasks(): Promise<Task[]> {
    try {
      const result = await db.getAllAsync("SELECT * FROM tasks;");

      return result.map(
        (row: any) => new Task(row.id, row.title, row.completed === 1)
      );
    } catch (error) {
      console.error("Error getting tasks:", error);
      return [];
    }
  }

  async completeTask(id: string): Promise<void> {
    try {
      db.runAsync("UPDATE tasks SET completed = 1 WHERE id = ?;", [id]);
    } catch (error) {
      console.error("Error completed task:", error);
    }
  }

  async removeTask(id: string): Promise<void> {
    try {
      db.runAsync("DELETE FROM tasks WHERE id = ?;", [id]);
    } catch (error) {
      console.error("Error removing task:", error);
    }
  }
}
