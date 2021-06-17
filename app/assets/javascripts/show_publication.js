$(document).on("turbolinks:load", function(){

  // this sets right dimensions of publication preview on user's page
  let publicationPreview = $(".user-publication-preview");
  publicationPreview.height(publicationPreview.width());

  $(window).on("resize", function(){
   publicationPreview.height(publicationPreview.width());
  })

  if ($("#showPublicationModal").length){
    let showPublicationModal = new bootstrap.Modal($("#showPublicationModal"));

    let photoContainer = $(".pub-show-photo");
    let pubDescription = $(".pub-show-description");
    let nextPublicationButton = $(".pub-show-publication-next");
    let prevPublicationButton = $(".pub-show-publication-previous");
    let nextPhotoButton = $(".pub-show-photo-next");
    let previousPhotoButton = $(".pub-show-photo-previous");
    let nextPhotoArrow = $(".pub-show-next-photo-arrow");
    let previousPhotoArrow = $(".pub-show-previous-photo-arrow");
    let photoIndexContainer = $(".pub-photo-index-container");

    let pubPhotoSlider = new PhotoSlider(
      photoContainer, 
      nextPhotoButton, 
      previousPhotoButton, 
      photoIndexContainer
    );

    $("#showPublicationModal").on('hide.bs.modal', function(){ 
      pubPhotoSlider.clear();
      pubSlider.clear();
    })

    $("#showPublicationModal").on('shown.bs.modal', function(){ 
      photoContainer.height(photoContainer.width());
    })

    $(window).on("resize", function(){
      photoContainer.height(photoContainer.width());
    })

    function getPublication(user_id, pub_id){
      $.ajax({
        url: `/users/${user_id}/get_publication/${pub_id}`,
        type: "GET",
        success: function(data){
          pubSlider.init(user_id, pub_id, data.next, data.previous);
          pubPhotoSlider.clear();
          pubDescription.html(data.description);
          if (data.photos.length){
            pubPhotoSlider.load(data.photos); 
          } 
        }
      })      
    }

    let pubSlider = {
      user_id: false,
      pub_id: false,
      next_id: false,
      previous_id: false,

      init: function(user_id, pub_id, next_id, previous_id){
        this.user_id = user_id;
        this.pub_id = pub_id;
        this.next_id = next_id;
        this.previous_id = previous_id;
        if (this.next_id)
          showNextPubButton();
        else 
          hideNextPubButton();

        if (this.previous_id)
          showPrevPubButton();
        else 
          hidePrevPubButton();
      },

      clear: function(){
        this.user_id = false;
        this.pub_id = false;
        this.next_id = false;
        this.previous_id = false;
      },

      getNextPub: function(){
        if (this.next_id){
          getPublication(this.user_id, this.next_id);
        }
      },

      getPrevPub: function(){
        if (this.previous_id){
          getPublication(this.user_id, this.previous_id);
        }     
      },
    }

    function showNextPubButton(){
      nextPublicationButton.css("display", "flex");
    }

    function showPrevPubButton(){
      prevPublicationButton.css("display", "flex");
    }

    function hideNextPubButton(){
      nextPublicationButton.hide();
    }

    function hidePrevPubButton(){
      prevPublicationButton.hide();
    }

    nextPublicationButton.click(function(e){
      pubSlider.getNextPub();
    })

    prevPublicationButton.click(function(){
      pubSlider.getPrevPub();
    })

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
      let user_id = event.target.getAttribute("user_id");
      let pub_id = event.target.getAttribute("pub_id");
      getPublication(user_id, pub_id);
      showPublicationModal.toggle();
    })
  }
})
