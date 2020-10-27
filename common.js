const date = 20201027;

let todolist = {};

let content = document.querySelector('.password').value;
const btn = document.querySelector('.show');


function insertHandler() {
    if (content != null && content != "") {
        todolist[date] = {content}
        todolist[date] = todolist[date] || {};
    }
}

console.log(todolist);
btn.onclick = insertHandler();