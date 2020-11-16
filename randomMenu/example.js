const menuList = ["배할머니", "왕돈까스&왕냉면", "엄마손칼국수", "홍콩반점",
 "편의점*^^*", "쌀국수", "투가리", "청년다방", "서브웨이",
  "육쌈냉면", "6000원 밥집", "육쌈옆 밥집"];

window.onload = function () {
    randMenu();
}

function randMenu() {
    const $menuText = document.getElementById("text");
    const i = Math.floor(Math.random()*menuList.length);
    $menuText.textContent = menuList[i];
}