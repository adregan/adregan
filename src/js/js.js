$( document ).ready(function() {
    $(".project img").click(function(){
      $(this).next().slideToggle( 200 );
    })
});