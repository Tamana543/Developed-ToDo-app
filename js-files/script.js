const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const logInBtn = document.querySelector("log_in");
const signUpBtn = document.querySelector("sign_up");
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
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
