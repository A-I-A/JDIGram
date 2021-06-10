$(document).on("turbolinks:load", function(){

  if($("#addPublicationModal").length){ //if addPublicationModal container exists on the page

    let publicationModal = new bootstrap.Modal($('#addPublicationModal'));
    
    let photosList = [];
    let imageIdCount = 0;

    $('#addPublicationModal').on('hide.bs.modal', function(){ 
      photosList = [];
      imageIdCount = 0;
      $(".pub-photo-list").html('');
    })

    $(".add_publication").click(function(){
      publicationModal.toggle();
    })

    $(".pub-avatar").on('load', function(){
      $(this).css('opacity','1');
      $(".pub-avatar-spinner").css('display','none'); 
    })

    $("#photo_input").on("input",function(e){
      for (let photo of e.target.files){
        let reader = new FileReader();  
        reader.onload = function(event){
          let photoContainer = createPhotoContainer(imageIdCount, event.target.result);
          photoContainer.appendTo($(".pub-photo-list"));
          photo.id = imageIdCount;
          photosList.push(photo);
          imageIdCount+=1;
        }
        reader.readAsDataURL(photo);
      }
    })

    function createPhotoContainer(containerId, imageSrc){
      let container = $('<div/>', {class: "pub-photo-container", id: containerId});
      let photo = $("<img>", {src: imageSrc, class: "pub-photo-preview"});
      let removePhotoButton = $('<div/>', {class: "remove-photo-button"});
      photo.appendTo(container);
      removePhotoButton.appendTo(container);

      removePhotoButton.click(function(event){
        let parent = $(event.target).parents()[0];
        let id = parent.getAttribute('id');
        let list = [];
        for (let photo of photosList){
          if (photo.id != id){
            list.push(photo);
          }
        }
        parent.remove();
        photosList = list; 
      })
      return container;
    }

    $("#addPublicationButton").click(function(event){
      let data = new FormData();
      for (photo of photosList){
        data.append('photo[]', photo);
      }
      data.append("description", $(".pub-description").val())
      $.ajax({
        url: "/users/add_publication/" + event.target.getAttribute('user_id'),
        type: "POST",
        data: data,
        processData: false,
        contentType: false,
        success: function(){
          publicationModal.toggle();
          Turbolinks.visit(window.location.toString(), { action: 'replace' });
        }
      })
    })
  }
})
