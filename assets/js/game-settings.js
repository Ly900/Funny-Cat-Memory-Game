$(document).ready(function() {

  var chooseGameMode = $("<div class='choose-mode'>Choose your game mode from the options.<span class='reminders'><br/>You must enable JavaScript to play.</br>And turn on your sound!</span></div>");

  $("#cards-container").append(chooseGameMode);

  var gameModeUl = $("#game-mode"),
      liMode = gameModeUl.children(".mode");

  var hoveredList = function() {
    function initHoverEffect() {
      liMode.on("mouseover", removeHoverFromOthers);
    };
    function removeHoverFromOthers(event) {
      gameModeUl.children(".hoverLi").removeClass("hoverLi");
      addHoverEffect();
    };
    function addHoverEffect() {
      var hoveredLi = $(event.target);
      if (hoveredLi.hasClass("activeLi") === false) {
        $(hoveredLi).addClass("hoverLi");
        $(hoveredLi).on("mouseleave", function(event) {
          $(hoveredLi).removeClass("hoverLi");
        })
      }
    }
    initHoverEffect();
  };

  var clickedList = function() {
    function getLi() {
      gameModeUl.on("click", function(event) {
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
      easyDir = $("li.easy-dir"),
      mediumDir = $("li#medium-dir"),
      hardDir = $("li#hard-dir");
    function hideDir(dir) {
      $(dir).slideUp(200);
    };
    $(easyGame).on("click", function(event) {
      hideDir(hardDir);
      hideDir(mediumDir);
    });
    $(mediumGame).on("click", function(event) {
      $(mediumDir).slideDown(200);
      hideDir(hardDir);
    });
    $(hardGame).on("click", function(event) {
      $("#all-dir").children().slideDown(200);
    })
  };

  /* Initiates hover class for list hovered over */
  hoveredList();
  /* Initiates active class for clicked list */
  clickedList();
  /* Displays directions based on game mode */
  gameModeChoice();

});
