"use strict";
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const logInBtn = document.querySelector(".log_in");
const signUpBtn = document.querySelector(".sign_up");
const container = document.querySelector(".container");
const submit = document.querySelectorAll(".submit");
const logInWindow = document.querySelector(".log_in-window");
const signUpWindow = document.querySelector(".sign_up-window");
const closeBtn = document.querySelectorAll(".closeBtn");
const nameInput = document.getElementById("Name");
const lastNameInput = document.getElementById("lastName");
const passwordInput = document.getElementById("password");
let listEl = [];
function addTask() {
  const list = document.createElement("li");
  list.textContent = taskInput.value;

  list.addEventListener("click", function () {
    list.classList.toggle("completed");
  });
  listEl.push(list.textContent);
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "√";
  deleteButton.classList.add("done");
  deleteButton.addEventListener("click", function () {
    list.remove();
  });

  list.appendChild(deleteButton);
  taskInput.value ? taskList.appendChild(list) : alert("Fill the input please");

  taskInput.value = "";
  setLocalStorage();
  getLocalStorage();
  json();
}
function setLocalStorage() {
  localStorage.setItem("list", JSON.stringify(listEl));
}
function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem("list")) || [];
  if (!data) return;
}
async function json() {
  const data = {
    task: listEl.slice(-1),
  };
  // const url = "";
  try {
    const main = await fetch("https://undrdsk0m.pythonanywhere.com/submit/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify(data),
    });
    if (!Response.ok) {
      throw new Error("Network response was not OK");
    }
    const result = await main.json();
    console.log(`Data Sent Successfully `, result);
  } catch (error) {
    console.error("Error Sending data", error);
  }
}
// To hundkle Cookie
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
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
