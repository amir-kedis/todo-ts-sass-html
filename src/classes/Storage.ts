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

  static populateTodoAppWithDefaults() {
    if (Storage.exists()) {
      return;
    }

    const todoApp = new TodoApp({ projects: [] });
    todoApp.addProjectByName("Inbox");
    todoApp.addProjectByName("Programming");
    todoApp.addProjectByName("Life admin");
    todoApp.addProjectByName("College");

    todoApp.getProject("Programming")?.addTask(
      new Task({
        name: "Finish Todo App",
        description: "Finish the todo app project for The Odin Project",
        completed: false,
        dueDate: new Date(),
        priority: "high",
      }),
    );

    todoApp.getProject("Programming")?.addTask(
      new Task({
        name: "Finish Calculator",
        description: "Finish the calculator project for The Odin Project",
        completed: false,
        dueDate: new Date(),
        priority: "low",
      }),
    );

    todoApp.getProject("Life admin")?.addTask(
      new Task({
        name: "Pay bills",
        description: "Pay the bills for the month",
        completed: true,
        dueDate: new Date(2021, 10, 25),
        priority: "medium",
      }),
    );

    todoApp.getProject("Inbox")?.addTask(
      new Task({
        name: "Buy groceries",
        description: "Buy groceries for the week",
        completed: false,
        dueDate: new Date(2023, 10, 25),
      }),
    );

    todoApp.getProject("Inbox")?.addTask(
      new Task({
        name: "Change someones life",
        description: "Change someones life for the better",
        completed: false,
        dueDate: new Date(2023, 9, 23),
        priority: "high",
      }),
    );

    Storage.save(todoApp);
  }

  static getProject(projectName: string) {
    return Storage.getTodoApp().getProject(projectName);
  }

  static getProjectByTaskName(taskName: string) {
    return Storage.getTodoApp().getProjectByTaskName(taskName);
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

  static toggleTaskCompleted(taskName: string) {
    const todoApp = Storage.getTodoApp();
    const task = todoApp
      .getAllTasks()
      .find((task) => task.getName() === taskName);
    if (task) {
      task.setCompleted(!task.getCompleted());
    }
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

  static getTodayTasks() {
    return Storage.getTodoApp().getDueTodayTasks();
  }

  static getThisWeekTasks() {
    return Storage.getTodoApp().getDueThisWeekTasks();
  }

  static getTomorrowTask() {
    return Storage.getTodoApp()?.getTomorrowTasks();
  }

  static getAllTasks() {
    return Storage.getTodoApp().getAllTasks();
  }
}
