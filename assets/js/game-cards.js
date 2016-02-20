$(window).bind("load", function(){
  "use strict";

  /******************************************
  EASY MODE
  ******************************************/

  var easyMode = (function() {
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
    resetButton = $("#reset"),
    clickCounter = 0,
    pairsFound = 0,
    pairsLeft = 8,
    clickedCards = [],
    $numClicks = $("#num-clicks"),
    $pairsFound = $("#pairs-found"),
    $pairsLeft = $("#pairs-left"),
    $cardsContainer = $("#cards-container"),
    rank,
    easyGame = $("li#easy"),
    mediumGame = $("li#medium"),
    hardGame = $("li#hard")

    function shuffle(array){
      for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
      return array;
    }

    function setUpReset() {
      $(resetButton).on("click", function () {
        document.location.reload(true);
      });
    }

    function incrementClicks() {
      clickCounter++;
      $($numClicks).html(clickCounter);
    }

    function startGame () {
      console.log("clicked");
      emptyContainer();
      setUpReset();
      setEasyGameScores();
      createCards(allCards);
    }

    function emptyContainer() {
      $($cardsContainer).empty();
    }

    function clearClickedCards() {
      clickedCards = [];
    }

    function setEasyGameScores() {
      $($numClicks).html(clickCounter);
      $($pairsFound).html(pairsFound);
      $($pairsLeft).html(pairsLeft);
    }

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

    function createCards (array) {
      var cards = "";
      $.each(array, function(index, value) {
        cards += "<div class='image-div'><img src='" + value + "'></img></div>";
      });
        $($cardsContainer).append(cards);
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
      } // ends else for matching
    } // ends compareCards

    function matchedCards() {
      console.log("They match!");
      clearClickedCards();
      updatePairsFound();
      updatePairsLeft();
      catSound();
      if (pairsFound >= 8) {
        $($pairsFound).html("<span class='green'>All of them!<span>");
        getRank();
      }
    } // end cardsMatch

    function unmatchedCards($card1, $card2) {
      console.log("They don't match.");
      $($card1).add($card2).delay(800).fadeOut(300);
      clearClickedCards();
    } //ends unmatchedCards

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
      allCards: allCards,
      easyGame: easyGame,
      shuffle: shuffle,
      $numClicks: $numClicks,
      clickCounter: clickCounter,
      $pairsFound: $pairsFound,
      pairsFound: pairsFound,
      $pairsLeft: $pairsLeft,
      createCards: createCards,
      openCard: openCard,
      pairsLeft: pairsLeft,
      $cardsContainer: $cardsContainer,
      emptyContainer: emptyContainer
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
        mediumCards = mediumCards.concat(easyMode.allCards);
        startGame();
      });
    }

    function startGame() {
      easyMode.shuffle(mediumCards);
      easyMode.emptyContainer();
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

  $(easyMode.easyGame).on("click", function() {
    easyMode.startGame();
  });


  mediumMode.addCards();

}); // Ends window.bind
