$(document).on("turbolinks:load", function(){

  let publicationPreview = $(".publication-preview");

  publicationPreview.height(publicationPreview.width());

  $(window).on("resize", function(){
   publicationPreview.height(publicationPreview.width());
  })
  
  if ($("#showPublicationModal").length){
    let showPublicationModal = new bootstrap.Modal($("#showPublicationModal"));
    let publicationPreview = $(".publication-preview");
    let authorAvatar = $(".pub-show-avatar");
    let authorLogin = $(".pub-show-author-login");
    let publilcationDescription = $(".pub-show-description");

    $("#showPublicationModal").on('hide.bs.modal', function(){ 
      removeAvatar(authorAvatar);
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
          if (data.photos.length){
             photoSlider.load(data.photos);
          } 
          showPublicationModal.toggle();
        }
      })      
    }
  }
})
