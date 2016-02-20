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
    pairsFound = 0,
    resetButton = $("#reset"),
    rank,
    $easyGame = $("li#easy"),
    $mediumGame = $("li#medium"),
    $hardGame = $("li#hard"),
    clickCounter = 0,
    clickedCards = [];

    function emptyContainer() {
      $($cardsContainer).empty();
    }

    function setUpResetButton() {
      $(resetButton).on("click", function () {
        document.location.reload(true);
      });
    }

    function setGameScores() {
      $numClicks.html(0);
      $pairsFound.html(0);
    }

    function clearClickedCards() {
      clickedCards = [];
    }

    function setPairsLeft(pairsLeft) {
      $pairsLeft.html(pairsLeft);
    }

    function createCards (array) {
      var cards = "";
      $.each(array, function(index, value) {
        cards += "<div class='image-div'><img src='" + value + "'></img></div>";
      });
        $(shared.$cardsContainer).append(cards);
        openCard();
    }

    function openCard () {
      $(document.body).on("click", "div.image-div", function () {
        var $imageObj = $(event.target)
        .find("img")
        .show()
        .click(false);
        incrementClicks();
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
      if (pairsFound >= 8) {
        $(shared.$pairsFound).html("<span class='green'>All of them!<span>");
        getRank();
      }
    } // end cardsMatch

    function updatePairsFound() {
      pairsFound++;
      $($pairsFound).html(pairsFound);
    }

    function updatePairsLeft() {
      pairsLeft--;
      $($pairsLeft).html(pairsLeft);
    }

    return {
      allCards: allCards,
      $cardsContainer: $cardsContainer,
      emptyContainer: emptyContainer,
      setUpResetButton: setUpResetButton,
      $easyGame: $easyGame,
      setGameScores: setGameScores,
      $pairsLeft: $pairsLeft,
      setPairsLeft: setPairsLeft,
      createCards: createCards
    };

  })();

  /******************************************
  EASY MODE
  ******************************************/

  var easyMode = (function() {
    function shuffle(array){
      for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
      return array;
    }

    function startGame () {
      shared.setUpResetButton();
      shared.setGameScores();
      shared.setPairsLeft(8);
      shared.createCards(shared.allCards);
    }

    function catSound() {
      var $click = $("#sounds");
      $($click).get(0).play();
    }

    function getRank() {
      if (clickCounter <= 26) {
        rank = "an Expert Cat Finder!";
      } else if (clickCounter < 36) {
        rank = "a Novice Cat Finder. Try again.";
      } else {
        rank = "a Beginner Cat Finder. Try again!";
      }
      alert("Great job-- you've won the game!\nRank: " + rank);
    }

    return {
      startGame: startGame,
      shuffle: shuffle,
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

  $(shared.$easyGame).on("click", function() {
    console.log("easy clicked");
    shared.emptyContainer();
    easyMode.startGame();
  });

  $(shared.mediumGame).on("click", function() {
    shared.emptyContainer();
    mediumMode.startGame();
  });

}); // Ends window.bind
