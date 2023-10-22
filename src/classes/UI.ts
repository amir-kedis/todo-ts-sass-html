import "./../styles.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import Storage from "./Storage";
import Task from "./Task";
import { format } from "date-fns";
enum ViewList {
  TODAY,
  TOMORROW,
  THIS_WEEK,
  ALL_TASKS,
}
export default class UI {
  static init() {
    console.log("UI init called");
    Storage.populateTodoAppWithDefaults();
    UI.initViewLists();
    UI.initProjects();
    UI.loadTodayTasks();
    UI.initEventListeners();
    UI.addTasksEventListener();
    console.log(Storage.getTodoApp());
  }

  static initEventListeners() {
    const viewListsELs = document.querySelectorAll(".view_item");
    const projectsListsEls = document.querySelectorAll(".project_item");
    const addTaskBtnEl = document.querySelector(".add_task_box__button")!;

    viewListsELs[ViewList.TODAY].addEventListener("click", () => {
      UI.loadTodayTasks();
      UI.addTasksEventListener();
    });

    viewListsELs[ViewList.TOMORROW].addEventListener("click", () => {
      UI.loadTomorrowTasks();
      UI.addTasksEventListener();
    });

    viewListsELs[ViewList.THIS_WEEK].addEventListener("click", () => {
      UI.loadThisWeekTasks();
      UI.addTasksEventListener();
    });

    viewListsELs[ViewList.ALL_TASKS].addEventListener("click", () => {
      UI.loadAllTasks();
      UI.addTasksEventListener();
    });

    projectsListsEls.forEach((projectEl) => {
      projectEl.addEventListener("click", () => {
        UI.loadProjectTasks(
          projectEl.querySelector(".project_item__text")!.textContent!,
        );
        UI.addTasksEventListener();
      });
    });

    addTaskBtnEl.addEventListener("click", () => {
      UI.addTask();
    });
  }

  static addTask() {
    const taskNameEl = document.querySelector(
      ".add_task_box__input",
    )! as HTMLInputElement;
    const taskName = taskNameEl.value;
    const curView = document.querySelector(".task_list__header__title")!;

    Storage.addTask(
      "Inbox",
      new Task({
        name: taskName,
        description: "",
        completed: false,
        dueDate: new Date(),
        priority: "no",
      }),
    );

    if (curView.textContent === "Today") {
      UI.loadTodayTasks();
    }
    if (curView.textContent === "Tomorrow") {
      UI.loadTomorrowTasks();
    }
    if (curView.textContent === "This Week") {
      UI.loadThisWeekTasks();
    }
    if (curView.textContent === "All Tasks") {
      UI.loadAllTasks();
    }

    taskNameEl.value = "";

    UI.addTasksEventListener();
  }

