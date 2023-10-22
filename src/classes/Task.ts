type TaskObject = {
  name: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date;
  priority?: "no" | "low" | "medium" | "high";
};

export default class Task {
  name: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date;
  priority?: "no" | "low" | "medium" | "high";

  constructor(info: TaskObject) {
    console.log("Task constructor called");
    console.log(info);
    this.name = info.name;
    this.description = info.description;
    this.completed = info.completed;
    this.dueDate = info.dueDate;
    this.priority = info.priority;
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

  setCompleted(completed: boolean) {
    this.completed = completed;
  }

  getCompleted() {
    return this.completed;
  }

  setDueDate(dueDate: Date) {
    this.dueDate = dueDate;
  }

  getDueDate(): Date {
    if (this.dueDate) {
      return new Date(this.dueDate);
    }
    return new Date(0);
  }

  setPriority(priority: "no" | "low" | "medium" | "high") {
    this.priority = priority;
  }

  getPriority() {
    return this.priority;
  }
}
