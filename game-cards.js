$(document).ready(function() {

  var allCards = [
  "assets/images/annoyed-cat.jpg",
  "assets/images/cat-bathing.jpg",
  "assets/images/annoyed-cat.jpg",
  "assets/images/cat-bathing.jpg",
  "assets/images/cat-tongue.jpg",
  "assets/images/cat-green-ears.jpg",
  "assets/images/grumpy-cat.jpg",
  "assets/images/cat-with-glasses.jpg",
  "assets/images/cat-tongue.jpg",
  "assets/images/cat-wig.jpg",
  "assets/images/cat-crosseyed.jpg",
  "assets/images/cat-wig.jpg",
  "assets/images/cat-crosseyed.jpg",
  "assets/images/cat-green-ears.jpg",
  "assets/images/grumpy-cat.jpg",
  "assets/images/cat-with-glasses.jpg"
  ];

  function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }

  function startGame () {
    shuffle(allCards);
    clickCounter = 0;
    pairsFound = 0;
    pairsLeft = 8;
    clickedCards = [];
    $("#clicks").html(clickCounter);
    $("#pairs-found").html(pairsFound);
    $("#pairs-left").html(pairsLeft);
    console.log("Pairs Found = " + pairsFound);
    console.log("Click Counter = " + clickCounter);
    console.log(clickedCards);
    $("#resetButton").on("click", function () {
      // Reloads page without using the cache.
      document.location.reload(true);
    });
    dealCards();
  }

  function dealCards () {
    console.log("dealCards called");
    var cardsContainer = $("#cards-container");
    $.each(allCards, createDiv);
    function createDiv(index, value) {
      var imageDiv = $("<div class='image-div'><img></img></div>");
      // $(imageDiv).find("img").attr("src", value);
      $(imageDiv).appendTo(cardsContainer);
    };
      // $("img").hide();
      // openCard();
  };


  startGame();


});
