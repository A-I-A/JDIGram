class PhotoSlider {
  photos = [];
  currentIndex = 0;

  constructor(photoContainer,buttonNext, buttonPrevious, photoIndexContainer){
    this.photoContainer = photoContainer;
    this.buttonNext = buttonNext;
    this.buttonPrevious = buttonPrevious;
    this.photoIndexContainer = photoIndexContainer
  }

  load(photos){
    this.photos = photos;
    this.currentIndex = 0;
    this.setPhoto(this.photos[this.currentIndex].photo_url);
    this.setPhotoIndexIndicator(this.currentIndex, this.photos.length);
    if (this.photos.length > 1){
      this.showButtonNext();
    }
  }

  clear(){
    this.removePhoto();
    this.hideButtonNext();
    this.hideButtonPrevious();
  }

  slideRight(){
    if (this.currentIndex < this.photos.length - 1){
      this.currentIndex++;
      this.setPhoto(this.photos[this.currentIndex].photo_url);
      this.setPhotoIndexIndicator(this.currentIndex, this.photos.length);
      this.showButtonPrevious();
    }
    if (this.currentIndex == this.photos.length - 1){
      this.hideButtonNext();
    }
  }

  slideLeft(){
    if (this.currentIndex > 0){
      this.currentIndex--;
      this.setPhoto(this.photos[this.currentIndex].photo_url);
      this.setPhotoIndexIndicator(this.currentIndex, this.photos.length);
      this.showButtonNext();
    }
    if (this.currentIndex == 0){
      this.hideButtonPrevious();
    }
  }
  setPhoto(photo_url){
      this.photoContainer.css("background", `url("${photo_url}") center no-repeat`);
      this.photoContainer.css("background-size", 'contain');
  }

  setPhotoIndexIndicator(currentIndex, numberOfPhotos){
    this.photoIndexContainer.html('');
    if (numberOfPhotos > 1){
      for (let i = 0; i < numberOfPhotos; i++){
        let indexIndicator = $('<div/>', {class: "pub-photo-index-indicator"});
          if (i == currentIndex)
            indexIndicator.addClass("bg-light")
          indexIndicator.appendTo(this.photoIndexContainer);
      }
    }
  }

  showButtonNext(){
    this.buttonNext.css("display", "flex");
  }

  showButtonPrevious(){
    this.buttonPrevious.css("display", "flex");
  }

  removePhoto(){
    this.photoContainer.css("background", "none");
  }

  hideButtonNext(){
    this.buttonNext.hide();
  }

  hideButtonPrevious(){
    this.buttonPrevious.hide();
  }
}
