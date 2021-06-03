$(document).on("turbolinks:load", function(){
    
  $('#cropModal').on('shown.bs.modal', function(){    
    let reader = new FileReader();
    reader.onload = function(event){
      $("#crop-img").attr('src', event.target.result);
    }
    reader.readAsDataURL($(".avatar-file-field")[0].files[0]);
  })

  $(".avatar-file-field").on('change', function(event){ 
    $(".edit-avatar").css('opacity','0.1');
    $(".edit-avatar-spinner").css('display','block');
    $(".show-avatar").css('opacity','0.1');
    $(".show-avatar-spinner").css('display','block');
    $(".navbar-avatar").css('opacity','0.1');
    $(".navbar-avatar-spinner").css('display','block');
    let cropModal = new bootstrap.Modal($('#cropModal'));
    cropModal.toggle();
  })

  $("#crop-img").on('load', function(){
    $('#crop-img').cropper({
      preview: ".crop-preview",
      dragMode: 'none',
      guides: true,
      isRotated: true,
      aspectRatio: 1 / 1,
      crop: function(event) {
      }
    })
  })
    
  $("#crop-button").click(function(event){
    $('#crop-img').cropper('getCroppedCanvas', undefined).toBlob(function(blob){
      let formData = new FormData();
      formData.append('avatar', blob);
      $.ajax({
        url: "/users/set_avatar/" + event.target.getAttribute("user_id"),
        type: 'POST',
        processData: false,
        contentType: false,
        data: formData,
        success: function(data){
          $(".edit-avatar").attr('src', data.avatar_url);
          $(".show-avatar").attr('src', data.avatar_url);
          $(".navbar-avatar").attr('src', data.avatar_url);
          flashOnAvatarChange("your avatar have been updated");
        }
      })
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

  $(".navbar-avatar").on('load', function(){
    $(".navbar-avatar").css('opacity','1');
    $(".navbar-avatar-spinner").css('display','none'); 
  })

  function flashOnAvatarChange(str){
    $(".flash-info").html(str).fadeOut(3000);
  }
})
