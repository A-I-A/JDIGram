$(document).on("turbolinks:load", function(){

  let publicationPreview = $(".publication-preview");

  publicationPreview.height(publicationPreview.width());

  $(window).on("resize", function(){
   publicationPreview.height(publicationPreview.width());
  })

})
