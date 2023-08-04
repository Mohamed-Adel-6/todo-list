let input = document.querySelector('.form .input');
let submit = document.querySelector('.form .add');
let taskDiv = document.querySelector('.tasks');
let btnRemoveAll = document.querySelector('.remove');
let arrayOfTasks = []

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  checkRemoveBtn() 
}
getDataFromLocal();
submit.onclick = function () {
  if (input.value !== "") {
    addTAskToArray(input.value);
    input.value = "";
  }
}

taskDiv.addEventListener("click", e => {
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    toggleStatusTAskWith(e.target.getAttribute("data-id"))
    e.target.classList.toggle("done")
  }
})

function addTAskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementToPAge(arrayOfTasks);
  addDataToLocal(arrayOfTasks);
}
function addElementToPAge(arrayOfTasks) {
  taskDiv.innerHTML = "";
  arrayOfTasks.forEach(task => {
    let div = document.createElement('div');
    div.className = "task";
    if (task.completed) {
      div.className="task done"
    }
    div.setAttribute("data-id", task.id);
    let divText = document.createTextNode(task.title);
    div.appendChild(divText);
    taskDiv.appendChild(div);
    let span = document.createElement('span');
    span.className = "del";
    span.appendChild(document.createTextNode("delete"));
    div.appendChild(span)
    checkRemoveBtn() 
  });
};
function addDataToLocal(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocal() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data)
    addElementToPAge(tasks)
  }
}
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocal(arrayOfTasks)
  checkRemoveBtn() 
}

function toggleStatusTAskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++){
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : (arrayOfTasks[i] = false);
    }
  }
  addDataToLocal(arrayOfTasks);
}
checkRemoveBtn() 
function checkRemoveBtn() {
  if (arrayOfTasks.length > 0) {
  btnRemoveAll.style.display = 'block';
} else { btnRemoveAll.style.display = 'none'; }
}
  btnRemoveAll.addEventListener('click', function () {
  let container = document.createElement('div');
  container.classList.add('popup-container');
  let overLay = document.createElement('div');
  overLay.classList.add('over-lay')
  let pra = document.createElement('p');
  pra.appendChild(document.createTextNode('Do you want to delete all tasks ?'));
  let allBtn = document.createElement('div');
  allBtn.className = "all-btn";
  let yes = document.createElement('button');
  yes.className='yes'
  yes.appendChild(document.createTextNode('yes'))
  let no = document.createElement('button');
  no.className='no'
  no.appendChild(document.createTextNode('no'))
  allBtn.appendChild(yes);
  allBtn.appendChild(no);
  container.appendChild(pra);
  container.appendChild(allBtn);
  document.body.appendChild(overLay);
  document.body.appendChild(container);
    yes.onclick = function () {
      taskDiv.innerHTML = "";
      localStorage.clear();
      container.remove();
      overLay.remove();
      window.location.reload();
    }
    no.onclick = function () {
      container.remove();
      overLay.remove();
    }
})