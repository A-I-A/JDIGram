$(document).on("turbolinks:load", function(){

  // this sets right dimensions of publication preview on user's page
  let publicationPreview = $(".user-publication-preview");
  publicationPreview.height(publicationPreview.width());

  $(window).on("resize", function(){
   publicationPreview.height(publicationPreview.width());
  })

  if ($("#showPublicationModal").length){
    let showPublicationModal = new bootstrap.Modal($("#showPublicationModal"));

    let nextPublicationButton = $(".pub-show-publication-next");
    let prevPublicationButton = $(".pub-show-publication-previous");
    let authorAvatar = $(".pub-show-avatar");
    let authorLogin = $(".pub-show-author-login");
    let publilcationDescription = $(".pub-show-description");


    $("#showPublicationModal").on('hide.bs.modal', function(){ 
      pubSlider.clear();
    })

    function getPublication(user_id, pub_id){
      $.ajax({
        url: `/users/${user_id}/get_publication/${pub_id}`,
        type: "GET",
        success: function(data){
          pubSlider.init(user_id, pub_id, data.next, data.previous);
          setAvatar(authorAvatar, data.author_credentials.avatar);
          authorLogin.html(data.author_credentials.login);
          publilcationDescription.html(data.description);
          if (data.photos.length){
            photoSlider.load(data.photos); 
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

    publicationPreview.click(function(event){
      let user_id = event.target.getAttribute("user_id");
      let pub_id = event.target.getAttribute("pub_id");
      getPublication(user_id, pub_id);
      showPublicationModal.toggle();
    })
  }
})
