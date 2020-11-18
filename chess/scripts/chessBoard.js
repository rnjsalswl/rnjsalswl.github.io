HTMLElement.prototype.css = function (object) {
    const element = this.style;
    for (let k in object) {
        element[k] = object[k];
    }
    return this;
}
//pawn은 처음 움직일때만 2칸 가능 다음부턴 1칸씩만 이동

window.onload = function () {
    document.getElementById("btnStart").addEventListener("click", mkChessBoard, { once: true });
}

let lastPick, pickCell, frontCell, pieceName;
let count = 0;

function mvChessPiece(){
    pieceName = this.innerHTML.split('/')[2].split('.')[0];
    count++;
    if (pieceName === "pawn") {
        this.classList.add("now");
        pickCell = document.getElementsByClassName("now")[0].cellIndex;
        frontCell = this.parentNode.previousSibling.children[pickCell];
        // console.log(frontCell);
        frontCell.classList.add("now");
        if (count % 2 === 0) {
            frontCell.parentNode.previousSibling.children[pickCell].classList.add("now");
            // console.log(frontCell.parentNode.previousSibling.children[pickCell]);
            frontCell.parentNode.previousSibling.children[pickCell].addEventListener("click", dropPawn);
        } else {
            frontCell.parentNode.previousSibling.children[pickCell].classList.remove("now");
            frontCell.addEventListener("click", dropPawnOne);
        }
    }
}

function mvChessBPiece() {
    // let count = 0;
    pieceName = this.innerHTML.split('/')[2].split('.')[0];
    // console.log(pieceName, this);
    // const Enemy = "enemy";
    // const hasEnemy = false;
    // const clearEnemy = "now";
    count++;
    if (pieceName === "Bpawn") {
        this.classList.add("now");
        // console.log(document.getElementsByClassName(hasEnemy?clearEnemy:Enemy)[0].cellIndex);
        pickCell = document.getElementsByClassName("now")[0].cellIndex;
        frontCell = this.parentNode.nextSibling.children[pickCell];
        frontCell.classList.add("now");
        if (count % 2 === 0) {
            frontCell.parentNode.nextSibling.children[pickCell].classList.add("now");
            // console.log(frontCell.parentNode.nextSibling.children[pickCell]);
            frontCell.parentNode.nextSibling.children[pickCell].addEventListener("click", dropPawnOnce);
        } else {
            frontCell.parentNode.nextSibling.children[pickCell].classList.remove("now");
            frontCell.addEventListener("click", dropPawn);
        }
    }else if(pieceName === "Brook"){
        console.log("rook");
    }
}

function dropPawnOnce() {
    for (let i = 2; document.getElementsByClassName("now").length > 0; i--) {
        // console.log(document.getElementsByClassName("now")[i]);
        document.getElementsByClassName("now")[i].classList.remove("now");
        if (i == 2) {
            pickCell = document.getElementsByClassName("now")[0].cellIndex;
            // console.log();
            if (pieceName === "Bpawn") {
                this.parentNode.previousSibling.previousSibling.children[pickCell].innerHTML = "";
                this.innerHTML = "<img src='./images/Bpawn.png'>";
                this.addEventListener("click", mvChessBPiece);
            }
            else {
                this.parentNode.nextSibling.nextSibling.children[pickCell].innerHTML = "";
                this.innerHTML = "<img src='./images/pawn.png'>";
                this.addEventListener("click", mvChessPiece);
            }
        }
    }
}
function dropPawn(){
    for (let i = 1; document.getElementsByClassName("now").length > 0; i--) {
        // console.log(document.getElementsByClassName("now")[i]);
        document.getElementsByClassName("now")[i].classList.remove("now");
        if (i == 1) {
            pickCell = document.getElementsByClassName("now")[0].cellIndex;
            // console.log();
            if (pieceName === "Bpawn") {
                this.parentNode.previousSibling.children[pickCell].innerHTML = "";
                this.innerHTML = "<img src='./images/Bpawn.png'>";
                this.addEventListener("click", mvChessBPiece);
            }
            else {
                this.parentNode.nextSibling.children[pickCell].innerHTML = "";
                this.innerHTML = "<img src='./images/pawn.png'>";
                this.addEventListener("click", mvChessPiece);
            }
        }
    }
}
function mkChessBoard() {
    const tbChess = document.getElementById("tbChess");
    let row = null;
    row = tbChess.insertRow();
    var cnt = 0;
    for (i = 0; i < 64; i++) {
        cell = row.insertCell();
        document.getElementsByTagName("td")[cnt].css({ width: "50px", textAlign: "center", height: "50px" })
        if (cnt == 0 || cnt == 7 || cnt == 56 || cnt == 63) {
            if (cnt < 10)
                cell.innerHTML = "<img src='./images/Brook.png'>";
            else
                cell.innerHTML = "<img src='./images/rook.png'>";
        } else if (cnt == 1 || cnt == 6 || cnt == 57 || cnt == 62) {
            if (cnt < 10)
                cell.innerHTML = "<img src='./images/Bknight.png'>";
            else
                cell.innerHTML = "<img src='./images/knight.png'>";
        } else if (cnt == 2 || cnt == 5 || cnt == 58 || cnt == 61) {
            if (cnt < 10)
                cell.innerHTML = "<img src='./images/Bbishop.png'>";
            else
                cell.innerHTML = "<img src='./images/bishop.png'>";
        } else if (cnt == 3 || cnt == 59) {
            if (cnt < 10)
                cell.innerHTML = "<img src='./images/Bqueen.png'>";
            else
                cell.innerHTML = "<img src='./images/queen.png'>";
        } else if (cnt == 4 || cnt == 60) {
            if (cnt < 10)
                cell.innerHTML = "<img src='./images/Bking.png'>";
            else
                cell.innerHTML = "<img src='./images/king.png'>";
        } else if ((cnt >= 8 && cnt <= 15) || (cnt >= 48 && cnt <= 55)) {
            if (cnt < 20)
                cell.innerHTML = "<img src='./images/Bpawn.png'>";
            else
                cell.innerHTML = "<img src='./images/pawn.png'>";
        }
        cnt += 1;
        if (cnt % 8 == 0) {
            row = tbChess.insertRow();

        }
        if (cell.innerHTML != "" && cell.innerHTML.split('/')[2].split('.')[0][0] === "B") {
            cell.addEventListener("click", mvChessBPiece);
        }else if(cell.innerHTML != "" && cell.innerHTML.split('/')[2].split('.')[0][0] !== "B"){
            cell.addEventListener("click", mvChessPiece);
        }
    }
    // mkChessPiece();
}