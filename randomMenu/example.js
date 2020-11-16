const menuList = ["부대찌개", "김치찌개", "제육볶음", "카레",
 "순두부찌개", "떡볶이", "샌드위치", "칼국수", "돈까스", "육쌈냉면"];

window.onload = function () {
    randMenu();
}

function randMenu() {
    const $menuText = document.getElementById("text");
    const i = Math.floor(Math.random()*9);
    $menuText.textContent = menuList[i];
}