let i = 0;
let list = new Array();
//todolist
function CheckList(content){
    //same()을 이용한 중복처리
    if(list.some(text => text == content)== true)
        alert("같은 항목이 있습니다.");
    else
        ItemCreate(content);
    
    // console.log(list);
}
//ItemDone
function ItemDone(){
    this.style.textDecoration = "line-through";
    // console.log(this);
}

//itemdelete
function ItemDelete(){
    alert("삭제!");
    this.parentNode.style.display = "none";
    //span의 parentNode li 선택 => 걍 className = tt 해도 될듯
    let selected = this.parentNode.innerText;
    let selectedText = selected.substring(0,selected.length-2); //' x' 뺀 나머지 부분
    list.splice(list.indexOf(selectedText),1);  //배열에서 삭제
}
function Enter_Check(){
    if(event.which == 13){
        SubmitClick();
    }
    // alert("onkeydown handler: \n"
    //   + "keyCode property: " + evt.keyCode + "\n"
    //   + "which property: " + evt.which + "\n"
    //  );
}
//submitclick
function SubmitClick(){
    let content = document.getElementById("input");
    if(!content.value == null || !content.value==""){
        // console.log(content.value);
        CheckList(content.value);
        content.value = null;
    }else{
        alert("내용을 입력해주세요.");
    }
}
let k = 0;
//itemcreate
function ItemCreate(content){
    const li = document.createElement("li");
    const span = document.createElement("span");
    //create
    list[i] = content;
    li.textContent = list[i];
    span.textContent = " X";
    //className
    document.getElementById("todolist").append(li);
    li.classList.add('tt');
    let selectall= document.querySelectorAll('.tt');
    //span->click event
    let del = li.appendChild(span);
    del.addEventListener("click", ItemDelete);
    //array i++
    i++;
    //li -> click event
    if(selectall){
        for(i=0;i<selectall.length;i++){
            selectall[i].addEventListener("click", ItemDone);
        }
    }
}