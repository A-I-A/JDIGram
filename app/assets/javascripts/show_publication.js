$(document).on("turbolinks:load", function(){

  if ($("#showPublicationModal").length){
    let showPublicationModal = new bootstrap.Modal($("#showPublicationModal"));
    let rightSlider = $(".pub-show-slide-right");
    let leftSlider = $(".pub-show-slide-left");
    let rightArrow = $(".pub-show-right-arrow");
    let leftArrow = $(".pub-show-left-arrow");

    $("#showPublicationModal").on('hide.bs.modal', function(){ 
      pubPhotoSlider.clear();
    })

    let pubPhotoSlider = {
      photos: [],
      currentIndex: 0,

      init: function(photos){
        this.photos = photos;
        this.currentIndex = 0;
        setPhoto(this.photos[this.currentIndex].photo_url);
        if (this.photos.length > 2){
          showRightSlider();
        }
      },

      clear: function(){
        removePhoto();
        hideRightSlider();
        hideLeftSlider();
      },

      slideRight: function(){
        if (this.currentIndex < this.photos.length - 1){
          this.currentIndex++;
          setPhoto(this.photos[this.currentIndex].photo_url);
          showLeftSlider();
        }
        if (this.currentIndex == this.photos.length - 1){
          hideRightSlider();
        }
      },

      slideLeft: function(){
        if (this.currentIndex > 0){
          this.currentIndex--;
          setPhoto(this.photos[this.currentIndex].photo_url);
          showRightSlider();
        }
        if (this.currentIndex == 0){
          hideLeftSlider();
        }
      }
    };
    
    function hideRightSlider(){
      rightSlider.hide();
    }

    function hideLeftSlider(){
      leftSlider.hide();
    }

    function showRightSlider(){
      rightSlider.css("display", "flex");
    }

    function showLeftSlider(){
      leftSlider.css("display", "flex");
    }

    function setPhoto(photo_url){
      $(".pub-show-photo").css("background", `url("${photo_url}") center no-repeat`);
      $(".pub-show-photo").css("background-size", 'contain');
    }

    function removePhoto(){
      $(".pub-show-photo").css("background", "none");
    }

    rightSlider.click(function(){
      pubPhotoSlider.slideRight();
    })

    leftSlider.click(function(){
      pubPhotoSlider.slideLeft();
    })

    rightSlider.mouseenter(function(){
      rightArrow.css("visibility", "visible");
    })

    rightSlider.mouseleave(function(){
      rightArrow.css("visibility", "hidden");
    })

    leftSlider.mouseenter(function(){
      leftArrow.css("visibility", "visible");
    })

    leftSlider.mouseleave(function(){
      leftArrow.css("visibility", "hidden");
    })

    $(".user-publication-preview").click(function(event){
      let id = event.target.getAttribute("pub_id");
      $.ajax({
        url: "/users/get_publication/" + id,
        type: "GET",
        success: function(data){
          console.log(data);
          $(".pub-show-description").html(data.description);
          showPublicationModal.toggle();
          if (data.photos.length){
            pubPhotoSlider.init(data.photos); 
          } 
        }
      })      
    })
  }
})
