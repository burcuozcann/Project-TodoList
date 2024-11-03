
const form=document.querySelector('#todoAddForm');

const addInput=document.querySelector('#todoName');

const todoList=document.querySelector('.list-group');

const firstCardBody=document.querySelectorAll('.card-body')[0];

const secondCardBody=document.querySelectorAll('.card-body')[1];

const clearButton=document.querySelector('#clearButton');

const filterInput=document.querySelector('#todoSearch');

let todos=[];



runEvent();
function runEvent(){
    form.addEventListener('submit',addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",deleteAllTodos);
    filterInput.addEventListener("keyup",filter);
}



function deleteAllTodos(){
    const allTodoList=document.querySelectorAll(".list-group-item");
    if (allTodoList.length>0) {
        allTodoList.forEach(function(todo){
            todo.remove();
        });
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success","Todo List has successfully deleted!");
    }else{
        showAlert("warning","List is Empty");
    }
    console.log(allTodoList);
}
function filter(e){
    const filterValue=e.target.value.toLowerCase().trim();
    const todoLists=document.querySelectorAll(".list-group-item");

    if (todoLists.length>0) {
        todoLists.forEach(function(todo){
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style","display : block");
            }else{
                todo.setAttribute("style","display : none !important");
            }
        })
    }else{
        showAlert("warning","List is Empty");
    }
}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function removeTodoToUI(e){
    if (e.target.className==="fa fa-remove") {
        const todo=e.target.parentElement.parentElement;
        todo.remove();


        removeTodoToStorage(todo.textContent);

        showAlert("success","Successfully,removed.");
    }
}

function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if (removeTodo===todo) {
            todos.splice(index,1)
        }

    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodo(e){
    
    const inputText=addInput.value.trim();
    if (inputText==null || inputText==''){
        showAlert("danger","Empty!!!");
    }else{
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success","Todo Added");
    }
  
    e.preventDefault();
}


function addTodoToUI(newTodo){
    const li=document.createElement("li");
    li.className="list-group-item d-flex justify-content-between";
    li.textContent=newTodo;

    const a=document.createElement("a");
    a.href="#";
    a.className="delete-item";


    const i=document.createElement("i");
    i.className="fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);
    addInput.value="";



}

function addTodoToStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodosFromStorage(){
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
}


function showAlert(type,message){

    const div=document.createElement("div");
    div.className="alert alert-"+type;
    div.textContent=message;

    firstCardBody.appendChild(div);

    setTimeout(function(){
    div.remove();
    },2500)
}