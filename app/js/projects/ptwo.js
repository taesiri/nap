var mathjs = require('mathjs'),
    math = mathjs();
var board;

function drawGraphFunc() {
  board = JXG.JSXGraph.initBoard('box', {boundingbox: [-10, 10, 10, -10], axis:true});
  board.create('functiongraph', [function(x){return (2*x)/(1+(x*x)) - Math.atan(x);}, -2*Math.PI,2*Math.PI]);
}

function drawTang() {
  board.create('functiongraph', [function(x){return Math.atan(x);}, -20*Math.PI,20*Math.PI], {strokeColor:'#ff0000'});
}

function drawGraph() {
  if(board) {
  
  }
  else {
    board = JXG.JSXGraph.initBoard('box', {boundingbox: [-10, 10, 10, -10], axis:true});
    board.create('functiongraph', [function(x){return 2*x*Math.pow((1+(Math.pow(x,2))), -1);}, -Math.PI,Math.PI]);
    board.create('functiongraph', [function(x){return Math.pow(Math.tan(x), -1);}, -Math.PI,Math.PI]);
  }
}

function calculateBisection() {
  var s = math.eval(document.getElementById('steps').value);
  var a = math.eval(document.getElementById('a__0').value);
  var b = math.eval(document.getElementById('b__0').value);
  var r =  coreCalculator(s,a,b);
  generateBisectionTable(r);

  var newBtn = document.getElementById('nwdiv');
  newBtn.className = "control-buttons";

  document.getElementById('start-newton').value = r[s-1]['c'];
}

function calculateNewton() {
  var s = math.eval(document.getElementById('steps-newton').value);
  var p = math.eval(document.getElementById('start-newton').value);

  var r = coreNewtonCalculator(s, p);

  generateNewtonTable(r);
}

function ptwoFunc(x) {
  return (2*x)/(1+(x*x)) - Math.atan(x);
}

function coreCalculator(steps, a0, b0) {

  var results = new Array();

  var ia = a0;
  var ib = b0;
  var ic = (ia+ib)/2.0;

  var ra = ptwoFunc(ia);
  var rb = ptwoFunc(ib);
  // var rc = ptwoFunc(ic);

  var pa = board.create('Point', [ia,ra], {name: 'a0'});
  var pb = board.create('Point', [ib,rb], {name: 'b0'});

  for (var i = 0; i < steps; i ++) {
    var rc = ptwoFunc(ic);
    var pc = board.create('Point', [ic,rc], {name: 'c'+i.toString()});

    results[i] = {id: i, a: ia, b: ib, c: ic, fa: ra, fb:rb, fc : rc};

    if (rc == 0) {
      alert('founded at' + ic.toString());
      return results;
    } else if (ra*rc < 0) {
      ib = ic;
      rb = rc;
      ic = (ia+ib)/2.0;
    } else if (rc*rb < 0) {
      ia = ic;
      ra = rc;
      ic = (ia+ib)/2.0;
    }
  }
  return results;
}

function newtonFunc(x) {
  return Math.atan(x);
}

function newtonFuncDerivate(x) {
  return 1/(1+(x*x));
}

function coreNewtonCalculator(steps, x0) {
  var results = new Array();
  var prevValue = x0;
  var fx;
  var dfx;
  var rfdfx;
  for (var i = 0; i < steps; i ++) {
    fx = newtonFunc(prevValue);
    dfx = newtonFuncDerivate(prevValue);
    rfdfx = fx/dfx;
    var newPoint = prevValue - rfdfx;
    results[i] = {id: i, xn: prevValue, fxn: fx, dfxn: dfx, rfdf: rfdfx};
    prevValue = newPoint;
  }
  return results;
}

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

function generateBisectionTable(data) {
  var tb = generateTableBody('resultTable', ['#','$a$','$b$', '$c=\\frac{a+b}{2}$', '$f(a)$', '$f(b)$', '$f(c)$']);
  fillTable(tb,data);

  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function generateNewtonTable(data) {
  var tb = generateTableBody('newtonResultTable', ['#', '$x_n$', '$f(x_n)$', '$f(x_n)$', '$\\frac{f(x_n)}{f(x_n)}$']);
  fillTable(tb, data);

  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
