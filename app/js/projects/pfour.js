var mathjs = require('mathjs'),
    math = mathjs();
var factorials = [];
var board;

function drawGraph(){
  board = JXG.JSXGraph.initBoard('box', {boundingbox: [-10, 10, 10, -10], axis:true});
  board.create('functiongraph', [function(x){return calculateFunction(x);}, -4,4]);
}

function factorial (n) {
  if ( n == 0 || n == 1) 
    return 1;

  if(factorials[n]>0)
    return factorials[n];

  return factorials[n] = factorial(n-1)*n;
}

function customFactorial(n, l) {
  if ( n == 0 || n == 1 || n-l < 0)
    return 1;

  if(n == l)
    return factorial(b);

  var result = 1;
  for (var i = n; i >= n-l ; i--) {
    result *= i;
  }

  return result;
}

function calculateFunction(x) {
  return Math.max(0, 1 - x);
}

function forwardDifference(x0, i, h, n){
  if(n==1) {
    forwardDifference(x0, i+1, h, n-1) - forwardDifference(x0, i, h, n-1);
  } else {
    return (calculateFunction(x0, i+1, h) - calculateFunction(x0, i, h));
  }
}

function newtonInterpolation(x, a, b, n) {
  var h = (b-a)/n;
  var m = (x-a)/h;

  var result = 0;
  
  for (var i = 0; i < n; i ++) {
    var xi = a+ (i*h);

    result += combination(m,i) * forwardDifference(a, 0, h, i);
  }
}

function combination(mu, i) {
  if ( i == 0 ) return mu;
  return customFactorial(mu, i)/factorial(i);
}

function pointHelper(a,b,n,i) {
  return a + i*((b-a)/n);
}

function evalutaeInterpolator(interpolator, mu) {
  var result = 0;

  for(entry in interpolator) {
    var i = interpolator[entry]["c_i"];
    var cof = interpolator[entry]["coefficient"];

    //var combin = combination(i, mu);
  }
  return 0;
}

function calculateForwardDifferenceTable() {
  var _n_ = math.eval(document.getElementById('_n_').value);
  var _a_ = math.eval(document.getElementById('_a_').value);
  var _b_ = math.eval(document.getElementById('_b_').value);
  var labels = ["$x_i$"];
  var data = new Array();
  var polyStr = new Array();

  var interpolator = new Array();

  for (var i = 0; i <= _n_; i ++) {
    if( i== 0) {
      labels.push("$f(x_i)$");
    } else {
      labels.push("$\\Delta^{" + i + "}f_i$");
    }


    var p = pointHelper(_a_,_b_,_n_,i);
    var fp = calculateFunction(p);
    data.push({id : p , FF0: fp});

    if ( i == 0) {
      polyStr.push("\\left( \\begin{array}{c} \\mu  \\\\0 \\end{array} \\right) * "+fp);
      interpolator.push({coefficient: fp, c_i: i});
    }
  }

  for (var k = 1; k <= _n_; k++) {
    for (var i = 0; i < _n_ - k + 1 ; i ++) {
      var f1 = data[i]['FF'+(k-1).toString()];
      var f2 = data[i+1]['FF'+(k-1).toString()];
      var ff12 = parseFloat(f2-f1);

      data[i]['FF'+k.toString()] = ff12;

      if ( i== 0) {
        if ( ff12 != 0) {
          polyStr.push("\\left( \\begin{array}{c} \\mu  \\\\"+ k.toString() +" \\end{array} \\right) * "+ff12);
          interpolator.push({coefficient: ff12, c_i: k});
        }
      }
    }
  }


  var s = "$p(x) = " + polyStr.join(" + ") + "$";
  var tb = generateTableBody("forwardDifferenceTable", labels);
  fillTable(tb, data);

  var polyParag = document.getElementById('interpolatorPolynomial');
  polyParag.innerHTML = s;


  evalutaeInterpolator(interpolator, 0);

  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}


function generateTableBody(tableName, labels) {
  tbody = document.getElementById(tableName);

  theaderrow = document.createElement("TR");

  while(theaderrow.firstChild) {
    theaderrow.removeChild(theaderrow.firstChild);
  }

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
