var mathjs = require('mathjs'),
    math = mathjs();
var factorials = [];
var board;
var interpolationPolynomial;

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

function partialFactorial(n, l) {
  if ( n == 0 || n == 1 || n-l < 0)
    return 1;

  if(n == l)
    return factorial(n);

  var result = 1;
  for (var i = n; i > n-l ; i--) {
    result *= i;
  }

  return result;
}

function calculateFunction(x) {
  return Math.max(0, 1 - x);
}

function calculateCombination(i,n) {
  if (i == 0)
    return 1;
  if ( n == 0)
    return 0;
  if (i == 1)
    return n;
  if (i == n)
    return 1;
  if ( i > n)
    return 0;

  var ifactorial = factorial(i);
  var pnfactorial = partialFactorial(n,i);

  return pnfactorial/ifactorial;
}

function calculateInterpolation(mu) {

  var result = 0;
  for ( key in interpolationPolynomial) {
      var coefficient =  interpolationPolynomial[key]['coefficient'];
      var i = interpolationPolynomial[key]['index']
      var combineValue = calculateCombination(i, mu);

      result += coefficient * combineValue;
  }

  return result;
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

function calculateForwardDifferenceTable() {
  var _n_ = math.eval(document.getElementById('_n_').value);
  var _a_ = math.eval(document.getElementById('_a_').value);
  var _b_ = math.eval(document.getElementById('_b_').value);
  var labels = ["$x_i$"];
  var data = new Array();
  var polyStr = new Array();

  var interpolator = new Array();

  interpolationPolynomial = new Array();

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
      polyStr.push(fp.toString());
      interpolationPolynomial.push({index:0 , coefficient:fp})
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
          interpolationPolynomial.push({index:k , coefficient:ff12})
        }
      }
    }
  }


  var s = "$p(\\mu) = " + polyStr.join(" + ") + "$";
  var tb = generateTableBody("forwardDifferenceTable", labels);
  fillTable(tb, data);

  var polyParag = document.getElementById('interpolatorPolynomial');
  polyParag.innerHTML = s;

  doComparison();
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function doComparison() {
  var _n_ = math.eval(document.getElementById('_n_').value);
  var _a_ = math.eval(document.getElementById('_a_').value);
  var _b_ = math.eval(document.getElementById('_b_').value);
  var _m_ = math.eval(document.getElementById('_m_').value);
  var labels = ["$i$", "$x_i$" , "$\\mu$", "$f(x)$", "$p(x)$", "$e(x)$"];
  var data = new Array();

  var _h_ = (_b_ - _a_)/_n_;
  for (var i = 0; i <= _m_*_n_; i++) {
    if( i % _m_ != 0) {
    var _x_ = _a_ +  (i/_m_)*_h_;
    var _mu_ = (_x_ - _a_)/_h_ ;
    var _fxValue_ = calculateFunction(_x_);
    var _pmuValue_ = calculateInterpolation(_mu_);
    var _error_  = Math.abs(_fxValue_-_pmuValue_);
    data[i] =  {id:i, xValue: _x_, mu: _mu_,  fxValue: _fxValue_, pmuValue: _pmuValue_, errValue: _error_};
    }
  }
  var tb = generateTableBody("comparisonTable", labels);
  fillTable(tb, data);
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
