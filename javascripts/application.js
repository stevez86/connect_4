
var changePlayerTurn = function () {
  if ( playerTurn != "red" ) {
    playerTurn = "red";
  } else {
    playerTurn = "black";
  }
}

var changePlayerMenu = function () {
  var newPlayerTurn

  if ( playerTurn != "red" ) {
    newPlayerTurn = "red";
  } else {
    newPlayerTurn = "black";
  }

  $( ".player" ).attr('data-color',newPlayerTurn);
  $('.player_name').text(newPlayerTurn.charAt(0).toUpperCase() + newPlayerTurn.slice(1) + " Player's Turn")
}

var animateTurn = function (empty_cells) {
  animation_from_cell = empty_cells.children().first();
  animation_to_cell = empty_cells.children().last();

  // console.log("from",animation_from_cell,"to",animation_to_cell)
  cell_played = empty_cells.last();

  if (empty_cells.length == 1) {
    animation_from_cell = $(".board");
  }

  animation_from_cell.attr("id","animate_from_cell");
  animation_to_cell.attr("id","animate_to_cell");
  cell_played.attr("id","cell_played");

  $(".player").hide({effect: "slide", direction:"left", duration: 150, complete: animatePlacePiece});

}

var animatePlacePiece = function() {
  changePlayerMenu();
  $("#animate_from_cell").effect("transfer", {to:"#animate_to_cell", duration:500, className:playerTurn, easing:"easeOutBounce", complete: afterPiecePlaced});
  $(".player").show("slide",{direction:"right"}, 150);
}



var afterPiecePlaced = function() {
  $("#cell_played").attr('data-color',playerTurn);
  $("#cell_played").css("background-color","");
  $("#cell_played").css("opacity","");

  // clear out temp ids
  $("#cell_played").attr("id","");
  $("#animate_from_cell").attr("id","");
  $("#animate_to_cell").attr("id","");

  changePlayerTurn();

  if (winner(cell_played[0])) {
    $( ".column" ).unbind();  //FREEZES THE GAME
    $(".row").css("opacity","");
    $(".board").css("background-color","green");
    playerTurn = "none";
  } else {
    setEvents();
    timer("");
  }
}

var removePlayer = function() {
  // $(".player").hide(0);
  $(".player").toggle("slide",{direction:"right"},500);
  $(".player").toggle("slide",{direction:"left"},500);

}

var placePiece = function() {
  $( ".column" ).unbind();
  var empty_cells = $( this ).children("[data-color=empty]");
  var cell_played = empty_cells.last();

  animateTurn(empty_cells);
}


var startGame = function () {
  $(".column").unbind();
  $(".restart").unbind();

  playerTurn = "black";

  changePlayerMenu();
  changePlayerTurn();

  // $(".player").hide(); //{effect: "slide", direction:"left", duration: 150, complete: animatePlacePiece});
  // $(".player").show({effect: "slide", direction:"right", duration: 150, complete: animatePlacePiece});

  $(".row").attr('data-color',"empty");
  // $(".row").css("background-color","");
  $(".board").css("background-color","");
  setEvents();
  startTimer();

}

var startTimer = function () {

  console.log("start timer");

  var count=31;
  var counter = setInterval(startTimer, 1000); //1000 will  run it every 1 second

  count -= 1;

  $(".timer").text(":" + count); // watch for spelling

  if (count <= 0)
  {
     clearInterval(counter);
     $(".board").css("background-color","red");
     //next opponent
     return;
  }
}


var setEvents = function () {
  $( ".column:has([data-color=empty])" ).click(placePiece);
  $( ".restart" ).click( startGame );

  // if playerTurn

  $( ".column" ).hover( function () {
    $( this ).children("[data-color=empty]").last().css({"background-color":playerTurn,"opacity":"0.4"});
    }, function () {
      $( this ).children().css({"background-color":"","opacity":""});
    }
  );
}

// var myDataRef = new Firebase('https://s8ywk8zo4fv.firebaseio-demo.com/');

startGame();


// $( ".img" ).click(placePiece);
// var placePiece = function(){
//   console.log("test")
// }
// $(".board").on("click",'.column.c0', function(e){
//   console.log("test")
// })
// });
