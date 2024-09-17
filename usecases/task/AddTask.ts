import { DI_TYPES } from "@/config/di/types";
import { Task } from "@/domain/entities/Task";
import { TaskRepository } from "@/domain/repositories/TaskRepository";
import { inject, injectable } from "inversify";

@injectable()
export class AddTask {
  constructor(
    @inject(DI_TYPES.TaskRepository) private _taskRepository: TaskRepository
  ) {}

  execute(title: string) {
    const newTask = new Task(new Date().toISOString(), title);
    return this._taskRepository.addTask(newTask);
  }
}
