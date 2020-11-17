HTMLElement.prototype.css = function (object){
    const element = this.style;
    for(let k in object){
        element[k] = object[k];
    }
    return this;
}


window.onload = function() {
    document.getElementById("btnStart").addEventListener("click", mkChessBoard, {once:true});
    // mkChessBoard();
}
// function mkChessPiece(){
    
// }
function mkChessBoard(){
    const tbChess = document.getElementById("tbChess");
    let row = null;
    row = tbChess.insertRow();
    var cnt = 0;
    for(i=0;i<64;i++){
        cell = row.insertCell();
        document.getElementsByTagName("td")[cnt].css({width:"50px",textAlign:"center",height:"50px"})
        if(cnt == 0 || cnt == 7 || cnt == 56 || cnt == 63){
            cell.innerHTML = "rook";
        }else if(cnt == 1 || cnt == 6 || cnt == 57 || cnt == 62){
            cell.innerHTML = "knight"
        }else if(cnt == 2 || cnt == 5 || cnt == 58 || cnt == 61){
            cell.innerHTML = "bishop"
        }else if(cnt == 3 || cnt == 59){
            cell.innerHTML = "queen"
        }else if(cnt == 4 || cnt == 60){
            cell.innerHTML = "king"
        }else if((cnt>=8 && cnt <= 15) || (cnt >=48 &&cnt <= 55)){
            cell.innerHTML = "pawn"
        }
        cnt += 1;
        if(cnt % 8 == 0){
            row = tbChess.insertRow();
            
        }
    }
    // mkChessPiece();
}