  static initViewLists() {
    const viewListsCountsELs = document.querySelectorAll(".view_item__count");

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

  static loadTodayTasks() {
    const tasksEL = document.querySelector(".task_list__items")!;
    const tasksHeaderEl = document.querySelector(".task_list__header__title")!;
    const tasks = Storage.getTodayTasks();

    tasksHeaderEl.textContent = "Today";
    tasksEL.innerHTML = "";
    tasks.forEach((task) => {
      const taskContent = `
            <li class="task_list__item">
              <div class="task_list__item__checkbox">
                <input type="checkbox" class="task_list__item__checkbox__input prior_${task.getPriority()}" ${task.getCompleted() == true ? "checked" : ""
        } />
              </div>
              <div class="task_list__item__text">${task.getName()}</div>
              <div class="task_list__item__date">${format(
          task.getDueDate(),
          "dd/MMM",
        )}</div>
              <div class="task_list__item__project">${Storage.getProjectByTaskName(
          task.getName(),
        )?.getName()}</div>
            </li>
 
`;
      tasksEL.innerHTML += taskContent;
    });
  }

  static loadTomorrowTasks() {
    const tasksEL = document.querySelector(".task_list__items")!;
    const tasksHeaderEl = document.querySelector(".task_list__header__title")!;
    const tasks = Storage.getTomorrowTask();

    tasksHeaderEl.textContent = "Tomorrow";
    tasksEL.innerHTML = "";
    tasks.forEach((task) => {
      const taskContent = `
            <li class="task_list__item">
              <div class="task_list__item__checkbox">
                <input type="checkbox" class="task_list__item__checkbox__input prior_${task.getPriority()}" ${task.getCompleted() == true ? "checked" : ""
        } />
              </div>
              <div class="task_list__item__text">${task.getName()}</div>
              <div class="task_list__item__date">${format(
          task.getDueDate(),
          "dd/MMM",
        )}</div>
              <div class="task_list__item__project">${Storage.getProjectByTaskName(
          task.getName(),
        )?.getName()}</div>
            </li>

`;
      tasksEL.innerHTML += taskContent;
    });
  }

  static loadThisWeekTasks() {
    const tasksEL = document.querySelector(".task_list__items")!;
    const tasksHeaderEl = document.querySelector(".task_list__header__title")!;
    const tasks = Storage.getThisWeekTasks();

    tasksHeaderEl.textContent = "This Week";
    tasksEL.innerHTML = "";
    tasks.forEach((task) => {
      const taskContent = `
            <li class="task_list__item">
              <div class="task_list__item__checkbox">
                <input type="checkbox" class="task_list__item__checkbox__input prior_${task.getPriority()}" ${task.getCompleted() == true ? "checked" : ""
        } />
              </div>
              <div class="task_list__item__text">${task.getName()}</div>
              <div class="task_list__item__date">${format(
          task.getDueDate(),
          "dd/MMM",
        )}</div>
              <div class="task_list__item__project">${Storage.getProjectByTaskName(
          task.getName(),
        )?.getName()}</div>
            </li>

`;
      tasksEL.innerHTML += taskContent;
    });
  }

  static loadAllTasks() {
    const tasksEL = document.querySelector(".task_list__items")!;
    const tasksHeaderEl = document.querySelector(".task_list__header__title")!;
    const tasks = Storage.getAllTasks();

    tasksHeaderEl.textContent = "All Tasks";
    tasksEL.innerHTML = "";
    tasks.forEach((task) => {
      const taskContent = `
            <li class="task_list__item">
              <div class="task_list__item__checkbox">
                <input type="checkbox" class="task_list__item__checkbox__input prior_${task.getPriority()}" ${task.getCompleted() == true ? "checked" : ""
        } />

</div> <div class="task_list__item__text">${task.getName()}</div> <div class="task_list__item__date">${format(
          task.getDueDate(),
          "dd/MMM",
        )}</div> <div class="task_list__item__project">${Storage.getProjectByTaskName(
          task.getName(),
        )?.getName()}</div>
            </li>

`;
      tasksEL.innerHTML += taskContent;
    });
  }

  static loadProjectTasks(projectName: string) {
    const tasksEL = document.querySelector(".task_list__items")!;
    const tasksHeaderEl = document.querySelector(".task_list__header__title")!;
    const tasks = Storage.getProject(projectName)?.getTasks();

    tasksHeaderEl.textContent = projectName;
    tasksEL.innerHTML = "";
    tasks?.forEach((task) => {
      const taskContent = `
            <li class="task_list__item">
              <div class="task_list__item__checkbox">
                <input type="checkbox" class="task_list__item__checkbox__input prior_${task.getPriority()}" />
              </div>
              <div class="task_list__item__text">${task.getName()}</div>
              <div class="task_list__item__date">${format(
        task.getDueDate(),
        "dd/MMM",
      )}</div>
              <div class="task_list__item__project">${Storage.getProjectByTaskName(
        task.getName(),
      )?.getName()}</div>
            </li>

`;
      tasksEL.innerHTML += taskContent;
    });
  }

  static addTasksEventListener() {
    const taskItemEls = document.querySelectorAll(".task_list__item");

    taskItemEls.forEach((taskItemEl) => {
      taskItemEl.addEventListener("click", (e) => {
        const clicked = e.target as HTMLElement;

        const taskName = clicked
          .closest(".task_list__item__checkbox__input")
          ?.parentElement?.parentElement?.querySelector(
            ".task_list__item__text",
          )?.textContent;

        Storage.toggleTaskCompleted(taskName!);
      });
    });
  }
}
