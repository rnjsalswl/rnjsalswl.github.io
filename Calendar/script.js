let today = new Date();
let currentMonth = today.getMonth()+1;
let currentYear = today.getFullYear();


const todayYear = today.getFullYear();
const todayMonth =today.getMonth();
// let btnBackY = document.getElementById("btnBackY");
// let btnForwardY = document.getElementById("btnForwardY");
// let btnBackM = document.getElementById("btnBackM");
// let btnForwardM = document.getElementById("btnForwardM");

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
    row = tbCalendar.insertRow();

    var cnt = 0;
    var not = 0;
    for(i=0;i<firstDate.getDay();i++){
        cell = row.insertCell();
        cell.innerHTML=plastDate.getDate()-firstDate.getDay()+1+i;
        cnt +=1;
        not = cnt;
        cell.style.opacity="0.7";
        if(cnt %7 ==1){
            cell.style.color="#F34054";
        }else if(cnt %7 == 0){
            cell.style.color="#4054F3";
            row = tbCalendar.insertRow();
        }
    }
    
    for(i=1;i<=lastDate.getDate(); i++){
        cell = row.insertCell();
        cell.innerHTML = i;
        cnt +=1;
        if(year == todayYear && month == todayMonth+1){
            if(cnt-not == today.getDate()){
                cell.style.fontWeight="bold";
                cell.style.backgroundColor="#EDEDED";
                cell.style.borderRadius="50%";
            }
        }
        
        if(cnt %7 ==1){
            cell.style.color="#F34054";
        }else if(cnt %7 == 0){
            cell.style.color="#4054F3";
            row = tbCalendar.insertRow();
        }
    }

    for (i = cnt, j = 1; i < 42; i++,j++) {
        cell = row.insertCell();
        cell.innerHTML = j;
        cell.style.opacity="0.7";
        cnt += 1;
        if (cnt % 7 == 1) {
            cell.style.color = "#F34054";
        } else if (cnt % 7 == 0) {
            cell.style.color = "#4054F3";
            row = tbCalendar.insertRow();

        }
    }   
}
