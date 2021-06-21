$(document).on("turbolinks:load", function(){

  if ($("#showPublicationModal").length){
   
    let photoContainer = $(".pub-show-photo");
    let nextPhotoButton = $(".pub-show-photo-next");
    let previousPhotoButton = $(".pub-show-photo-previous");
    let nextPhotoArrow = $(".pub-show-next-photo-arrow");
    let previousPhotoArrow = $(".pub-show-previous-photo-arrow");
    let photoIndexContainer = $(".pub-photo-index-container");

    photoSlider.init(
              photoContainer, 
              nextPhotoButton, 
              previousPhotoButton,
              nextPhotoArrow,
              previousPhotoArrow, 
              photoIndexContainer
            );

    $(window).on("resize", function(){
      photoSlider.setDimensions();
    })

    $("#showPublicationModal").on('shown.bs.modal', function(){ 
       photoSlider.setDimensions();
    })
  }
})

let photoSlider = {
  photos : [],
  currentIndex : 0,

  init: function(
    photoContainer, 
    buttonNext, 
    buttonPrevious,
    nextPhotoArrow, 
    previousPhotoArrow, 
    photoIndexContainer
    ){
    this.photoContainer = photoContainer;
    this.buttonNext = buttonNext;
    this.buttonPrevious = buttonPrevious;
    this.nextPhotoArrow = nextPhotoArrow;
    this.previousPhotoArrow = previousPhotoArrow;
    this.photoIndexContainer = photoIndexContainer;

    this.buttonNext.click(() => {this.slideRight();})
    this.buttonPrevious.click(() => {this.slideLeft();})
    this.buttonNext.mouseenter(()=>{
      this.nextPhotoArrow.css("visibility", "visible");
    })

    this.buttonNext.mouseleave(()=>{
      this.nextPhotoArrow.css("visibility", "hidden");
    })

    this.buttonPrevious.mouseenter(()=>{
      this.previousPhotoArrow.css("visibility", "visible");
    })

    this.buttonPrevious.mouseleave(()=>{
      this.previousPhotoArrow.css("visibility", "hidden");
    })
  },

  load: function(photos){
    this.photos = photos;
    this.currentIndex = 0;
    this.clear();
    this.setPhoto(this.photos[this.currentIndex].photo_url);
    this.setPhotoIndexIndicator(this.currentIndex, this.photos.length);
    if (this.photos.length > 1){
      this.showButtonNext();
    }
  },

  clear: function(){
    this.removePhoto();
    this.hideButtonNext();
    this.hideButtonPrevious();
  },

  slideRight: function(){
    if (this.currentIndex < this.photos.length - 1){
      this.currentIndex++;
      this.setPhoto(this.photos[this.currentIndex].photo_url);
      this.setPhotoIndexIndicator(this.currentIndex, this.photos.length);
      this.showButtonPrevious();
    }
    if (this.currentIndex == this.photos.length - 1){
      this.hideButtonNext();
    }
  },

  slideLeft: function(){
    if (this.currentIndex > 0){
      this.currentIndex--;
      this.setPhoto(this.photos[this.currentIndex].photo_url);
      this.setPhotoIndexIndicator(this.currentIndex, this.photos.length);
      this.showButtonNext();
    }
    if (this.currentIndex == 0){
      this.hideButtonPrevious();
    }
  },

  setPhoto: function(photo_url){
    this.photoContainer.css("background", `url("${photo_url}") center no-repeat`);
    this.photoContainer.css("background-size", 'contain');
  },

  setDimensions: function(){
    this.photoContainer.height(this.photoContainer.width());
  },

  setPhotoIndexIndicator: function(currentIndex, numberOfPhotos){
    this.photoIndexContainer.html('');
    if (numberOfPhotos > 1){
      for (let i = 0; i < numberOfPhotos; i++){
        let indexIndicator = $('<div/>', {class: "pub-photo-index-indicator"});
          if (i == currentIndex)
            indexIndicator.addClass("bg-light")
          indexIndicator.appendTo(this.photoIndexContainer);
      }
    }
  },

  showButtonNext: function(){
    this.buttonNext.css("display", "flex");
  },

  showButtonPrevious: function(){
    this.buttonPrevious.css("display", "flex");
  },

  removePhoto: function(){
    this.photoContainer.css("background", "none");
  },

  hideButtonNext: function(){
    this.buttonNext.hide();
  },

  hideButtonPrevious: function(){
    this.buttonPrevious.hide();
  },
}
