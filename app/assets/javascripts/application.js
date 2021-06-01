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
//= require activestorage
//= require turbolinks
//= require jquery
//= require rails-ujs
//= require_tree .


$(document).on("turbolinks:load", function(){
  
  $(".navbar-menu").click(function(){
    if ($(".navbar-popup").css('display') == 'none')
      $(".navbar-popup").css('display', 'block');
    else
      $(".navbar-popup").css('display', 'none');
  })

  $(".navbar-menu").on('blur', function(){
    setTimeout(()=>{$(".navbar-popup").css('display', 'none')},100); 
  })

  $(".avatar-file-field").on('change', function(event){ 
    let formData = new FormData();
    formData.append('avatar', event.target.files[0])
    $(".edit-avatar").css('opacity','0.1');
    $(".edit-avatar-spinner").css('display','block');
    $(".show-avatar").css('opacity','0.1');
    $(".show-avatar-spinner").css('display','block');
     $.ajax({
      url: "/users/set_avatar/" + event.target.getAttribute("user_id"),
      type: 'POST',
      processData: false,
      contentType: false,
      data: formData,
      success: function(data){
        $(".edit-avatar").attr('src', data.avatar_url);
        $(".show-avatar").attr('src', data.avatar_url);
        flashOnAvatarChange("your avatar have been updated");
      }
    })
  })

  $(".edit-avatar").on('load', function(){
    $(".edit-avatar").css('opacity','1');
    $(".edit-avatar-spinner").css('display','none');
  })

  $(".show-avatar").on('load', function(){
    $(".show-avatar").css('opacity','1');
    $(".show-avatar-spinner").css('display','none'); 
  })

  function flashOnAvatarChange(str){
    $(".flash-info").html(str).fadeOut(3000);
  }
})



  


