import { Task } from "../entities/Task";

export interface TaskRepository {
  addTask(task: Task): Promise<void>;
  getTasks(): Promise<Task[]>;
  completeTask(id: string): Promise<void>;
  removeTask(id: string): Promise<void>;
}
