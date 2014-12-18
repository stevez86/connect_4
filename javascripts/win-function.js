var winner? = function(cell) {
  row = findRow(cell);
  col = findColumn(cell);
  color = findColor(cell);

  checkColumn()
}

var row = function(cell) { //<div class="r0 color"></div>
  return cell.classList[0]
}

var column = function(cell) {
  return cell.parentNode.classList[0]
}

var color = function(cell) {
  return cell.classList[1]
}

var findRow = function(rowClass) {
  return document.getElementsByClassName(rowClass)
}

var findColumn = function(colClass) {
  var list = document.getElementsByClassName(colClass)[0].children
  var array = []
  for (var i = 0; i<=list.length; i++) {
    array[ i ] = list[list.length-i]
  }
  array.shift();
  return array
}

var findCell = function(col, row) {
  var column = document.getElementsByClassName("c"+col)[0].children
  var solution
  for (var i=0; i<column.length; i++) {
    if (column[i].classList.contains("r"+row)) {
      solution = column[i];
    }
  }
  solution
}

var findDiagonal1 = function(cell) {
  x = parseInt(row(cell)[1]);
  y = parseInt(column(cell)[1]);

}

var checkRow = function(cell) {
  rowArray = findRow(row(cell))
}

var checkColumn = function(cell) {

}

var checkDiagonal = function(cell) {

}
