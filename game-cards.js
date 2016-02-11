$(document).ready(function() {

  var allCards = [
  "images/annoyed-cat.jpg",
  "images/cat-bathing.jpg",
  "images/annoyed-cat.jpg",
  "images/cat-bathing.jpg",
  "images/cat-tongue.jpg",
  "images/cat-green-ears.jpg",
  "images/grumpy-cat.jpg",
  "images/cat-with-glasses.jpg",
  "images/cat-tongue.jpg",
  "images/cat-wig.jpg",
  "images/cat-crosseyed.jpg",
  "images/cat-wig.jpg",
  "images/cat-crosseyed.jpg",
  "images/cat-green-ears.jpg",
  "images/grumpy-cat.jpg",
  "images/cat-with-glasses.jpg"
  ];

  function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }

  function startGame () {
    shuffle(allCards);
    clickCounter = 0;
    correctPairs = 0;
    clickedCards = [];
    $("#clicks").html(clickCounter);
    // console.log("Correct Pairs = " + correctPairs);
    // console.log("Click Counter = " + clickCounter);
    // console.log(clickedCards);
    // $("#resetButton").on("click", function () {
      // location.reload();
    // });
    // dealCards();
  }



  startGame();


});
