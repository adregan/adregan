$( document ).ready(function() {

    $(".info-link").click(function(){
    if($(this).children(".ex-button").hasClass("rotate")) {
    $(this).children(".ex-button").removeClass("rotate").addClass("rotate-back");
    $(this).prev().slideUp('350');
    } else{
    $(this).children(".ex-button").addClass("rotate");
    $(this).prev().slideDown(350);
    }
  })

});