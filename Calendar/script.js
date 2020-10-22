
let today = new Date();

let currentMonth = today.getMonth()+1;
let currentYear = today.getFullYear();
//오늘 년월
const todayYear = today.getFullYear();
const todayMonth =today.getMonth();
// let btnBackY = document.getElementById("btnBackY");
// let btnForwardY = document.getElementById("btnForwardY");
// let btnBackM = document.getElementById("btnBackM");
// let btnForwardM = document.getElementById("btnForwardM");

HTMLElement.prototype.css = function(object){
    const element = this.style;
    for(let k in object){
       element[k] = object[k];
    }
    return this;
 }

window.onload = function(){
    mkCalendar(currentYear, currentMonth);
}
function btnBackY(){
    currentYear-=1;
    mkCalendar(currentYear, currentMonth);
}
function btnForwardY(){
    currentYear+=1;
    mkCalendar(currentYear, currentMonth);
}
function btnBackM(){
    if(currentMonth == 1){
        currentMonth=12;
        currentYear-=1;
    }else if(currentMonth>1){
        currentMonth -=1;
    }
    mkCalendar(currentYear, currentMonth);
}
function btnForwardM(){
    if(currentMonth==12){
        currentMonth = 1;
        currentYear+=1;
    }else if(currentMonth<12){
        currentMonth+=1;
    } 

    mkCalendar(currentYear, currentMonth);
}

function itemDone() {
    let doneitem = this.parentNode;
    let pTag = document.getElementsByTagName('p');
    doneitem.css({color:"#bdbdbd"});
}
function itemDelete(){
    let delitem = this.parentNode;
    console.log(delitem);
    let numberofDel = delitem.innerText.split("\n")[0]-1;
    console.log(numberofDel);

    todolist.splice(numberofDel,1);  //배열에서 삭제
    todaylist.splice(numberofDel,1);  //배열에서 삭제
    
    delitem.css({display:"none"});
    k--;
}

let todolist = new Array();
let todaylist = new Array();
let k = 0;


function itemCreate(content, date){
    
    let list = document.createElement("div");
    let span = document.createElement("span");
    let item = document.createElement("p");
    let done = document.createElement("button");
    let del = document.createElement("button");
    // console.log(date);
    if (content != null && content != "") {

        console.log(date);
        
        todolist[k] = content; //할일
        todaylist[k] = date; //오늘날짜
        
        // console.log("선택 날짜 : "+todaylist[k]);
        
        span.textContent = k+1;
        item.textContent = todolist[k];
        del.textContent = "X";
        done.textContent = "O";
        
        document.getElementById("list").appendChild(list);
        list.appendChild(span);
        list.appendChild(item);
        
        list.appendChild(done).addEventListener("click",itemDone);
        list.appendChild(del).addEventListener("click",itemDelete);
        
        k++;
        document.getElementById("input").value = null;
        
    }
}

let clickDate = null;
let clickMonth = null;
let clickYear = null;
function modalOpen(){
    
    let modal = document.getElementById("todoModal");
    let modalSubmit = document.getElementById("modalSubmit");
    let modalClose = document.getElementById("modalClose");
    let content = document.getElementById("input");


    clickYear = document.getElementById("CalendarY").textContent;
    clickDate = this.textContent;
    clickMonth = document.getElementById("CalendarM").textContent;
    modalClose.addEventListener("click",function(){
        modal.css({display:"none"});
    })
    
    modalSubmit.addEventListener("click", function(){
        itemCreate(content.value , clickYear+clickMonth+clickDate );  
    });
    content.addEventListener("keydown",function(){
        if(event.which == 13)
           itemCreate(content.value , clickYear+clickMonth+clickDate );  
    })
    modal.css({display:"block"});
}

function keyboardClick(){
    if(event.which == 13){
        itemCreate(content.value , clickYear+clickMonth+clickDate);
    }
}


function mkCalendar(year, month){
    let firstDate = new Date(year,month-1,1);
    let lastDate = new Date(year,month,0);
    let plastDate = new Date(year,month-1,0);

    let tbCalendar = document.getElementById("Calendar");
    let CalendarY = document.getElementById("CalendarY");

    CalendarY.innerHTML = year;

    let Months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    
    CalendarM.innerHTML = Months[month-1];


    while (tbCalendar.rows.length >=2){
        tbCalendar.deleteRow(tbCalendar.rows.length-1);
    }

    let row = null;
    row = tbCalendar.insertRow(); //개행

    var cnt = 0; //날짜
    var not = 0; //저번 달
    //월 시작 공백을 채우는 부분
    for(i=0;i<firstDate.getDay();i++){
        cell = row.insertCell();
        cell.innerHTML=plastDate.getDate()-firstDate.getDay()+1+i;
        cnt +=1;
        not = cnt;
        cell.css({opacity:"0.7"});
        if(cnt %7 == 0) // 개행
            row = tbCalendar.insertRow();
    }
    //이번달
    for(i=1;i<=lastDate.getDate(); i++){

        cell = row.insertCell(); //cell 추가
        cell.innerHTML = i; //cell에 숫자(날짜) 추가
        cell.addEventListener("click", modalOpen);
        cnt +=1; //숫자(날짜) count+1

        //오늘 날짜에 .today 주어서 css추가
        if(year == todayYear && month == todayMonth+1){
            if(cnt-not == today.getDate()){
                cell.classList.add("today");
            }
        }

        if(cnt %7 == 0)// 개행
            row = tbCalendar.insertRow();
    }
    //cell을 7*6으로 만들어서 높이 고정
    for (i = cnt, j = 1; i < 42; i++,j++) { //j는 다음 달
        cell = row.insertCell();
        cell.innerHTML = j;
        cell.css({opacity:"0.7"});
        cnt += 1;
        if (cnt % 7 == 0)// 개행
            row = tbCalendar.insertRow();
    }   
}
