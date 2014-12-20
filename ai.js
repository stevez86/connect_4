var testingArray = function(array, cell){
  for (var i=0; i<array.length; i++){
    // rowElements.each_with_index do |element, index|
    if (
       (row(array[i])[1] == row(cell)[1]) &&
       (column(array[i])[1] == column(cell)[1])
       ) {
      array[i].dataset.color = cell.dataset.color
    }
  }
  return array
}


var victoriousMove = function(){
  for (var i = 0; i<7; i++) {
    if (testVictory(i)){
      return i
    }
  }
  return null
}

var testVictory = function(columnNum){

  // console.log(".c"+columnNum)
  // console.log($(".c"+columnNum))
  // console.log($(".c"+columnNum).children("[data-color=empty]"))

  var empty_cells = $(".c"+columnNum).children("[data-color=empty]");
  var cell = empty_cells.last()[0];
  var color = playerTurn


  var rowElements = findRow(row(cell));
  rowElements = testingArray(rowElements, cell); // returns array with substitution
  console.log(typeof rowElements)
  var colElements = findColumn(column(cell));
  colElements = testingArray(colElements, cell);

  var diag1Elements = findDiagonal1(cell);
  diag1Elements = testingArray(diag1Elements, cell);

  var diag2Elements = findDiagonal2(cell);
  diag2Elements = testingArray(diag2Elements, cell);
  console.log(color)
  console.log(rowElements)
  console.log(check(rowElements, color))
  if(
    check(rowElements, color) ||
    check(colElements, color) ||
    check(diag1Elements, color) ||
    check(diag2Elements, color)
    ){
    return true
  }
  return false
}
