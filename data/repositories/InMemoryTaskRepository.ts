import { Task } from "@/domain/entities/Task";
import { TaskRepository } from "@/domain/repositories/TaskRepository";
import { injectable } from "inversify";

@injectable()
export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  async addTask(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  async getTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async completeTask(id: string): Promise<void> {
    const task = this.tasks.find((t) => t.id === id);
    if (task) task.completed = true;
  }

  async removeTask(id: string): Promise<void> {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
