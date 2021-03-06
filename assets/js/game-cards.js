$(window).bind("load", function(){
  "use strict";

  /******************************************
  SHARED
  ******************************************/

  var shared = (function() {
    var allCards = [
    "assets/images/annoyed-cat.jpg",
    "assets/images/cat-bathing.jpg",
    "assets/images/annoyed-cat.jpg",
    "assets/images/cat-bathing.jpg",
    "assets/images/cat-tongue.jpg",
    "assets/images/cat-shocked.jpg",
    "assets/images/grumpy-cat.jpg",
    "assets/images/cat-with-glasses.jpg",
    "assets/images/cat-tongue.jpg",
    "assets/images/cat-wig.jpg",
    "assets/images/cat-crosseyed.jpg",
    "assets/images/cat-wig.jpg",
    "assets/images/cat-crosseyed.jpg",
    "assets/images/cat-shocked.jpg",
    "assets/images/grumpy-cat.jpg",
    "assets/images/cat-with-glasses.jpg"
    ],
    $cardsContainer = $("#cards-container"),
    $numClicks = $("#num-clicks"),
    $pairsFound = $("#pairs-found"),
    $pairsLeft = $("#pairs-left"),
    $easyGame = $("li#easy"),
    $mediumGame = $("li#medium"),
    $hardGame = $("li#hard"),
    resetButton = $("#reset"),
    rank,
    pairsFound,
    pairsLeft,
    clickCounter,
    clickedCards = [],
    gameMode,
    $timerDiv = $(".game-timer"),
    $timer = $("#timer"),
    timer,
    time,
    $gameDir = $(".game-directions"),
    $seconds = $("#seconds"),
    seconds,
    $minutes = $("#minutes"),
    minutes,
    $overlay = $("<div id='overlay'></div>"),
    $innerMessage = $("<div id='inner-message'></div>"),
    gameOver = "<p class='game-over'>Game Over</p>",
    beginner = "<p class='rank-star'>\
    <img src='assets/images/star-icon.png' class='star-icon'/><br/>\
    <p class='rank-word'>(Beginner Cat Finder)</p><br/>\
    Try again!\
    </p>",
    novice = "<p class='rank-star'>\
    <img src='assets/images/star-icon.png' class='star-icon'/>\
    <img src='assets/images/star-icon.png' class='star-icon'/><br/>\
    <p class='rank-word'>(Novice Cat Finder)</p><br/>\
    Try again!\
    </p>",
    expert = "<p class='rank-star'>\
    <img src='assets/images/star-icon.png' class='star-icon'/>\
    <img src='assets/images/star-icon.png' class='star-icon'/>\
    <img src='assets/images/star-icon.png' class='star-icon'/><br/>\
    <p class='rank-word'>(Expert Cat Finder)</p><br/>";

    function clearClickedCardsArray() {
      shared.clickedCards = [];
    }

    function startGame() {
      $($cardsContainer).empty();
      clearClickedCardsArray();
      shared.clickCounter = 0;
      $numClicks.html(shared.clickCounter);
      shared.pairsFound = 0;
      $pairsFound.html(shared.pairsFound);
    }

    function shuffle(array){
      for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
      return array;
    }

    function setUpResetButton() {
      $(resetButton).on("click", function (event) {
        document.location.reload(true);
      });
    }

    function setGameMode(mode) {
      shared.gameMode = mode;
      switch (shared.gameMode) {
        case "easy":
          console.log("Easy game chosen.")
        break;
        case "medium":
          console.log("Medium game chosen.");
          // console.log(shared.gameMode);
        break;
        case "hard":
          console.log("Hard game chosen.");
        break;
      }
    }

    function setPairsLeft(setPairsLeft) {
      shared.pairsLeft = setPairsLeft;
      $pairsLeft.html(setPairsLeft);
    }

    function createCards (array) {
      var cards = "";
      $.each(array, function(index, value) {
        cards += "<div class='image-div'><img src='" + value + "'></img></div>";
      });
        $($cardsContainer).append(cards);
        openCard();
    }

    function openCard () {
      $("div.image-div").on("click", function(event) {
        var $imageObj = $(event.target)
        .find("img")
        .show()
        .click(false);
        incrementClicks();
        shared.clickedCards.push($imageObj);
        if (shared.clickCounter % 2 === 0) {
          compareCards();
        }
        if (shared.clickCounter === 1) {
          switch (shared.gameMode) {
            case "medium":
              startTimer();
              hideDirections();
            break;
            case "hard":
              startTimer();
              hideDirections();
            break;
          }
        }
      });
    } // ends openCard function

    function incrementClicks() {
      shared.clickCounter++;
      $($numClicks).html(shared.clickCounter);
    }

    function compareCards() {
      // $card1 and $card2 are html img elements
      var $card1 = shared.clickedCards[0][0],
          $card2 = shared.clickedCards[1][0],
          card1SRC = $($card1).attr("src"),
          card2SRC = $($card2).attr("src");
      if (card1SRC === card2SRC) {
        matchedCards();
      } else {
        unmatchedCards($card1, $card2);
      }
    } // ends compareCards

    function unmatchedCards($card1, $card2) {
      $($card1).add($card2).delay(800).fadeOut(300);
      clearClickedCardsArray();
    } //ends unmatchedCards

    function matchedCards() {
      clearClickedCardsArray();
      updatePairsFound();
      updatePairsLeft();
      catSound();
      checkforWin();
    } // end cardsMatch

    function updatePairsFound() {
      shared.pairsFound++;
      $($pairsFound).html(shared.pairsFound);
    }

    function updatePairsLeft() {
      shared.pairsLeft--;
      $($pairsLeft).html(shared.pairsLeft);
    }

    function catSound() {
      var $click = $("#sounds");
      $($click).get(0).play();
    }

    function checkforWin() {
      // shared.pairsLeft = 0;
      // shared.clickCounter = 50;
      if (shared.pairsLeft === 0) {
        $($pairsFound).html("<span class='green'>All of them!<span>");
        stopTimer();
        getRank(shared.gameMode);
      }
    }

    function getRank() {
          var minuteUnit,
          clicks = shared.clickCounter;

          appendOverlay($overlay, $innerMessage);

      switch (shared.gameMode) {
        case "easy":
          clicks <= 26 ? rank = expert : clicks <= 36 ? rank = novice : rank = beginner;
          $overlay.show();
          $innerMessage.html(gameOver + rank);
          rank = expert;
          if (rank === beginner) {
            rank = beginner;
            $("p.rank-word").css("color", "red");
          } else if (rank === novice) {
            $("p.rank-word").css("color", "green");
          } else {
            $("p.rank-word").css("color", "blue");
          }
          break;
        case "medium":
          clicks <= 34 ? rank = expert : clicks <= 44 ? rank = novice : rank = beginner;
          $overlay.show();
          $innerMessage.html(gameOver + rank + "<span class='time-left'>Time left: " + timer + " seconds.</span>");
          if (rank === beginner) {
            $("p.rank-word").css("color", "red");
          } else if (rank === novice) {
            $("p.rank-word").css("color", "green");
          } else {
            $("p.rank-word").css("color", "blue");
          }
        break;
        case "hard":
          seconds <= 45 && minutes < 1 ? rank = expert : seconds <= 55 && minutes < 1 ? rank = novice : rank = beginner;
          minutes === 1 ? minuteUnit = "minute" : minuteUnit = "minutes";
          $overlay.show();
          $innerMessage.html(gameOver + rank + "It took you " + minutes + " minutes and " + seconds + "." + timer + " seconds to find all the cats!");
          if (rank === beginner) {
            $("p.rank-word").css("color", "red");
          } else if (rank === novice) {
            $("p.rank-word").css("color", "green");
          } else {
            $("p.rank-word").css("color", "blue");
          }
        break;
      }
    } // Ends getRank()

    function appendOverlay($overlay, $innerMessage) {
      $overlay.append($innerMessage);
      $("body").append($overlay);

      $overlay.on("click", function(event) {
        $(this).hide();
      });

      $innerMessage.on("click", function(event){
        event.stopPropagation();
      });
    }

    function showTimer() {
      $($timerDiv).slideDown(200);
      switch (shared.gameMode) {
        case "medium":
          stopTimer();
          timer = 45;
          $timer.text(timer);
        break;
        case "hard":
          stopTimer();
          timer = "00";
          seconds = "00" + ":";
          minutes = "00" + ":";
          $timer.show().text(timer);
          $seconds.show().text(seconds);
          $minutes.show().text(minutes);
        break;
      }
    }

    function hideTimer() {
      $($timerDiv).slideUp(200);
    }

    function startTimer() {
      switch (shared.gameMode) {
        case "medium":
          time = setInterval(function() {
            timer--;
            if (timer === 0) {
              timeUp();
            }
            $($timer).text(timer);
          }, 1000);
        break;
        case "hard":
          timer = 0;
          seconds = 0;
          minutes = 0;
          time = setInterval(function() {
            timer++;
            if (timer < 10) {
              $timer.text("0" + timer);
            } else {
              $timer.text(timer);
            }
            if (timer === 100 ) {
              timer = 0;
              seconds++;
            }
            if (seconds < 10) {
              $seconds.text("0" + seconds + ":");
            } else {
              $seconds.text(seconds + ":");
            }
            if (seconds === 60) {
              seconds = 0;
              minutes++;
            }
            if (minutes < 10) {
              $minutes.text("0" + minutes + ":");
            } else {
              $minutes.text(minutes + ":");
            }
          }, 10);
        break;
      }
    }

    function stopTimer() {
      clearInterval(time);
    }

    function timeUp() {
      beginner = "<p class='rank-star'>\
      <img src='assets/images/star-icon.png' class='star-icon'/><br/>\
      <p class='rank-word'>(Beginner Cat Finder)</p><br/>\
      </p>";
      $overlay.show();
      $innerMessage.html(gameOver + beginner + "Sorry! Time's up! You were able to find " + shared.pairsFound + " matching pairs.");
      appendOverlay($overlay, $innerMessage);
      $("div.image-div").unbind("click").on("click", function(event) {
        alert("Nice try! Please reset the game or choose a new mode.");
      })
      stopTimer();
    }

    function hideDirections() {
      $($gameDir).slideUp(200);
    }

    function showDirections() {
      $($gameDir).slideDown(200);
    }

    return {
      allCards: allCards,
      $cardsContainer: $cardsContainer,
      clickCounter: clickCounter,
      setUpResetButton: setUpResetButton,
      $easyGame: $easyGame,
      $pairsLeft: $pairsLeft,
      setPairsLeft: setPairsLeft,
      createCards: createCards,
      shuffle: shuffle,
      setGameMode: setGameMode,
      clickedCards: clickedCards,
      startGame: startGame,
      clearClickedCardsArray,
      $mediumGame: $mediumGame,
      startGame: startGame,
      $hardGame: $hardGame,
      $timerDiv: $timerDiv,
      showTimer: showTimer,
      hideTimer: hideTimer,
      $gameDir: $gameDir,
      hideDirections: hideDirections,
      showDirections: showDirections,
      stopTimer: stopTimer,
      $minutes: $minutes,
      $seconds: $seconds,
      $overlay: $overlay,
      $innerMessage: $innerMessage,
      appendOverlay: appendOverlay
    };

  })();

  /******************************************
  EASY MODE
  ******************************************/

  var easyMode = (function() {
    function startGame () {
      shared.startGame();
      shared.setPairsLeft(8);
      shared.shuffle(shared.allCards);
      shared.createCards(shared.allCards);
      shared.setGameMode("easy");
      shared.stopTimer();
      shared.hideTimer();
      shared.showDirections();
    }

    return {
      startGame: startGame
    };

  })(); // Ends memoryGame module

  /******************************************
  MEDIUM MODE
  ******************************************/

  var mediumMode = (function() {
    var mediumCards = [
      "assets/images/cat-black-wig.jpg",
      "assets/images/cat-earmuffs.jpg",
      "assets/images/cat-earmuffs.jpg",
      "assets/images/cat-black-wig.jpg"
    ],
    pairsLeft,
    allCards;

    function startGame() {
      allCards = mediumCards.concat(shared.allCards);
      shared.startGame();
      shared.setPairsLeft(10);
      shared.shuffle(allCards);
      shared.createCards(allCards);
      shared.setGameMode("medium");
      shared.showTimer();
      shared.$minutes.add(shared.$seconds).hide();
    }

    return {
      startGame: startGame,
      mediumCards: mediumCards
    };


  })(); // Ends mediumMode

  /******************************************
  HARD MODE
  ******************************************/

  var hardMode = (function() {
    var hardCards = [
      "assets/images/cat-pizza.jpg",
      "assets/images/cat-wink.jpg",
      "assets/images/cat-pizza.jpg",
      "assets/images/cat-wink.jpg",
    ],
    pairsLeft,
    allCards;

    function startGame() {
      allCards = hardCards
      .concat(mediumMode.mediumCards)
      .concat(shared.allCards);
      shared.startGame();
      shared.setPairsLeft(12);
      shared.shuffle(allCards);
      shared.createCards(allCards);
      shared.setGameMode("hard");
      shared.showTimer();
    }

    return {
      startGame: startGame
    };


  })(); // Ends hardMode

  /******************************************
  RANKING INFO
  ******************************************/

  var ranking = (function(){
    var $rankingInfoLink = $("span.ranking-info"),
        $rankingOverlay = $("#ranking-outer-overlay"),
        $rankingOverlayInner = $("#ranking-inner-div"),
        $rankHeading = $("span.rankings"),
        $rankingStar = $("img.ranking-star");


    function openRankingDiv() {
      $rankingInfoLink.on("click", function(event){
        $rankingOverlay.show();
        $rankHeading.fadeIn(1000);
        $($rankingStar).css({"transform": "translate(0)", "opacity": "1"});
      });
      closeRankingDiv();
    }

    function closeRankingDiv() {
      var closeIcon = $("#close-icon");
      $rankingOverlayInner.on("click", function(event){
        event.stopPropagation();
      });
      $([$rankingOverlay, closeIcon])
      .each(function(){
        $(this).on("click", function(event){
          $rankingOverlay.hide();
          $rankHeading.hide();
          $($rankingStar).css({"transform": "translate(-175px)", "opacity": "0"});
        });
      });
    }

    return {
      openRankingDiv: openRankingDiv
    }

  })();

  shared.setUpResetButton();
  ranking.openRankingDiv();

  $(shared.$easyGame).on("click", function(event) {
    easyMode.startGame();
  });

  $(shared.$mediumGame).on("click", function(event) {
    mediumMode.startGame();
  });

  $(shared.$hardGame).on("click", function(event) {
    hardMode.startGame();
  });



}); // Ends window.bind
