// $(document).ready(function(){

var playerTurn = "red";


var changeTurns = function () {
  if ( playerTurn == "red" ) {
    playerTurn = "black";
  } else {
    playerTurn = "red";
  }

  $( ".player" ).attr('data-color',playerTurn);
}

var placePiece = function() {
  $( this ).children("[data-color=empty]").last().attr('data-color',playerTurn);
  changeTurns();
}


$( ".column" ).click(placePiece);


// $( ".img" ).click(placePiece);
// var placePiece = function(){
//   console.log("test")
// }
// $(".board").on("click",'.column.c0', function(e){
//   console.log("test")
// })
// });
