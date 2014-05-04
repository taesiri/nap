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

function calcultaeBisection() {
  var s = math.eval(document.getElementById('steps').value);
  var a = math.eval(document.getElementById('a__0').value);
  var b = math.eval(document.getElementById('b__0').value);
  var r =  coreCalculator(s,a,b);
  generateTable(r);


  var newBtn = document.getElementById('nwdiv');
  newBtn.className = "control-buttons";
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

function generateTableBody(tableName) {
  tbody = document.getElementById(tableName);

  theaderrow = document.createElement("TR");

  var labels = ['#','a','b', 'c', 'f(a)', 'f(b)', 'f(c)'];
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

function generateTable(data) {
  var tb = generateTableBody('resultTable');

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

function clearGraph() {
}
