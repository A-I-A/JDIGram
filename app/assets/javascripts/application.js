// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require activestorage
//= require turbolinks
//= require_tree .

// document.ready  = addListener()
// 
// 
// function addListener() { 
// alert(123) 
//   var userMenuPopup = document.querySelector(".user-menu-popup");
//   var userMenu = document.querySelector(".user-menu");
// 
//   userMenu.addEventListener('click', 
//     function(){
//     console.log("it works")
//     userMenuPopup.style.display = "block";
//     console.log("it works")
//   })
// }
//document.onload = alert(123)
$(document).on("turbolinks:load", function(){
  console.log('123');
  $(".user-menu").click(function(e){
    e.stopPropagation();
    if ($(".user-menu-popup").css('display') === 'none')
      $(".user-menu-popup").css('display', 'block');
    else 
      $(".user-menu-popup").css('display', 'none');
  })

  $(document).click(function(){
    $(".user-menu-popup").css('display', 'none');
  })

})



