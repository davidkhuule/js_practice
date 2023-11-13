const addForm = document.querySelector(".add");
const tasksList = document.querySelector(".task-box .tasks");
const pendingTasks = document.querySelector(".message span");
const clearAllButton = document.querySelector(".clear");
const searchForm = document.querySelector(".search");
const searchClear = document.querySelector("i.bi.bi-x-circle");

let pendingTasksCount = tasksList.childElementCount;

const updatePendingTasks = () => {
  pendingTasksCount = tasksList.childElementCount;
  pendingTasks.textContent = `You have ${pendingTasksCount} Tasks`;
};

updatePendingTasks();

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = addForm.task.value.trim();

  if (value.length) {
    const taskItem = createTaskItem(value);
    tasksList.appendChild(taskItem);
    addForm.reset();
    updatePendingTasks();
  }
});

tasksList.addEventListener("click", (event) => {
  if (event.target.classList.contains("bi-trash3-fill")) {
    const taskItem = event.target.parentElement;
    taskItem.remove();
    updatePendingTasks();
  }
});

clearAllButton.addEventListener("click", () => {
  const tasks = document.querySelectorAll("li");

  tasks.forEach((task) => {
    task.remove();
  });
  updatePendingTasks();
});

searchForm.addEventListener("keyup", () => {
  const term = searchForm.task.value.trim().toLowerCase();
  filterTask(term);
});

searchForm.addEventListener("click", (event) => {
  if (event.target.classList.contains("reset")) {
    searchForm.reset();
    const term = searchForm.task.value.trim();

    filterTask(term);
  }
});

function createTaskItem(taskText) {
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    <span>${taskText}</span>
    <i class="bi bi-trash3-fill"></i>
  `;
  return taskItem;
}

function filterTask(term) {
  Array.from(tasksList.children)
    .filter((task) => {
      return !task.textContent.toLowerCase().includes(term);
    })
    .forEach((task) => {
      task.classList.add("hide");
    });

  Array.from(tasksList.children)
    .filter((task) => {
      return task.textContent.toLowerCase().includes(term);
    })
    .forEach((task) => {
      task.classList.remove("hide");
    });
}
