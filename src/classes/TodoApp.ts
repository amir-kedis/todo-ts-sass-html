import Project from "./Project";

type TodoAppObject = {
  projects: Project[];
};

export default class TodoApp {
  projects: Project[];

  constructor(info: TodoAppObject) {
    console.log("TodoApp constructor called");
    console.log(info);
    this.projects = info.projects;
    this.projects.push(new Project({ name: "Inbox", tasks: [] }));
  }

  setProjects(projects: Project[]) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectName: string) {
    return this.projects.find((project) => project.getName() === projectName);
  }

  getProjectByTaskName(taskName: string) {
    return this.projects.find((project) =>
      project.getTasks().some((task) => task.getName() === taskName),
    );
  }

  containsProject(project: Project) {
    return this.projects.includes(project);
  }

  containsProjectName(projectName: string) {
    return this.projects.some((project) => project.getName() === projectName);
  }

  addProject(project: Project) {
    if (this.containsProject(project)) {
      return;
    }
    this.projects.push(project);
  }

  addProjectByName(projectName: string) {
    if (this.containsProjectName(projectName)) {
      return;
    }
    this.projects.push(new Project({ name: projectName, tasks: [] }));
  }

  removeProject(project: Project) {
    this.projects.splice(this.projects.indexOf(project), 1);
  }

  removeProjectByName(projectName: string) {
    this.projects.splice(
      this.projects.findIndex((project) => project.getName() === projectName),
      1,
    );
  }

  sortProjects() {
    this.projects.sort((a, b) => a.getName().localeCompare(b.getName()));
  }

  getDueTodayTasks() {
    return this.projects.flatMap((project) => project.getTasksDueToday());
  }

  getDueThisWeekTasks() {
    return this.projects.flatMap((project) => project.getTasksDueThisWeek());
  }

  getAllTasks() {
    return this.projects.flatMap((project) => project.getTasks());
  }

  getTomorrowTasks() {
    return this.projects.flatMap((project) => project.getTasksDueTomorrow());
  }
}
