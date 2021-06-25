$(document).on("turbolinks:load", function() {
   let publicationPreview = $(".publication-preview");
   let userPublicationPreview = $(".user-publication-preview");

   publicationPreview.height(publicationPreview.width());
   userPublicationPreview.height(userPublicationPreview.width());

   $(window).on("resize", function(){
       publicationPreview.height(publicationPreview.width());
       userPublicationPreview.height(userPublicationPreview.width());
   });
});
