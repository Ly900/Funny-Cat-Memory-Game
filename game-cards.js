$(window).bind("load", function(){
  "use strict";

  var memoryGame = (function() {
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
    playerName = "";

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
      return clickCounter;
    }

    function updateCounterEl() {
      $($numClicks).html(clickCounter);
    }

    function getPlayerName() {
      playerName = prompt("What's your name?");
      if (playerName === "") {
        getPlayerName();
      }
    }

    function startGame () {
      setUpReset();
      shuffle(allCards);
      resetGameScores();
    }

    function clearClickedCards() {
      clickedCards = [];
    }

    function resetGameScores() {
      $($numClicks).html(clickCounter);
      $($pairsFound).html(pairsFound);
      $($pairsLeft).html(pairsLeft);
      createCards();
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

    function createCards () {
      var cards = "";
      $.each(allCards, createDiv);
      function createDiv(index, value) {
        cards += "<div class='image-div'><img src='" + value + "'></img></div>";
      };
        $($cardsContainer).append(cards);
        openCard();
    };

    function openCard () {
      var $gameCard = $("div.image-div");
      $($gameCard).on("click", function () {
        var $imageObj = $(event.target).find("img");
        incrementClicks();
        $($imageObj).show().click(false);
        updateCounterEl();
        clickedCards.push($imageObj);
        if (clickCounter % 2 === 0) {
          compareCards();
        }
      })
    } // ends openCard function

    function compareCards() {
      // $card1 and $card2 are html img elements
      var $card1 = clickedCards[0][0],
          $card2 = clickedCards[1][0],
          card1SRC = $($card1).attr("src"),
          card2SRC = $($card2).attr("src");
      if (card1SRC === card2SRC) {
        matchedCards();
        catSound();
      } else {
        unmatchedCards($card1, $card2);
      } // ends else for matching
    } // ends compareCards

    function matchedCards() {
      console.log("They match!");
      clearClickedCards();
      updatePairsFound();
      updatePairsLeft();
      if (pairsFound === 8) {
        $($pairsFound).html("<span class='green'>All of them!<span>");
        if (clickCounter <= 26) {
          rank = "an Expert Cat Finder!";
        } else if (clickCounter < 36) {
          rank = "a Novice Cat Finder. Try again!";
        } else {
          rank = "a Beginner Cat Finder. Try again!";
        }
        alert("Great job, " + playerName + "! You've won the game! You're " + rank);
      }
    } // end cardsMatch

    function unmatchedCards($card1, $card2) {
      console.log("They don't match =\(");
      $($card1).delay(800).fadeOut(300);
      $($card2).delay(800).fadeOut(300);
      clearClickedCards();
    } //ends unmatchedCards

    function mediumHard() {
      var mediumGame = $("li#medium"),
        hardGame = $("li#hard");
      $(mediumGame).add(hardGame).on("click", function() {
        var $err = $("div.error");
        $($err).show();
        setTimeout(function() {
          $($err).fadeOut(3000);
        }, 3000)
      })

    }

    return {
      startGame: startGame,
      mediumHard: mediumHard,
      getPlayerName: getPlayerName
    };

  })(); // Ends memoryGame module

  // Enables the reset button to work
  memoryGame.startGame();
  memoryGame.mediumHard();
  memoryGame.getPlayerName();


});
