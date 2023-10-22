import Project from "./Project";
import Task from "./Task";
import TodoApp from "./TodoApp";

export default class Storage {
  static LOCAL_STORAGE_KEY = "todoApp";

  static save(todoApp: TodoApp) {
    localStorage.setItem(Storage.LOCAL_STORAGE_KEY, JSON.stringify(todoApp));
  }

  static getTodoApp(): TodoApp {
    const toDoApp = Object.assign(
      new TodoApp({ projects: [] }),
      JSON.parse(localStorage.getItem(Storage.LOCAL_STORAGE_KEY)!) as TodoApp,
    );

    toDoApp.setProjects(
      toDoApp.getProjects().map((project) => {
        return Object.assign(new Project({ name: "", tasks: [] }), project);
      }),
    );

    toDoApp
      .getProjects()
      .forEach((project) =>
        project.setTasks(
          project
            .getTasks()
            .map((task) => Object.assign(new Task({ name: "" }), task)),
        ),
      );

    return toDoApp;
  }

  static clear() {
    localStorage.removeItem(Storage.LOCAL_STORAGE_KEY);
  }

  static exists() {
    return localStorage.getItem(Storage.LOCAL_STORAGE_KEY) !== null;
  }

  static getProject(projectName: string) {
    return Storage.getTodoApp().getProject(projectName);
  }

  static addProject(project: Project) {
    const todoApp = Storage.getTodoApp();
    todoApp.addProject(project);
    Storage.save(todoApp);
  }

  static addProjectByName(projectName: string) {
    const todoApp = Storage.getTodoApp();
    todoApp.addProjectByName(projectName);
    Storage.save(todoApp);
  }

  static removeProject(project: Project) {
    const todoApp = Storage.getTodoApp();
    todoApp.removeProject(project);
    Storage.save(todoApp);
  }

  static removeProjectByName(projectName: string) {
    const todoApp = Storage.getTodoApp();
    todoApp.removeProjectByName(projectName);
    Storage.save(todoApp);
  }

  static getTask(projectName: string, taskName: string) {
    return Storage.getTodoApp()?.getProject(projectName)?.getTask(taskName);
  }

  static addTask(projectName: string, task: Task) {
    const todoApp = Storage.getTodoApp();
    todoApp.getProject(projectName)?.addTask(task);
    Storage.save(todoApp);
  }

  static removeTask(projectName: string, task: Task) {
    const todoApp = Storage.getTodoApp();
    todoApp.getProject(projectName)?.removeTask(task);
    Storage.save(todoApp);
  }

  static renameTask(projectName: string, task: Task, newName: string) {
    const todoApp = Storage.getTodoApp();
    todoApp.getProject(projectName)?.getTask(task.getName())?.setName(newName);
    Storage.save(todoApp);
  }

  static setTaskDescription(description: string, task: Task) {
    const todoApp = Storage.getTodoApp();
    todoApp
      .getProject(task.getName())
      ?.getTask(task.getName())
      ?.setDescription(description);
    Storage.save(todoApp);
  }

  static setTaskCompleted(completed: boolean, task: Task) {
    const todoApp = Storage.getTodoApp();
    todoApp
      .getProject(task.getName())
      ?.getTask(task.getName())
      ?.setCompleted(completed);
    Storage.save(todoApp);
  }

  static setTaskDueDate(dueDate: Date, task: Task) {
    const todoApp = Storage.getTodoApp();
    todoApp
      .getProject(task.getName())
      ?.getTask(task.getName())
      ?.setDueDate(dueDate);
    Storage.save(todoApp);
  }

  static setTaskPriority(
    priority: "no" | "low" | "medium" | "high",
    task: Task,
  ) {
    const todoApp = Storage.getTodoApp();
    todoApp
      .getProject(task.getName())
      ?.getTask(task.getName())
      ?.setPriority(priority);
    Storage.save(todoApp);
  }

  static renameProject(project: Project, newName: string) {
    const todoApp = Storage.getTodoApp();
    todoApp.getProject(project.getName())?.setName(newName);
    Storage.save(todoApp);
  }
}
