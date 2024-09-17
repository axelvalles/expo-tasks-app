export const DI_TYPES = {
  // Services
  // Repositories
  TaskRepository: Symbol.for("TaskRepository"),
  // Use Cases
  AddTask: Symbol.for("AddTask"),
  GetTasks: Symbol.for("GetTasks"),
  RemoveTask: Symbol.for("RemoveTask"),
  CompleteTask: Symbol.for("CompleteTask"),
};
