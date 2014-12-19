var allTrue = function(array) {
  for(var i = 0; i < array.length; i++){
    if(array[i] === true){
      return true;
    }
  }
  return false;
}

var arrayify = function(nodeList){
  var array = []
  for (var i = 0; i<=nodeList.length; i++) {
    array[ i ] = nodeList[nodeList.length-i]
  }
  array.shift();
  return array
}

var row = function(cell) { //<div class="r0 color"></div>
  return cell.classList[1]
}

var column = function(cell) {
  return cell.parentNode.classList[1]
}

var findColor = function(cell) {
  return cell.dataset.color
}

var findRow = function(rowClass) {
  var list = document.getElementsByClassName(rowClass)
  return arrayify(list)
}

var findColumn = function(colClass) {
  var list = document.getElementsByClassName(colClass)[0].children
  return arrayify(list)
}

var findCell = function(col, row) {
  var column = document.getElementsByClassName("c"+col)[0].children
  var solution
  for (var i=0; i<column.length; i++) {
    if (column[i].classList.contains("r"+row)) {
      solution = column[i];
    }
  }
  return solution
}

var findDiagonal1 = function(cell) {
  x = parseInt(row(cell)[1]);
  y = parseInt(column(cell)[1]);
}

var findDiagonal2 = function(cell) {
}

var check = function (array, color) {
  var conditions = []
  for (var j = 0; j<array.length-3; j++) {
    conditions[j] = array.slice(j, j+4)
    for (var k = 0; k<4; k++){
      conditions[j][k] = (conditions[j][k].dataset.color == color);
    }
  }
  for (var i = 0; i<conditions.length; i++){
    if (allTrue(conditions[i])){
      return true
    }
  }
  return false
}

var winner = function(cell) {
  var rowElements = findRow(row(cell));
  var colElements = findColumn(column(cell));
  var color = findColor(cell);

  if(check(rowElements, color) ||
     check(colElements, color)) {
     // ||
     // check(diagonal1, color) ||
     // check(diagonal2, color)){
    return true
  }
  return false
}
