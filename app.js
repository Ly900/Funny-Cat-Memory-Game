$(document).ready(function() {

  var gameModeUl = $("#game-mode"),
      liMode = gameModeUl.children(".mode");

  var hoveredList = function() {
    function initHoverEffect() {
      liMode.on("mouseover", removeHoverFromOthers);
    };
    function removeHoverFromOthers() {
      gameModeUl.children(".hoverLi").removeClass("hoverLi");
      addHoverEffect();
    };
    function addHoverEffect() {
      var hoveredLi = $(event.target);
      if (hoveredLi.hasClass("activeLi") === false) {
        $(hoveredLi).addClass("hoverLi");
        $(hoveredLi).on("mouseleave", function() {
          $(hoveredLi).removeClass("hoverLi");
        })
      }
    }
    initHoverEffect();
  };

  var clickedList = function() {
    function getLi() {
      gameModeUl.on("click", function() {
        /* "this" is the ul parent clicked on */
        var self = this;
        removeActiveLiClass(self);
      });
    };
    function removeActiveLiClass(self) {
      /* "self" is the ul parent clicked on */
      $(self).children(".activeLi").removeClass("activeLi");
      addActiveLiClass();
    };
    function addActiveLiClass() {
      var clickedLi = $(event.target);
      $(clickedLi).addClass("activeLi");
    };
    getLi();
  };

  var gameModeChoice = function() {
    var easyGame = $("li#easy"),
    mediumGame = $("li#medium"),
    hardGame = $("li#hard"),
    defaultP = $("p.default-directions"),
    mediumLi = $("li#medium-directions");
    hardLi = $("li#hard-directions");
    $(easyGame).on("click", function() {
      $(defaultP).hide();
      $(mediumLi).hide();
      $(hardLi).hide();
    });
    $(mediumGame).on("click", function() {
      $(mediumLi).slideDown("slow");
      $(defaultP).hide();
      $(hardLi).hide();
    });
    $(hardGame).on("click", function() {
      $(hardLi).slideDown("slow");
      $(defaultP).hide();
    })
  }

  /* Initiates hover class for list hovered over */
  hoveredList();
  /* Initiates active class for clicked list */
  clickedList();
  /* Displays directions based on game mode */
  gameModeChoice();

});
