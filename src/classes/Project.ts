import Task from "./Task";
import { isToday, isThisWeek, isTomorrow } from "date-fns";

type ProjectObject = {
  name: string;
  description?: string;
  tasks: Task[];
};

export default class Project {
  name: string;
  description?: string;
  tasks: Task[];

  constructor(info: ProjectObject) {
    console.log("Project constructor called");
    console.log(info);
    this.name = info.name;
    this.description = info.description;
    this.tasks = info.tasks;
  }

  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setDescription(description: string) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  containsTask(task: Task) {
    return this.tasks.includes(task);
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  removeTask(task: Task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  getTask(taskName: string) {
    return this.tasks.find((task) => task.getName() === taskName);
  }

  getTasksDueToday() {
    return this.tasks.filter((task) => {
      console.log(typeof task.getDueDate());
      console.log(isToday(task.getDueDate()));
      return isToday(task.getDueDate());
    });
  }

  getTasksDueThisWeek() {
    return this.tasks.filter((task) => isThisWeek(task.getDueDate()));
  }

  getTasksDueTomorrow() {
    return this.tasks.filter((task) => isTomorrow(task.getDueDate()));
  }
}
