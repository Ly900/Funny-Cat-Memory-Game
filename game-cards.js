$(document).ready(function() {
  "use strict";





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
  ];

  function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }

  function setUpReset() {
    $("#reset").on("click", function () {
      document.location.reload(true);
    });
  }

  function findTotalClicks() {
    var clickCounter = 0;
  }

  function startGame () {
    console.log("startGame called");
    findTotalClicks();
    var clickCounter = 0,
        pairsFound = 0,
        pairsLeft = 8,
        clickedCards = [];
    shuffle(allCards);
    $("#clicks").html(clickCounter);
    $("#pairs-found").html(pairsFound);
    $("#pairs-left").html(pairsLeft);

    // dealCards();
  }

  // function dealCards (clickCounter, pairsFound, pairsLeft, clickedCards) {
  //   console.log("dealCards called");
  //   var cardsContainer = $("#cards-container");
  //   $.each(allCards, createDiv);
  //   function createDiv(index, value) {
  //     var imageDiv = $("<div class='image-div'><img></img></div>");
  //     $(imageDiv).find("img").attr("src", value);
  //     $(imageDiv).appendTo(cardsContainer);
  //   };
  //     $(cardsContainer).find("img").hide();
  //     // $("div.image-div img").hide();
  //     openCard(clickCounter, pairsFound, pairsLeft, clickedCards);
  // };

  // function openCard (clickCounter, pairsFound, pairsLeft, clickedCards) {
  //   $("#cards-container").on("click", function () {
  //     clickCounter++;
  //     $("#clicks").html(clickCounter);
  //     console.log(clickCounter);
  //     var image = $(event.target).find("img");
  //     image.show();
  //     clickedCards.push(image);
  //     image.click(false);
  //     compareCards(clickCounter, pairsFound, pairsLeft, clickedCards);
  //     console.log(clickedCards);
  //   }) // ends onclick on container
  // } // ends openCard function

  // function compareCards (clickCounter, pairsFound, pairsLeft, clickedCards) {
  //     if (clickCounter % 2 !== 0) {
  //       console.log(clickedCards);
  //     card1 = $(clickedCards[0][0]).attr("src");
  //     card2 = $(clickedCards[1][0]).attr("src");
  //       if (card1 == card2) {
  //         console.log("they match");
  //         clickedCards = [];
  //         pairsFound++;
  //         console.log("Pairs Found = " + pairsFound);
  //         if (pairsFound === 8) {
  //           alert("You've won the game!")
  //         } // ends pairsFound
  //       } // ends if they match
  //       else {
  //         console.log("they don't match");
  //         $(clickedCards[0]).delay(500).fadeOut(100);
  //         $(clickedCards[1]).delay(500).fadeOut(100);
  //         clickedCards = [];
  //       } // ends else for matching
  //     } //ends if even condition
  //     // clickCounter++;
  //
  //
  // } // ends compareCards function

  startGame();
  setUpReset();

});
