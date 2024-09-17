import { DI_TYPES } from "@/config/di/types";
import { TaskRepository } from "@/domain/repositories/TaskRepository";
import { inject, injectable } from "inversify";

@injectable()
export class RemoveTask {
  constructor(
    @inject(DI_TYPES.TaskRepository) private _taskRepository: TaskRepository
  ) {}

  execute(id: string) {
    return this._taskRepository.removeTask(id);
  }
}
