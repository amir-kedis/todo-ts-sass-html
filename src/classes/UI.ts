import "./../styles.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import Storage from "./Storage";
import Project from "./Project";
import Task from "./Task";
import TodoApp from "./TodoApp";
import { format } from "date-fns";

export default class UI {
  static init() {
    console.log("UI init called");
    Storage.clear();
    Storage.populateTodoAppWithDefaults();
    UI.initViewLists();
    UI.initProjects();
    console.log(Storage.getTodoApp());
    console.log(Storage.getTodayTasks());
  }

  static initViewLists() {
    const viewListsCountsELs = document.querySelectorAll(".view_item__count");
    enum ViewList {
      TODAY,
      TOMORROW,
      THIS_WEEK,
      ALL_TASKS,
    }

    viewListsCountsELs[ViewList.TODAY].textContent =
      Storage.getTodayTasks().length.toString();
    viewListsCountsELs[ViewList.TOMORROW].textContent =
      Storage.getTomorrowTask().length.toString();
    viewListsCountsELs[ViewList.THIS_WEEK].textContent =
      Storage.getThisWeekTasks().length.toString();
    viewListsCountsELs[ViewList.ALL_TASKS].textContent =
      Storage.getAllTasks().length.toString();
  }

  static initProjects() {
    const projectsEL = document.querySelector(".project_lists")!;
    const projects = Storage.getTodoApp().getProjects();

    projects.forEach((project) => {
      const projectContent = `
        <li class="project_item">
          <i class="project_item__icon fa-solid fa-inbox"></i>
          <span class="project_item__text">${project.getName()}</span>
          <span class="project_item__count">${project.getTasks().length}</span>
        </li>
`;
      projectsEL.innerHTML += projectContent;
    });
  }
}
