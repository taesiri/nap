var mathjs = require('mathjs'),
    math = mathjs();

function generateTableBody(tableName) {
  tbody = document.getElementById(tableName);

  theaderrow = document.createElement("TR");

  thCell1 = document.createElement("TH");
  thCell2 = document.createElement("TH");

  headerNode1 = document.createTextNode("#");
  headerNode2 = document.createTextNode("Result");

  thCell1.appendChild(headerNode1);
  thCell2.appendChild(headerNode2);

  theaderrow.appendChild(thCell1);
  theaderrow.appendChild(thCell2);

  while(tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  tbody.appendChild(theaderrow);

  return tbody;
}

function generateRow(index, value) {
    row = document.createElement("TR");
    cel1 = document.createElement("TD");
    cel2 = document.createElement("TD");

    textNode1 = document.createTextNode(index);
    textNode2 = document.createTextNode(value);

    cel1.appendChild(textNode1);
    cel2.appendChild(textNode2);

    row.appendChild(cel1);
    row.appendChild(cel2);

    return row;
}

function coreCalculator(tableName, root, steps, f) {
  r = math.eval(document.getElementById(root).value);
  s = document.getElementById(steps).value;

  var x0 = 1.27235367 + (0.242693281*r) - (1.02966039/(r+1));
  var last = x0;
  var results = new Array();

  tbody = generateTableBody(tableName);
  for (var i = 0; i < s; i ++) {
    results[i] = f(last, r);
    row = generateRow(i+1, results[i]);
    tbody.appendChild(row);

    last = results[i];
  }

}

function calculateResult(tableName, root, steps, f) {
  if (f==1) {
    coreCalculator(tableName, root, steps, recursionFormula1);
  } else if (f==2) {
    coreCalculator(tableName, root, steps, recursionFormula2);
  }
}

function recursionFormula1 (x, r) {
   return 0.5*(x + (r/x));
}

function recursionFormula2 (x, r) {
  return (x*(math.pow(x,2) + 3 * r))/(3* math.pow(x,2) + r);
}

