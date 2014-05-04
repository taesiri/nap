var mathjs = require('mathjs'),
    math = mathjs();

function generateTableBody(tableName, labels) {
  tbody = document.getElementById(tableName);

  theaderrow = document.createElement("TR");
  labels.forEach(function (entry) {
    tCell = document.createElement("TH");
    hNode = document.createTextNode(entry);
    tCell.appendChild(hNode);
    theaderrow.appendChild(tCell);
  });

  while(tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  tbody.appendChild(theaderrow);

  return tbody;
}

function coreCalculator(r, s, f) {
  var realValue = Math.sqrt(r);
  var last = 1.27235367 + (0.242693281*r) - (1.02966039/(r+1));
  var results = new Array();

  for (var i = 0; i < s; i ++) {
    var cxn = f(last, r);
    results[i] = {id: i, xn: cxn, en: Math.abs(realValue-cxn)};
  }

  return results;
}

function fillTable(tb, data) {
  for(entry in data){
    row = document.createElement("TR");
    for ( key in data[entry]) {
      cell = document.createElement("TD");
      tNode = document.createTextNode(data[entry][key]);
      cell.appendChild(tNode);

      row.appendChild(cell);
    }
    tb.appendChild(row);
  }
}

function calculateResult(tableName, root, steps, f) {
  r = math.eval(document.getElementById(root).value);
  s = document.getElementById(steps).value;

  var result;
  if (f==1) {
    result = coreCalculator(r, s, recursionFormula1);
  } else if (f==2) {
    result = coreCalculator(r, s, recursionFormula2);
  }
  var tb = generateTableBody(tableName, ['#','$x_n$','$e_n$']);
  fillTable(tb, result);
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function recursionFormula1 (x, r) {
   return 0.5*(x + (r/x));
}

function recursionFormula2 (x, r) {
  return (x*(math.pow(x,2) + 3 * r))/(3* math.pow(x,2) + r);
}

