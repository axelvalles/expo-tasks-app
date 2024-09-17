import { InMemoryTaskRepository } from "@/data/repositories/InMemoryTaskRepository";
import { TaskRepository } from "@/domain/repositories/TaskRepository";
import { Container } from "inversify";
import { TaskModule } from "./modules/task.module";

// Crear el contenedor de dependencias
const container = new Container({
  defaultScope: "Singleton",
});

const initializeContainer = () => {
  container.load(TaskModule);
};

initializeContainer();

export const getInjection = <T>(symbol: symbol) => {
  return container.get<T>(symbol);
};

export { container };
