
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

  $(".player").hide({effect: "slide", direction:"left", duration: 400, complete: animatePlacePiece});

}

var animatePlacePiece = function() {
  changePlayerMenu();
  $("#animate_from_cell").effect("transfer", {to:"#animate_to_cell", duration:600, className:playerTurn, easing:"easeOutBounce", complete: afterPiecePlaced});
  $(".player").show("slide",{direction:"right"}, 400);
}



var afterPiecePlaced = function() {
  $("#cell_played").attr('data-color',playerTurn);
  $("#cell_played").css("background-color","");
  $("#cell_played").css("opacity","");

  // clear out temp ids
  $("#cell_played").attr("id","");
  $("#animate_from_cell").attr("id","");
  $("#animate_to_cell").attr("id","");


  if (winner(cell_played[0])) {
    $( ".column" ).unbind();  //FREEZES THE GAME
    $(".row").css("opacity","");
    $(".board").css("background-color","green");
    $('.player_name').text(playerTurn.charAt(0).toUpperCase() + playerTurn.slice(1) + " won!");
    $( ".player" ).attr('data-color',playerTurn);
    playerTurn = "none";
  } else {

    changePlayerTurn();
    setEvents();
    timer("restart");

    if (players == 1) {
      players = 0
      randomMove();
    } else if (players == 0) {
      players = 1
    }
  }
}

// var removePlayer = function() {
//   // $(".player").hide(0);
//   $(".player").toggle("slide",{direction:"right"},500);
//   $(".player").toggle("slide",{direction:"left"},500);

// }

var computerPlace = function(columnNum) {
  $( ".column" ).unbind();
  var empty_cells = $( ".column:nth-child("+ (columnNum + 1) +")" ).children("[data-color=empty]");
  if (empty_cells.length != 0) {
    var cell_played = empty_cells.last();
    animateTurn(empty_cells);
  } else {
    randomMove()
  }
}

var randomMove = function(){
  computerPlace(Math.floor(Math.random()*7))
}

var placePiece = function() {
  $( ".column" ).unbind();
  timer("pause");
  var empty_cells = $( this ).children("[data-color=empty]");
  var cell_played = empty_cells.last();

  animateTurn(empty_cells);
}

var triggerTwoPlayerGame = function(){
  playGame(2)
  $(".1player").hide();
  $(".2player").hide();
  $(".restart").show("fade",100);
}

var triggerOnePlayerGame = function(){
  playGame(1)
  $(".1player").hide();
  $(".2player").hide();
  $(".restart").show();
}


setupBoard = function(){
  $(".1player").unbind();
  $(".2player").unbind();

  $(".1player").on("click", triggerOnePlayerGame);
  $(".2player").on("click", triggerTwoPlayerGame);

  $("button").show();
  $(".restart").hide();

  $(".column").unbind();
  $(".restart").unbind();

  playerTurn = "black";

  changePlayerMenu();
  changePlayerTurn();

  timer("pause");
  $(".timer").text(":00");

  $(".row").attr('data-color',"empty");
  $(".board").css("background-color","");
}

var playGame = function(type) {
  players = type;

  setEvents();
  timer("restart");

}


var time;
var counter;

var timer = function(key) {

  time -= 1;

  if (key == "restart") {
    console.log(key);
    time = 20;
    clearInterval(counter);
    counter = setInterval(timer, 1000);
  }

  if (key == "pause") {
    $(".timer").text(":" + time);
    clearInterval(counter);
    return;
  }

  if (time <= 0)
  {
    $(".timer").text(":" + time);
    clearInterval(counter);
    return;
  }

  $(".timer").text(":" + time);
}

var setEvents = function () {
  $( ".column:has([data-color=empty])" ).click(placePiece);
  $( ".restart" ).click( setupBoard );

  // if playerTurn

  $( ".column" ).hover( function () {
    $( this ).children("[data-color=empty]").last().css({"background-color":playerTurn,"opacity":"0.4"});
    }, function () {
      $( this ).children().css({"background-color":"","opacity":""});
    }
  );
}


setupBoard();


// $( ".img" ).click(placePiece);
// var placePiece = function(){
//   console.log("test")
// }
// $(".board").on("click",'.column.c0', function(e){
//   console.log("test")
// })
// });
