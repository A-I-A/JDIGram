$(document).on("turbolinks:load", function(){

  let publicationPreview = $(".publication-preview");

  publicationPreview.height(publicationPreview.width());

  $(window).on("resize", function(){
   publicationPreview.height(publicationPreview.width());
  })
  
  if ($("#showPublicationModal").length){
    let showPublicationModal = new bootstrap.Modal($("#showPublicationModal"));
    let publicationPreview = $(".publication-preview");
    let photoContainer = $(".pub-show-photo");
    let nextPhotoButton = $(".pub-show-photo-next");
    let previousPhotoButton = $(".pub-show-photo-previous");
    let nextPhotoArrow = $(".pub-show-next-photo-arrow");
    let previousPhotoArrow = $(".pub-show-previous-photo-arrow");
    let photoIndexContainer = $(".pub-photo-index-container");
    let authorAvatar = $(".pub-show-avatar");
    let authorLogin = $(".pub-show-author-login");
    let publilcationDescription = $(".pub-show-description");

    $("#showPublicationModal").on('hide.bs.modal', function(){ 
      pubPhotoSlider.clear();
      removeAvatar(authorAvatar);
    })

    $("#showPublicationModal").on('shown.bs.modal', function(){ 
      photoContainer.height(photoContainer.width());
    })

    let pubPhotoSlider = new PhotoSlider(
      photoContainer, 
      nextPhotoButton, 
      previousPhotoButton, 
      photoIndexContainer
    );

    nextPhotoButton.click(function(){
      pubPhotoSlider.slideRight();
     })

    previousPhotoButton.click(function(){
      pubPhotoSlider.slideLeft();
    })

    nextPhotoButton.mouseenter(function(){
      nextPhotoArrow.css("visibility", "visible");
    })

    nextPhotoButton.mouseleave(function(){
      nextPhotoArrow.css("visibility", "hidden");
    })

    previousPhotoButton.mouseenter(function(){
      previousPhotoArrow.css("visibility", "visible");
    })

    previousPhotoButton.mouseleave(function(){
      previousPhotoArrow.css("visibility", "hidden");
    })
    
    publicationPreview.click(function(event){
      let pub_id = event.currentTarget.getAttribute("pub_id");
      getPublication(pub_id);
    })
    
    function getPublication(pub_id){
      $.ajax({
        url: `/publications/${pub_id}`,
        type: "GET",
        success: function(data){
          console.log(data);
          setAvatar(authorAvatar, data.author_credentials.avatar);
          authorLogin.html(data.author_credentials.login);
          publilcationDescription.html(data.description);
          pubPhotoSlider.clear();
          if (data.photos.length){
            pubPhotoSlider.load(data.photos); 
          } 
          showPublicationModal.toggle();
        }
      })      
    }
  }
})
