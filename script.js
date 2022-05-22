const inputBox = document.querySelector('.inputField input');
const addButton = document.querySelector('.inputField img');
const todolist = document.querySelector('.todolist');
let pending = document.querySelector(".pending");
const clearAll = document.querySelector('.clearAll');



inputBox.onkeyup = function () {
    let userdata = inputBox.value;
    if (userdata.trim() != 0) {
        addButton.classList.add('active');
    }
    else {
        addButton.classList.remove('active');
    }
}


//local storage

addButton.onclick = () => {
    let userdata = inputBox.value;
    let getlocalstorage = localStorage.getItem("new todo");
    if (getlocalstorage == null) { //if localstorage has nothing in it then
        listarr = []; //create new array
    }
    else {
        //if it has some data then get that data that comes in json format convert it into js object ajust to update the list array of todo things
        listarr = JSON.parse(getlocalstorage);
    }
    listarr.push(userdata); //adding new todo to list arr
    localStorage.setItem("new todo", JSON.stringify(listarr)); //adding updated list of todo in localstorage
    showlist();
}

function showlist() {
    let getlocalstorage = localStorage.getItem("new todo");
    if (getlocalstorage == null) { //if localstorage has nothing in it then
        listarr = []; //create new array
    } else {
        listarr = JSON.parse(getlocalstorage);
    }
    let new_li = '';

    listarr.forEach((element, index) => {
        new_li += ` <li class="todo_list_item" style="width: 80%;
        margin-left: 40px;
        margin-top: 20px;">${element}<img src="./images/trash_icon.png" alt="" srcset="" class="trash" onclick="deletetask(${index})"></li>`;

    });
    todolist.innerHTML = new_li;
    inputBox.value = "";

    // for showing remaining/pending  task 
    pending.textContent = listarr.length;

    if(listarr.length==0){
        clearAll.classList.remove('active');
    }else{
        clearAll.classList.add('active');
    }
}

//Delete the task Function
function deletetask(index) {
    let getlocalstorage = localStorage.getItem("new todo");
    listarr = JSON.parse(getlocalstorage);
    listarr.splice(index, 1);
    //update the local storage after deletion of task
    localStorage.setItem("new todo", JSON.stringify(listarr));
    showlist();
}



//clear All
clearAll.onclick = () => {
    listarr = []; //just assign empty to list array
    //update the local storage after deletion of task
    localStorage.setItem("new todo", JSON.stringify(listarr));
    showlist();

}