
let today = new Date();

let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear();

//오늘 년월
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();

HTMLElement.prototype.css = function (object) {
    const element = this.style;
    for (let k in object) {
        element[k] = object[k];
    }
    return this;
}

window.onload = function () {
    mkCalendar(currentYear, currentMonth);
    
    inputTodo.onkeydown = function (event) {
        if (event.key == "Enter") {
            alert("날짜를 선택해 주세요.");
        }
    }
}

//edit
function editTodo() {
    let content = this.children[1].textContent;
    let contentDiv = this.children[1];
    inputTodo.value = content;

    inputTodo.onkeydown = function (event) {
        if (event.key == "Enter") {
            contentDiv.innerHTML = inputTodo.value;
            this.value="";
        }
    }
}

//todolist
let idx = 0;
let todo = {};
let item = [];

// let item = Array.from(Array(365), ()=> Array(20));
// console.log(item);
//create
function createTodo() {
    const inputTodo = document.getElementById("inputTodo");
    let selectedDate = this;
    let selectedTd = currentYear + currentMonth + selectedDate.textContent;
    const $list = document.getElementById("list");
    inputTodo.onkeydown = function (event) {
        if (event.key == "Enter") {
            if (inputTodo.value != null && inputTodo.value != "") {

                todo.data = item;

                item[idx] = new Object;
                item[idx].memo = inputTodo.value;
                item[idx].active = false;
                item[idx].date = selectedTd;

                // console.log(todo.data[idx].date);
                createItem(selectedDate);

                //item create
                // console.log(todo);
            } else {
                alert("내용을 입력해주세요");
            }
        }
    }
    for (let i = 0; i < idx; i++) {
        if (todo.data[i].date != selectedTd) {
            // console.log(i);
            // console.log($list.childNodes[i+1]);
            $list.childNodes[i + 1].css({ display: "none" });
            // div[i] 내용만 show ! => hide
        } else {
            // console.log($list.childNodes[i+1]);
            $list.childNodes[i + 1].css({ display: "flex" });
        }
    }

}

function createItem(selectedDate) {
    let todoItem = document.createElement("div");
    let itemText = document.createElement("p");
    let listDiv = document.getElementById("list");

    //객체 안에 배열에 value 넣음
    // todo[idx] = inputTodo.value;

    //itemText에 value 넣음
    itemText.textContent = inputTodo.value;
    //item 생성

    listDiv.appendChild(todoItem);
    todoItem.appendChild(document.createElement("div")).classList.add("circle");
    todoItem.appendChild(itemText);

    //todo가 있는 부분
    selectedDate.classList.add("hasTodo");
    //완료

    let circle = listDiv.children[idx].children[0];
    let active = item[idx];

    let itemList = listDiv.children;

    for(let i=0;i<=idx;i++){
        itemList[i].addEventListener("dblclick", editTodo);
    }

    circle.addEventListener("click", function () {
        circle.css({ backgroundColor: active ? "#8bcdcd" : "#DEDEDE" });
        active = !active;
        // console.log(active);
    });

    //complete
    inputTodo.value = "";

    idx++;
}





//delete
function deleteTodo() {
    alert("hi");
}



// 날짜 변경
function btnBackY() {
    currentYear -= 1;
    mkCalendar(currentYear, currentMonth);
}
function btnForwardY() {
    currentYear += 1;
    mkCalendar(currentYear, currentMonth);
}
function btnBackM() {
    if (currentMonth == 1) {
        currentMonth = 12;
        currentYear -= 1;
    } else if (currentMonth > 1) {
        currentMonth -= 1;
    }
    mkCalendar(currentYear, currentMonth);
}
function btnForwardM() {
    if (currentMonth == 12) {
        currentMonth = 1;
        currentYear += 1;
    } else if (currentMonth < 12) {
        currentMonth += 1;
    }

    mkCalendar(currentYear, currentMonth);
}

//캘린더 생성
var not = 0;
function mkCalendar(year, month) {
    let firstDate = new Date(year, month - 1, 1);
    let lastDate = new Date(year, month, 0);
    let plastDate = new Date(year, month - 1, 0);

    let tbCalendar = document.getElementById("Calendar");
    let CalendarY = document.getElementById("CalendarY");

    CalendarY.innerHTML = year;

    let Months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]

    CalendarM.innerHTML = Months[month - 1];

    while (tbCalendar.rows.length >= 2) {
        tbCalendar.deleteRow(tbCalendar.rows.length - 1);
    }

    let row = null;
    row = tbCalendar.insertRow(); //개행
    var cnt = 0; //날짜
    not = 0; //저번 달
    //월 시작 공백을 채우는 부분
    for (i = 0; i < firstDate.getDay(); i++) {
        cell = row.insertCell();
        cell.innerHTML = plastDate.getDate() - firstDate.getDay() + 1 + i;
        cnt += 1;
        not = cnt;
        cell.css({ opacity: "0.7" });
        if (cnt % 7 == 0) // 개행
            row = tbCalendar.insertRow();
    }
    //이번달
    for (i = 1; i <= lastDate.getDate(); i++) {

        cell = row.insertCell(); //cell 추가
        cell.innerHTML = i; //cell에 숫자(날짜) 추가
        cell.addEventListener("click", createTodo);
        cnt += 1; //숫자(날짜) count+1

        //오늘 날짜에 .today 주어서 css추가
        if (year == todayYear && month == todayMonth + 1) {
            if (cnt - not == today.getDate()) {
                cell.classList.add("today");
            }
        }

        if (cnt % 7 == 0)// 개행
            row = tbCalendar.insertRow();
    }
    //cell을 7*6으로 만들어서 높이 고정
    for (i = cnt, j = 1; i < 42; i++, j++) { //j는 다음 달
        cell = row.insertCell();
        cell.innerHTML = j;
        cell.css({ opacity: "0.7" });
        cnt += 1;
        if (cnt % 7 == 0)// 개행
            row = tbCalendar.insertRow();
    }
}

