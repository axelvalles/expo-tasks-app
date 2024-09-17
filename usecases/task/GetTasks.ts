import { DI_TYPES } from "@/config/di/types";
import { TaskRepository } from "@/domain/repositories/TaskRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetTasks {
  constructor(
    @inject(DI_TYPES.TaskRepository) private _taskRepository: TaskRepository
  ) {}

  async execute() {
    return this._taskRepository.getTasks();
  }
}
