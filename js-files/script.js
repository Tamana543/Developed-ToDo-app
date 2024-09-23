const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const logInBtn = document.querySelector(".log_in");
const signUpBtn = document.querySelector(".sign_up");
const container = document.querySelector(".container");
const submit = document.querySelector(".submit");
const logInWindow = document.querySelector(".log_in-window");
const signUpWindow = document.querySelector(".sign_up-window");
const closeBtn = document.querySelectorAll(".closeBtn");
function addTask() {
  const list = document.createElement("li");
  list.textContent = taskInput.value;

  list.addEventListener("click", function () {
    list.classList.toggle("completed");
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "√";
  deleteButton.classList.add("done");
  deleteButton.addEventListener("click", function () {
    list.remove();
  });

  // Append delete button to task item
  list.appendChild(deleteButton);

  // Append task item to task list
  taskList.appendChild(list);

  // Clear input field
  taskInput.value = "";
}
// Event Lesteners
logInBtn.addEventListener("click", () => {
  logInWindow.classList.remove("hide");
  container.style.display = "none";
});
signUpBtn.addEventListener("click", () => {
  signUpWindow.classList.remove("hide");
  container.style.display = "none";
});
closeBtn.forEach((ele) => {
  ele.addEventListener("click", () => {
    logInWindow.classList.add("hide");
    signUpWindow.classList.add("hide");
    container.style.display = "block";
  });
});
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
