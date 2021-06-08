$(document).on("turbolinks:load", function(){

  var publicationModal = new bootstrap.Modal($('#publicationModal'));

  let data = new FormData();

  $(".add_publication").click(function(){
    publicationModal.toggle();
  })

    $(".pub-avatar").on('load', function(){
    $(this).css('opacity','1');
    $(".pub-avatar-spinner").css('display','none'); 
  })

  $("#photo_input").on("input",function(e){
    for (let photo of e.target.files){
      console.log(photo);
      let reader = new FileReader();  
      reader.onload = function(event){
        $("<img>", {src: event.target.result, class: "pub-photo-preview"}).appendTo($(".photo-container"));
      }
      reader.readAsDataURL(photo);
      data.append('photo[]', photo);
    }
    console.log('DATA:', data);
  })

  $("#publicationButton").click(function(event){
    data.append("description", $(".pub-description").val())
    $.ajax({
      url: "/users/add_publication/" + event.target.getAttribute('user_id'),
      type: "POST",
      data: data,
      processData: false,
      contentType: false,
      success: function(){
        console.log("success!!!")
      }
    })
  })
})
