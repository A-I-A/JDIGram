$(document).on("turbolinks:load", function() {

  let navbarMenu = $(".navbar-menu");
  let menuPopup = $(".navbar-menu-popup");
  
  let searchInput = $(".navbar-user-search");
  let clearSearchButton = $(".navbar-search-clear-button");
  let searchResults = $(".navbar-search-results")

  navbarMenu.click(function() {
    if (menuPopup.css('display') == 'none')
      menuPopup.show();
    else
      menuPopup.hide();
  });

  navbarMenu.on('blur', function() {
    setTimeout(()=>{navbarMenu.hide}, 300); 
  });
  
  searchInput.on('input', function(e) {
    let login = e.target.value;
    if (login != '') {
      clearButtonShow();
      $.ajax({
        url: '/search_user',
        type: 'GET',
        data: { login: login }
      });
    } else {
      clearSearch();
    } 
  });

  clearSearchButton.click(function() {
    clearSearch();
  });

  function clearButtonShow() {
    clearSearchButton.css('visibility', 'visible');
  }

  function clearButtonHide() {
    clearSearchButton.css('visibility', 'hidden');
  }

  function clearSearch() {
    searchInput.val('');
    clearButtonHide();
    searchResults.hide();
  }
})
