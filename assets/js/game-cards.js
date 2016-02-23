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
    rank;
    // pairsFound = 0,
    this.pairsFound = 0;
    this.pairsLeft = 0;
    this.clickCounter = 0;
    // clickCounter = 0,
    // clickCounter,
    clickedCards = [],
    gameMode;

    function emptyContainer() {
      $($cardsContainer).empty();
    }

    function shuffle(array){
      for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
      return array;
    }

    function setUpResetButton() {
      $(resetButton).on("click", function () {
        document.location.reload(true);
      });
    }

    function setGameMode(mode) {
      gameMode = mode;
      switch (gameMode) {
        case "easy":
          console.log("Easy game chosen.");
          console.log(gameMode);
        break;
        case "medium":
          console.log("Medium game chosen.");
        break;
        case "hard":
          console.log("Hard game chosen.");
        break;
      }

    }

    function resetGameScores() {
      clickCounter = 0;
      $numClicks.html(clickCounter);
      console.log("Click Counter: " + clickCounter);
      pairsFound = 0;
      $pairsFound.html(pairsFound);
      console.log("Pairs Found: " + pairsFound);
    }

    function clearClickedCards() {
      clickedCards = [];
      console.log("Clicked Cards Array Length: " + clickedCards.length)
    }

    function setPairsLeft(setPairsLeft) {
      pairsLeft = setPairsLeft;
      $pairsLeft.html(setPairsLeft);
      console.log("Pairs left: " + pairsLeft);
    }

    function createCards (array) {
      var cards = "";
      $.each(array, function(index, value) {
        cards += "<div class='image-div'><img src='" + value + "'></img></div>";
      });
        $($cardsContainer).append(cards);
        console.log("Click Counter: " + shared.clickCounter);
        // openCard();
    }

    function openCard () {
      $(document.body).on("click", "div.image-div", function () {
        var $imageObj = $(event.target)
        .find("img")
        .show()
        .click(false);
        incrementClicks();
        console.log("Click Counter: " + clickCounter);
        console.log("Pairs found: " + pairsFound);
        console.log("Pairs left: " + pairsLeft);
        console.log("Clicked Cards Array Length: " + clickedCards.length);
        clickedCards.push($imageObj);
        if (clickCounter % 2 === 0) {
          compareCards();
        }
      });
    } // ends openCard function

    function incrementClicks() {
      clickCounter++;
      $($numClicks).html(clickCounter);
    }

    function compareCards() {
      // $card1 and $card2 are html img elements
      var $card1 = clickedCards[0][0],
          $card2 = clickedCards[1][0],
          card1SRC = $($card1).attr("src"),
          card2SRC = $($card2).attr("src");
      if (card1SRC === card2SRC) {
        matchedCards();
      } else {
        unmatchedCards($card1, $card2);
      }
    } // ends compareCards

    function unmatchedCards($card1, $card2) {
      console.log("They don't match.");
      $($card1).add($card2).delay(800).fadeOut(300);
      clearClickedCards();
    } //ends unmatchedCards

    function matchedCards() {
      console.log("They match!");
      clearClickedCards();
      updatePairsFound();
      updatePairsLeft();
      catSound();
      // checkforWin();
    } // end cardsMatch

    function updatePairsFound() {
      pairsFound++;
      $($pairsFound).html(pairsFound);
    }

    function updatePairsLeft() {
      pairsLeft--;
      $($pairsLeft).html(pairsLeft);
    }

    function catSound() {
      var $click = $("#sounds");
      $($click).get(0).play();
    }

    // function checkforWin() {
    //   console.log(gameMode + " checking for win");
    //   switch (gameMode) {
    //     case "easy":
    //       if (pairsFound >= 8) {
    //         $($pairsFound).html("<span class='green'>All of them!<span>");
    //         // getRank(gameMode);
    //       }
    //     break;
    //   }
    // }

    function getRank() {
      switch (gameMode) {
        case "easy":
          if (clickCounter <= 26) {
            rank = "an Expert Cat Finder!";
          } else if (clickCounter < 36) {
            rank = "a Novice Cat Finder. Try again.";
          } else {
            rank = "a Beginner Cat Finder. Try again!";
          }
          alert("Great job-- you've won the game!\nRank: " + rank);
        break;
        case "medium":
        console.log("Medium rankings");
        break;
      }
    } // Ends getRank()

    return {
      allCards: allCards,
      $cardsContainer: $cardsContainer,
      clickCounter: clickCounter,
      emptyContainer: emptyContainer,
      setUpResetButton: setUpResetButton,
      $easyGame: $easyGame,
      resetGameScores: resetGameScores,
      $pairsLeft: $pairsLeft,
      setPairsLeft: setPairsLeft,
      createCards: createCards,
      shuffle: shuffle,
      setGameMode: setGameMode,
      clearClickedCards: clearClickedCards
    };

  })();

  /******************************************
  EASY MODE
  ******************************************/

  var easyMode = (function() {

    function startGame () {
      // shared.emptyContainer();
      // shared.resetGameScores();
      shared.clickCounter = "hi";
      console.log("clickCounter: " + shared.clickCounter);
      // shared.clearClickedCards();
      shared.clickedCards = [];
      console.log("clickedCards: " + shared.clickedCards.length);

      shared.pairsFound = 0;
      console.log("Pairs Found: " + shared.pairsFound);
      // shared.setPairsLeft(8);
      shared.pairsLeft = 8;
      shared.$pairsLeft.html(shared.pairsLeft);
      console.log("Pairs Left: " + shared.pairsLeft);

      // shared.shuffle(shared.allCards);
      shared.createCards(shared.allCards);
      // shared.setGameMode("easy");
    }

    return {
      startGame: startGame
    };

  })(); // Ends memoryGame module

  /******************************************
  MEDIUM MODE
  ******************************************/

  var mediumMode = (function() {
    var mediumButton = $("li#medium"),
        mediumCards = [
          "assets/images/cat-black-wig.jpg",
          "assets/images/cat-earmuffs.jpg",
          // "assets/images/cat-pizza.jpg",
          // "assets/images/cat-wink.jpg",
          // "assets/images/cat-pizza.jpg",
          // "assets/images/cat-wink.jpg",
          "assets/images/cat-earmuffs.jpg",
          "assets/images/cat-black-wig.jpg"
        ],
        pairsLeft = 10;

    function addCards() {
      $(mediumButton).on("click", function() {
        mediumCards = mediumCards.concat(shared.allCards);
        startGame();
      });
    }

    function startGame() {
      easyMode.shuffle(mediumCards);
      resetMediumGameCards();
      easyMode.createCards(mediumCards);
      // easyMode.openCard();
    }

    function resetMediumGameCards() {
      $(easyMode.$pairsLeft).html(pairsLeft);
    }

    return {
      addCards: addCards,
      mediumCards: mediumCards,
      pairsLeft: pairsLeft
    };


  })(); // Ends mediumMode

  shared.setUpResetButton();

  $(shared.$easyGame).on("click", function() {
    console.log("easy clicked");
    easyMode.startGame();
  });

  $(shared.mediumGame).on("click", function() {
    shared.emptyContainer();
    mediumMode.startGame();
  });

}); // Ends window.bind
