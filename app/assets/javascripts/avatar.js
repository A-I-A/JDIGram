$(document).on("turbolinks:load", function(){
  
  if ($('#cropModal').length){
    let cropModal = new bootstrap.Modal($('#cropModal'));

    $('#cropModal').on('hide.bs.modal', function(){ 
      $('#crop-img').cropper('destroy');
      $(".avatar-file-field").val(null);
    })

    $('#cropModal').on('shown.bs.modal', function(){  
      let reader = new FileReader();  
      reader.onload = function(event){
        $("#crop-img").attr('src', event.target.result);
      }
      reader.readAsDataURL($(".avatar-file-field")[0].files[0]);
    })

    $(".avatar-file-field").on('input', function(event){ 
      cropModal.toggle();
    })

    $("#crop-img").on('load', function(){
      $('#crop-img').cropper({
        viewMode: 1,
        movable: false,
        rotatable: false,
        zoomable: false,
        preview: ".crop-preview",
        dragMode: 'none',
        guides: false,
        aspectRatio: 1 / 1,
        crop: function(event) {
        }
      })
    })

    $("#crop-button").click(function(event){
      setAvatarSpinner($(".edit-avatar"), $(".edit-avatar-spinner"));
      setAvatarSpinner($(".show-avatar"), $(".show-avatar-spinner"));
      setAvatarSpinner($(".navbar-avatar"), $(".navbar-avatar-spinner"));

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
            cropModal.toggle();
            Turbolinks.visit(window.location.toString(), { action: 'replace' });
            flashOnAvatarChange("your avatar have been updated");
          }
        })
      })
    })
  }


  $(".edit-avatar").on('load', function(){
    disableAvatarSpinner($(this), $(".edit-avatar-spinner"));
  })

  $(".show-avatar").on('load', function(){
    disableAvatarSpinner($(this), $(".show-avatar-spinner"));
  })

  $(".navbar-avatar").on('load', function(){
    disableAvatarSpinner($(this), $(".navbar-avatar-spinner")); 
  })

  function flashOnAvatarChange(str){
    $(".flash-info").html(str).fadeOut(3000);
  }

  function setAvatarSpinner(avatar, spinner){
    avatar.css('opacity','0.1');
    spinner.css('display','block');
  }

  function disableAvatarSpinner(avatar, spinner){
    avatar.css('opacity','1');
    spinner.css('display','none');
  }

  $(".remove_avatar-button").click(function(event){
    $.ajax({
      url: "/users/remove_avatar/" + event.target.getAttribute("user_id"),
      type: 'DELETE',
      processData: false,
      contentType: false,
      success: function(){
      Turbolinks.visit(window.location.toString(), { action: 'replace' });
      }
    })
  })
})

