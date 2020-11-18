const menuList = ["배할머니", "왕돈까스&왕냉면", "엄마손칼국수", "홍콩반점",
 "편의점*^^*", "쌀국수", "투가리", "청년다방", "서브웨이",
  "육쌈냉면", "6000원 밥집", "육쌈옆 밥집"];

const noMenuList = ["배할머니", "왕돈까스&왕냉면", "엄마손칼국수", "투가리",
"서브웨이"];


window.onload = function () {
    let isNoMeat = false;

    const NoButton = document.getElementById("btnNo");
    const StartButton = document.getElementById("btnStart");

    NoButton.addEventListener('click', 
    function(){isNoMeat=true; randMenu(isNoMeat);});
    StartButton.addEventListener('click', 
    function(){isNoMeat=false; randMenu(isNoMeat);});
}
function randMenu(type) {
    const $menuText = document.getElementById("Text");
    if(type){
        const i = Math.floor(Math.random()*noMenuList.length);
        $menuText.textContent = noMenuList[i];
    }else{
        const i = Math.floor(Math.random()*menuList.length);
        $menuText.textContent = menuList[i];
    }
}