$(document).ready(function() {

  function getLi() {
    var clickedDiv = $("div.game-mode");
    clickedDiv.on("click", removeActiveLiClass);
  }

  function addActiveLiClass() {
    $(event.target).addClass("activeLi");
  }

  function removeActiveLiClass() {
    var clickedLi = $(event.target).hasClass(".activeLi");
      $(this).find(".activeLi").removeClass("activeLi");
      addActiveLiClass();
  }



  getLi();

});
