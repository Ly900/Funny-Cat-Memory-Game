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
    $gameDir = $(".game-directions");

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
      if (shared.pairsLeft === 0) {
        $($pairsFound).html("<span class='green'>All of them!<span>");
        stopTimer();
        getRank(shared.gameMode);
      }
    }

    function getRank() {
      var expert = "an Expert Cat Finder!",
          novice = "a Novice Cat Finder. Try again.",
          beginner = "a Beginner Cat Finder. Try again!",
          clicks = shared.clickCounter,
          rankAlert = "Great job-- you've won the game! \nRank: "
      switch (shared.gameMode) {
        case "easy":
          clicks <= 26 ? rank = expert : clicks <= 36 ? rank = novice : rank = beginner;
          alert(rankAlert + rank);
          break;
        case "medium":
          clicks <= 34 ? rank = expert : clicks <= 44 ? rank = novice : rank = beginner;
          if (rank === expert) {
            rankAlert += rank +
            "\nTime left: " + timer + " seconds. \nBravo!";
          } else {
            rankAlert += rank +
            "\nTime left: " + timer + " seconds. \nBravo! \nBut can you become an Expert Cat Finder?";
          }
            alert(rankAlert);
        break;
      }
    } // Ends getRank()

    function showTimer() {
      $($timerDiv).slideDown(200);
      switch (shared.gameMode) {
        case "medium":
          stopTimer();
          timer = 45;
          ($($timer).text(timer));
        break;
        case "hard":
          stopTimer();
          timer = 35;
          ($($timer).text(timer));
        break;
      }
    }

    function hideTimer() {
      $($timerDiv).slideUp(200);
    }

    function startTimer() {
      time = setInterval(function() {
        timer--;
        $($timer).text(timer);
        if (timer === 0) {
          timeUp();
        }
      }, 1000)
    }

    function stopTimer() {
      clearInterval(time);
    }

    function timeUp() {
      alert("Sorry! Time's up! You were able to find " + shared.pairsFound + " matching pairs. Try again!");
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
      stopTimer: stopTimer
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

  shared.setUpResetButton();

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
