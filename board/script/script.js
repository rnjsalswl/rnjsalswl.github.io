
$(window).load(function(){
    var $grid = $('.grid');
    $grid.masonry({
        itemSelector:'.grid-item'
    })
    
    /*로그인*/
    $("#modal-open").click(function(){
        $("#modal").attr("style","display:block");
       
    });
    $("#modal-close").click(function(){
        $("#modal").attr("style","display:none");
    });

    /*회원가입 */
    $("#modal-open2").click(function(){
        $("#modal2").attr("style","display:block");
       
    });
    $("#modal-close2").click(function(){
        $("#modal2").attr("style","display:none");
    });

    
});

