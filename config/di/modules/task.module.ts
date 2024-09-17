import { TaskRepository } from "@/domain/repositories/TaskRepository";
import { ContainerModule, interfaces } from "inversify";
import { DI_TYPES } from "../types";
import { AddTask } from "@/usecases/task/AddTask";
import { GetTasks } from "@/usecases/task/GetTasks";
import { RemoveTask } from "@/usecases/task/RemoveTask";
import { CompleteTask } from "@/usecases/task/CompleteTask";
import { SQLiteTaskRepository } from "@/data/repositories/SQLiteTaskRepository";

const initializeModule = (bind: interfaces.Bind) => {
  bind<TaskRepository>(DI_TYPES.TaskRepository).to(SQLiteTaskRepository);
  bind<AddTask>(DI_TYPES.AddTask).to(AddTask);
  bind<GetTasks>(DI_TYPES.GetTasks).to(GetTasks);
  bind<RemoveTask>(DI_TYPES.RemoveTask).to(RemoveTask);
  bind<CompleteTask>(DI_TYPES.CompleteTask).to(CompleteTask);
};

export const TaskModule = new ContainerModule(initializeModule);
